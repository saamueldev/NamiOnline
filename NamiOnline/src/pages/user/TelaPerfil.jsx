import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FaArrowLeft,
  FaBell,
  FaLock,
  FaEye,
  FaQuestionCircle,
  FaSignOutAlt,
  FaCamera,
  FaCog,
  FaUserShield,
  FaEnvelope,
  FaMoon,
  FaCalendarCheck,
  FaUserCog,
  FaCheckCircle,
  FaSun,
  FaSave
} from 'react-icons/fa'

import { AuthContext } from '../../context/AuthContext'

export default function TelaPerfil() {
  const navigate = useNavigate()
  const { user, logout, isAdmin } = useContext(AuthContext)

  const [avatar] = useState(user?.avatar || null)
  const [notificacoes, setNotificacoes] = useState(true)

  // =========================
  // TEMA
  // =========================
  const [tema, setTema] = useState(
    localStorage.getItem('tema') || 'claro'
  )

  // =========================
  // APLICA O TEMA AO ENTRAR
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
      // ENVIA PARA O BACKEND
      await fetch("http://localhost:3000/configuracoes/tema", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tema,
        }),
      })

      // SALVA LOCALMENTE
      localStorage.setItem("tema", tema)

      // ALTERA O BODY
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
  // AVATAR
  // =========================
  const handleAvatarChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        console.log('Imagem selecionada:', file.name)
      }

      reader.readAsDataURL(file)
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

        {/* AVATAR */}
        <div
          className={`mb-8 rounded-[24px] p-10 text-center shadow-xl border transition-all ${
            dark
              ? 'bg-[#1E293B] border-[#334155]'
              : 'bg-white border-slate-200'
          }`}
        >
          <div className="relative mb-6 inline-block">

            <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full border-[5px] border-slate-100 bg-gradient-to-br from-[#004AF7] to-[#132190] text-6xl text-white">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Avatar"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <FaUserShield />
              )}
            </div>

            <label className="absolute -bottom-2 -right-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-[3px] border-[#132190] bg-white text-2xl shadow-lg transition hover:scale-110 hover:bg-[#132190] hover:text-white">
              <FaCamera />

              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <h2
              className={`mb-3 text-2xl font-semibold ${
                dark ? 'text-white' : 'text-slate-800'
              }`}
            >
              {user?.nome || 'Usuário Nami'}
            </h2>

            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              <FaCheckCircle />
              {isAdmin() ? 'Administrador' : 'Conta ativa'}
            </div>
          </div>
        </div>

        {/* SECTIONS */}
        <div className="grid gap-6">

          {/* NOTIFICAÇÕES */}
          <div
            className={`overflow-hidden rounded-[24px] shadow-xl border ${
              dark
                ? 'bg-[#1E293B] border-[#334155]'
                : 'bg-white border-slate-200'
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
                  onClick={() => setNotificacoes(!notificacoes)}
                  className={`relative h-8 w-14 rounded-full transition ${
                    notificacoes ? 'bg-[#132190]' : 'bg-slate-400'
                  }`}
                >
                  <span
                    className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${
                      notificacoes ? 'left-7' : 'left-1'
                    }`}
                  />
                </button>
              </div>

            </div>
          </div>

          {/* PREFERÊNCIAS */}
          <div
            className={`overflow-hidden rounded-[24px] shadow-xl border ${
              dark
                ? 'bg-[#1E293B] border-[#334155]'
                : 'bg-white border-slate-200'
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
                      ? 'bg-[#0F172A] border-[#475569] text-white'
                      : 'bg-white border-slate-300 text-black'
                  }`}
                >
                  <option value="claro">Claro</option>
                  <option value="escuro">Escuro</option>
                </select>
              </div>

            </div>
          </div>

          {/* SEGURANÇA */}
          <div
            className={`overflow-hidden rounded-[24px] shadow-xl border ${
              dark
                ? 'bg-[#1E293B] border-[#334155]'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center gap-3 bg-gradient-to-r from-[#004AF7] to-[#132190] px-6 py-5 text-lg font-semibold text-white">
              <FaLock />
              Segurança
            </div>

            <div className="p-6 space-y-5">

              <button className="w-full rounded-xl bg-[#E4F2FE] px-5 py-4 font-semibold text-[#132190] transition hover:bg-[#87B7FE] hover:text-white flex items-center justify-center gap-3">
                <FaLock />
                Alterar Senha
              </button>

            </div>
          </div>

          {/* GERENCIAMENTO */}
          <div
            className={`overflow-hidden rounded-[24px] shadow-xl border ${
              dark
                ? 'bg-[#1E293B] border-[#334155]'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center gap-3 bg-gradient-to-r from-[#004AF7] to-[#132190] px-6 py-5 text-lg font-semibold text-white">
              <FaCog />
              Gerenciamento
            </div>

            <div className="p-6 grid gap-4">

              <button
                onClick={() => navigate('/meus-agendamentos')}
                className="flex items-center justify-center gap-3 rounded-xl bg-[#E4F2FE] px-5 py-4 font-semibold text-[#132190] transition hover:bg-[#87B7FE] hover:text-white"
              >
                <FaCalendarCheck />
                Meus Agendamentos
              </button>

              <button
                onClick={() => navigate('/perfil/configuracoes')}
                className="flex items-center justify-center gap-3 rounded-xl bg-[#E4F2FE] px-5 py-4 font-semibold text-[#132190] transition hover:bg-[#87B7FE] hover:text-white"
              >
                <FaUserCog />
                Configurações de Usuário
              </button>

            </div>
          </div>

          {/* AJUDA */}
          <div
            className={`overflow-hidden rounded-[24px] shadow-xl border ${
              dark
                ? 'bg-[#1E293B] border-[#334155]'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center gap-3 bg-gradient-to-r from-[#004AF7] to-[#132190] px-6 py-5 text-lg font-semibold text-white">
              <FaQuestionCircle />
              Ajuda
            </div>

            <div className="p-6 space-y-4">

              <button
                onClick={() => navigate('/central-ajuda')}
                className={`w-full rounded-xl border p-4 text-left transition ${
                  dark
                    ? 'border-[#475569] hover:bg-[#334155]'
                    : 'border-slate-200 hover:bg-[#E4F2FE]'
                }`}
              >
                <h3 className="font-semibold">
                  Centro de Ajuda
                </h3>

                <p
                  className={`text-sm ${
                    dark ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  Dúvidas frequentes e suporte
                </p>
              </button>

              <div
                className={`rounded-xl border p-4 flex items-center gap-3 ${
                  dark
                    ? 'border-[#475569]'
                    : 'border-slate-200'
                }`}
              >
                <FaEnvelope className="text-[#004AF7]" />

                <div>
                  <h3 className="font-semibold">
                    Contato com Suporte
                  </h3>

                  <p
                    className={`text-sm ${
                      dark ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    suporte@nami.com
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ACTIONS */}
          <div
            className={`rounded-[24px] p-6 shadow-xl border ${
              dark
                ? 'bg-[#1E293B] border-[#334155]'
                : 'bg-white border-slate-200'
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
                className="md:col-span-2 flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-red-600"
              >
                <FaSignOutAlt />
                Sair da Conta
              </button>

            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div
          className={`mt-10 text-center text-xs ${
            dark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          © 2026 Nami Online - Todos os direitos reservados
        </div>

      </div>
    </div>
  )
}