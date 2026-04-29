import {
  ChevronRight,
  HeartPulse,
  ChevronDown,
  Pencil,
  Trash2,
  ClipboardList,
} from 'lucide-react'

const examesCategoria = [
  {
    nome: 'Eletrocardiograma',
    categoria: 'Cardiológicos',
    descricao:
      'Exame que registra a atividade elétrica do coração e auxilia na avaliação de alterações cardíacas.',
    aberto: true,
  },
  {
    nome: 'Ecocardiograma',
    categoria: 'Cardiológicos',
    descricao:
      'Exame de imagem que utiliza ultrassom para visualizar a estrutura e o funcionamento do coração.',
    aberto: false,
  },
  {
    nome: 'Teste Ergométrico',
    categoria: 'Cardiológicos',
    descricao:
      'Exame realizado durante esforço físico para avaliar a resposta cardiovascular do paciente.',
    aberto: false,
  },
  {
    nome: 'Holter 24h',
    categoria: 'Cardiológicos',
    descricao:
      'Monitoramento contínuo da atividade elétrica cardíaca por 24 horas.',
    aberto: false,
  },
]

export default function AdminEditarExames() {
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
            <span>Tipos de exame</span>
            <ChevronRight className="h-4 w-4" />
            <span className="font-semibold text-white">Cardiológicos</span>
          </div>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-medium text-white/90">
                Exames por categoria
              </span>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
                Exames vinculados à categoria
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-white/85 md:text-lg">
                Visualize todos os exames cadastrados nesta categoria e acesse
                rapidamente os detalhes de cada item.
              </p>
            </div>

            <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
              <div className="rounded-2xl bg-white p-5 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E4F2FE]">
                    <HeartPulse className="h-7 w-7 text-[#004AF7]" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Categoria selecionada
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-[#132190]">
                      Cardiológicos
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Exames voltados à avaliação da saúde cardíaca e acompanhamento clínico.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <section className="rounded-3xl border border-[#87B7FE]/25 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E4F2FE]">
              <ClipboardList className="h-6 w-6 text-[#004AF7]" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#132190]">
                Exames cadastrados
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Clique em um exame para visualizar seus detalhes, editar ou excluir.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {examesCategoria.map((exame) => (
              <article
                key={exame.nome}
                className="overflow-hidden rounded-3xl border border-[#87B7FE]/20 bg-[#F8FBFF] transition hover:border-[#004AF7]/25 hover:shadow-sm"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                >
                  <div>
                    <span className="inline-flex rounded-full bg-[#E4F2FE] px-3 py-1 text-xs font-semibold text-[#004AF7]">
                      {exame.categoria}
                    </span>

                    <h3 className="mt-3 text-xl font-bold text-[#132190]">
                      {exame.nome}
                    </h3>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <ChevronDown
                      className={`h-5 w-5 text-[#004AF7] transition ${
                        exame.aberto ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {exame.aberto && (
                  <div className="border-t border-[#87B7FE]/20 bg-white px-5 py-5">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="rounded-2xl bg-[#F8FBFF] p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Nome do exame
                        </p>
                        <p className="mt-1 text-base font-semibold text-[#132190]">
                          {exame.nome}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-[#F8FBFF] p-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Categoria
                        </p>
                        <p className="mt-1 text-base font-semibold text-[#132190]">
                          {exame.categoria}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl bg-[#F8FBFF] p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Descrição
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {exame.descricao}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#004AF7] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#132190]"
                      >
                        <Pencil className="h-4 w-4" />
                        Editar exame
                      </button>

                      <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-500 transition hover:border-red-300 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Excluir exame
                      </button>
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}