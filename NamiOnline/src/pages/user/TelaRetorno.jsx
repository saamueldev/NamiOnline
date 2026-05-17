import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import {
  FaCheckCircle,
  FaCalendarAlt,
  FaUserMd,
  FaMapMarkerAlt,
  FaClipboardList,
  FaPhoneAlt,
  FaArrowRight
} from 'react-icons/fa'

export default function TelaRetorno() {

  const [tema, setTema] = useState(
    localStorage.getItem('tema') || 'claro'
  )

  useEffect(() => {

    const temaSalvo =
      localStorage.getItem('tema') || 'claro'

    setTema(temaSalvo)

    if (temaSalvo === 'escuro') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }

  }, [])

  const dark = tema === 'escuro'

  return (

    <div
      className={`min-h-screen overflow-hidden px-6 py-10 transition-all duration-300 ${
        dark
          ? 'bg-[linear-gradient(180deg,#0f172a_0%,#111827_45%,#0d111b_100%)] text-white'
          : 'bg-gradient-to-br from-[#f4f8ff] via-white to-[#dbeafe] text-slate-800'
      }`}
    >

      {/* EFEITOS */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div
          className={`absolute left-[20%] top-[20%] h-72 w-72 rounded-full blur-[90px] ${
            dark
              ? 'bg-blue-500/20'
              : 'bg-blue-300/40'
          }`}
        />

        <div
          className={`absolute right-[10%] top-[10%] h-64 w-64 rounded-full blur-[90px] ${
            dark
              ? 'bg-cyan-400/20'
              : 'bg-cyan-300/40'
          }`}
        />

      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">

        {/* MAIN */}
        <section
          className={`flex flex-col gap-6 rounded-[28px] border p-8 shadow-2xl backdrop-blur-xl transition-all ${
            dark
              ? 'border-slate-400/10 bg-slate-900/90'
              : 'border-blue-100 bg-white/90'
          }`}
        >

          {/* HEADER */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

            <div>

              <span
                className={`inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] ${
                  dark
                    ? 'bg-cyan-400/10 text-cyan-200'
                    : 'bg-blue-100 text-[#132190]'
                }`}
              >
                <FaCheckCircle />
                Retorno de Consulta
              </span>

              <h1
                className={`mt-4 text-3xl font-bold ${
                  dark
                    ? 'text-white'
                    : 'text-[#132190]'
                }`}
              >
                Consulta registrada com sucesso
              </h1>

              <p
                className={`mt-2 text-base ${
                  dark
                    ? 'text-slate-400'
                    : 'text-slate-600'
                }`}
              >
                Seu retorno já está agendado e você pode acompanhar
                todas as informações por aqui.
              </p>

            </div>

            <div className="min-w-[220px] lg:text-right">

              <span
                className={`inline-flex rounded-full px-5 py-3 text-sm font-bold uppercase tracking-wide ${
                  dark
                    ? 'border border-emerald-500/20 bg-emerald-500/15 text-emerald-100'
                    : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                Confirmado
              </span>

              <p
                className={`mt-3 text-sm ${
                  dark
                    ? 'text-slate-400'
                    : 'text-slate-500'
                }`}
              >
                Próximo retorno sugerido em 30 dias.
              </p>

            </div>

          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <article
              className={`rounded-3xl border p-6 transition-all ${
                dark
                  ? 'border-slate-400/10 bg-gradient-to-b from-slate-800 to-slate-900'
                  : 'border-blue-100 bg-blue-50'
              }`}
            >

              <div className="mb-4 flex items-center gap-3">

                <div className="rounded-xl bg-[#004AF7] p-3 text-white">
                  <FaClipboardList />
                </div>

                <h2
                  className={`text-sm uppercase tracking-[0.1em] ${
                    dark
                      ? 'text-slate-400'
                      : 'text-slate-500'
                  }`}
                >
                  Especialidade
                </h2>

              </div>

              <p className="text-2xl font-bold">
                Cardiologia
              </p>

            </article>

            <article
              className={`rounded-3xl border p-6 transition-all ${
                dark
                  ? 'border-slate-400/10 bg-gradient-to-b from-slate-800 to-slate-900'
                  : 'border-blue-100 bg-blue-50'
              }`}
            >

              <div className="mb-4 flex items-center gap-3">

                <div className="rounded-xl bg-[#004AF7] p-3 text-white">
                  <FaUserMd />
                </div>

                <h2
                  className={`text-sm uppercase tracking-[0.1em] ${
                    dark
                      ? 'text-slate-400'
                      : 'text-slate-500'
                  }`}
                >
                  Médico
                </h2>

              </div>

              <p className="text-2xl font-bold">
                Dra. Marina Soares
              </p>

            </article>

            <article
              className={`rounded-3xl border p-6 transition-all ${
                dark
                  ? 'border-slate-400/10 bg-gradient-to-b from-slate-800 to-slate-900'
                  : 'border-blue-100 bg-blue-50'
              }`}
            >

              <div className="mb-4 flex items-center gap-3">

                <div className="rounded-xl bg-[#004AF7] p-3 text-white">
                  <FaCalendarAlt />
                </div>

                <h2
                  className={`text-sm uppercase tracking-[0.1em] ${
                    dark
                      ? 'text-slate-400'
                      : 'text-slate-500'
                  }`}
                >
                  Data
                </h2>

              </div>

              <p className="text-2xl font-bold">
                12 de Maio • 14:30
              </p>

            </article>

            <article
              className={`rounded-3xl border p-6 transition-all ${
                dark
                  ? 'border-slate-400/10 bg-gradient-to-b from-slate-800 to-slate-900'
                  : 'border-blue-100 bg-blue-50'
              }`}
            >

              <div className="mb-4 flex items-center gap-3">

                <div className="rounded-xl bg-[#004AF7] p-3 text-white">
                  <FaMapMarkerAlt />
                </div>

                <h2
                  className={`text-sm uppercase tracking-[0.1em] ${
                    dark
                      ? 'text-slate-400'
                      : 'text-slate-500'
                  }`}
                >
                  Local
                </h2>

              </div>

              <p className="text-2xl font-bold">
                Clínica Nami • Sala 03
              </p>

            </article>

          </div>

          {/* OBS */}
          <div
            className={`rounded-3xl border p-6 ${
              dark
                ? 'border-slate-400/10 bg-slate-800/95'
                : 'border-blue-100 bg-blue-50'
            }`}
          >

            <h2 className="mb-3 text-xl font-bold">
              Observações importantes
            </h2>

            <p
              className={`leading-relaxed ${
                dark
                  ? 'text-slate-300'
                  : 'text-slate-600'
              }`}
            >
              Continue seguindo as orientações médicas e mantenha
              seu histórico atualizado. Caso haja alterações nos sintomas,
              procure atendimento imediatamente.
            </p>

          </div>

          {/* BOTÕES */}
          <div className="flex flex-col gap-4 md:flex-row">

            <Link
              to="/retornos/agendar"
              className="flex min-w-[220px] items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#004AF7] to-[#132190] px-6 py-4 text-base font-bold text-white shadow-xl transition hover:-translate-y-1"
            >
              <FaArrowRight />
              Agendar próximo retorno
            </Link>

            <Link
              to="/home"
              className={`flex min-w-[220px] items-center justify-center rounded-2xl px-6 py-4 text-base font-bold transition hover:-translate-y-1 ${
                dark
                  ? 'border border-slate-400/20 bg-white/5 text-white'
                  : 'border border-blue-100 bg-blue-50 text-[#132190]'
              }`}
            >
              Voltar para início
            </Link>

          </div>

        </section>

        {/* ASIDE */}
        <aside
          className={`flex flex-col gap-5 rounded-[28px] border p-8 shadow-2xl backdrop-blur-xl ${
            dark
              ? 'border-slate-400/10 bg-slate-900/90'
              : 'border-blue-100 bg-white/90'
          }`}
        >

          <div
            className={`w-fit rounded-full px-5 py-3 text-sm font-bold ${
              dark
                ? 'bg-blue-500/15 text-blue-200'
                : 'bg-blue-100 text-[#132190]'
            }`}
          >
            Resumo rápido
          </div>

          <div
            className={`rounded-3xl border p-5 ${
              dark
                ? 'border-slate-400/10 bg-slate-900'
                : 'border-blue-100 bg-blue-50'
            }`}
          >

            <strong className="mb-3 block">
              Próxima ação
            </strong>

            <p
              className={`${
                dark
                  ? 'text-slate-300'
                  : 'text-slate-600'
              }`}
            >
              Agende seu retorno até 10 dias antes da data sugerida
              para garantir o melhor horário.
            </p>

          </div>

          <div
            className={`rounded-3xl border p-5 ${
              dark
                ? 'border-slate-400/10 bg-slate-900'
                : 'border-blue-100 bg-blue-50'
            }`}
          >

            <strong className="mb-3 block">
              Checklist
            </strong>

            <ul className="grid gap-3">

              <li
                className={`relative pl-6 before:absolute before:left-0 before:top-0 before:text-cyan-400 before:content-['•'] ${
                  dark
                    ? 'text-slate-300'
                    : 'text-slate-600'
                }`}
              >
                Verificar exames recentes
              </li>

              <li
                className={`relative pl-6 before:absolute before:left-0 before:top-0 before:text-cyan-400 before:content-['•'] ${
                  dark
                    ? 'text-slate-300'
                    : 'text-slate-600'
                }`}
              >
                Levar lista de medicamentos
              </li>

              <li
                className={`relative pl-6 before:absolute before:left-0 before:top-0 before:text-cyan-400 before:content-['•'] ${
                  dark
                    ? 'text-slate-300'
                    : 'text-slate-600'
                }`}
              >
                Anotar sintomas
              </li>

            </ul>

          </div>

          <div
            className={`rounded-3xl p-5 ${
              dark
                ? 'bg-gradient-to-b from-blue-500/20 to-slate-900'
                : 'bg-gradient-to-b from-blue-100 to-white'
            }`}
          >

            <strong className="mb-3 flex items-center gap-2">
              <FaPhoneAlt />
              Contato
            </strong>

            <p
              className={`${
                dark
                  ? 'text-slate-200'
                  : 'text-slate-700'
              }`}
            >
              Suporte Nami: (11) 4000-1234
            </p>

          </div>

        </aside>

      </div>
    </div>
  )
}