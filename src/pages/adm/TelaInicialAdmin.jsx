import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  CalendarCheck,
  Clock3,
  FileClock,
  LayoutDashboard,
  Loader2,
  RefreshCw,
  Stethoscope,
  UsersRound,
} from "lucide-react";

import api from "../../services/api";

const statusCancelados = ["CANCELADO", "CANCELADA", "CANCELED", "CANCELLED"];

const menuAdmin = [
  { label: "Dashboard", to: "/admin/dashboard" },
  { label: "Pacientes", to: "/admin/cadastrar-paciente" },
  { label: "Médicos", to: "/admin/cadastrar-medico" },
  { label: "Agendamentos", to: "/admin/consultas-dia" },
  { label: "Consultas", to: "/admin/consultas/agendar" },
  { label: "Exames", to: "/admin/exames/agendar" },
  { label: "Cadastro Exames", to: "/admin/exames/cadastrar-categorias-exames" },
  { label: "Especialidades", to: "/admin/cadastrar-especialidade" },
  { label: "Notícias", to: "/admin/noticias" },
  { label: "Eventos", to: "/admin/eventos" },
  { label: "Configurações", to: "/admin/configuracoes" },
];

function extrairLista(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.agendamentos)) return data.agendamentos;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  return [];
}

function normalizarStatus(status) {
  return String(status || "AGENDADO").toUpperCase();
}

function estaCancelado(item) {
  return statusCancelados.includes(normalizarStatus(item?.status));
}

function criarData(data, horario) {
  if (!data) return null;

  if (typeof data === "string" && /^\d{4}-\d{2}-\d{2}$/.test(data)) {
    const [ano, mes, dia] = data.split("-").map(Number);
    const [hora = 0, minuto = 0] = String(horario || "00:00").split(":").map(Number);
    return new Date(ano, mes - 1, dia, hora, minuto, 0, 0);
  }

  const dataObj = new Date(data);

  if (Number.isNaN(dataObj.getTime())) return null;

  if (horario) {
    const [hora = 0, minuto = 0] = String(horario).split(":").map(Number);
    return new Date(
      dataObj.getFullYear(),
      dataObj.getMonth(),
      dataObj.getDate(),
      hora,
      minuto,
      0,
      0
    );
  }

  return dataObj;
}

function dataOrdenacao(data, horario) {
  return criarData(data, horario)?.getTime() ?? Number.MAX_SAFE_INTEGER;
}

