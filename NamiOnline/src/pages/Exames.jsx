import { Search, FlaskConical, HeartPulse, Brain, Bone, ScanLine } from 'lucide-react'

const categorias = [
  { nome: 'Laboratoriais', icone: FlaskConical },
  { nome: 'Cardiológicos', icone: HeartPulse },
  { nome: 'Neurológicos', icone: Brain },
  { nome: 'Ortopédicos', icone: Bone },
  { nome: 'Imagem', icone: ScanLine },
]

const exames = [
  {
    nome: 'Hemograma Completo',
    categoria: 'Laboratoriais',
    descricao: 'Avaliação geral das células do sangue para apoio ao diagnóstico clínico.',
  },
  {
    nome: 'Eletrocardiograma',
    categoria: 'Cardiológicos',
    descricao: 'Exame que registra a atividade elétrica do coração.',
  },
  {
    nome: 'Ressonância Magnética',
    categoria: 'Imagem',
    descricao: 'Exame de imagem detalhado para análise de estruturas internas.',
  },
  {
    nome: 'Raio-X',
    categoria: 'Imagem',
    descricao: 'Exame de imagem usado para visualizar ossos e algumas estruturas internas.',
  },
  {
    nome: 'Eletroencefalograma',
    categoria: 'Neurológicos',
    descricao: 'Avaliação da atividade elétrica cerebral.',
  },
  {
    nome: 'Densitometria Óssea',
    categoria: 'Ortopédicos',
    descricao: 'Exame para análise da densidade mineral dos ossos.',
  },
]

export default function Exames() {
  return (
    <div className="min-h-screen bg-[#E4F2FE]">
      <section className="relative overflow-hidden bg-gradient-to-r from-[#132190] to-[#004AF7]">
        <div className="absolute inset-0 bg-white/5" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 md:px-10 lg:flex-row lg:items-center lg:justify-between lg:py-16">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-medium text-white/90">
              Área de Exames
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Encontre e selecione seu exame
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-white/85 md:text-lg">
              Consulte os exames disponíveis, explore as categorias e escolha o procedimento
              que deseja agendar no NamiOnline.
            </p>
          </div>

          <div className="w-full max-w-xl rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
            <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-lg">
              <Search className="h-5 w-5 text-[#87B7FE]" />
              <input
                type="text"
                placeholder="Buscar exame pelo nome"
                className="w-full bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                className="rounded-xl bg-[#004AF7] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#132190]"
              >
                Buscar
              </button>
            </div>

            <p className="mt-3 text-sm text-white/80">
              Exemplos: Hemograma, Raio-X, Eletrocardiograma
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <section>
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#132190]">Categorias de exames</h2>
              <p className="mt-1 text-sm text-slate-600">
                Navegue por área para encontrar o exame desejado com mais facilidade.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categorias.map((categoria) => {
              const Icone = categoria.icone

              return (
                <button
                  key={categoria.nome}
                  type="button"
                  className="group rounded-2xl border border-[#87B7FE]/30 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#004AF7]/30 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E4F2FE] transition group-hover:bg-[#87B7FE]/20">
                    <Icone className="h-6 w-6 text-[#004AF7]" />
                  </div>

                  <h3 className="mt-4 text-base font-semibold text-[#132190]">
                    {categoria.nome}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Ver exames desta categoria
                  </p>
                </button>
              )
            })}
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#132190]">Exames disponíveis</h2>
              <p className="mt-1 text-sm text-slate-600">
                Selecione um exame para continuar o agendamento.
              </p>
            </div>

            <button
              type="button"
              className="hidden rounded-xl border border-[#004AF7]/20 bg-white px-4 py-2 text-sm font-medium text-[#004AF7] transition hover:border-[#004AF7] hover:bg-[#004AF7] hover:text-white md:inline-flex"
            >
              Ver todos
            </button>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {exames.map((exame) => (
              <article
                key={exame.nome}
                className="rounded-3xl border border-[#87B7FE]/25 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-flex rounded-full bg-[#E4F2FE] px-3 py-1 text-xs font-semibold text-[#004AF7]">
                      {exame.categoria}
                    </span>

                    <h3 className="mt-3 text-xl font-bold text-[#132190]">
                      {exame.nome}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {exame.descricao}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="rounded-xl bg-[#004AF7] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#132190]"
                  >
                    Selecionar exame
                  </button>

                  <button
                    type="button"
                    className="rounded-xl border border-[#004AF7]/20 px-5 py-3 text-sm font-semibold text-[#004AF7] transition hover:border-[#004AF7] hover:bg-[#E4F2FE]"
                  >
                    Ver detalhes
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}