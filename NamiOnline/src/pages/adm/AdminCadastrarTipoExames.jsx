import { useEffect, useState } from 'react'
import {
  ChevronRight,
  Plus,
  Trash2,
  FolderPlus,
  ClipboardList,
  Search,
  HeartPulse,
} from 'lucide-react'

import api from '../../services/api'

export default function AdminCadastrarTipoExames() {
  const [tiposExame, setTiposExame] = useState([])
  const [categoriaPrincipal, setCategoriaPrincipal] = useState('')
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [busca, setBusca] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function carregarTiposExame() {
    try {
      const resposta = await api.get('/tipos-exame')
      setTiposExame(resposta.data)
    } catch (error) {
      console.error('Erro ao carregar tipos de exame:', error)
      alert('Erro ao carregar tipos de exame.')
    }
  }

  async function cadastrarTipoExame(event) {
    event.preventDefault()

    if (!categoriaPrincipal || !nome || !descricao) {
      alert('Preencha todos os campos.')
      return
    }

    try {
      setCarregando(true)

      await api.post('/tipos-exame', {
        categoriaPrincipal,
        nome,
        descricao,
      })

      setCategoriaPrincipal('')
      setNome('')
      setDescricao('')

      await carregarTiposExame()

      alert('Tipo de exame cadastrado com sucesso.')
    } catch (error) {
      console.error('Erro ao cadastrar tipo de exame:', error)

      const mensagem =
        error.response?.data?.mensagem || 'Erro ao cadastrar tipo de exame.'

      alert(mensagem)
    } finally {
      setCarregando(false)
    }
  }

  async function excluirTipoExame(id) {
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este tipo de exame?'
    )

    if (!confirmar) return

    try {
      await api.delete(`/tipos-exame/${id}`)
      await carregarTiposExame()
      alert('Tipo de exame excluído com sucesso.')
    } catch (error) {
      console.error('Erro ao excluir tipo de exame:', error)

      const mensagem =
        error.response?.data?.mensagem || 'Erro ao excluir tipo de exame.'

      alert(mensagem)
    }
  }

  function limparCampos() {
    setCategoriaPrincipal('')
    setNome('')
    setDescricao('')
  }

  useEffect(() => {
    carregarTiposExame()
  }, [])

  const tiposFiltrados = tiposExame.filter((tipo) => {
    const nomeTipo = tipo.nome?.toLowerCase() || ''
    const categoriaTipo = tipo.categoriaPrincipal?.toLowerCase() || ''
    const termoBusca = busca.toLowerCase()

    return nomeTipo.includes(termoBusca) || categoriaTipo.includes(termoBusca)
  })

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
            <span className="font-semibold text-white">Tipos de exame</span>
          </div>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-medium text-white/90">
                Gestão Administrativa
              </span>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
                Gerencie os tipos de exame
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-white/85 md:text-lg">
                Cadastre novas categorias de exame e remova tipos que não são mais
                utilizados no sistema.
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
                      Módulo administrativo
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-[#132190]">
                      Tipos de exame
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Organize as categorias disponíveis para manter o catálogo de exames
                      sempre atualizado.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-3xl border border-[#87B7FE]/25 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E4F2FE]">
                <FolderPlus className="h-6 w-6 text-[#004AF7]" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#132190]">
                  Adicionar tipo de exame
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Cadastre uma nova categoria para organização dos exames.
                </p>
              </div>
            </div>

            <form onSubmit={cadastrarTipoExame} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#132190]">
                  Categoria principal
                </label>

                <select
                  value={categoriaPrincipal}
                  onChange={(event) => setCategoriaPrincipal(event.target.value)}
                  className="w-full rounded-2xl border border-[#87B7FE]/30 bg-[#F8FBFF] px-4 py-4 text-sm text-slate-700 outline-none transition focus:border-[#004AF7] focus:ring-4 focus:ring-[#004AF7]/10"
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="Cardiológicos">Cardiológicos</option>
                  <option value="Radiológicos">Radiológicos</option>
                  <option value="Laboratoriais">Laboratoriais</option>
                  <option value="Neurológicos">Neurológicos</option>
                  <option value="Ortopédicos">Ortopédicos</option>
                  <option value="Imagem">Imagem</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#132190]">
                  Nome do tipo de exame
                </label>

                <input
                  type="text"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  placeholder="Ex.: Hemograma"
                  className="w-full rounded-2xl border border-[#87B7FE]/30 bg-[#F8FBFF] px-4 py-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#004AF7] focus:ring-4 focus:ring-[#004AF7]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#132190]">
                  Descrição
                </label>

                <textarea
                  rows="5"
                  value={descricao}
                  onChange={(event) => setDescricao(event.target.value)}
                  placeholder="Descreva brevemente a finalidade dessa categoria de exame."
                  className="w-full rounded-2xl border border-[#87B7FE]/30 bg-[#F8FBFF] px-4 py-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#004AF7] focus:ring-4 focus:ring-[#004AF7]/10"
                />
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="submit"
                  disabled={carregando}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#004AF7] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#132190] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Plus className="h-4 w-4" />
                  {carregando ? 'Adicionando...' : 'Adicionar tipo'}
                </button>

                <button
                  type="button"
                  onClick={limparCampos}
                  className="rounded-2xl border border-[#004AF7]/20 bg-white px-6 py-4 text-sm font-semibold text-[#004AF7] transition hover:border-[#004AF7] hover:bg-[#E4F2FE]"
                >
                  Limpar campos
                </button>
              </div>
            </form>
          </section>

          <section className="rounded-3xl border border-[#87B7FE]/25 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E4F2FE]">
                  <ClipboardList className="h-6 w-6 text-[#004AF7]" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#132190]">
                    Tipos cadastrados
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Visualize e remova categorias disponíveis no sistema.
                  </p>
                </div>
              </div>

              <div className="relative w-full md:max-w-xs">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#87B7FE]" />

                <input
                  type="text"
                  value={busca}
                  onChange={(event) => setBusca(event.target.value)}
                  placeholder="Buscar tipo"
                  className="w-full rounded-2xl border border-[#87B7FE]/30 bg-[#F8FBFF] py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#004AF7] focus:ring-4 focus:ring-[#004AF7]/10"
                />
              </div>
            </div>

            <div className="space-y-4">
              {tiposFiltrados.length === 0 ? (
                <div className="rounded-3xl border border-[#87B7FE]/20 bg-[#F8FBFF] p-5 text-sm text-slate-600">
                  Nenhum tipo de exame cadastrado.
                </div>
              ) : (
                tiposFiltrados.map((tipo) => (
                  <article
                    key={tipo._id}
                    className="rounded-3xl border border-[#87B7FE]/20 bg-[#F8FBFF] p-5 transition hover:border-[#004AF7]/25 hover:shadow-sm"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="inline-flex rounded-full bg-[#E4F2FE] px-3 py-1 text-xs font-semibold text-[#004AF7]">
                          {tipo.quantidadeExames ?? 0} exames vinculados
                        </div>

                        <h3 className="mt-3 text-xl font-bold text-[#132190]">
                          {tipo.nome}
                        </h3>

                        <p className="mt-1 text-xs font-semibold text-[#004AF7]">
                          {tipo.categoriaPrincipal}
                        </p>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                          {tipo.descricao}
                        </p>
                      </div>

                      <div className="flex shrink-0 gap-3">
                        <button
                          type="button"
                          onClick={() => excluirTipoExame(tipo._id)}
                          className="inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-white px-4 py-3 text-sm font-semibold text-red-500 transition hover:border-red-300 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          Excluir
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}