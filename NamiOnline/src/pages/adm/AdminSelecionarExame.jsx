import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  FlaskConical,
  HeartPulse,
  Brain,
  Bone,
  ScanLine,
  ClipboardList,
  X,
  Info,
  Clock3,
  FileText,
  UserRound,
} from 'lucide-react'

import api from '../../services/api'

function garantirArray(valor) {
  return Array.isArray(valor) ? valor : []
}

const iconesCategorias = {
  Laboratoriais: FlaskConical,
  Cardiológicos: HeartPulse,
  Neurológicos: Brain,
  Ortopédicos: Bone,
  Imagem: ScanLine,
}

export default function AdminSelecionarExame() {
  const navigate = useNavigate()

  const [categorias, setCategorias] = useState([])
  const [exames, setExames] = useState([])
  const [busca, setBusca] = useState('')
  const [categoriaSelecionadaId, setCategoriaSelecionadaId] = useState('')
  const [exameSelecionadoId, setExameSelecionadoId] = useState('')
  const [exameDetalhado, setExameDetalhado] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false)
  const [erro, setErro] = useState('')

  const examesDisponiveisRef = useRef(null)

  async function carregarCategorias() {
    try {
      const resposta = await api.get('/categorias-exames')
      setCategorias(garantirArray(resposta.data))
    } catch (error) {
      console.error('Erro ao carregar categorias:', error)
      setCategorias([])
      setErro('Nao foi possivel carregar as categorias de exames.')
    }
  }

  async function carregarExames() {
    try {
      const resposta = await api.get('/tipos-exames')
      setExames(garantirArray(resposta.data))
    } catch (error) {
      console.error('Erro ao carregar exames:', error)
      setExames([])
      setErro('Nao foi possivel carregar os exames disponiveis.')
    }
  }

  async function carregarDados() {
    try {
      setCarregando(true)
      setErro('')

      await Promise.all([carregarCategorias(), carregarExames()])
    } catch (error) {
      console.error('Erro ao carregar dados de exames:', error)
    } finally {
      setCarregando(false)
    }
  }

  function obterCategoriaIdDoExame(exame) {
    if (exame.categoriaExameId?._id) {
      return exame.categoriaExameId._id
    }

    return exame.categoriaExameId || ''
  }

  function obterNomeCategoriaDoExame(exame) {
    if (exame.categoriaExameId?.nome) {
      return exame.categoriaExameId.nome
    }

    const categoriaEncontrada = categorias.find(
      (categoria) => categoria._id === obterCategoriaIdDoExame(exame)
    )

    return categoriaEncontrada?.nome || 'Categoria não informada'
  }

  function formatarTempoMedio(minutos) {
    if (!minutos) {
      return 'Tempo não informado'
    }

    if (minutos < 60) {
      return `${minutos} minutos`
    }

    if (minutos === 60) {
      return '1 hora'
    }

    const horas = Math.floor(minutos / 60)
    const minutosRestantes = minutos % 60

    if (minutosRestantes === 0) {
      return `${horas} horas`
    }

    return `${horas}h ${minutosRestantes}min`
  }

  function selecionarCategoria(categoriaId) {
    setCategoriaSelecionadaId(categoriaId)
    setExameSelecionadoId('')
    setMostrarSugestoes(false)
  }

  function limparFiltroCategoria() {
    setCategoriaSelecionadaId('')
    setExameSelecionadoId('')
    setBusca('')
    setMostrarSugestoes(false)
  }

  function selecionarSugestaoExame(exame) {
    const categoriaDoExameId = obterCategoriaIdDoExame(exame)

    setBusca('')
    setCategoriaSelecionadaId(categoriaDoExameId)
    setExameSelecionadoId(exame._id)
    setMostrarSugestoes(false)

    setTimeout(() => {
      examesDisponiveisRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 100)
  }

  function abrirDetalhesExame(exame) {
    setExameDetalhado(exame)
  }

  function fecharDetalhesExame() {
    setExameDetalhado(null)
  }

  function selecionarExameParaPaciente(exame) {
    fecharDetalhesExame()
    navigate(`/admin/exames/agendar/${exame._id}`)
  }

  useEffect(() => {
    carregarDados()
  }, [])

  const termoBusca = busca.toLowerCase().trim()

  const sugestoesExames = exames
    .filter((exame) => {
      const nomeExame = exame.nome?.toLowerCase() || ''
      return termoBusca && nomeExame.includes(termoBusca)
    })
    .slice(0, 6)

  const examesFiltrados = exames.filter((exame) => {
    const nomeExame = exame.nome?.toLowerCase() || ''
    const descricaoExame = exame.descricao?.toLowerCase() || ''
    const nomeCategoria = obterNomeCategoriaDoExame(exame).toLowerCase()
    const categoriaDoExameId = obterCategoriaIdDoExame(exame)

    if (exameSelecionadoId) {
      return exame._id === exameSelecionadoId
    }

    const correspondeBusca =
      nomeExame.includes(termoBusca) ||
      descricaoExame.includes(termoBusca) ||
      nomeCategoria.includes(termoBusca)

    const correspondeCategoria =
      !categoriaSelecionadaId || categoriaDoExameId === categoriaSelecionadaId

    return correspondeBusca && correspondeCategoria
  })

  return (
    <div className="min-h-screen bg-[#E4F2FE]">
      <section className="relative overflow-hidden bg-gradient-to-r from-[#132190] to-[#004AF7]">
        <div className="absolute inset-0 bg-white/5" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 md:px-10 lg:flex-row lg:items-center lg:justify-between lg:py-16">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-medium text-white/90">
              Agendamento Interno
            </span>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Selecione o exame do paciente
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-white/85 md:text-lg">
              Escolha o tipo de exame que será agendado pelo funcionário para um paciente cadastrado no sistema.
            </p>
          </div>

          <div className="w-full max-w-xl rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
            <div className="relative">
              <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-lg">
                <Search className="h-5 w-5 text-[#87B7FE]" />

                <input
                  type="text"
                  value={busca}
                  onChange={(event) => {
                    setBusca(event.target.value)
                    setExameSelecionadoId('')
                    setMostrarSugestoes(true)
                  }}
                  onFocus={() => setMostrarSugestoes(true)}
                  onBlur={() => {
                    setTimeout(() => {
                      setMostrarSugestoes(false)
                    }, 150)
                  }}
                  placeholder="Buscar exame pelo nome"
                  className="w-full bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-400"
                />

                <button
                  type="button"
                  onClick={() => setMostrarSugestoes(false)}
                  className="rounded-xl bg-[#004AF7] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#132190]"
                >
                  Buscar
                </button>
              </div>

              {mostrarSugestoes && termoBusca && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-2xl border border-[#87B7FE]/30 bg-white shadow-xl">
                  {sugestoesExames.length === 0 ? (
                    <div className="px-4 py-4 text-sm text-slate-500">
                      Nenhum exame encontrado.
                    </div>
                  ) : (
                    <div className="max-h-72 overflow-y-auto">
                      {sugestoesExames.map((exame) => (
                        <button
                          key={exame._id}
                          type="button"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => selecionarSugestaoExame(exame)}
                          className="flex w-full flex-col border-b border-[#E4F2FE] px-4 py-3 text-left transition last:border-b-0 hover:bg-[#E4F2FE]"
                        >
                          <span className="text-sm font-semibold text-[#132190]">
                            {exame.nome}
                          </span>

                          <span className="mt-1 text-xs font-medium text-[#004AF7]">
                            {obterNomeCategoriaDoExame(exame)}
                          </span>

                          <span className="mt-1 line-clamp-1 text-xs text-slate-500">
                            {exame.descricao}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <p className="mt-3 text-sm text-white/80">
              Após selecionar o exame, você poderá buscar o paciente pelo CPF e concluir o agendamento.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        {erro && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
            {erro}
          </div>
        )}

        <section>
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#132190]">
                Categorias de exames
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Navegue por categoria para encontrar rapidamente o exame que será agendado.
              </p>
            </div>
          </div>

          {carregando ? (
            <div className="rounded-2xl border border-[#87B7FE]/30 bg-white p-5 text-sm text-slate-600">
              Carregando categorias...
            </div>
          ) : categorias.length === 0 ? (
            <div className="rounded-2xl border border-[#87B7FE]/30 bg-white p-5 text-sm text-slate-600">
              Nenhuma categoria de exame cadastrada.
            </div>
          ) : (
            <div className="-mx-6 overflow-x-auto px-6 pb-4 pt-2 md:-mx-10 md:px-10">
              <div className="flex min-w-max gap-4">
                {categorias.map((categoria) => {
                  const Icone = iconesCategorias[categoria.nome] || ClipboardList
                  const selecionada = categoriaSelecionadaId === categoria._id

                  return (
                    <button
                      key={categoria._id}
                      type="button"
                      onClick={() => selecionarCategoria(categoria._id)}
                      className={`group min-w-[220px] max-w-[220px] rounded-2xl border p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#004AF7]/40 hover:bg-[#DCEBFF] hover:shadow-md ${
                        selecionada
                          ? 'border-[#004AF7] bg-[#CFE5FF]'
                          : 'border-[#87B7FE]/40 bg-white'
                      }`}
                    >
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl transition ${
                          selecionada
                            ? 'bg-[#BFD9FF]'
                            : 'bg-[#DCEBFF] group-hover:bg-[#BFD9FF]'
                        }`}
                      >
                        <Icone className="h-6 w-6 text-[#004AF7]" />
                      </div>

                      <h3 className="mt-4 truncate text-base font-semibold text-[#132190]">
                        {categoria.nome}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Ver exames desta categoria
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </section>

        <section ref={examesDisponiveisRef} className="mt-12 scroll-mt-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#132190]">
                Exames disponíveis
              </h2>

              <p className="mt-1 text-sm text-slate-600">
                Selecione o exame para iniciar o agendamento interno.
              </p>
            </div>

            <button
              type="button"
              onClick={limparFiltroCategoria}
              className="hidden rounded-xl border border-[#004AF7]/20 bg-white px-4 py-2 text-sm font-medium text-[#004AF7] transition hover:border-[#004AF7] hover:bg-[#004AF7] hover:text-white md:inline-flex"
            >
              Ver todos
            </button>
          </div>

          {carregando ? (
            <div className="rounded-3xl border border-[#87B7FE]/25 bg-white p-6 text-sm text-slate-600 shadow-sm">
              Carregando exames disponíveis...
            </div>
          ) : examesFiltrados.length === 0 ? (
            <div className="rounded-3xl border border-[#87B7FE]/25 bg-white p-6 text-sm text-slate-600 shadow-sm">
              Nenhum exame encontrado.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {examesFiltrados.map((exame) => (
                <article
                  key={exame._id}
                  className="rounded-3xl border border-[#87B7FE]/25 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-flex rounded-full bg-[#E4F2FE] px-3 py-1 text-xs font-semibold text-[#004AF7]">
                        {obterNomeCategoriaDoExame(exame)}
                      </span>

                      <h3 className="mt-3 text-xl font-bold text-[#132190]">
                        {exame.nome}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {exame.descricao}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#F8FBFF] px-3 py-2 text-xs font-semibold text-[#132190]">
                          <Clock3 className="h-4 w-4 text-[#004AF7]" />
                          {formatarTempoMedio(exame.tempoMedioMinutos)}
                        </span>

                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${
                            exame.guiaNecessaria
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-green-50 text-green-700'
                          }`}
                        >
                          <FileText className="h-4 w-4" />
                          {exame.guiaNecessaria
                            ? 'Guia necessária'
                            : 'Guia não necessária'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => selecionarExameParaPaciente(exame)}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#004AF7] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#132190]"
                    >
                      <UserRound className="h-4 w-4" />
                      Agendar para paciente
                    </button>

                    <button
                      type="button"
                      onClick={() => abrirDetalhesExame(exame)}
                      className="rounded-xl border border-[#004AF7]/20 px-5 py-3 text-sm font-semibold text-[#004AF7] transition hover:border-[#004AF7] hover:bg-[#E4F2FE]"
                    >
                      Ver detalhes
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {exameDetalhado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 bg-gradient-to-r from-[#132190] to-[#004AF7] px-6 py-6">
              <div>
                <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
                  {obterNomeCategoriaDoExame(exameDetalhado)}
                </span>

                <h2 className="mt-3 text-2xl font-bold text-white">
                  {exameDetalhado.nome}
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/80">
                  Confira os principais detalhes antes de iniciar o agendamento interno.
                </p>
              </div>

              <button
                type="button"
                onClick={fecharDetalhesExame}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white transition hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Nome do exame
                  </p>

                  <p className="mt-2 text-base font-bold text-[#132190]">
                    {exameDetalhado.nome}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Categoria
                  </p>

                  <p className="mt-2 text-base font-bold text-[#132190]">
                    {obterNomeCategoriaDoExame(exameDetalhado)}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-[#004AF7]" />

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Tempo médio
                    </p>
                  </div>

                  <p className="mt-2 text-base font-bold text-[#132190]">
                    {formatarTempoMedio(exameDetalhado.tempoMedioMinutos)}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#004AF7]" />

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Guia necessária
                    </p>
                  </div>

                  <p
                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-bold ${
                      exameDetalhado.guiaNecessaria
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-green-50 text-green-700'
                    }`}
                  >
                    {exameDetalhado.guiaNecessaria ? 'Sim' : 'Não'}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-[#F8FBFF] p-4">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-[#004AF7]" />

                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Descrição
                  </p>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {exameDetalhado.descricao}
                </p>
              </div>

              <div className="mt-4 rounded-2xl border border-[#87B7FE]/25 bg-[#E4F2FE]/60 p-4">
                <p className="text-sm font-semibold text-[#132190]">
                  Informações importantes
                </p>

                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                  {exameDetalhado.guiaNecessaria ? (
                    <li>
                      • Este exame exige guia médica para prosseguir com o agendamento.
                    </li>
                  ) : (
                    <li>
                      • Este exame não exige guia médica para solicitação inicial.
                    </li>
                  )}

                  <li>• A confirmação depende da disponibilidade de horários.</li>
                  <li>• Após selecionar o exame, será necessário localizar o paciente.</li>
                </ul>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={fecharDetalhesExame}
                  className="rounded-xl border border-[#004AF7]/20 px-5 py-3 text-sm font-semibold text-[#004AF7] transition hover:border-[#004AF7] hover:bg-[#E4F2FE]"
                >
                  Fechar
                </button>

                <button
                  type="button"
                  onClick={() => selecionarExameParaPaciente(exameDetalhado)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#004AF7] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#132190]"
                >
                  <UserRound className="h-4 w-4" />
                  Agendar para paciente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
