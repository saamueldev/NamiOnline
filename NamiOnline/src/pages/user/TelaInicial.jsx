import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaFileMedical,
  FaHistory,
  FaNotesMedical,
} from "react-icons/fa";
import noticia1 from "../../assets/nami-clinica.jpg";
import noticia2 from "../../assets/nami-predio.jpg";
import noticia3 from "../../assets/vacinacao-nami.jpg";

const noticiasCadastradas = [
  {
    id: 1,
    titulo: "Exames NAMI Unifor",
    data: "2026-05-15",
    resumo:
      "NAMI amplia a agenda de exames e reforça o atendimento integrado para pacientes acompanhados pela clínica.",
    imagem: noticia1,
  },
  {
    id: 2,
    titulo: "Hospital amplia horário de consultas",
    data: "2026-05-14",
    resumo:
      "Nova organização de horários facilita o acesso dos pacientes e melhora o fluxo de atendimento nas especialidades.",
    imagem: noticia2,
  },
  {
    id: 3,
    titulo: "Campanha de vacinação",
    data: "2026-05-05",
    resumo:
      "A campanha incentiva a atualização vacinal de pacientes, familiares e profissionais atendidos pelo serviço.",
    imagem: noticia3,
  },
  {
    id: 4,
    titulo: "NAMI fortalece acolhimento aos pacientes",
    data: "2026-04-28",
    resumo:
      "Equipe multiprofissional aprimora rotinas de recepção, orientação e acompanhamento durante a jornada de cuidado.",
    imagem: noticia1,
  },
];

function formatarData(data) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${data}T00:00:00`));
}

export default function TelaInicial() {
  const [index, setIndex] = useState(0);

  const noticiasOrdenadas = useMemo(() => {
    return [...noticiasCadastradas].sort(
      (primeira, segunda) => new Date(segunda.data) - new Date(primeira.data)
    );
  }, []);

  useEffect(() => {
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
              <img
                className="h-full w-full object-cover"
                src={noticiaEmDestaque.imagem}
                alt={noticiaEmDestaque.titulo}
              />

              <div className="absolute inset-x-0 bottom-0 bg-[#004AF7] px-6 py-5 sm:px-7 sm:py-6">
                <h1 className="max-w-[900px] text-xl font-extrabold leading-snug text-white sm:text-2xl lg:text-[26px]">
                  {noticiaEmDestaque.titulo}
                </h1>
              </div>
            </div>
          </article>

          <aside className="lg:max-h-[596px] lg:overflow-y-auto lg:pr-2">
            <h2 className="mb-8 border-l-4 border-[#004AF7] pl-4 text-[22px] font-extrabold text-[#004AF7]">
              Explorar notícias
            </h2>

            <div className="space-y-7">
              {noticiasOrdenadas.map((noticia, noticiaIndex) => (
                <article
                  key={noticia.id}
                  className={`grid grid-cols-[120px_minmax(0,1fr)] gap-4 ${noticiaIndex === index ? "opacity-100" : "opacity-90"
                    }`}
                >
                  <img
                    className="h-20 w-full rounded-md object-cover shadow-sm"
                    src={noticia.imagem}
                    alt={noticia.titulo}
                  />

                  <div className="min-w-0">
                    <time
                      className="mb-2 block text-base font-extrabold uppercase tracking-wide text-[#5d7593]"
                      dateTime={noticia.data}
                    >
                      {formatarData(noticia.data)}
                    </time>
                    <h3 className="line-clamp-2 text-sm font-extrabold leading-snug text-slate-950">
                      {noticia.titulo}
                    </h3>
                    <p className="mt-1 line-clamp-3 text-sm font-semibold leading-snug text-slate-800">
                      {noticia.resumo}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </section>

        <section className="mb-10 mt-10">
          <h3 className="text-[22px] font-semibold text-[#132190] mb-5 flex items-center gap-[10px] relative">
            <span>Acesso rápido</span>
          </h3>

          <div className="grid grid-cols-4 gap-5 mt-5">
            <Link
              to="/especialidades"
              className="bg-white rounded-xl p-[30px] flex flex-col items-center gap-[10px] text-[22px] text-[#004AF7] no-underline shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition duration-200 hover:-translate-y-1"
            >
              <FaCalendarCheck />
              <span>Agendar Consulta</span>
            </Link>

            <Link
              to="/exames"
              className="bg-white rounded-xl p-[30px] flex flex-col items-center gap-[10px] text-[22px] text-[#004AF7] no-underline shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition duration-200 hover:-translate-y-1"
            >
              <FaFileMedical />
              <span>Meus Exames</span>
            </Link>

            <Link
              to="/meus-agendamentos"
              className="bg-white rounded-xl p-[30px] flex flex-col items-center gap-[10px] text-[22px] text-[#004AF7] no-underline shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition duration-200 hover:-translate-y-1"
            >
              <FaHistory />
              <span>Agendamentos</span>
            </Link>

            <Link
              to="/retornos"
              className="bg-white rounded-xl p-[30px] flex flex-col items-center gap-[10px] text-[22px] text-[#004AF7] no-underline shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition duration-200 hover:-translate-y-1"
            >
              <FaNotesMedical />
              <span>Retornos</span>
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-[25px]">
          <div className="bg-white p-[25px] rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.1)]">
            <h3 className="text-[22px] font-semibold text-[#132190] mb-[15px] flex items-center gap-[10px] relative">
              <span>Próxima consulta</span>
            </h3>

            <p>
              <strong>Clínico Geral</strong>
            </p>
            <p>Dr. João Silva</p>
            <p>15 Maio - 09:30</p>

            <Link className="mt-[8px] bg-[#004AF7] text-white border-none px-[20px] py-1 rounded-md cursor-pointer" to="/ver-detalhes">Ver detalhes</Link>
          </div>

          <div className="bg-white p-[25px] rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.1)]">
            <h3 className="text-[22px] font-semibold text-[#132190] mb-[15px] flex items-center gap-[10px] relative">
              <span>Eventos do Hospital</span>
            </h3>

            <ul>
              <li>Campanha de vacinação disponível</li>
              <li>Nova ala pediátrica inaugurada</li>
              <li>Horário ampliado até 20h</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

