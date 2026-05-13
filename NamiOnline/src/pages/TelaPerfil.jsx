import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FaArrowLeft,
  FaBell,
  FaLock,
  FaEye,
  FaGlobe,
  FaQuestionCircle,
  FaSignOutAlt,
  FaCamera,
  FaCog
} from 'react-icons/fa'

import { AuthContext } from '../context/AuthContext'

export default function TelaPerfil() {
  const navigate = useNavigate()
  const { user, logout, isAdmin } = useContext(AuthContext)

  const [avatar] = useState(user?.avatar || '👤')
  const [notificacoes, setNotificacoes] = useState(true)
  const [emailNotif, setEmailNotif] = useState(true)
  const [tema, setTema] = useState('claro')
  const [idioma, setIdioma] = useState('pt-BR')

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

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#004AF7] to-[#132190] px-5 py-10 font-sans">

      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="mb-10 flex items-center gap-4">

          <button
            onClick={() => navigate('/home')}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-xl text-white transition hover:-translate-x-1 hover:bg-white/30"
          >
            <FaArrowLeft />
          </button>

          <h1 className="text-3xl font-bold text-white">
            Meu Perfil
          </h1>
        </div>

        {/* AVATAR */}
        <div className="mb-8 rounded-[24px] bg-white p-10 text-center shadow-2xl">

          <div className="relative mb-6 inline-block">

            <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full border-[5px] border-slate-100 bg-gradient-to-br from-[#004AF7] to-[#132190] text-6xl text-white">
              {avatar}
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
            <h2 className="mb-1 text-2xl font-semibold text-slate-800">
              {user?.nome || 'Usuário Nami'}
            </h2>

            <p className="mb-4 text-sm text-slate-500">
              {user?.email || 'usuario@nami.com.br'}
            </p>

            <div className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              {isAdmin() ? '👨‍💼 Administrador' : '✓ Conta Verificada'}
            </div>
          </div>
        </div>

        {/* SECTIONS */}
        <div className="grid gap-6">

          {/* NOTIFICAÇÕES */}
          <div className="overflow-hidden rounded-[24px] bg-white shadow-2xl">

            <div className="flex items-center gap-3 bg-gradient-to-r from-[#004AF7] to-[#132190] px-6 py-5 text-lg font-semibold text-white">
              <FaBell />
              Notificações
            </div>

            <div className="p-6">

              {/* OPTION */}
              <div className="flex flex-col justify-between gap-4 border-b border-slate-100 py-5 md:flex-row md:items-center">

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl text-[#004AF7]">
                    🔔
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800">
                      Notificações do App
                    </h3>

                    <p className="text-sm text-slate-500">
                      Receba avisos de consultas e retornos
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setNotificacoes(!notificacoes)}
                  className={`relative h-8 w-14 rounded-full transition ${
                    notificacoes ? 'bg-[#132190]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${
                      notificacoes ? 'left-7' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              {/* OPTION */}
              <div className="flex flex-col justify-between gap-4 py-5 md:flex-row md:items-center">

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl text-[#004AF7]">
                    ✉️
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800">
                      Notificações por Email
                    </h3>

                    <p className="text-sm text-slate-500">
                      Receberá atualizações importantes
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setEmailNotif(!emailNotif)}
                  className={`relative h-8 w-14 rounded-full transition ${
                    emailNotif ? 'bg-[#132190]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${
                      emailNotif ? 'left-7' : 'left-1'
                    }`}
                  />
                </button>
              </div>

            </div>
          </div>

          {/* PREFERÊNCIAS */}
          <div className="overflow-hidden rounded-[24px] bg-white shadow-2xl">

            <div className="flex items-center gap-3 bg-gradient-to-r from-[#004AF7] to-[#132190] px-6 py-5 text-lg font-semibold text-white">
              <FaEye />
              Preferências
            </div>

            <div className="p-6 space-y-6">

              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-[#004AF7]">
                    🎨
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800">
                      Tema
                    </h3>

                    <p className="text-sm text-slate-500">
                      Altere a aparência do app
                    </p>
                  </div>
                </div>

                <select
                  value={tema}
                  onChange={(e) => setTema(e.target.value)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-[#132190] focus:ring-4 focus:ring-blue-100"
                >
                  <option value="claro">Claro</option>
                  <option value="escuro">Escuro</option>
                  <option value="auto">Automático</option>
                </select>
              </div>

              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-[#004AF7]">
                    <FaGlobe />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800">
                      Idioma
                    </h3>

                    <p className="text-sm text-slate-500">
                      Idioma de preferência
                    </p>
                  </div>
                </div>

                <select
                  value={idioma}
                  onChange={(e) => setIdioma(e.target.value)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-[#132190] focus:ring-4 focus:ring-blue-100"
                >
                  <option value="pt-BR">Português</option>
                  <option value="en-US">English</option>
                  <option value="es-ES">Español</option>
                </select>
              </div>

            </div>
          </div>

          {/* SEGURANÇA */}
          <div className="overflow-hidden rounded-[24px] bg-white shadow-2xl">

            <div className="flex items-center gap-3 bg-gradient-to-r from-[#004AF7] to-[#132190] px-6 py-5 text-lg font-semibold text-white">
              <FaLock />
              Segurança
            </div>

            <div className="p-6 space-y-5">

              <button className="w-full rounded-xl bg-[#E4F2FE] px-5 py-4 font-semibold text-[#132190] transition hover:-translate-y-1 hover:bg-[#87B7FE] hover:text-white">
                Alterar Senha
              </button>

              <button className="w-full rounded-xl bg-[#E4F2FE] px-5 py-4 font-semibold text-[#132190] transition hover:-translate-y-1 hover:bg-[#87B7FE] hover:text-white">
                Gerenciar Dispositivos
              </button>

            </div>
          </div>

          {/* GERENCIAMENTO */}
          <div className="overflow-hidden rounded-[24px] bg-white shadow-2xl">

            <div className="flex items-center gap-3 bg-gradient-to-r from-[#004AF7] to-[#132190] px-6 py-5 text-lg font-semibold text-white">
              <FaCog />
              Gerenciamento
            </div>

            <div className="p-6 grid gap-4">

              <button
                onClick={() => navigate('/meus-agendamentos')}
                className="rounded-xl bg-[#E4F2FE] px-5 py-4 font-semibold text-[#132190] transition hover:bg-[#87B7FE] hover:text-white"
              >
                Meus Agendamentos
              </button>

              <button
                onClick={() => navigate('/perfil/configuracoes')}
                className="rounded-xl bg-[#E4F2FE] px-5 py-4 font-semibold text-[#132190] transition hover:bg-[#87B7FE] hover:text-white"
              >
                Configurações de Usuário
              </button>

              {isAdmin() && (
                <button
                  onClick={() => navigate('/notificacoes-admin')}
                  className="rounded-xl bg-[#E4F2FE] px-5 py-4 font-semibold text-[#132190] transition hover:bg-[#87B7FE] hover:text-white"
                >
                  Notificações Admin
                </button>
              )}
            </div>
          </div>

          {/* AJUDA */}
          <div className="overflow-hidden rounded-[24px] bg-white shadow-2xl">

            <div className="flex items-center gap-3 bg-gradient-to-r from-[#004AF7] to-[#132190] px-6 py-5 text-lg font-semibold text-white">
              <FaQuestionCircle />
              Ajuda
            </div>

            <div className="p-6 space-y-4">

              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-800">
                  Centro de Ajuda
                </h3>

                <p className="text-sm text-slate-500">
                  Dúvidas frequentes e suporte
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-800">
                  Contato com Suporte
                </h3>

                <p className="text-sm text-slate-500">
                  (11) 4000-1234
                </p>
              </div>

            </div>
          </div>

          {/* ACTIONS */}
          <div className="rounded-[24px] bg-white p-6 shadow-2xl">

            <div className="grid gap-4 md:grid-cols-2">

              <button
                onClick={() => navigate('/home')}
                className="rounded-xl bg-[#E4F2FE] px-5 py-4 font-semibold text-[#132190] transition hover:bg-[#87B7FE] hover:text-white"
              >
                ← Voltar
              </button>

              <button className="rounded-xl bg-[#E4F2FE] px-5 py-4 font-semibold text-[#132190] transition hover:bg-[#87B7FE] hover:text-white">
                💾 Salvar
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
        <div className="mt-10 text-center text-xs text-white">
          © 2026 Nami Online - Todos os direitos reservados
        </div>

      </div>
    </div>
  )
}