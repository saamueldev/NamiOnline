import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  FaArrowLeft,
  FaBell,
  FaEye,
  FaQuestionCircle,
  FaSignOutAlt,
  FaMoon,
  FaCheckCircle,
  FaSun,
  FaSave,
  FaComments
} from 'react-icons/fa'

import { AuthContext } from '../../context/AuthContext'
import api from '../../services/api'

export default function TelaPerfil() {

  const navigate = useNavigate()

  const { user, logout, isAdmin } = useContext(AuthContext)

  // =========================
  // STATES
  // =========================
  const [notificacoes, setNotificacoes] = useState(
    JSON.parse(localStorage.getItem('notificacoes')) ?? true
  )

  const [tema, setTema] = useState(
    localStorage.getItem('tema') || 'claro'
  )

  // =========================
  // APLICA TEMA
  // =========================
  useEffect(() => {

    const temaSalvo = localStorage.getItem('tema') || 'claro'

    setTema(temaSalvo)

    if (temaSalvo === 'escuro') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }

  }, [])

  // =========================
  // SALVAR TEMA
  // =========================
  const salvarTema = async () => {

    try {

      await api.post('/configuracoes/tema', { tema })


      await fetch("http://localhost:3000/configuracoes/tema", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tema,
        }),
      })


      localStorage.setItem("tema", tema)

      if (tema === "escuro") {
        document.body.classList.add("dark")
      } else {
        document.body.classList.remove("dark")
      }

      alert("Tema salvo com sucesso!")

    } catch (error) {

      console.error(error)
      alert("Erro ao salvar tema")

    }
  }

  // =========================
  // NOTIFICAÇÕES
  // =========================
  const alterarNotificacoes = async () => {

    const novoValor = !notificacoes

    setNotificacoes(novoValor)

    localStorage.setItem(
      'notificacoes',
      JSON.stringify(novoValor)
    )

    try {

      await fetch("http://localhost:3000/configuracoes/notificacoes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notificacoes: novoValor,
        }),
      })

    } catch (error) {

      console.error(error)

    }
  }

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {

    logout()
    navigate('/')

  }

  const dark = tema === 'escuro'

  return (

    <div
      className={`min-h-screen px-5 py-10 font-sans transition-all duration-300 ${
        dark
          ? 'bg-[#0F172A] text-white'
          : 'bg-[#F8FAFC] text-slate-800'
      }`}
    >

      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="mb-10 flex items-center gap-4">

          <button
            onClick={() => navigate('/home')}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#132190] text-xl text-white transition hover:bg-[#004AF7]"
          >
            <FaArrowLeft />
          </button>

          <h1
            className={`text-3xl font-bold ${
              dark ? 'text-white' : 'text-[#132190]'
            }`}
          >
            Meu Perfil
          </h1>

        </div>

        {/* CARD USUÁRIO */}
        <div
          className={`mb-8 rounded-[24px] border p-10 shadow-xl transition-all ${
            dark
              ? 'border-[#334155] bg-[#1E293B]'
              : 'border-slate-200 bg-white'
          }`}
        >

          <div className="flex flex-col items-center justify-center text-center">

            <h2
              className={`text-4xl font-bold ${
                dark ? 'text-white' : 'text-[#132190]'
              }`}
            >
              {user?.nome || 'Usuário Nami'}
            </h2>

            <p
              className={`mt-3 text-lg ${
                dark ? 'text-slate-300' : 'text-slate-500'
              }`}
            >
              Bem-vindo ao sistema Nami Online
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">
              <FaCheckCircle />
              {isAdmin() ? 'Administrador' : 'Conta ativa'}
            </div>

          </div>

        </div>

        {/* SEÇÕES */}
        <div className="grid gap-6">

          {/* NOTIFICAÇÕES */}
          <div
            className={`overflow-hidden rounded-[24px] border shadow-xl ${
              dark
                ? 'border-[#334155] bg-[#1E293B]'
                : 'border-slate-200 bg-white'
            }`}
          >

            <div className="flex items-center gap-3 bg-gradient-to-r from-[#004AF7] to-[#132190] px-6 py-5 text-lg font-semibold text-white">
              <FaBell />
              Notificações
            </div>

            <div className="p-6">

              <div className="flex flex-col justify-between gap-4 py-5 md:flex-row md:items-center">

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl text-[#004AF7]">
                    <FaBell />
                  </div>

                  <div>

                    <h3 className="font-semibold">
                      Notificações do App
                    </h3>

                    <p
                      className={`text-sm ${
                        dark ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      Receba avisos de consultas e retornos
                    </p>

                  </div>

                </div>

                <button
                  onClick={alterarNotificacoes}
                  className={`relative h-8 w-14 rounded-full transition ${
                    notificacoes
                      ? 'bg-[#132190]'
                      : 'bg-slate-400'
                  }`}
                >

                  <span
                    className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${
                      notificacoes
                        ? 'left-7'
                        : 'left-1'
                    }`}
                  />

                </button>

              </div>

            </div>

          </div>

          {/* PREFERÊNCIAS */}
          <div
            className={`overflow-hidden rounded-[24px] border shadow-xl ${
              dark
                ? 'border-[#334155] bg-[#1E293B]'
                : 'border-slate-200 bg-white'
            }`}
          >

            <div className="flex items-center gap-3 bg-gradient-to-r from-[#004AF7] to-[#132190] px-6 py-5 text-lg font-semibold text-white">
              <FaEye />
              Preferências
            </div>

            <div className="p-6">

              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <div className="flex items-center gap-4">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-[#004AF7]">
                    {dark ? <FaMoon /> : <FaSun />}
                  </div>

                  <div>

                    <h3 className="font-semibold">
                      Tema
                    </h3>

                    <p
                      className={`text-sm ${
                        dark ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      Escolha o tema do sistema
                    </p>

                  </div>

                </div>

                <select
                  value={tema}
                  onChange={(e) => setTema(e.target.value)}
                  className={`rounded-lg border px-4 py-2 text-sm outline-none transition ${
                    dark
                      ? 'border-[#475569] bg-[#0F172A] text-white'
                      : 'border-slate-300 bg-white text-black'
                  }`}
                >
                  <option value="claro">Claro</option>
                  <option value="escuro">Escuro</option>
                </select>

              </div>

            </div>

          </div>

          {/* AJUDA */}
          <div
            className={`overflow-hidden rounded-[24px] border shadow-xl ${
              dark
                ? 'border-[#334155] bg-[#1E293B]'
                : 'border-slate-200 bg-white'
            }`}
          >

            <div className="flex items-center gap-3 bg-gradient-to-r from-[#004AF7] to-[#132190] px-6 py-5 text-lg font-semibold text-white">
              <FaQuestionCircle />
              Ajuda
            </div>

            <div className="p-6">

              <button
                onClick={() => navigate('/central-ajuda')}
                className={`flex w-full items-center justify-center gap-3 rounded-2xl px-5 py-4 font-semibold transition ${
                  dark
                    ? 'bg-[#0F172A] text-white hover:bg-[#334155]'
                    : 'bg-[#E4F2FE] text-[#132190] hover:bg-[#87B7FE] hover:text-white'
                }`}
              >
                <FaComments />
                Perguntas Frequentes
              </button>

            </div>

          </div>

          {/* BOTÕES */}
          <div
            className={`rounded-[24px] border p-6 shadow-xl ${
              dark
                ? 'border-[#334155] bg-[#1E293B]'
                : 'border-slate-200 bg-white'
            }`}
          >

            <div className="grid gap-4 md:grid-cols-2">

              <button
                onClick={() => navigate('/home')}
                className="rounded-xl bg-[#E4F2FE] px-5 py-4 font-semibold text-[#132190] transition hover:bg-[#87B7FE] hover:text-white"
              >
                ← Voltar
              </button>

              <button
                onClick={salvarTema}
                className="flex items-center justify-center gap-3 rounded-xl bg-[#004AF7] px-5 py-4 font-semibold text-white transition hover:bg-[#132190]"
              >
                <FaSave />
                Salvar
              </button>

              <button
                onClick={handleLogout}
                className="md:col-span-2 flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-4 font-semibold text-white transition hover:bg-red-600"
              >
                <FaSignOutAlt />
                Sair da Conta
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}