function chaveDia(data) {
  const dataObj = criarData(data);
  if (!dataObj) return "";

  const ano = dataObj.getFullYear();
  const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
  const dia = String(dataObj.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

function horario(data, horarioInformado) {
  if (horarioInformado) return horarioInformado;

  const dataObj = criarData(data);
  if (!dataObj) return "--:--";

  return dataObj.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function nomePessoa(pessoa, fallback) {
  if (!pessoa) return fallback;
  if (typeof pessoa === "string") return fallback;

  return (
    pessoa.name ||
    pessoa.nome ||
    pessoa.usuarioNome ||
    pessoa.user?.name ||
    pessoa.user?.nome ||
    fallback
  );
}

function nomeEspecialidade(especialidade) {
  if (typeof especialidade === "string") return especialidade;
  return especialidade?.name || especialidade?.nome || "Especialidade não informada";
}

function medicoAtivo(medico) {
  const status = normalizarStatus(medico?.status || medico?.situacao || "ATIVO");
  return !["INATIVO", "INATIVA", "DESATIVADO", "DESATIVADA"].includes(status);
}

function formatarNumero(valor) {
  return new Intl.NumberFormat("pt-BR").format(valor);
}

function formatarDataHoje(data) {
  return data.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
}

function StatCard({ icone, titulo, valor, detalhe, carregando }) {
  return (
    <article className="rounded-2xl border border-[#87B7FE]/20 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-500">{titulo}</p>
          <p className="mt-3 text-3xl font-extrabold tracking-tight text-[#132190]">
            {carregando ? (
              <Loader2 className="h-8 w-8 animate-spin text-[#004AF7]" />
            ) : (
              formatarNumero(valor)
            )}
          </p>
        </div>

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E4F2FE] text-[#004AF7]">
          {icone}
        </div>
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-500">{detalhe}</p>
    </article>
  );
}

export default function TelaInicialADM() {
  const [consultas, setConsultas] = useState([]);
  const [exames, setExames] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [atualizadoEm, setAtualizadoEm] = useState(null);
  const [hoje] = useState(() => new Date());
  const [agora, setAgora] = useState(() => Date.now());

  const carregarDashboard = useCallback(async () => {
    setCarregando(true);
    setErro("");

    try {
      const [consultasResponse, examesResponse, medicosResponse] = await Promise.allSettled([
        api.get("/consultas"),
        api.get("/agendamentos-exames"),
        api.get("/medicos"),
      ]);

      const novasConsultas =
        consultasResponse.status === "fulfilled" ? extrairLista(consultasResponse.value.data) : [];
      const novosExames =
        examesResponse.status === "fulfilled" ? extrairLista(examesResponse.value.data) : [];
      const novosMedicos =
        medicosResponse.status === "fulfilled" ? extrairLista(medicosResponse.value.data) : [];

      setConsultas(novasConsultas);
      setExames(novosExames);
      setMedicos(novosMedicos);
      setAtualizadoEm(new Date());

      if (
        consultasResponse.status === "rejected" ||
        examesResponse.status === "rejected" ||
        medicosResponse.status === "rejected"
      ) {
        setErro("Alguns indicadores não puderam ser carregados agora.");
      }
    } catch (error) {
      console.error("Erro ao carregar dashboard administrativa:", error);
      setConsultas([]);
      setExames([]);
      setMedicos([]);
      setErro("Não foi possível carregar os indicadores do banco.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      carregarDashboard();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [carregarDashboard]);

  useEffect(() => {
    const intervaloId = setInterval(() => {
      setAgora(Date.now());
    }, 60000);

    return () => clearInterval(intervaloId);
  }, []);

  const indicadores = useMemo(() => {
    const chaveHoje = chaveDia(hoje);
    const consultasValidas = consultas.filter((consulta) => !estaCancelado(consulta));
    const examesValidos = exames.filter((exame) => !estaCancelado(exame));

    const consultasDeHoje = consultasValidas.filter(
      (consulta) => chaveDia(consulta.dataConsulta) === chaveHoje
    );

    const pacientesAtendidos = consultasValidas.filter(
      (consulta) => dataOrdenacao(consulta.dataConsulta) < agora
    ).length;

    const examesPendentes = examesValidos.filter(
      (exame) => dataOrdenacao(exame.data, exame.horario) >= agora
    ).length;

    return {
      consultasDeHoje,
      consultasHoje: consultasDeHoje.length,
      pacientesAtendidos,
      medicosAtivos: medicos.filter(medicoAtivo).length,
      examesPendentes,
    };
  }, [agora, consultas, exames, hoje, medicos]);

  const consultasHojeOrdenadas = useMemo(
    () =>
      [...indicadores.consultasDeHoje].sort(
        (a, b) => dataOrdenacao(a.dataConsulta) - dataOrdenacao(b.dataConsulta)
      ),
    [indicadores.consultasDeHoje]
  );

  const proximaConsulta = useMemo(
    () => consultasHojeOrdenadas.find((consulta) => dataOrdenacao(consulta.dataConsulta) >= agora),
    [agora, consultasHojeOrdenadas]
  );

  const ultimaAtualizacao = atualizadoEm
    ? atualizadoEm.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    : "--:--";

  return (
    <div className="min-h-screen bg-[#E4F2FE] px-4 py-6 font-sans text-slate-900 md:px-8">
      <main className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-2xl border border-[#87B7FE]/20 bg-white p-5 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#004AF7] text-white">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#132190]">Painel ADM</h2>
              <p className="text-xs font-semibold text-slate-500">NAMI Online</p>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {menuAdmin.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-xl px-4 py-3 text-sm font-bold no-underline transition ${
                  item.to === "/admin/dashboard"
                    ? "bg-[#004AF7] text-white shadow-sm"
                    : "text-slate-600 hover:bg-[#E4F2FE] hover:text-[#132190]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <section className="min-w-0">
          <header className="mb-6 flex flex-col gap-4 rounded-2xl border border-[#87B7FE]/20 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
            <div>
              <span className="inline-flex rounded-full border border-[#87B7FE]/30 bg-[#F8FBFF] px-4 py-1 text-sm font-bold text-[#004AF7]">
                {formatarDataHoje(hoje)}
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#132190] md:text-4xl">
                Dashboard Administrativo
              </h1>
              <p className="mt-2 text-sm font-semibold text-slate-500">
                Última atualização: {ultimaAtualizacao}
              </p>
            </div>

            <button
              type="button"
              onClick={carregarDashboard}
              disabled={carregando}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#004AF7] px-5 text-sm font-bold text-white shadow-sm transition hover:bg-[#132190] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <RefreshCw className={`h-5 w-5 ${carregando ? "animate-spin" : ""}`} />
              Atualizar
            </button>
          </header>

          {erro && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              {erro}
            </div>
          )}

          <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icone={<CalendarCheck className="h-6 w-6" />}
              titulo="Consultas de Hoje"
              valor={indicadores.consultasHoje}
              carregando={carregando}
            />
            <StatCard
              icone={<UsersRound className="h-6 w-6" />}
              titulo="Pacientes Atendidos"
              valor={indicadores.pacientesAtendidos}
              carregando={carregando}
            />
            <StatCard
              icone={<Stethoscope className="h-6 w-6" />}
              titulo="Médicos Ativos"
              valor={indicadores.medicosAtivos}
              carregando={carregando}
            />
            <StatCard
              icone={<FileClock className="h-6 w-6" />}
              titulo="Exames Pendentes"
              valor={indicadores.examesPendentes}
              carregando={carregando}
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
            <section className="rounded-2xl border border-[#87B7FE]/20 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#132190]">Consultas de hoje</h2>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    {formatarNumero(consultasHojeOrdenadas.length)} consulta(s)
                  </p>
                </div>
                <Link
                  to="/admin/consultas-dia"
                  className="rounded-xl border border-[#87B7FE]/30 px-4 py-2 text-sm font-bold text-[#004AF7] no-underline transition hover:bg-[#E4F2FE]"
                >
                  Ver agenda
                </Link>
              </div>

              {carregando ? (
                <div className="flex items-center justify-center gap-3 rounded-2xl border border-dashed border-[#87B7FE]/30 p-8 text-sm font-bold text-slate-500">
                  <Loader2 className="h-5 w-5 animate-spin text-[#004AF7]" />
                  Carregando consultas...
                </div>
              ) : consultasHojeOrdenadas.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
                  <CalendarCheck className="mx-auto h-9 w-9 text-slate-300" />
                  <p className="mt-3 text-sm font-bold text-slate-500">
                    Nenhuma consulta marcada para hoje.
                  </p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-slate-100">
                  <table className="w-full min-w-[640px] border-collapse">
                    <thead className="bg-[#F8FBFF]">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-extrabold uppercase text-slate-500">
                          Horário
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-extrabold uppercase text-slate-500">
                          Paciente
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-extrabold uppercase text-slate-500">
                          Médico
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-extrabold uppercase text-slate-500">
                          Especialidade
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {consultasHojeOrdenadas.map((consulta) => (
                        <tr
                          key={consulta._id || consulta.id}
                          className="border-t border-slate-100 transition hover:bg-[#F8FBFF]"
                        >
                          <td className="px-4 py-4 font-mono text-sm font-bold text-[#132190]">
                            {horario(consulta.dataConsulta)}
                          </td>
                          <td className="px-4 py-4 text-sm font-semibold text-slate-700">
                            {nomePessoa(consulta.pacienteId, "Paciente não informado")}
                          </td>
                          <td className="px-4 py-4 text-sm font-semibold text-slate-700">
                            {nomePessoa(consulta.medicoId, "Médico não informado")}
                          </td>
                          <td className="px-4 py-4">
                            <span className="inline-flex rounded-full bg-[#E4F2FE] px-3 py-1 text-xs font-bold text-[#004AF7]">
                              {nomeEspecialidade(consulta.especialidadeId)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <aside className="rounded-2xl border border-[#87B7FE]/20 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-extrabold text-[#132190]">Resumo operacional</h2>

              <div className="mt-5 space-y-4">
                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E4F2FE] text-[#004AF7]">
                      <Clock3 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-500">Próxima consulta</p>
                      <p className="text-lg font-extrabold text-[#132190]">
                        {proximaConsulta ? horario(proximaConsulta.dataConsulta) : "--:--"}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-slate-600">
                    {proximaConsulta
                      ? nomePessoa(proximaConsulta.pacienteId, "Paciente não informado")
                      : "Sem próximas consultas hoje"}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <p className="text-sm font-bold text-slate-500">Consultas já realizadas</p>
                  <p className="mt-2 text-2xl font-extrabold text-[#132190]">
                    {formatarNumero(
                      consultasHojeOrdenadas.filter(
                        (consulta) => dataOrdenacao(consulta.dataConsulta) < agora
                      ).length
                    )}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <p className="text-sm font-bold text-slate-500">Exames na agenda</p>
                  <p className="mt-2 text-2xl font-extrabold text-[#132190]">
                    {formatarNumero(indicadores.examesPendentes)}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
