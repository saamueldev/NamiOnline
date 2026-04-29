import {
  ChevronRight,
  FileText,
  CheckCircle2,
  XCircle,
  Eye,
  Clock3,
  UserRound,
  IdCard,
  HeartPulse,
  ClipboardCheck,
} from 'lucide-react'

const guiasPendentes = [
  {
    paciente: 'Hugo Souza',
    cpf: '123.456.789-00',
    exame: 'Exame Cardiológico',
    categoria: 'Cardiológicos',
    enviadoEm: '14/04/2026 às 08:15',
    descricao:
      'Guia anexada pelo paciente para análise e validação antes da continuidade do agendamento.',
  },
  {
    paciente: 'Samuel Rocha',
    cpf: '987.654.321-00',
    exame: 'Ressonância Magnética',
    categoria: 'Imagem',
    enviadoEm: '14/04/2026 às 10:40',
    descricao:
      'Documento enviado para validação administrativa e conferência dos dados do exame solicitado.',
  },
  {
    paciente: 'Dylan Medeiros',
    cpf: '456.321.789-10',
    exame: 'Hemograma Completo',
    categoria: 'Laboratoriais',
    enviadoEm: '14/04/2026 às 13:05',
    descricao:
      'Guia médica pendente de revisão para autorização e prosseguimento no fluxo do sistema.',
  },
]

