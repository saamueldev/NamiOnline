import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaFileMedical,
  FaHistory,
  FaNotesMedical,
} from "react-icons/fa";
import { useConteudo } from "../../context/ConteudoContext";

function formatarData(data) {
  if (!data) return "-";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${data}T00:00:00`));
}

export default function TelaInicial() {
  const { noticias, eventos, loadingConteudo, conteudoError } = useConteudo();
  const [index, setIndex] = useState(0);

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

  const noticiaEmDestaque = noticiasOrdenadas[index];

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
              <span>Proxima consulta</span>
            </h3>
            <p>
              <strong>Clinico Geral</strong>
            </p>
            <p>Dr. Joao Silva</p>
            <p>15 Maio - 09:30</p>
            <Link className="mt-[8px] inline-flex rounded-md bg-[#004AF7] px-[20px] py-1 text-white" to="/ver-detalhes">
              Ver detalhes
            </Link>
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
