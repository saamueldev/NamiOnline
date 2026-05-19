import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FlaskConical,
  Loader2,
  MapPin,
  Plus,
  RefreshCw,
  Search,
  Stethoscope,
  UserRound,
  X,
  XCircle,
} from "lucide-react";

import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";

const tiposFiltro = ["TODOS", "CONSULTA", "EXAME"];
const statusOcultos = ["CANCELADO"];

const dadosTipo = {
  CONSULTA: {
    label: "Consulta",
    icon: Stethoscope,
    badge: "bg-blue-50 text-blue-700 ring-blue-100",
    iconBox: "bg-blue-100 text-blue-700",
  },
  EXAME: {
    label: "Exame",
    icon: FlaskConical,
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    iconBox: "bg-emerald-100 text-emerald-700",
  },
};

const statusVisual = {
  PENDENTE: {
    label: "Pendente",
    className: "bg-amber-50 text-amber-700 ring-amber-100",
    icon: AlertCircle,
  },
  AGENDADO: {
    label: "Agendado",
    className: "bg-green-50 text-green-700 ring-green-100",
    icon: CheckCircle2,
  },
  CONFIRMADO: {
    label: "Confirmado",
    className: "bg-green-50 text-green-700 ring-green-100",
    icon: CheckCircle2,
  },
  CONCLUIDO: {
    label: "Concluido",
    className: "bg-slate-100 text-slate-700 ring-slate-200",
    icon: CheckCircle2,
  },
  REALIZADO: {
    label: "Realizado",
    className: "bg-slate-100 text-slate-700 ring-slate-200",
    icon: CheckCircle2,
  },
  CANCELADO: {
    label: "Cancelado",
    className: "bg-red-50 text-red-700 ring-red-100",
    icon: XCircle,
  },
};

function normalizarId(valor) {
  if (!valor) return "";
  if (typeof valor === "string") return valor;
  return valor._id || valor.id || "";
}

function texto(valor, fallback = "Nao informado") {
  return valor || fallback;
}

function nomePessoa(pessoa) {
  return pessoa?.name || pessoa?.nome || pessoa?.usuarioNome || "";
}

function nomeEspecialidade(especialidade) {
  return especialidade?.name || especialidade?.nome || especialidade || "";
}

function formatarData(data) {
  if (!data) return "Data nao informada";

  const dataObj =
    typeof data === "string" && /^\d{4}-\d{2}-\d{2}$/.test(data)
      ? new Date(`${data}T00:00:00`)
      : new Date(data);

  if (Number.isNaN(dataObj.getTime())) return "Data nao informada";

  return dataObj.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatarDataCurta(data) {
  if (!data) return "";

  const dataObj =
    typeof data === "string" && /^\d{4}-\d{2}-\d{2}$/.test(data)
      ? new Date(`${data}T00:00:00`)
      : new Date(data);

  if (Number.isNaN(dataObj.getTime())) return "";

  return dataObj.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });
}

