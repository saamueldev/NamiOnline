import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  ChevronRight,
  HeartPulse,
  ChevronDown,
  Pencil,
  Trash2,
  ClipboardList,
  Save,
  X,
} from 'lucide-react'

import api from '../../services/api'

export default function AdminEditarExames() {
  const { categoriaId } = useParams()

  const [categoria, setCategoria] = useState(null)
  const [categoriasExame, setCategoriasExame] = useState([])
  const [examesCategoria, setExamesCategoria] = useState([])
  const [exameAbertoId, setExameAbertoId] = useState(null)
  const [carregando, setCarregando] = useState(true)

  const [exameEditandoId, setExameEditandoId] = useState(null)
  const [nomeEditando, setNomeEditando] = useState('')
  const [categoriaEditandoId, setCategoriaEditandoId] = useState('')
  const [descricaoEditando, setDescricaoEditando] = useState('')
  const [salvandoEdicao, setSalvandoEdicao] = useState(false)

  async function carregarCategoria() {
    try {
      const resposta = await api.get(`/categorias-exames/${categoriaId}`)
      setCategoria(resposta.data)
    } catch (error) {
      console.error('Erro ao carregar categoria:', error)
      alert('Erro ao carregar categoria de exame.')
    }
  }

  async function carregarCategoriasExame() {
    try {
      const resposta = await api.get('/categorias-exames')
      setCategoriasExame(resposta.data)
    } catch (error) {
      console.error('Erro ao carregar categorias de exame:', error)
      alert('Erro ao carregar categorias de exame.')
    }
  }

  async function carregarExamesCategoria() {
    try {
      const resposta = await api.get(`/tipos-exames?categoriaExameId=${categoriaId}`)
      setExamesCategoria(resposta.data)

      if (resposta.data.length > 0 && !exameAbertoId) {
        setExameAbertoId(resposta.data[0]._id)
      }
    } catch (error) {
      console.error('Erro ao carregar exames da categoria:', error)
      alert('Erro ao carregar exames da categoria.')
    }
  }

  async function carregarDadosTela() {
    try {
      setCarregando(true)

      await Promise.all([
        carregarCategoria(),
        carregarCategoriasExame(),
        carregarExamesCategoria(),
      ])
    } finally {
      setCarregando(false)
    }
  }

  function alternarExameAberto(id) {
    setExameAbertoId((idAtual) => (idAtual === id ? null : id))
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

    const categoriaEncontrada = categoriasExame.find(
      (categoriaItem) => categoriaItem._id === obterCategoriaIdDoExame(exame)
    )

    return categoriaEncontrada?.nome || nomeCategoria
  }

  function iniciarEdicaoExame(exame) {
    setExameAbertoId(exame._id)
    setExameEditandoId(exame._id)
    setNomeEditando(exame.nome || '')
    setCategoriaEditandoId(obterCategoriaIdDoExame(exame))
    setDescricaoEditando(exame.descricao || '')
  }

  function cancelarEdicaoExame() {
    setExameEditandoId(null)
    setNomeEditando('')
    setCategoriaEditandoId('')
    setDescricaoEditando('')
  }

  async function salvarAlteracoesExame(id) {
    if (!nomeEditando || !categoriaEditandoId || !descricaoEditando) {
      alert('Preencha todos os campos antes de salvar.')
      return
    }

    try {
      setSalvandoEdicao(true)

      await api.put(`/tipos-exames/${id}`, {
        nome: nomeEditando,
        categoriaExameId: categoriaEditandoId,
        descricao: descricaoEditando,
      })

      cancelarEdicaoExame()

      await carregarExamesCategoria()

      alert('Exame atualizado com sucesso.')
    } catch (error) {
      console.error('Erro ao atualizar exame:', error)

      const mensagem =
        error.response?.data?.mensagem || 'Erro ao atualizar exame.'

      alert(mensagem)
    } finally {
      setSalvandoEdicao(false)
    }
  }

  async function excluirExame(id) {
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este exame?'
    )

    if (!confirmar) return

    try {
      await api.delete(`/tipos-exames/${id}`)
      await carregarExamesCategoria()
      alert('Exame excluído com sucesso.')
    } catch (error) {
      console.error('Erro ao excluir exame:', error)

      const mensagem =
        error.response?.data?.mensagem || 'Erro ao excluir exame.'

      alert(mensagem)
    }
  }

  useEffect(() => {
    carregarDadosTela()
  }, [categoriaId])

  const nomeCategoria = categoria?.nome || 'Categoria'
  const descricaoCategoria =
    categoria?.descricao || 'Carregando informações da categoria...'

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
            <span>Categorias de Exames</span>
            <ChevronRight className="h-4 w-4" />
            <span className="font-semibold text-white">{nomeCategoria}</span>
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
                      {nomeCategoria}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {descricaoCategoria}
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

          {carregando ? (
            <div className="rounded-3xl border border-[#87B7FE]/20 bg-[#F8FBFF] p-5 text-sm text-slate-600">
              Carregando exames da categoria...
            </div>
          ) : examesCategoria.length === 0 ? (
            <div className="rounded-3xl border border-[#87B7FE]/20 bg-[#F8FBFF] p-5 text-sm text-slate-600">
              Nenhum exame cadastrado nesta categoria.
            </div>
          ) : (
            <div className="space-y-5">
              {examesCategoria.map((exame) => {
                const aberto = exameAbertoId === exame._id
                const estaEditando = exameEditandoId === exame._id
                const nomeCategoriaExame = obterNomeCategoriaDoExame(exame)

                return (
                  <article
                    key={exame._id}
                    className="overflow-hidden rounded-3xl border border-[#87B7FE]/20 bg-[#F8FBFF] transition hover:border-[#004AF7]/25 hover:shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => alternarExameAberto(exame._id)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                    >
                      <div>
                        <span className="inline-flex rounded-full bg-[#E4F2FE] px-3 py-1 text-xs font-semibold text-[#004AF7]">
                          {estaEditando
                            ? categoriasExame.find(
                                (categoriaItem) =>
                                  categoriaItem._id === categoriaEditandoId
                              )?.nome || nomeCategoriaExame
                            : nomeCategoriaExame}
                        </span>

                        <h3 className="mt-3 text-xl font-bold text-[#132190]">
                          {estaEditando ? nomeEditando || 'Nome do exame' : exame.nome}
                        </h3>
                      </div>

                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
                        <ChevronDown
                          className={`h-5 w-5 text-[#004AF7] transition ${
                            aberto ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {aberto && (
                      <div className="border-t border-[#87B7FE]/20 bg-white px-5 py-5">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div className="rounded-2xl bg-[#F8FBFF] p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Nome do exame
                            </p>

                            {estaEditando ? (
                              <input
                                type="text"
                                value={nomeEditando}
                                onChange={(event) =>
                                  setNomeEditando(event.target.value)
                                }
                                className="mt-2 w-full rounded-2xl border border-[#87B7FE]/30 bg-white px-4 py-3 text-sm font-semibold text-[#132190] outline-none transition focus:border-[#004AF7] focus:ring-4 focus:ring-[#004AF7]/10"
                              />
                            ) : (
                              <p className="mt-1 text-base font-semibold text-[#132190]">
                                {exame.nome}
                              </p>
                            )}
                          </div>

                          <div className="rounded-2xl bg-[#F8FBFF] p-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                              Categoria
                            </p>

                            {estaEditando ? (
                              <select
                                value={categoriaEditandoId}
                                onChange={(event) =>
                                  setCategoriaEditandoId(event.target.value)
                                }
                                className="mt-2 w-full rounded-2xl border border-[#87B7FE]/30 bg-white px-4 py-3 text-sm font-semibold text-[#132190] outline-none transition focus:border-[#004AF7] focus:ring-4 focus:ring-[#004AF7]/10"
                              >
                                <option value="">Selecione uma categoria</option>

                                {categoriasExame.map((categoriaItem) => (
                                  <option
                                    key={categoriaItem._id}
                                    value={categoriaItem._id}
                                  >
                                    {categoriaItem.nome}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <p className="mt-1 text-base font-semibold text-[#132190]">
                                {nomeCategoriaExame}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 rounded-2xl bg-[#F8FBFF] p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Descrição
                          </p>

                          {estaEditando ? (
                            <textarea
                              rows="4"
                              value={descricaoEditando}
                              onChange={(event) =>
                                setDescricaoEditando(event.target.value)
                              }
                              className="mt-2 w-full rounded-2xl border border-[#87B7FE]/30 bg-white px-4 py-3 text-sm leading-6 text-slate-600 outline-none transition focus:border-[#004AF7] focus:ring-4 focus:ring-[#004AF7]/10"
                            />
                          ) : (
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                              {exame.descricao}
                            </p>
                          )}
                        </div>

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                          {estaEditando ? (
                            <>
                              <button
                                type="button"
                                onClick={() => salvarAlteracoesExame(exame._id)}
                                disabled={salvandoEdicao}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#004AF7] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#132190] disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                <Save className="h-4 w-4" />
                                {salvandoEdicao
                                  ? 'Salvando...'
                                  : 'Salvar alterações'}
                              </button>

                              <button
                                type="button"
                                onClick={cancelarEdicaoExame}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#004AF7]/20 bg-white px-5 py-3 text-sm font-semibold text-[#004AF7] transition hover:border-[#004AF7] hover:bg-[#E4F2FE]"
                              >
                                <X className="h-4 w-4" />
                                Cancelar
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => iniciarEdicaoExame(exame)}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#004AF7] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#132190]"
                              >
                                <Pencil className="h-4 w-4" />
                                Editar exame
                              </button>

                              <button
                                type="button"
                                onClick={() => excluirExame(exame._id)}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-500 transition hover:border-red-300 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                                Excluir exame
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}