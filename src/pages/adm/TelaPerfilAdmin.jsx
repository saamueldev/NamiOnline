import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaBell,
  FaLock,
  FaEye,
  FaQuestionCircle,
  FaSignOutAlt,
  FaCog,
  FaCheckCircle,
  FaMoon,
  FaSun,
  FaSave,
  FaEnvelope,
  FaUserCog,
} from "react-icons/fa";

import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";

export default function TelaPerfilAdmin() {
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useContext(AuthContext);

  const [notificacoes, setNotificacoes] = useState(true);
  const [tema, setTema] = useState(
    localStorage.getItem("tema") || "claro"
  );

  const dark = tema === "escuro";

  // =========================
  // APLICAR TEMA GLOBAL
  // =========================
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  // =========================
  // SALVAR TEMA
  // =========================
  const salvarTema = async () => {
    try {
      await api.post("/configuracoes/tema", { tema });

      localStorage.setItem("tema", tema);

      document.documentElement.classList.toggle("dark", dark);
      document.body.classList.toggle("dark", dark);

      alert("Tema salvo com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar tema");
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      className={`min-h-screen px-5 py-10 transition-all duration-300 ${
        dark
          ? "bg-[#0F172A] text-white"
          : "bg-[#F8FAFC] text-slate-800"
      }`}
    >
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="mb-10 flex items-center gap-4">
          <button
            onClick={() => navigate("/home")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#132190] text-white"
          >
            <FaArrowLeft />
          </button>

          <h1 className="text-3xl font-bold">
            Meu Perfil
          </h1>
        </div>

        {/* USER CARD */}
        <div
          className={`mb-8 rounded-3xl border p-10 text-center shadow-xl transition ${
            dark
              ? "bg-[#1E293B] border-slate-700"
              : "bg-white border-slate-200"
          }`}
        >
          <h2 className="text-3xl font-bold">
            {user?.nome || "Usuário"}
          </h2>

          <p className="mt-2 opacity-70">
            Bem-vindo ao Nami Online
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700">
            <FaCheckCircle />
            {isAdmin() ? "Administrador" : "Conta ativa"}
          </div>
        </div>

        {/* NOTIFICAÇÕES */}
        <div
          className={`mb-6 overflow-hidden rounded-3xl border shadow-xl transition ${
            dark
              ? "bg-[#1E293B] border-slate-700"
              : "bg-white border-slate-200"
          }`}
        >
          <div className="flex items-center gap-3 bg-gradient-to-r from-[#004AF7] to-[#132190] px-6 py-5 text-white">
            <FaBell />
            Notificações
          </div>

          <div className="flex items-center justify-between p-6">
            <div>
              <h3 className="font-semibold">
                Notificações do App
              </h3>

              <p className="text-sm opacity-70">
                Receba avisos de consultas e retornos
              </p>
            </div>

            <button
              onClick={() => setNotificacoes(!notificacoes)}
              className={`relative h-8 w-14 rounded-full transition ${
                notificacoes
                  ? "bg-[#132190]"
                  : "bg-gray-400"
              }`}
            >
              <span
                className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${
                  notificacoes
                    ? "left-7"
                    : "left-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* PREFERÊNCIAS */}
        <div
          className={`mb-6 overflow-hidden rounded-3xl border shadow-xl transition ${
            dark
              ? "bg-[#1E293B] border-slate-700"
              : "bg-white border-slate-200"
          }`}
        >
          <div className="flex items-center gap-3 bg-gradient-to-r from-[#004AF7] to-[#132190] px-6 py-5 text-white">
            <FaEye />
            Preferências
          </div>

          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-3">

              {dark ? <FaMoon /> : <FaSun />}

              <div>
                <h3 className="font-semibold">
                  Tema
                </h3>

                <p className="text-sm opacity-70">
                  Escolha o tema do sistema
                </p>
              </div>
            </div>

            <select
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              className={`rounded border px-3 py-2 transition ${
                dark
                  ? "bg-slate-800 text-white border-slate-600"
                  : "bg-white text-black border-slate-300"
              }`}
            >
              <option value="claro">
                Claro
              </option>

              <option value="escuro">
                Escuro
              </option>
            </select>
          </div>
        </div>

        {/* CONFIG USUARIO */}
        <div
          className={`mb-6 overflow-hidden rounded-3xl border shadow-xl transition ${
            dark
              ? "bg-[#1E293B] border-slate-700"
              : "bg-white border-slate-200"
          }`}
        >
          <div className="flex items-center gap-3 bg-gradient-to-r from-[#004AF7] to-[#132190] px-6 py-5 text-white">
            <FaUserCog />
            Configurações da Conta
          </div>

          <div className="p-6">
            <button
              onClick={() => navigate("/admin/configuracoes")}
              className={`flex w-full items-center justify-center gap-3 rounded-xl px-5 py-4 font-semibold transition ${
                dark
                  ? "bg-slate-800 text-white hover:bg-slate-700"
                  : "bg-slate-200 text-slate-800 hover:bg-slate-300"
              }`}
            >
              <FaCog />
              Abrir Configurações do Administrador
            </button>
          </div>
        </div>

        {/* SEGURANÇA */}
        <div
          className={`mb-6 overflow-hidden rounded-3xl border shadow-xl transition ${
            dark
              ? "bg-[#1E293B] border-slate-700"
              : "bg-white border-slate-200"
          }`}
        >
          <div className="flex items-center gap-3 bg-gradient-to-r from-[#004AF7] to-[#132190] px-6 py-5 text-white">
            <FaLock />
            Segurança
          </div>

          <div className="p-6">
            <button
              className={`w-full rounded-xl px-5 py-4 font-semibold transition ${
                dark
                  ? "bg-slate-800 text-white hover:bg-slate-700"
                  : "bg-slate-200 text-slate-800 hover:bg-slate-300"
              }`}
              onClick={() => navigate("/redefinir-senha/:token")}
            >
              Alterar Senha
            </button>
          </div>
        </div>

        {/* AJUDA */}
        <div
          className={`mb-6 overflow-hidden rounded-3xl border shadow-xl transition ${
            dark
              ? "bg-[#1E293B] border-slate-700"
              : "bg-white border-slate-200"
          }`}
        >
          <div className="flex items-center gap-3 bg-gradient-to-r from-[#004AF7] to-[#132190] px-6 py-5 text-white">
            <FaQuestionCircle />
            Ajuda
          </div>

          <div className="space-y-4 p-6">

            <button
              className={`w-full rounded-xl border p-4 text-left transition ${
                dark
                  ? "border-slate-600 hover:bg-slate-800"
                  : "border-slate-200 hover:bg-slate-100"
              }`}
              onClick={() => navigate("/admin/central-ajuda")}
            >
              Central de Ajuda
            </button>

            <div
              className={`flex items-center gap-3 rounded-xl border p-4 ${
                dark
                  ? "border-slate-600"
                  : "border-slate-200"
              }`}
            >
              <FaEnvelope className="text-[#004AF7]" />
              suporte@nami.com
            </div>

          </div>
        </div>

        {/* ACTIONS */}
        <div
          className={`rounded-3xl border p-6 shadow-xl transition ${
            dark
              ? "bg-[#1E293B] border-slate-700"
              : "bg-white border-slate-200"
          }`}
        >
          <div className="grid gap-4 md:grid-cols-2">

            <button
              onClick={() => navigate("/home")}
              className={`rounded-xl px-5 py-4 font-semibold transition ${
                dark
                  ? "bg-slate-800 text-white hover:bg-slate-700"
                  : "bg-slate-200 text-slate-800 hover:bg-slate-300"
              }`}
            >
              Voltar
            </button>

            <button
              onClick={salvarTema}
              className="flex items-center justify-center gap-3 rounded-xl bg-[#004AF7] px-5 py-4 font-semibold text-white"
            >
              <FaSave />
              Salvar Tema
            </button>

            <button
              onClick={handleLogout}
              className="md:col-span-2 flex items-center justify-center gap-3 rounded-xl bg-red-500 px-5 py-4 font-semibold text-white"
            >
              <FaSignOutAlt />
              Sair
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
