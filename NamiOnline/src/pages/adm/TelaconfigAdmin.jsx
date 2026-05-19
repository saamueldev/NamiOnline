import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

import {
  FaArrowLeft,
  FaUser,
  FaSave,
  FaShieldAlt,
  FaUserShield,
  FaBan,
  FaCheckCircle,
  FaEdit,
} from 'react-icons/fa'

export default function TelaconfigAdmin() {
  const navigate = useNavigate()

  const [editar, setEditar] = useState(false)
  const [formData, setFormData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // =========================
  // 🔥 BUSCAR USUÁRIO COMPLETO DO BANCO
  // =========================
  const fetchUser = async () => {
    try {
      setLoading(true)
      setError(null)

      // 🔥 busca usuário logado completo
      const response = await api.get('/me')

      const user = response.data

      // normaliza dados caso backend venha incompleto
      const userFormatted = {
        _id: user?._id,
        nome: user?.nome || '',
        email: user?.email || '',
        status: user?.status || 'ativo',
        tipo: user?.tipo || 'paciente',

        // métricas (vindas do banco ou default)
        totalConsultas: user?.totalConsultas ?? 0,
        ultimaConsulta: user?.ultimaConsulta || 'N/A',
        cpf: user?.cpf || 'N/A',

        // extras futuros
        telefone: user?.telefone || '',
        createdAt: user?.createdAt || null,
      }

      setFormData(userFormatted)

    } catch (error) {
      console.error('❌ ERRO AO BUSCAR USUÁRIO:', error)
      setError('Erro ao carregar dados do usuário')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // =========================
  // SALVAR NO BANCO
  // =========================
  const handleSalvar = async () => {
    try {
      await api.put(`/usuarios/${formData._id}`, formData)

      setEditar(false)

      // 🔥 recarrega dados atualizados do banco
      await fetchUser()

      console.log('✅ USUÁRIO ATUALIZADO COM SUCESSO')

    } catch (error) {
      console.error('❌ ERRO AO SALVAR:', error)
      alert('Erro ao salvar alterações')
    }
  }

  const isBlocked = formData?.status === 'bloqueado'

  const inputClass = `
    w-full rounded-xl border border-slate-300
    px-4 py-3 text-sm outline-none transition
    focus:border-[#132190] focus:ring-4 focus:ring-blue-100
    disabled:bg-slate-100 disabled:text-slate-400
  `

  // =========================
  // LOADING / ERROR
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1220] text-white">
        Carregando usuário...
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1220] text-red-400">
        {error}
      </div>
    )
  }

  if (!formData) return null

  return (
    <div className="min-h-screen bg-[#0B1220] px-5 py-10 text-white">
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate('/admin')}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="text-3xl font-bold">
              Configuração do Usuário
            </h1>
            <p className="text-slate-400">
              Dados completos do usuário no sistema
            </p>
          </div>
        </div>

        {/* STATUS */}
        <div className="mb-6 flex flex-wrap gap-3">
          <span className="flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-2 text-green-300">
            <FaCheckCircle />
            {formData.status}
          </span>

          <span className="flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2 text-blue-300">
            <FaUserShield />
            {formData.tipo}
          </span>

          {isBlocked && (
            <span className="flex items-center gap-2 rounded-full bg-red-500/20 px-4 py-2 text-red-300">
              <FaBan />
              BLOQUEADO
            </span>
          )}
        </div>

        {/* EDITAR */}
        {!editar && (
          <div className="mb-6 text-right">
            <button
              onClick={() => setEditar(true)}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
            >
              <FaEdit />
              Editar
            </button>
          </div>
        )}

        {/* DADOS USUÁRIO */}
        <section className="mb-6 rounded-2xl bg-[#111A2E] p-6">
          <div className="mb-5 flex items-center gap-2 text-blue-400">
            <FaUser />
            <h2 className="text-lg font-bold">Dados do Usuário</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <input
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              disabled={!editar}
              className={inputClass}
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!editar}
              className={inputClass}
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={!editar}
              className={inputClass}
            >
              <option value="ativo">Ativo</option>
              <option value="bloqueado">Bloqueado</option>
            </select>

            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              disabled={!editar}
              className={inputClass}
            >
              <option value="paciente">Paciente</option>
              <option value="medico">Médico</option>
              <option value="admin">Admin</option>
            </select>

            <input
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              disabled={!editar}
              className={inputClass}
              placeholder="Telefone"
            />

            <input
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              disabled
              className={inputClass}
            />
          </div>
        </section>

        {/* MÉTRICAS */}
        <section className="mb-6 rounded-2xl bg-[#111A2E] p-6">
          <div className="mb-5 flex items-center gap-2 text-purple-400">
            <FaShieldAlt />
            <h2 className="text-lg font-bold">Métricas do Sistema</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">

            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-slate-400">Consultas</p>
              <h3 className="text-2xl font-bold">
                {formData.totalConsultas}
              </h3>
            </div>

            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-slate-400">Última consulta</p>
              <h3 className="text-lg font-bold">
                {formData.ultimaConsulta}
              </h3>
            </div>

            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-slate-400">CPF</p>
              <h3 className="text-lg font-bold">
                {formData.cpf}
              </h3>
            </div>

          </div>
        </section>

        {/* BOTÕES */}
        <div className="flex gap-4">

          {editar ? (
            <>
              <button
                onClick={() => setEditar(false)}
                className="flex-1 rounded-xl bg-slate-600 py-4 font-semibold"
              >
                Cancelar
              </button>

              <button
                onClick={handleSalvar}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 py-4 font-semibold"
              >
                <FaSave />
                Salvar
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/admin')}
              className="flex-1 rounded-xl bg-white/10 py-4 font-semibold"
            >
              Voltar
            </button>
          )}

        </div>

      </div>
    </div>
  )
}