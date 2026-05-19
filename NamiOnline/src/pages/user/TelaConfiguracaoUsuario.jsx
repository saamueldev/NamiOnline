import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
  FaEdit,
  FaSave,
  FaSpinner
} from 'react-icons/fa'

import { AuthContext } from '../../context/AuthContext'
import api from '../../services/api'

export default function TelaConfiguracaoUsuario() {

  const navigate = useNavigate()

  const { user } = useContext(AuthContext)

  const [editar, setEditar] = useState(false)
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    dataNascimento: '',
    sexo: '',
    sangue: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    responsavel: '',
    telefonResponsavel: '',
    alergias: '',
    medicamentos: ''
  })

  // =========================
  // BUSCAR DADOS DO USUÁRIO
  // =========================
  useEffect(() => {

    async function carregarUsuario() {

      try {

        const response = await api.get(`/usuarios/${user.id}`)

        const dados = response.data

        setFormData({
          nome: dados.nome || '',
          email: dados.email || '',
          telefone: dados.telefone || '',
          cpf: dados.cpf || '',
          dataNascimento: dados.dataNascimento
            ? dados.dataNascimento.substring(0, 10)
            : '',
          sexo: dados.sexo || '',
          sangue: dados.sangue || '',
          endereco: dados.endereco || '',
          cidade: dados.cidade || '',
          estado: dados.estado || '',
          cep: dados.cep || '',
          responsavel: dados.responsavel || '',
          telefonResponsavel: dados.telefonResponsavel || '',
          alergias: dados.alergias || '',
          medicamentos: dados.medicamentos || '',
        })

      } catch (error) {

        console.error('Erro ao buscar usuário:', error)
        alert('Erro ao carregar dados do usuário')

      } finally {

        setLoading(false)

      }
    }

    if (user?.id) {
      carregarUsuario()
    }

  }, [user])

  // =========================
  // ALTERAR INPUTS
  // =========================
  const handleChange = (e) => {

    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value
    })

  }

  // =========================
  // SALVAR
  // =========================
  const handleSalvar = async () => {

    try {

      await api.put(`/usuarios/${user.id}`, formData)

      alert('Dados atualizados com sucesso!')

      setEditar(false)

    } catch (error) {

      console.error(error)
      alert('Erro ao atualizar dados')

    }
  }

  const inputClass = `
    w-full rounded-xl border border-slate-300
    px-4 py-3 text-sm outline-none transition
    focus:border-[#132190] focus:ring-4 focus:ring-blue-100
    disabled:bg-slate-100 disabled:text-slate-400
  `

  // =========================
  // LOADING
  // =========================
  if (loading) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#004AF7] to-[#132190]">

        <div className="flex flex-col items-center gap-4 text-white">

          <FaSpinner className="animate-spin text-5xl" />

          <h2 className="text-2xl font-bold">
            Carregando usuário...
          </h2>

        </div>

      </div>
    )
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#004AF7] to-[#132190] px-5 py-10">

      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="mb-8 flex items-center gap-4">

          <button
            onClick={() => navigate('/perfil')}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white transition hover:-translate-x-1 hover:bg-white/30"
          >
            <FaArrowLeft />
          </button>

          <div>

            <h1 className="text-3xl font-bold text-white">
              Configurações Pessoais
            </h1>

            <p className="mt-1 text-blue-100">
              Bem-vindo(a), {formData.nome}
            </p>

          </div>

        </div>

        {/* BOTÃO EDITAR */}
        {!editar && (
          <div className="mb-6 text-right">

            <button
              onClick={() => setEditar(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#132190] shadow-xl transition hover:-translate-y-1"
            >
              <FaEdit />
              Editar Informações
            </button>

          </div>
        )}

        {/* DADOS PESSOAIS */}
        <section className="mb-6 overflow-hidden rounded-[24px] bg-white shadow-2xl">

          <div className="flex items-center gap-3 bg-gradient-to-r from-[#004AF7] to-[#132190] px-6 py-5 text-lg font-semibold text-white">
            <FaUser />
            Dados Pessoais
          </div>

          <div className="space-y-6 p-6">

            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                Nome Completo
              </label>

              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                disabled={!editar}
                className={inputClass}
              />
            </div>

            <div className="grid gap-5 md:grid-cols-3">

              <div>
                <label className="mb-2 block font-semibold text-slate-700">
                  Data de Nascimento
                </label>

                <input
                  type="date"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                  disabled={!editar}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-700">
                  Sexo
                </label>

                <select
                  name="sexo"
                  value={formData.sexo}
                  onChange={handleChange}
                  disabled={!editar}
                  className={inputClass}
                >
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-700">
                  Tipo Sanguíneo
                </label>

                <select
                  name="sangue"
                  value={formData.sangue}
                  onChange={handleChange}
                  disabled={!editar}
                  className={inputClass}
                >
                  <option value="">Selecione</option>
                  <option>O+</option>
                  <option>O-</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                </select>
              </div>

            </div>

            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                CPF
              </label>

              <input
                type="text"
                value={formData.cpf}
                disabled
                className={`${inputClass} bg-slate-200`}
              />
            </div>

          </div>

        </section>

        {/* CONTATO */}
        <section className="mb-6 overflow-hidden rounded-[24px] bg-white shadow-2xl">

          <div className="flex items-center gap-3 bg-gradient-to-r from-[#004AF7] to-[#132190] px-6 py-5 text-lg font-semibold text-white">
            <FaEnvelope />
            Contato
          </div>

          <div className="space-y-6 p-6">

            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!editar}
                className={inputClass}
              />
            </div>

            <div className="grid gap-5 md:grid-cols-3">

              <div>
                <label className="mb-2 block font-semibold text-slate-700">
                  Telefone
                </label>

                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  disabled={!editar}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-700">
                  Responsável
                </label>

                <input
                  type="text"
                  name="responsavel"
                  value={formData.responsavel}
                  onChange={handleChange}
                  disabled={!editar}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-700">
                  Telefone Responsável
                </label>

                <input
                  type="tel"
                  name="telefonResponsavel"
                  value={formData.telefonResponsavel}
                  onChange={handleChange}
                  disabled={!editar}
                  className={inputClass}
                />
              </div>

            </div>

          </div>

        </section>

        {/* ENDEREÇO */}
        <section className="mb-6 overflow-hidden rounded-[24px] bg-white shadow-2xl">

          <div className="flex items-center gap-3 bg-gradient-to-r from-[#004AF7] to-[#132190] px-6 py-5 text-lg font-semibold text-white">
            <FaMapMarkerAlt />
            Endereço
          </div>

          <div className="space-y-6 p-6">

            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                Endereço
              </label>

              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                disabled={!editar}
                className={inputClass}
              />
            </div>

            <div className="grid gap-5 md:grid-cols-3">

              <div>
                <label className="mb-2 block font-semibold text-slate-700">
                  CEP
                </label>

                <input
                  type="text"
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  disabled={!editar}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-700">
                  Cidade
                </label>

                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  disabled={!editar}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-slate-700">
                  Estado
                </label>

                <input
                  type="text"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  disabled={!editar}
                  className={inputClass}
                />
              </div>

            </div>

          </div>

        </section>

        {/* INFORMAÇÕES MÉDICAS */}
        <section className="mb-6 overflow-hidden rounded-[24px] bg-white shadow-2xl">

          <div className="flex items-center gap-3 bg-gradient-to-r from-[#004AF7] to-[#132190] px-6 py-5 text-lg font-semibold text-white">
            <FaHeart />
            Informações Médicas
          </div>

          <div className="space-y-6 p-6">

            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                Alergias Conhecidas
              </label>

              <textarea
                rows="4"
                name="alergias"
                value={formData.alergias}
                onChange={handleChange}
                disabled={!editar}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold text-slate-700">
                Medicamentos em Uso
              </label>

              <textarea
                rows="4"
                name="medicamentos"
                value={formData.medicamentos}
                onChange={handleChange}
                disabled={!editar}
                className={inputClass}
              />
            </div>

          </div>

        </section>

        {/* BOTÕES */}
        {editar ? (
          <div className="grid gap-4 md:grid-cols-2">

            <button
              onClick={() => setEditar(false)}
              className="rounded-xl bg-slate-200 px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-300"
            >
              Cancelar
            </button>

            <button
              onClick={handleSalvar}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#004AF7] to-[#132190] px-6 py-4 font-semibold text-white shadow-xl transition hover:-translate-y-1"
            >
              <FaSave />
              Salvar Alterações
            </button>

          </div>
        ) : (
          <div className="text-center">

            <button
              onClick={() => navigate('/perfil')}
              className="rounded-xl bg-white px-8 py-4 font-semibold text-[#132190] shadow-xl transition hover:-translate-y-1"
            >
              ← Voltar
            </button>

          </div>
        )}

      </div>
    </div>
  )
}