export default function AprovarGuias() {
  return (
    <div className="min-h-screen bg-[#E4F2FE]">
      <section className="relative overflow-hidden bg-gradient-to-r from-[#132190] to-[#004AF7]">
        <div className="absolute inset-0 bg-white/5" />

        <div className="relative mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-14">
          <div className="flex flex-wrap items-center gap-2 text-sm text-white/80">
            <span>Início</span>
            <ChevronRight className="h-4 w-4" />
            <span>Administrativo</span>
            <ChevronRight className="h-4 w-4" />
            <span className="font-semibold text-white">Guias pendentes</span>
          </div>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-medium text-white/90">
                Validação Administrativa
              </span>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
                Guias pendentes de aprovação
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-white/85 md:text-lg">
                Analise as guias enviadas pelos pacientes, visualize os documentos
                anexados e decida se a solicitação será aprovada ou reprovada.
              </p>
            </div>

            <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
              <div className="rounded-2xl bg-white p-5 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E4F2FE]">
                    <ClipboardCheck className="h-7 w-7 text-[#004AF7]" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Painel de conferência
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-[#132190]">
                      Aprovação de guias
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      As solicitações mais antigas aparecem primeiro para manter a ordem
                      de recebimento.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <section className="mb-8 rounded-3xl border border-[#87B7FE]/25 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#132190]">
                Solicitações pendentes
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Ordenadas por ordem de recebimento. As guias enviadas primeiro aparecem
                no topo da lista.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-2xl bg-[#E4F2FE] px-4 py-3 text-sm font-semibold text-[#004AF7]">
              <Clock3 className="h-4 w-4" />
              Ordem cronológica de recebimento
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-[#87B7FE]/25 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#132190]">
              Filtros de busca
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Pesquise as guias pendentes por data de envio, nome do paciente, CPF,
              categoria ou tipo de exame.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#132190]">
                Data de envio
              </label>
              <input
                type="date"
                className="w-full rounded-2xl border border-[#87B7FE]/30 bg-[#F8FBFF] px-4 py-4 text-sm text-slate-700 outline-none transition focus:border-[#004AF7] focus:ring-4 focus:ring-[#004AF7]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#132190]">
                Nome do paciente
              </label>
              <input
                type="text"
                placeholder="Digite o nome"
                className="w-full rounded-2xl border border-[#87B7FE]/30 bg-[#F8FBFF] px-4 py-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#004AF7] focus:ring-4 focus:ring-[#004AF7]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#132190]">
                CPF
              </label>
              <input
                type="text"
                placeholder="Digite o CPF"
                className="w-full rounded-2xl border border-[#87B7FE]/30 bg-[#F8FBFF] px-4 py-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#004AF7] focus:ring-4 focus:ring-[#004AF7]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#132190]">
                Categoria
              </label>
              <select className="w-full rounded-2xl border border-[#87B7FE]/30 bg-[#F8FBFF] px-4 py-4 text-sm text-slate-700 outline-none transition focus:border-[#004AF7] focus:ring-4 focus:ring-[#004AF7]/10">
                <option>Selecione a categoria</option>
                <option>Cardiológicos</option>
                <option>Radiológicos</option>
                <option>Laboratoriais</option>
                <option>Neurológicos</option>
                <option>Imagem</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#132190]">
                Tipo de exame
              </label>
              <input
                type="text"
                placeholder="Digite o tipo de exame"
                className="w-full rounded-2xl border border-[#87B7FE]/30 bg-[#F8FBFF] px-4 py-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#004AF7] focus:ring-4 focus:ring-[#004AF7]/10"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="rounded-2xl bg-[#004AF7] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#132190]"
            >
              Aplicar filtros
            </button>

            <button
              type="button"
              className="rounded-2xl border border-[#004AF7]/20 bg-white px-6 py-4 text-sm font-semibold text-[#004AF7] transition hover:border-[#004AF7] hover:bg-[#E4F2FE]"
            >
              Limpar filtros
            </button>
          </div>
        </section>

        <section className="space-y-6">
          {guiasPendentes.map((guia) => (
            <article
              key={`${guia.paciente}-${guia.enviadoEm}`}
              className="rounded-3xl border border-[#87B7FE]/25 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                        Pendente de aprovação
                      </span>

                      <h3 className="mt-3 text-2xl font-bold text-[#132190]">
                        {guia.exame}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {guia.descricao}
                      </p>
                    </div>

                    <span className="inline-flex rounded-full bg-[#E4F2FE] px-3 py-1 text-xs font-semibold text-[#004AF7]">
                      {guia.categoria}
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-2xl bg-[#F8FBFF] p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E4F2FE]">
                          <UserRound className="h-5 w-5 text-[#004AF7]" />
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Paciente
                          </p>
                          <p className="mt-1 text-sm font-semibold text-[#132190]">
                            {guia.paciente}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-[#F8FBFF] p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E4F2FE]">
                          <IdCard className="h-5 w-5 text-[#004AF7]" />
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            CPF
                          </p>
                          <p className="mt-1 text-sm font-semibold text-[#132190]">
                            {guia.cpf}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-[#F8FBFF] p-4 md:col-span-2">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E4F2FE]">
                          <Clock3 className="h-5 w-5 text-[#004AF7]" />
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Recebido em
                          </p>
                          <p className="mt-1 text-sm font-semibold text-[#132190]">
                            {guia.enviadoEm}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-2xl border border-[#004AF7]/20 bg-white px-5 py-3 text-sm font-semibold text-[#004AF7] transition hover:border-[#004AF7] hover:bg-[#E4F2FE]"
                    >
                      <Eye className="h-4 w-4" />
                      Visualizar guia
                    </button>
                  </div>
                </div>

                <div className="rounded-3xl border border-[#87B7FE]/20 bg-[#F8FBFF] p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white">
                      <FileText className="h-5 w-5 text-[#004AF7]" />
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-[#132190]">
                        Decisão da análise
                      </h4>
                      <p className="text-sm text-slate-500">
                        Defina se a guia será aprovada ou reprovada
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-4">
                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#004AF7] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#132190]"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Aprovar guia
                    </button>

                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-white px-5 py-4 text-sm font-semibold text-red-500 transition hover:border-red-300 hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4" />
                      Reprovar guia
                    </button>
                  </div>

                  <div className="mt-6">
                    <label className="mb-2 block text-sm font-semibold text-[#132190]">
                      Motivo da reprovação
                    </label>

                    <textarea
                      rows="5"
                      placeholder="Descreva para o paciente o motivo da reprovação da guia."
                      className="w-full rounded-2xl border border-[#87B7FE]/30 bg-white px-4 py-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#004AF7] focus:ring-4 focus:ring-[#004AF7]/10"
                    />

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      Esse texto será utilizado para informar ao paciente por que a guia
                      não foi aprovada.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}