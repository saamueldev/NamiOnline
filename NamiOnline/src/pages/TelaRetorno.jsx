import { Link } from 'react-router-dom'

export default function TelaRetorno() {
  return (
    <div className="min-h-screen overflow-hidden bg-[linear-gradient(180deg,#0f172a_0%,#111827_45%,#0d111b_100%)] px-6 py-10 text-slate-50 relative">

      {/* GLOW EFFECT */}
      <div className="pointer-events-none fixed inset-0 blur-[80px]">
        <div className="absolute left-[20%] top-[20%] h-72 w-72 rounded-full bg-blue-500/20" />
        <div className="absolute right-[10%] top-[10%] h-64 w-64 rounded-full bg-cyan-400/20" />
        <div className="absolute bottom-[5%] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/20" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">

        {/* MAIN CARD */}
        <section className="flex flex-col gap-6 rounded-[28px] border border-slate-400/10 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl">

          {/* HEADER */}
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

            <div>
              <span className="inline-flex items-center rounded-full bg-cyan-400/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-cyan-200">
                Retorno de Consulta
              </span>

              <h1 className="mt-4 text-3xl font-bold">
                Consulta registrada com sucesso
              </h1>

              <p className="mt-2 text-base text-slate-400">
                Seu retorno já está agendado e você pode acompanhar as próximas etapas por aqui.
              </p>
            </div>

            <div className="min-w-[220px] lg:text-right">
              <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/15 px-5 py-3 text-sm font-bold uppercase tracking-wide text-emerald-100">
                Confirmado
              </span>

              <p className="mt-3 text-sm text-slate-400">
                Próximo retorno sugerido em 30 dias.
              </p>
            </div>
          </div>

          {/* GRID INFO */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <article className="rounded-3xl border border-slate-400/10 bg-gradient-to-b from-slate-800 to-slate-900 p-6">
              <h2 className="mb-2 text-sm uppercase tracking-[0.1em] text-slate-400">
                Especialidade
              </h2>
              <p className="text-2xl font-bold">Cardiologia</p>
            </article>

            <article className="rounded-3xl border border-slate-400/10 bg-gradient-to-b from-slate-800 to-slate-900 p-6">
              <h2 className="mb-2 text-sm uppercase tracking-[0.1em] text-slate-400">
                Médico
              </h2>
              <p className="text-2xl font-bold">Dra. Marina Soares</p>
            </article>

            <article className="rounded-3xl border border-slate-400/10 bg-gradient-to-b from-slate-800 to-slate-900 p-6">
              <h2 className="mb-2 text-sm uppercase tracking-[0.1em] text-slate-400">
                Data
              </h2>
              <p className="text-2xl font-bold">12 de Maio • 14:30</p>
            </article>

            <article className="rounded-3xl border border-slate-400/10 bg-gradient-to-b from-slate-800 to-slate-900 p-6">
              <h2 className="mb-2 text-sm uppercase tracking-[0.1em] text-slate-400">
                Local
              </h2>
              <p className="text-2xl font-bold">Clínica Nami • Sala 03</p>
            </article>

          </div>

          {/* TEXT BLOCK */}
          <div className="rounded-3xl border border-slate-400/10 bg-slate-800/95 p-6">
            <h2 className="mb-3 text-xl font-bold">
              Observações importantes
            </h2>

            <p className="leading-relaxed text-slate-300">
              Continue seguindo as orientações médicas e mantenha seu histórico atualizado.
              Se houver qualquer alteração nos sintomas, volte a consultar a equipe imediatamente.
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col gap-4 md:flex-row">

            <Link
              to="/retornos/agendar"
              className="flex min-w-[220px] items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4 text-base font-bold text-white shadow-xl transition hover:-translate-y-1"
            >
              Agendar próximo retorno
            </Link>

            <Link
              to="/home"
              className="flex min-w-[220px] items-center justify-center rounded-2xl border border-slate-400/20 bg-white/5 px-6 py-4 text-base font-bold text-white transition hover:-translate-y-1"
            >
              Voltar para início
            </Link>

          </div>
        </section>

        {/* ASIDE */}
        <aside className="flex flex-col gap-5 rounded-[28px] border border-slate-400/10 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl">

          <div className="w-fit rounded-full bg-blue-500/15 px-5 py-3 text-sm font-bold text-blue-200">
            Resumo rápido
          </div>

          <div className="rounded-3xl border border-slate-400/10 bg-slate-900 p-5">
            <strong className="mb-3 block text-slate-200">
              Próxima ação
            </strong>

            <p className="text-slate-300">
              Agende seu retorno até 10 dias antes da data sugerida para garantir o melhor horário.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-400/10 bg-slate-900 p-5">
            <strong className="mb-3 block text-slate-200">
              Checklist
            </strong>

            <ul className="grid gap-3">
              <li className="relative pl-6 text-slate-300 before:absolute before:left-0 before:top-0 before:text-cyan-400 before:content-['•']">
                Verificar exames recentes
              </li>

              <li className="relative pl-6 text-slate-300 before:absolute before:left-0 before:top-0 before:text-cyan-400 before:content-['•']">
                Levar lista de medicamentos
              </li>

              <li className="relative pl-6 text-slate-300 before:absolute before:left-0 before:top-0 before:text-cyan-400 before:content-['•']">
                Anotar sintomas
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-400/10 bg-gradient-to-b from-blue-500/20 to-slate-900 p-5">
            <strong className="mb-3 block text-slate-100">
              Contato
            </strong>

            <p className="text-slate-200">
              Suporte Nami: (11) 4000-1234
            </p>
          </div>

        </aside>
      </div>
    </div>
  )
}