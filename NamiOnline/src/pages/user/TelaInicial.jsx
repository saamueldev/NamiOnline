import { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaFileMedical,
  FaHistory,
  FaNotesMedical,
} from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { useConteudo } from "../../context/ConteudoContext";
import api from "../../services/api";

function formatarData(data) {
  if (!data) return "-";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${data}T00:00:00`));
}

function formatarDataHora(data) {
  if (!data) return "-";

  const dataObj = new Date(data);
  if (Number.isNaN(dataObj.getTime())) return "-";

  return dataObj.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatarHora(data) {
  if (!data) return "-";

  const dataObj = new Date(data);
  if (Number.isNaN(dataObj.getTime())) return "-";

  return dataObj.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function criarDataExame(data, horario) {
  if (!data) return null;
  const base = typeof data === "string" && /^\d{4}-\d{2}-\d{2}$/.test(data)
    ? `${data}T${horario || "00:00"}:00`
    : data;
  const dataObj = new Date(base);
  return Number.isNaN(dataObj.getTime()) ? null : dataObj;
}

function normalizarId(valor) {
  if (!valor) return "";
  if (typeof valor === "string") return valor;
  return valor._id || valor.id || "";
}

function consultaPertenceAoUsuario(consulta, usuarioId) {
  return normalizarId(consulta?.pacienteId?.user) === usuarioId;
}

function nomePessoa(pessoa) {
  return pessoa?.name || pessoa?.nome || "Nao informado";
}

function nomeEspecialidade(especialidade) {
  return especialidade?.name || especialidade?.nome || "Nao informado";
}

function nomeExame(exame) {
  return exame?.tipoExameId?.nome || "Exame agendado";
}

function categoriaExame(exame) {
  return exame?.tipoExameId?.categoriaExameId?.nome || "Exames";
}

function texto(valor) {
  return valor || "Nao informado";
}

export default function TelaInicial() {
  const { noticias, eventos, loadingConteudo, conteudoError } = useConteudo();
  const { user } = useContext(AuthContext);
  const [index, setIndex] = useState(0);
  const [consultasUsuario, setConsultasUsuario] = useState([]);
  const [loadingConsulta, setLoadingConsulta] = useState(true);
  const [erroConsulta, setErroConsulta] = useState("");
  const [mostrarDetalhesConsulta, setMostrarDetalhesConsulta] = useState(false);

  const noticiasOrdenadas = useMemo(() => {
    return [...noticias].sort(
      (primeira, segunda) => new Date(segunda.date) - new Date(primeira.date)
    );
  }, [noticias]);

  const eventosOrdenados = useMemo(() => {
    return [...eventos].sort(
      (primeiro, segundo) => new Date(primeiro.date) - new Date(segundo.date)
    );
  }, [eventos]);

  useEffect(() => {
    setIndex(0);
  }, [noticiasOrdenadas.length]);

  useEffect(() => {
    if (noticiasOrdenadas.length <= 1) return undefined;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % noticiasOrdenadas.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [noticiasOrdenadas.length]);

  useEffect(() => {
    async function carregarDadosDoUsuario() {
      if (!user?.id) {
        setLoadingConsulta(false);
        setErroConsulta("Nao foi possivel identificar o usuario logado.");
        return;
      }

      try {
        setLoadingConsulta(true);
        setErroConsulta("");

        const [consultasResponse, examesResponse] = await Promise.allSettled([
          api.get("/consultas"),
          api.get("/agendamentos-exames/meus"),
        ]);

        const consultas =
          consultasResponse.status === "fulfilled" && Array.isArray(consultasResponse.value.data)
            ? consultasResponse.value.data
                .filter((consulta) => consultaPertenceAoUsuario(consulta, user.id))
                .filter((consulta) => !["CANCELADO", "CONCLUIDO"].includes(String(consulta.status || "").toUpperCase()))
                .map((consulta) => ({
                  ...consulta,
                  tipoAgendamento: "CONSULTA",
                  dataAgendamento: new Date(consulta.dataConsulta),
                }))
            : [];

        const exames =
          examesResponse.status === "fulfilled" && Array.isArray(examesResponse.value.data)
            ? examesResponse.value.data
                .filter((exame) => !["CANCELADO", "REALIZADO", "CONCLUIDO"].includes(String(exame.status || "").toUpperCase()))
                .map((exame) => ({
                  ...exame,
                  tipoAgendamento: "EXAME",
                  dataAgendamento: criarDataExame(exame.data, exame.horario),
                }))
            : [];

        setConsultasUsuario(
          [...consultas, ...exames]
            .filter((item) => item.dataAgendamento)
            .sort((a, b) => a.dataAgendamento - b.dataAgendamento)
        );
      } catch (error) {
        console.error("Erro ao carregar dados do usuario:", error);
        setErroConsulta("Nao foi possivel carregar seu proximo atendimento.");
      } finally {
        setLoadingConsulta(false);
      }
    }

    carregarDadosDoUsuario();
  }, [user?.id]);

  const noticiaEmDestaque = noticiasOrdenadas[index];
  const proximaConsulta = consultasUsuario.find(
    (consulta) => consulta.dataAgendamento.getTime() >= Date.now()
  ) || consultasUsuario[0];

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <main className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 md:px-10 lg:px-12">
        <section className="grid items-start gap-7 lg:grid-cols-[minmax(0,1.55fr)_minmax(340px,0.85fr)] xl:gap-10">
          <article className="overflow-hidden rounded-[22px] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.10)] ring-1 ring-slate-200/80">
            <div className="relative aspect-[16/10] min-h-[300px] w-full sm:min-h-[420px] lg:min-h-[500px]">
              {noticiaEmDestaque ? (
                <>
                  {noticiaEmDestaque.imageUrl ? (
                    <img
                      className="h-full w-full object-cover"
                      src={noticiaEmDestaque.imageUrl}
                      alt={noticiaEmDestaque.title}
                    />
                  ) : (
                    <ImagePlaceholder className="h-full w-full" />
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-[#004AF7] px-6 py-5 sm:px-7 sm:py-6">
                    <time
                      className="mb-2 block text-sm font-bold uppercase text-blue-100"
                      dateTime={noticiaEmDestaque.date}
                    >
                      {formatarData(noticiaEmDestaque.date)}
                    </time>
                    <h1 className="max-w-[900px] text-xl font-extrabold leading-snug text-white sm:text-2xl lg:text-[26px]">
                      {noticiaEmDestaque.title}
                    </h1>
                  </div>
                </>
              ) : (
                <div className="flex h-full items-center justify-center bg-white px-6 text-center text-slate-500">
                  {loadingConteudo ? "Carregando noticias..." : "Nenhuma noticia publicada no momento."}
                </div>
              )}
            </div>
          </article>

          <aside className="lg:max-h-[596px] lg:overflow-y-auto lg:pr-2">
            <h2 className="mb-8 border-l-4 border-[#004AF7] pl-4 text-[22px] font-extrabold text-[#004AF7]">
              Explorar noticias
            </h2>

            {conteudoError && (
              <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {conteudoError}
              </p>
            )}

            <div className="space-y-7">
              {noticiasOrdenadas.map((noticia, noticiaIndex) => (
                <article
                  key={noticia.id}
                  className={`grid grid-cols-[120px_minmax(0,1fr)] gap-4 ${noticiaIndex === index ? "opacity-100" : "opacity-90"}`}
                >
                  {noticia.imageUrl ? (
                    <img
                      className="h-20 w-full rounded-md object-cover shadow-sm"
                      src={noticia.imageUrl}
                      alt={noticia.title}
                    />
                  ) : (
                    <ImagePlaceholder className="h-20 w-full rounded-md shadow-sm" compact />
                  )}

                  <div className="min-w-0">
                    <time
                      className="mb-2 block text-base font-extrabold uppercase tracking-wide text-[#5d7593]"
                      dateTime={noticia.date}
                    >
                      {formatarData(noticia.date)}
                    </time>
                    <h3 className="line-clamp-2 text-sm font-extrabold leading-snug text-slate-950">
                      {noticia.title}
                    </h3>
                    <p className="mt-1 line-clamp-3 text-sm font-semibold leading-snug text-slate-800">
                      {noticia.summary}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </section>

        <section className="mb-10 mt-10">
          <h3 className="mb-5 flex items-center gap-[10px] text-[22px] font-semibold text-[#132190]">
            <span>Acesso rapido</span>
          </h3>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <QuickLink to="/especialidades" icon={<FaCalendarCheck />} label="Agendar Consulta" />
            <QuickLink to="/exames" icon={<FaFileMedical />} label="Meus Exames" />
            <QuickLink to="/meus-agendamentos" icon={<FaHistory />} label="Agendamentos" />
            <QuickLink to="/retornos" icon={<FaNotesMedical />} label="Retornos" />
          </div>
        </section>

        <section className="grid gap-[25px] lg:grid-cols-2">
          <div className="rounded-xl bg-white p-[25px] shadow-[0_8px_20px_rgba(0,0,0,0.1)]">
            <h3 className="mb-[15px] flex items-center gap-[10px] text-[22px] font-semibold text-[#132190]">
              <span>Proximo atendimento</span>
            </h3>
            {loadingConsulta ? (
              <p className="text-sm font-semibold text-slate-600">Carregando atendimento...</p>
            ) : proximaConsulta ? (
              <>
                <p>
                  <strong>
                    {proximaConsulta.tipoAgendamento === "EXAME"
                      ? nomeExame(proximaConsulta)
                      : nomeEspecialidade(proximaConsulta.especialidadeId)}
                  </strong>
                </p>
                <p>
                  {proximaConsulta.tipoAgendamento === "EXAME"
                    ? "Equipe NAMI"
                    : nomePessoa(proximaConsulta.medicoId)}
                </p>
                <p>
                  {formatarDataHora(proximaConsulta.dataAgendamento)}
                </p>
                <button
                  type="button"
                  className="mt-[8px] inline-flex rounded-md bg-[#004AF7] px-[20px] py-1 text-white"
                  onClick={() => setMostrarDetalhesConsulta(true)}
                >
                  Ver detalhes
                </button>
              </>
            ) : (
              <p className="text-sm font-semibold text-slate-600">
                {erroConsulta || "Nenhum atendimento agendado no momento."}
              </p>
            )}
          </div>

          <div className="rounded-xl bg-white p-[25px] shadow-[0_8px_20px_rgba(0,0,0,0.1)]">
            <h3 className="mb-[15px] flex items-center gap-[10px] text-[22px] font-semibold text-[#132190]">
              <span>Eventos do Hospital</span>
            </h3>

            {eventosOrdenados.length > 0 ? (
              <ul className="space-y-3">
                {eventosOrdenados.slice(0, 4).map((evento) => (
                  <li key={evento.id} className="rounded-lg border border-slate-100 p-3">
                    {evento.imageUrl && (
                      <img
                        className="mb-3 h-28 w-full rounded-md object-cover"
                        src={evento.imageUrl}
                        alt={evento.title}
                      />
                    )}
                    <strong className="block text-slate-900">{evento.title}</strong>
                    <span className="text-sm text-slate-600">
                      {formatarData(evento.date)} as {evento.time} - {evento.location}
                    </span>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-700">
                      {evento.description}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm font-semibold text-slate-600">
                {loadingConteudo ? "Carregando eventos..." : "Nenhum evento cadastrado no momento."}
              </p>
            )}
          </div>
        </section>
      </main>

      {mostrarDetalhesConsulta && proximaConsulta && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-[#132190]">
                  Detalhes da consulta
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Todas as informacoes disponiveis para o usuario logado.
                </p>
              </div>
              <button
                type="button"
                className="rounded-md bg-slate-100 px-3 py-1 text-sm font-bold text-slate-700"
                onClick={() => setMostrarDetalhesConsulta(false)}
              >
                Fechar
              </button>
            </div>

            <div className="mt-5">
              <DetalheGrupo
                titulo="Consulta"
                itens={[
                  [
                    "Especialidade",
                    proximaConsulta.tipoAgendamento === "EXAME"
                      ? categoriaExame(proximaConsulta)
                      : nomeEspecialidade(proximaConsulta.especialidadeId),
                  ],
                  [
                    "Medico",
                    proximaConsulta.tipoAgendamento === "EXAME"
                      ? "Equipe NAMI"
                      : nomePessoa(proximaConsulta.medicoId),
                  ],
                  ["CRM", proximaConsulta.tipoAgendamento === "EXAME" ? "Nao informado" : texto(proximaConsulta.medicoId?.crm)],
                  ["Data e horario", formatarDataHora(proximaConsulta.dataAgendamento)],
                  ["Horario", proximaConsulta.tipoAgendamento === "EXAME" ? texto(proximaConsulta.horario) : formatarHora(proximaConsulta.dataAgendamento)],
                  ["Tipo", texto(proximaConsulta.tipo || proximaConsulta.tipoAgendamento)],
                  ["Status", texto(proximaConsulta.status)],
                ]}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function QuickLink({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center gap-[10px] rounded-xl bg-white p-[30px] text-[22px] text-[#004AF7] no-underline shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition duration-200 hover:-translate-y-1"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

function ImagePlaceholder({ className = "", compact = false }) {
  return (
    <div className={`flex items-center justify-center bg-slate-100 text-slate-400 ${className}`}>
      <span className={compact ? "text-xs font-semibold" : "text-sm font-semibold"}>
        Sem imagem
      </span>
    </div>
  );
}

function DetalheGrupo({ titulo, itens }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-[#F8FBFF] p-4">
      <h3 className="mb-3 text-lg font-bold text-[#132190]">{titulo}</h3>
      <dl className="space-y-3">
        {itens.map(([label, valor]) => (
          <div key={label}>
            <dt className="text-xs font-bold uppercase text-slate-500">{label}</dt>
            <dd className="mt-1 break-words text-sm font-semibold text-slate-800">
              {valor}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
