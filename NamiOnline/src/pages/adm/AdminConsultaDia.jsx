import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Calendar,
  Clock,
  Edit3,
  FlaskConical,
  Loader2,
  RefreshCw,
  Save,
  Stethoscope,
  Trash2,
  User,
  X,
} from "lucide-react";

import api from "../../services/api";

const statusIgnorados = ["CANCELADO"];

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

function normalizarId(valor) {
  if (!valor) return "";
  if (typeof valor === "string") return valor;
  return valor._id || valor.id || "";
}

function texto(valor, fallback = "Nao informado") {
  return typeof valor === "string" && valor.trim() ? valor : fallback;
}

function nomePessoa(pessoa) {
  return (
    pessoa?.name ||
    pessoa?.nome ||
    pessoa?.usuarioNome ||
    pessoa?.user?.name ||
    pessoa?.user?.nome ||
    ""
  );
}

function nomePaciente(paciente) {
  return texto(nomePessoa(paciente), "Paciente nao informado");
}

function nomeEspecialidade(especialidade) {
  if (typeof especialidade === "string") return especialidade;
  return especialidade?.name || especialidade?.nome || "";
}

function normalizarStatus(status) {
  return String(status || "AGENDADO").toUpperCase();
}

function criarData(data, horario) {
  if (!data) return null;

  const valor =
    typeof data === "string" && /^\d{4}-\d{2}-\d{2}$/.test(data)
      ? `${data}T${horario || "00:00"}:00`
      : data;

  const dataObj = new Date(valor);
  return Number.isNaN(dataObj.getTime()) ? null : dataObj;
}