function obterHorarioDaData(data) {
  const dataObj = new Date(data);
  if (Number.isNaN(dataObj.getTime())) return "";

  return dataObj.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function normalizarStatus(status) {
  return String(status || "AGENDADO").toUpperCase();
}

function dataOrdenacao(data, horario) {
  if (!data) return Number.MAX_SAFE_INTEGER;

  const base =
    typeof data === "string" && /^\d{4}-\d{2}-\d{2}$/.test(data)
      ? `${data}T${horario || "00:00"}:00`
      : data;

  const dataObj = new Date(base);
  return Number.isNaN(dataObj.getTime()) ? Number.MAX_SAFE_INTEGER : dataObj.getTime();
}

function consultaPertenceAoUsuario(consulta, usuarioId) {
  return normalizarId(consulta?.pacienteId?.user) === usuarioId;
}

function mapearConsulta(consulta) {
  const dataConsulta = consulta.dataConsulta;
  const medico = consulta.medicoId;
  const especialidade = consulta.especialidadeId;

  return {
    id: consulta._id,
    origem: "consulta",
    tipo: "CONSULTA",
    titulo: `Consulta em ${texto(nomeEspecialidade(especialidade), "especialidade")}`,
    profissional: texto(nomePessoa(medico), "Medico nao informado"),
    especialidade: texto(nomeEspecialidade(especialidade)),
    data: dataConsulta,
    hora: obterHorarioDaData(dataConsulta),
    local: "NAMI - Unifor",
    status: normalizarStatus(consulta.status),
    observacao:
      consulta.guiaId?.urlArquivo || consulta.guiaId
        ? "Guia medica vinculada ao agendamento."
        : "Leve documento com foto e chegue com antecedencia.",
    codigo: consulta._id,
    atendimento: "Consulta medica",
    guia: consulta.guiaId?.urlArquivo || consulta.guiaId ? "Vinculada" : "Nao vinculada",
    ordenacao: dataOrdenacao(dataConsulta),
  };
}

function mapearExame(exame) {
  const tipoExame = exame.tipoExameId;
  const categoria = tipoExame?.categoriaExameId;

  return {
    id: exame._id,
    origem: "exame",
    tipo: "EXAME",
    titulo: texto(tipoExame?.nome, "Exame agendado"),
    profissional: "Equipe NAMI",
    especialidade: texto(categoria?.nome, "Exames"),
    data: exame.data,
    hora: exame.horario,
    local: "NAMI - Laboratorio",
    status: normalizarStatus(exame.status),
    observacao:
      exame.observacoes ||
      (exame.guiaArquivoNome
        ? `Guia anexada: ${exame.guiaArquivoNome}`
        : "Confira as orientacoes do exame antes do atendimento."),
    codigo: exame._id,
    atendimento: exame.tipoAtendimento || "Nao informado",
    guia: exame.guiaArquivoNome || "Nao anexada",
    ordenacao: dataOrdenacao(exame.data, exame.horario),
  };
}

function CardResumo({ label, valor, detalhe, icone, className }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-extrabold text-[#132190]">{valor}</p>
          <p className="mt-1 text-xs font-medium text-slate-400">{detalhe}</p>
        </div>

        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${className}`}>
          {icone}
        </div>
      </div>
    </div>
  );
}

export default function TelaAgendamentos() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [busca, setBusca] = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState("TODOS");
  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);
  const [agendamentoCancelando, setAgendamentoCancelando] = useState(null);
  const [cancelando, setCancelando] = useState(false);

  const carregarAgendamentos = useCallback(async () => {
    const usuarioId = user?.id;

    if (!usuarioId) {
      setAgendamentos([]);
      setCarregando(false);
      setErro("Nao foi possivel identificar o usuario logado.");
      return;
    }

    try {
      setCarregando(true);
      setErro("");

      const [consultasResponse, examesResponse] = await Promise.allSettled([
        api.get("/consultas"),
        api.get("/agendamentos-exames/meus"),
      ]);

      const consultas =
        consultasResponse.status === "fulfilled" && Array.isArray(consultasResponse.value.data)
          ? consultasResponse.value.data
              .filter((consulta) => consultaPertenceAoUsuario(consulta, usuarioId))
              .map(mapearConsulta)
          : [];

      const exames =
        examesResponse.status === "fulfilled" && Array.isArray(examesResponse.value.data)
          ? examesResponse.value.data.map(mapearExame)
          : [];

      const falhas = [consultasResponse, examesResponse].filter(
        (resposta) => resposta.status === "rejected"
      );

      if (falhas.length > 0) {
        setErro("Alguns agendamentos nao puderam ser carregados agora.");
      }

      setAgendamentos(
        [...consultas, ...exames]
          .filter((agendamento) => !statusOcultos.includes(agendamento.status))
          .sort((a, b) => a.ordenacao - b.ordenacao)
      );
    } catch (error) {
      console.error("Erro ao carregar agendamentos:", error);
      setAgendamentos([]);
      setErro("Nao foi possivel carregar seus agendamentos.");
    } finally {
      setCarregando(false);
    }
  }, [user?.id]);

  useEffect(() => {
    carregarAgendamentos();
  }, [carregarAgendamentos]);

  function podeCancelarAgendamento(agendamento) {
    return !["CANCELADO", "CONCLUIDO", "REALIZADO"].includes(agendamento.status);
  }

  async function confirmarCancelamento() {
    if (!agendamentoCancelando) return;

    try {
      setCancelando(true);
      setErro("");

      if (agendamentoCancelando.tipo === "CONSULTA") {
        await api.patch(`/consultas/${agendamentoCancelando.id}/status`, {
          status: "CANCELADO",
        });
      } else {
        await api.patch(`/agendamentos-exames/${agendamentoCancelando.id}/cancelar`);
      }

      setAgendamentoSelecionado(null);
      setAgendamentoCancelando(null);
      await carregarAgendamentos();
    } catch (error) {
      console.error("Erro ao cancelar agendamento:", error);
      setErro(
        error.response?.data?.mensagem ||
          error.response?.data?.error ||
          "Nao foi possivel cancelar este agendamento."
      );
    } finally {
      setCancelando(false);
    }
  }

  const contadores = useMemo(() => {
    const ativos = agendamentos.filter(
      (item) => !["CANCELADO", "CONCLUIDO", "REALIZADO"].includes(item.status)
    );

    return {
      total: agendamentos.length,
      proximos: ativos.length,
      consultas: agendamentos.filter((item) => item.tipo === "CONSULTA").length,
      exames: agendamentos.filter((item) => item.tipo === "EXAME").length,
    };
  }, [agendamentos]);

  const proximoAgendamento = useMemo(() => {
    const agora = Date.now();
    return agendamentos.find(
      (item) =>
        !["CANCELADO", "CONCLUIDO", "REALIZADO"].includes(item.status) &&
        item.ordenacao >= agora
    );
  }, [agendamentos]);

  const agendamentosFiltrados = useMemo(() => {
    const termo = busca.toLowerCase().trim();

    return agendamentos.filter((agendamento) => {
      const correspondeTipo =
        tipoSelecionado === "TODOS" || agendamento.tipo === tipoSelecionado;

      const textoBusca = [
        agendamento.titulo,
        agendamento.profissional,
        agendamento.especialidade,
        agendamento.local,
        agendamento.status,
      ]
        .join(" ")
        .toLowerCase();

      return correspondeTipo && textoBusca.includes(termo);
    });
  }, [agendamentos, busca, tipoSelecionado]);

  return (
    <div className="min-h-screen bg-[#F4F8FF] text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#E4F2FE] px-4 py-2 text-sm font-bold text-[#004AF7]">
              <CalendarDays className="h-4 w-4" />
              Meus agendamentos
            </span>

            <h1 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight text-[#132190] md:text-5xl">
              MEUS AGENDAMENTOS
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Acompanhe consultas e exames vinculados ao seu usuario, veja horarios,
              profissionais, status e observacoes importantes.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate("/especialidades")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#004AF7] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#132190]"
              >
                <Plus className="h-4 w-4" />
                Nova consulta
              </button>

              <button
                type="button"
                onClick={carregarAgendamentos}
                disabled={carregando}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#004AF7]/20 bg-white px-5 py-3 text-sm font-bold text-[#004AF7] transition hover:bg-[#E4F2FE] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw className={`h-4 w-4 ${carregando ? "animate-spin" : ""}`} />
                Atualizar
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-[#F8FBFF] p-5">
            <p className="text-sm font-bold text-slate-500">Proximo atendimento</p>

            {proximoAgendamento ? (
              <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                      dadosTipo[proximoAgendamento.tipo].iconBox
                    }`}
                  >
                    {(() => {
                      const Icone = dadosTipo[proximoAgendamento.tipo].icon;
                      return <Icone className="h-6 w-6" />;
                    })()}
                  </div>

                  <div>
                    <h2 className="text-lg font-extrabold text-[#132190]">
                      {proximoAgendamento.titulo}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {formatarData(proximoAgendamento.data)} as {proximoAgendamento.hora}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-700">
                      {proximoAgendamento.profissional}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-500">
                Nenhum atendimento futuro encontrado.
              </div>
            )}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-8 md:px-10">
        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <CardResumo
            label="Total"
            valor={contadores.total}
            detalhe="Registros encontrados"
            icone={<CalendarDays className="h-6 w-6" />}
            className="bg-[#E4F2FE] text-[#004AF7]"
          />
          <CardResumo
            label="Consultas"
            valor={contadores.consultas}
            detalhe="Atendimentos medicos"
            icone={<Stethoscope className="h-6 w-6" />}
            className="bg-blue-50 text-blue-700"
          />
          <CardResumo
            label="Exames"
            valor={contadores.exames}
            detalhe="Procedimentos marcados"
            icone={<FlaskConical className="h-6 w-6" />}
            className="bg-emerald-50 text-emerald-700"
          />
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-h-12 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-[#F8FBFF] px-4">
              <Search className="h-5 w-5 text-[#004AF7]" />
              <input
                type="text"
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
                placeholder="Buscar por medico, exame, especialidade, local ou status"
                className="h-12 w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {tiposFiltro.map((tipo) => (
                <button
                  key={tipo}
                  type="button"
                  onClick={() => setTipoSelecionado(tipo)}
                  className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                    tipoSelecionado === tipo
                      ? "bg-[#132190] text-white shadow-sm"
                      : "bg-[#E4F2FE] text-[#004AF7] hover:bg-[#d5eaff]"
                  }`}
                >
                  {tipo === "TODOS" ? "Todos" : dadosTipo[tipo].label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {erro && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            {erro}
          </div>
        )}

        <section className="mt-8">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-[#132190]">
                Agenda do usuario
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {agendamentosFiltrados.length} item(ns) exibido(s)
              </p>
            </div>
          </div>

          {carregando ? (
            <div className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-10 text-sm font-bold text-slate-500 shadow-sm">
              <Loader2 className="h-5 w-5 animate-spin text-[#004AF7]" />
              Carregando seus agendamentos...
            </div>
          ) : agendamentosFiltrados.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
              <CalendarDays className="mx-auto h-10 w-10 text-slate-300" />
              <h3 className="mt-4 text-lg font-extrabold text-[#132190]">
                Nenhum agendamento encontrado
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Tente limpar os filtros ou agende uma nova consulta ou exame.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {agendamentosFiltrados.map((agendamento) => {
                const tipoInfo = dadosTipo[agendamento.tipo];
                const IconeTipo = tipoInfo.icon;
                const statusInfo = statusVisual[agendamento.status] || statusVisual.AGENDADO;
                const IconeStatus = statusInfo.icon;

                return (
                  <article
                    key={`${agendamento.origem}-${agendamento.id}`}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#87B7FE] hover:shadow-md"
                  >
                    <div className="grid gap-5 lg:grid-cols-[auto_1fr_auto] lg:items-start">
                      <div className="flex items-center gap-4 lg:block">
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tipoInfo.iconBox}`}
                        >
                          <IconeTipo className="h-7 w-7" />
                        </div>
                        <div className="lg:mt-3 lg:text-center">
                          <p className="text-2xl font-extrabold text-[#132190]">
                            {formatarDataCurta(agendamento.data)}
                          </p>
                          <p className="text-xs font-bold uppercase text-slate-400">
                            {agendamento.hora || "--:--"}
                          </p>
                        </div>
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ring-1 ${tipoInfo.badge}`}
                          >
                            <IconeTipo className="h-3.5 w-3.5" />
                            {tipoInfo.label}
                          </span>

                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ring-1 ${statusInfo.className}`}
                          >
                            <IconeStatus className="h-3.5 w-3.5" />
                            {statusInfo.label}
                          </span>
                        </div>

                        <h3 className="mt-3 text-xl font-extrabold text-[#132190]">
                          {agendamento.titulo}
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-slate-500">
                          {agendamento.especialidade}
                        </p>

                        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                          <div className="flex items-center gap-2 rounded-xl bg-[#F8FBFF] px-3 py-3 text-sm text-slate-600">
                            <CalendarDays className="h-4 w-4 text-[#004AF7]" />
                            <span>{formatarData(agendamento.data)}</span>
                          </div>

                          <div className="flex items-center gap-2 rounded-xl bg-[#F8FBFF] px-3 py-3 text-sm text-slate-600">
                            <UserRound className="h-4 w-4 text-[#004AF7]" />
                            <span>{agendamento.profissional}</span>
                          </div>

                          <div className="flex items-center gap-2 rounded-xl bg-[#F8FBFF] px-3 py-3 text-sm text-slate-600">
                            <MapPin className="h-4 w-4 text-[#004AF7]" />
                            <span>{agendamento.local}</span>
                          </div>
                        </div>

                        <div className="mt-4 rounded-xl border border-[#87B7FE]/20 bg-[#E4F2FE]/50 p-4 text-sm leading-6 text-slate-600">
                          {agendamento.observacao}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 lg:items-end">
                        <button
                          type="button"
                          onClick={() => setAgendamentoSelecionado(agendamento)}
                          className="inline-flex items-center justify-center rounded-xl bg-[#004AF7] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#132190]"
                        >
                          Ver detalhes
                        </button>

                        {podeCancelarAgendamento(agendamento) && (
                          <button
                            type="button"
                            onClick={() => setAgendamentoCancelando(agendamento)}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700 transition hover:bg-red-100"
                          >
                            <XCircle className="h-4 w-4" />
                            Cancelar
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {agendamentoSelecionado && (() => {
        const tipoInfo = dadosTipo[agendamentoSelecionado.tipo];
        const IconeTipo = tipoInfo.icon;
        const statusInfo =
          statusVisual[agendamentoSelecionado.status] || statusVisual.AGENDADO;
        const IconeStatus = statusInfo.icon;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
              <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-6">
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${tipoInfo.iconBox}`}>
                    <IconeTipo className="h-6 w-6" />
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ring-1 ${tipoInfo.badge}`}>
                        <IconeTipo className="h-3.5 w-3.5" />
                        {tipoInfo.label}
                      </span>

                      <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ring-1 ${statusInfo.className}`}>
                        <IconeStatus className="h-3.5 w-3.5" />
                        {statusInfo.label}
                      </span>
                    </div>

                    <h2 className="mt-3 text-2xl font-extrabold text-[#132190]">
                      {agendamentoSelecionado.titulo}
                    </h2>
                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      {agendamentoSelecionado.especialidade}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setAgendamentoSelecionado(null)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Fechar detalhes"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="max-h-[70vh] overflow-y-auto p-6">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-[#F8FBFF] p-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-400">
                      <CalendarDays className="h-4 w-4 text-[#004AF7]" />
                      Data
                    </div>
                    <p className="mt-2 font-bold text-[#132190]">
                      {formatarData(agendamentoSelecionado.data)}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#F8FBFF] p-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-400">
                      <Clock3 className="h-4 w-4 text-[#004AF7]" />
                      Horario
                    </div>
                    <p className="mt-2 font-bold text-[#132190]">
                      {agendamentoSelecionado.hora || "Nao informado"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#F8FBFF] p-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-400">
                      <UserRound className="h-4 w-4 text-[#004AF7]" />
                      Profissional
                    </div>
                    <p className="mt-2 font-bold text-[#132190]">
                      {agendamentoSelecionado.profissional}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#F8FBFF] p-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-400">
                      <MapPin className="h-4 w-4 text-[#004AF7]" />
                      Local
                    </div>
                    <p className="mt-2 font-bold text-[#132190]">
                      {agendamentoSelecionado.local}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#F8FBFF] p-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-400">
                      <CheckCircle2 className="h-4 w-4 text-[#004AF7]" />
                      Atendimento
                    </div>
                    <p className="mt-2 font-bold text-[#132190]">
                      {agendamentoSelecionado.atendimento}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#F8FBFF] p-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-400">
                      <AlertCircle className="h-4 w-4 text-[#004AF7]" />
                      Guia
                    </div>
                    <p className="mt-2 break-words font-bold text-[#132190]">
                      {agendamentoSelecionado.guia}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-[#87B7FE]/20 bg-[#E4F2FE]/50 p-4">
                  <p className="text-xs font-bold uppercase text-slate-400">
                    Observacoes
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {agendamentoSelecionado.observacao}
                  </p>
                </div>

                <div className="mt-4 rounded-xl border border-slate-200 p-4">
                  <p className="text-xs font-bold uppercase text-slate-400">
                    Codigo do agendamento
                  </p>
                  <p className="mt-2 break-all font-mono text-xs text-slate-500">
                    {agendamentoSelecionado.codigo}
                  </p>
                </div>

                {podeCancelarAgendamento(agendamentoSelecionado) && (
                  <button
                    type="button"
                    onClick={() => setAgendamentoCancelando(agendamentoSelecionado)}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700 transition hover:bg-red-100"
                  >
                    <XCircle className="h-4 w-4" />
                    Cancelar agendamento
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {agendamentoCancelando && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-[#132190]">
                  Cancelar agendamento
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Tem certeza que deseja cancelar{" "}
                  <strong>{agendamentoCancelando.titulo}</strong> em{" "}
                  <strong>{formatarData(agendamentoCancelando.data)}</strong> as{" "}
                  <strong>{agendamentoCancelando.hora || "horario nao informado"}</strong>?
                </p>
              </div>

              <button
                type="button"
                onClick={() => setAgendamentoCancelando(null)}
                disabled={cancelando}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-60"
                aria-label="Fechar confirmacao"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={confirmarCancelamento}
                disabled={cancelando}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {cancelando ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                Confirmar cancelamento
              </button>

              <button
                type="button"
                onClick={() => setAgendamentoCancelando(null)}
                disabled={cancelando}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