function formatarDataCompleta(data) {
  const dataObj = criarData(data);
  if (!dataObj) return "Data nao informada";

  return dataObj.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatarDataCurta(data) {
  const dataObj = criarData(data);
  if (!dataObj) return "Sem data";

  return dataObj.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function chaveDia(data) {
  const dataObj = criarData(data);
  if (!dataObj) return "sem-data";

  const ano = dataObj.getFullYear();
  const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
  const dia = String(dataObj.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

function horarioDaData(data) {
  const dataObj = criarData(data);
  if (!dataObj) return "";

  return dataObj.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function dataOrdenacao(data, horario) {
  const dataObj = criarData(data, horario);
  return dataObj ? dataObj.getTime() : Number.MAX_SAFE_INTEGER;
}

function dataParaInput(data) {
  const dataObj = criarData(data);
  if (!dataObj) return "";

  const ano = dataObj.getFullYear();
  const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
  const dia = String(dataObj.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

function criarDataConsultaParaApi(data, hora) {
  if (!data || !hora) return "";

  const [ano, mes, dia] = data.split("-").map(Number);
  const [horas, minutos] = hora.split(":").map(Number);
  const dataConsulta = new Date(ano, mes - 1, dia, horas, minutos, 0, 0);
  return dataConsulta.toISOString();
}

function atendimentoFuturo(item) {
  if (!Number.isFinite(item.ordenacao)) return false;
  return item.ordenacao >= Date.now();
}

function mapearConsulta(consulta) {
  const medico = consulta.medicoId;
  const especialidade = consulta.especialidadeId;
  const status = normalizarStatus(consulta.status);

  return {
    id: consulta._id || consulta.id,
    tipo: "CONSULTA",
    status,
    titulo: `Consulta em ${texto(nomeEspecialidade(especialidade), "especialidade")}`,
    paciente: nomePaciente(consulta.pacienteId),
    profissionalId: normalizarId(medico) || "sem-medico",
    profissional: texto(nomePessoa(medico), "Medico nao informado"),
    detalheProfissional: texto(nomeEspecialidade(especialidade), "Especialidade nao informada"),
    data: consulta.dataConsulta,
    hora: horarioDaData(consulta.dataConsulta),
    dataInput: dataParaInput(consulta.dataConsulta),
    horaInput: horarioDaData(consulta.dataConsulta),
    local: "NAMI - Unifor",
    observacao:
      consulta.guiaId?.urlArquivo || consulta.guiaId
        ? "Guia medica vinculada."
        : "Consulta medica agendada.",
    ordenacao: dataOrdenacao(consulta.dataConsulta),
  };
}

function mapearExame(exame) {
  const tipoExame = exame.tipoExameId;
  const categoria = tipoExame?.categoriaExameId;
  const status = normalizarStatus(exame.status);

  return {
    id: exame._id || exame.id,
    tipo: "EXAME",
    status,
    titulo: texto(tipoExame?.nome || exame.nome, "Exame agendado"),
    paciente: nomePaciente(exame.usuarioId || exame.pacienteId),
    profissionalId: "equipe-exames",
    profissional: "Equipe de exames",
    detalheProfissional: texto(categoria?.nome, "Exames"),
    data: exame.data,
    hora: exame.horario || horarioDaData(exame.data),
    dataInput: dataParaInput(exame.data),
    horaInput: exame.horario || horarioDaData(exame.data),
    local: "NAMI - Laboratorio",
    observacao: exame.observacoes || "Exame agendado no sistema.",
    ordenacao: dataOrdenacao(exame.data, exame.horario),
  };
}

async function carregarExames() {
  const resposta = await api.get("/agendamentos-exames");
  const dados = Array.isArray(resposta.data)
    ? resposta.data
    : resposta.data?.agendamentos || resposta.data?.data || [];

  return Array.isArray(dados) ? dados : [];
}

function agruparPorDiaEProfissional(agendamentos) {
  const dias = new Map();

  agendamentos.forEach((agendamento) => {
    const diaId = chaveDia(agendamento.data);

    if (!dias.has(diaId)) {
      dias.set(diaId, {
        id: diaId,
        data: agendamento.data,
        ordenacao: dataOrdenacao(agendamento.data),
        profissionais: new Map(),
      });
    }

    const dia = dias.get(diaId);
    const profissionalId = agendamento.profissionalId;

    if (!dia.profissionais.has(profissionalId)) {
      dia.profissionais.set(profissionalId, {
        id: profissionalId,
        nome: agendamento.profissional,
        detalhe: agendamento.detalheProfissional,
        itens: [],
      });
    }

    dia.profissionais.get(profissionalId).itens.push(agendamento);
  });

  return Array.from(dias.values())
    .sort((a, b) => a.ordenacao - b.ordenacao)
    .map((dia) => ({
      ...dia,
      profissionais: Array.from(dia.profissionais.values())
        .map((grupo) => ({
          ...grupo,
          itens: grupo.itens.sort((a, b) => a.ordenacao - b.ordenacao),
        }))
        .sort((a, b) => String(a.nome).localeCompare(String(b.nome), "pt-BR")),
    }));
}

export default function ConsultasDoDia() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [cancelamento, setCancelamento] = useState(null);
  const [edicao, setEdicao] = useState(null);
  const [salvando, setSalvando] = useState(false);

  const carregarAgenda = useCallback(async () => {
    try {
      setCarregando(true);
      setErro("");

      const [consultasResponse, examesResponse] = await Promise.allSettled([
        api.get("/consultas"),
        carregarExames(),
      ]);

      const consultas =
        consultasResponse.status === "fulfilled" && Array.isArray(consultasResponse.value.data)
          ? consultasResponse.value.data
          : [];

      const exames =
        examesResponse.status === "fulfilled" && Array.isArray(examesResponse.value)
          ? examesResponse.value
          : [];

      const agenda = [...consultas.map(mapearConsulta), ...exames.map(mapearExame)]
        .filter((item) => item.id && !statusIgnorados.includes(item.status) && atendimentoFuturo(item))
        .sort((a, b) => a.ordenacao - b.ordenacao);

      setAgendamentos(agenda);

      if (consultasResponse.status === "rejected" || examesResponse.status === "rejected") {
        setErro("Alguns dados nao puderam ser carregados agora.");
      }
    } catch (error) {
      console.error("Erro ao carregar agenda administrativa:", error);
      setAgendamentos([]);
      setErro("Nao foi possivel carregar consultas e exames do banco.");
    } finally {
      setCarregando(false);
    }
  }, []);

  async function confirmarCancelamento() {
    if (!cancelamento) return;

    try {
      setSalvando(true);
      setErro("");

      if (cancelamento.tipo === "CONSULTA") {
        await api.patch(`/consultas/${cancelamento.id}/status`, {
          status: "CANCELADO",
        });
      } else {
        await api.patch(`/agendamentos-exames/${cancelamento.id}/cancelar`);
      }

      setCancelamento(null);
      await carregarAgenda();
    } catch (error) {
      console.error("Erro ao cancelar atendimento:", error);
      setErro("Nao foi possivel cancelar este atendimento.");
    } finally {
      setSalvando(false);
    }
  }

  function abrirEdicao(item) {
    setEdicao({
      ...item,
      dataEditada: item.dataInput,
      horaEditada: item.horaInput,
      statusEditado: item.status,
      observacaoEditada: item.observacao === "Exame agendado no sistema." ? "" : item.observacao,
    });
  }

  async function salvarEdicao(event) {
    event.preventDefault();

    if (!edicao?.dataEditada || !edicao?.horaEditada) {
      setErro("Informe data e horario para editar o atendimento.");
      return;
    }

    try {
      setSalvando(true);
      setErro("");

      if (edicao.tipo === "CONSULTA") {
        await api.patch(`/consultas/${edicao.id}`, {
          dataConsulta: criarDataConsultaParaApi(edicao.dataEditada, edicao.horaEditada),
          status: edicao.statusEditado,
        });
      } else {
        await api.patch(`/agendamentos-exames/${edicao.id}`, {
          data: edicao.dataEditada,
          horario: edicao.horaEditada,
          status: edicao.statusEditado.toLowerCase(),
          observacoes: edicao.observacaoEditada,
        });
      }

      setEdicao(null);
      await carregarAgenda();
    } catch (error) {
      console.error("Erro ao editar atendimento:", error);
      setErro("Nao foi possivel salvar a edicao deste atendimento.");
    } finally {
      setSalvando(false);
    }
  }

  useEffect(() => {
    carregarAgenda();
  }, [carregarAgenda]);

  const dias = useMemo(() => agruparPorDiaEProfissional(agendamentos), [agendamentos]);

  const contadores = useMemo(
    () => ({
      total: agendamentos.length,
      consultas: agendamentos.filter((item) => item.tipo === "CONSULTA").length,
      exames: agendamentos.filter((item) => item.tipo === "EXAME").length,
    }),
    [agendamentos]
  );

  return (
    <div className="min-h-screen bg-[#E4F2FE] px-4 py-8 font-sans text-slate-900 md:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="inline-flex rounded-full border border-[#87B7FE]/30 bg-white px-4 py-1 text-sm font-medium text-[#004AF7]">
                Agenda medica
              </span>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#132190] md:text-5xl">
                Consultas e exames por dia
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-600">
                <span className="inline-flex items-center gap-2">
                  <Calendar size={18} className="text-[#004AF7]" />
                  {contadores.total} atendimento(s)
                </span>
                <span>{contadores.consultas} consulta(s)</span>
                <span>{contadores.exames} exame(s)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={carregarAgenda}
              disabled={carregando}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#87B7FE]/20 bg-white px-5 py-3 text-sm font-bold text-[#132190] shadow-sm transition-all hover:bg-[#F4F8FF] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw size={18} className={carregando ? "animate-spin" : ""} />
              Atualizar
            </button>
          </div>
        </header>

        {erro && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            {erro}
          </div>
        )}

        {carregando ? (
          <div className="flex items-center justify-center gap-3 rounded-3xl border border-[#87B7FE]/20 bg-white p-10 text-sm font-bold text-slate-500 shadow-sm">
            <Loader2 className="h-5 w-5 animate-spin text-[#004AF7]" />
            Carregando consultas e exames do banco...
          </div>
        ) : dias.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <Calendar className="mx-auto h-10 w-10 text-slate-300" />
            <h2 className="mt-4 text-xl font-extrabold text-[#132190]">
              Nenhum atendimento encontrado
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Quando houver consultas ou exames agendados, eles aparecerao aqui em ordem de data.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {dias.map((dia) => (
              <section key={dia.id}>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#004AF7] shadow-sm">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold capitalize text-[#132190]">
                      {formatarDataCompleta(dia.data)}
                    </h2>
                    <p className="text-sm font-semibold text-slate-500">
                      {dia.profissionais.reduce((total, grupo) => total + grupo.itens.length, 0)} atendimento(s)
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {dia.profissionais.map((grupo) => (
                    <section key={grupo.id}>
                      <div className="mb-3 rounded-2xl bg-gradient-to-r from-[#132190] to-[#004AF7] p-5 text-white shadow-md">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex min-w-0 items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/15">
                              <User size={22} />
                            </div>

                            <div className="min-w-0">
                              <h3 className="truncate text-xl font-bold">{grupo.nome}</h3>
                              <p className="truncate text-sm text-white/80">{grupo.detalhe}</p>
                            </div>
                          </div>

                          <div className="hidden rounded-full bg-white/10 px-4 py-2 text-xs font-bold md:flex">
                            {grupo.itens.length} item(ns)
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {grupo.itens.map((item) => {
                          const tipoInfo = dadosTipo[item.tipo] || dadosTipo.CONSULTA;
                          const IconeTipo = tipoInfo.icon;

                          return (
                            <article
                              key={`${item.tipo}-${item.id}`}
                              className="rounded-2xl border border-[#87B7FE]/20 bg-white p-5 shadow-sm transition-all hover:border-[#004AF7]/30 hover:shadow-md"
                            >
                              <div className="grid gap-4 md:grid-cols-[110px_1fr_auto] md:items-center">
                                <div className="border-b border-slate-100 pb-3 md:border-b-0 md:border-r md:pb-0 md:pr-5">
                                  <h4 className="text-2xl font-extrabold text-[#004AF7]">
                                    {item.hora || "--:--"}
                                  </h4>
                                  <p className="text-xs font-semibold text-slate-400">
                                    {formatarDataCurta(item.data)}
                                  </p>
                                </div>

                                <div>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span
                                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ring-1 ${tipoInfo.badge}`}
                                    >
                                      <IconeTipo className="h-3.5 w-3.5" />
                                      {tipoInfo.label}
                                    </span>
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                                      {item.status}
                                    </span>
                                  </div>

                                  <h4 className="mt-2 text-lg font-extrabold text-[#132190]">
                                    {item.paciente}
                                  </h4>
                                  <p className="mt-1 text-sm font-semibold text-slate-500">
                                    {item.titulo}
                                  </p>
                                  <p className="mt-2 text-sm text-slate-500">
                                    {item.local} - {item.observacao}
                                  </p>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 md:flex-col md:items-end">
                                  <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tipoInfo.iconBox}`}
                                  >
                                    <IconeTipo className="h-6 w-6" />
                                  </div>

                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() => abrirEdicao(item)}
                                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#E4F2FE] text-[#004AF7] transition hover:bg-[#d5eaff]"
                                      aria-label="Editar atendimento"
                                      title="Editar"
                                    >
                                      <Edit3 className="h-4 w-4" />
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => setCancelamento(item)}
                                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-100"
                                      aria-label="Cancelar atendimento"
                                      title="Cancelar"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    </section>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        <footer className="mt-10 rounded-3xl border border-[#87B7FE]/20 bg-white p-6 text-center">
          <p className="text-sm text-slate-500">
            Agenda administrativa carregada em ordem de dia, profissional e horario.
          </p>
        </footer>
      </div>

      {cancelamento && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-[#132190]">
                  Cancelar atendimento
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Confirme se deseja cancelar {cancelamento.titulo.toLowerCase()} de{" "}
                  <strong>{cancelamento.paciente}</strong> em{" "}
                  <strong>{formatarDataCurta(cancelamento.data)}</strong> as{" "}
                  <strong>{cancelamento.hora}</strong>.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCancelamento(null)}
                disabled={salvando}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-60"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={confirmarCancelamento}
                disabled={salvando}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {salvando ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                Confirmar cancelamento
              </button>

              <button
                type="button"
                onClick={() => setCancelamento(null)}
                disabled={salvando}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}

      {edicao && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <form
            onSubmit={salvarEdicao}
            className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-[#132190]">
                  Editar atendimento
                </h2>
                <p className="mt-2 text-sm font-semibold text-slate-500">
                  {edicao.paciente} - {edicao.titulo}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEdicao(null)}
                disabled={salvando}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-60"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-bold text-[#132190]">
                  <Calendar className="h-4 w-4 text-[#004AF7]" />
                  Data
                </span>
                <input
                  type="date"
                  value={edicao.dataEditada}
                  onChange={(event) =>
                    setEdicao((atual) => ({ ...atual, dataEditada: event.target.value }))
                  }
                  disabled={salvando}
                  className="h-12 w-full rounded-xl border border-[#87B7FE]/30 bg-[#F8FBFF] px-4 text-sm text-slate-700 outline-none focus:border-[#004AF7] focus:ring-2 focus:ring-[#004AF7]/10 disabled:opacity-60"
                />
              </label>

              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-bold text-[#132190]">
                  <Clock className="h-4 w-4 text-[#004AF7]" />
                  Horario
                </span>
                <input
                  type="time"
                  value={edicao.horaEditada}
                  onChange={(event) =>
                    setEdicao((atual) => ({ ...atual, horaEditada: event.target.value }))
                  }
                  disabled={salvando}
                  className="h-12 w-full rounded-xl border border-[#87B7FE]/30 bg-[#F8FBFF] px-4 text-sm text-slate-700 outline-none focus:border-[#004AF7] focus:ring-2 focus:ring-[#004AF7]/10 disabled:opacity-60"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="mb-2 block text-sm font-bold text-[#132190]">
                  Status
                </span>
                <select
                  value={edicao.statusEditado}
                  onChange={(event) =>
                    setEdicao((atual) => ({ ...atual, statusEditado: event.target.value }))
                  }
                  disabled={salvando}
                  className="h-12 w-full rounded-xl border border-[#87B7FE]/30 bg-[#F8FBFF] px-4 text-sm text-slate-700 outline-none focus:border-[#004AF7] focus:ring-2 focus:ring-[#004AF7]/10 disabled:opacity-60"
                >
                  {edicao.tipo === "CONSULTA" ? (
                    <>
                      <option value="PENDENTE">Pendente</option>
                      <option value="AGENDADO">Agendado</option>
                      <option value="CONCLUIDO">Concluido</option>
                    </>
                  ) : (
                    <>
                      <option value="PENDENTE">Pendente</option>
                      <option value="CONFIRMADO">Confirmado</option>
                      <option value="REALIZADO">Realizado</option>
                    </>
                  )}
                </select>
              </label>

              {edicao.tipo === "EXAME" && (
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-bold text-[#132190]">
                    Observacoes
                  </span>
                  <textarea
                    rows="4"
                    value={edicao.observacaoEditada}
                    onChange={(event) =>
                      setEdicao((atual) => ({
                        ...atual,
                        observacaoEditada: event.target.value,
                      }))
                    }
                    disabled={salvando}
                    className="w-full rounded-xl border border-[#87B7FE]/30 bg-[#F8FBFF] px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#004AF7] focus:ring-2 focus:ring-[#004AF7]/10 disabled:opacity-60"
                  />
                </label>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={salvando}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#004AF7] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#132190] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {salvando ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Salvar edicao
              </button>

              <button
                type="button"
                onClick={() => setEdicao(null)}
                disabled={salvando}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
