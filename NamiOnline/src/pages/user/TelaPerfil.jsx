import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaBell,
  FaEye,
  FaMoon,
  FaCheckCircle,
  FaSun,
  FaSave,
  FaSignOutAlt,
} from "react-icons/fa";

import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";

export default function TelaPerfil() {
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useContext(AuthContext);

  // =========================
  // STATES
  // =========================
  const [notificacoes, setNotificacoes] = useState(true);
  const [tema, setTema] = useState("claro");

  const dark = tema === "escuro";

  // =========================
  // CARREGAR CONFIG DO BACKEND
  // =========================
  useEffect(() => {
    const carregarConfiguracoes = async () => {
      try {
        const { data } = await api.get("/configuracoes");

        if (data?.tema) setTema(data.tema);
        if (data?.notificacoes !== undefined) {
          setNotificacoes(data.notificacoes);
        }

        if (data?.tema === "escuro") {
          document.body.classList.add("dark");
        } else {
          document.body.classList.remove("dark");
        }
      } catch (error) {
        console.error("Erro ao carregar configurações:", error);
      }
    };

    carregarConfiguracoes();
  }, []);

  // =========================
  // SALVAR TEMA
  // =========================
  const salvarTema = async () => {
    try {
      await api.post("/configuracoes/tema", { tema });

      localStorage.setItem("tema", tema);

      if (tema === "escuro") {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }

      alert("Tema salvo com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar tema");
    }
  };

  // =========================
  // ALTERAR NOTIFICAÇÕES
  // =========================
  const alterarNotificacoes = async () => {
    try {
      const novoValor = !notificacoes;
      setNotificacoes(novoValor);

      await api.post("/configuracoes/notificacoes", {
        notificacoes: novoValor,
      });
    } catch (error) {
      console.error(error);
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
        dark ? "bg-[#0F172A] text-white" : "bg-[#F8FAFC] text-slate-800"
      }`}
    >
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="mb-10 flex items-center gap-4">
          <button
            onClick={() => navigate("/home")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#132190] text-white hover:bg-[#004AF7]"
          >
            <FaArrowLeft />
          </button>

          <h1 className="text-3xl font-bold">Meu Perfil</h1>
        </div>

        {/* USUÁRIO */}
        <div className="mb-8 rounded-3xl border bg-white p-10 shadow-xl dark:bg-[#1E293B]">
          <div className="text-center">
            <h2 className="text-3xl font-bold">
              {user?.nome || "Usuário"}
            </h2>

            <p className="mt-2 text-gray-500">
              Bem-vindo ao sistema Nami Online
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700">
              <FaCheckCircle />
              {isAdmin() ? "Administrador" : "Conta ativa"}
            </div>
          </div>
        </div>

        {/* NOTIFICAÇÕES */}
        <div className="mb-6 rounded-3xl border bg-white shadow-xl dark:bg-[#1E293B]">
          <div className="flex items-center gap-3 bg-gradient-to-r from-[#004AF7] to-[#132190] px-6 py-5 text-white">
            <FaBell />
            Notificações
          </div>

          <div className="flex items-center justify-between p-6">
            <div>
              <h3 className="font-semibold">Notificações do App</h3>
              <p className="text-sm text-gray-500">
                Receba avisos de consultas e retornos
              </p>
            </div>

            <button
              onClick={alterarNotificacoes}
              className={`relative h-8 w-14 rounded-full transition ${
                notificacoes ? "bg-[#132190]" : "bg-gray-400"
              }`}
            >
              <span
                className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${
                  notificacoes ? "left-7" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* TEMA */}
        <div className="mb-6 rounded-3xl border bg-white shadow-xl dark:bg-[#1E293B]">
          <div className="flex items-center gap-3 bg-gradient-to-r from-[#004AF7] to-[#132190] px-6 py-5 text-white">
            <FaEye />
            Preferências
          </div>

          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-3">
              {dark ? <FaMoon /> : <FaSun />}

              <div>
                <h3 className="font-semibold">Tema</h3>
                <p className="text-sm text-gray-500">
                  Escolha o tema do sistema
                </p>
              </div>
            </div>

            <select
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              className="rounded border px-3 py-2 text-black"
            >
              <option value="claro">Claro</option>
              <option value="escuro">Escuro</option>
            </select>
          </div>
        </div>

        {/* BOTÕES */}
        <div className="rounded-3xl border bg-white p-6 shadow-xl dark:bg-[#1E293B]">
          <div className="grid gap-4 md:grid-cols-2">

            <button
              onClick={() => navigate("/home")}
              className="rounded-xl bg-gray-200 px-5 py-4 font-semibold"
            >
              Voltar
            </button>

            <button
              onClick={salvarTema}
              className="rounded-xl bg-[#004AF7] px-5 py-4 font-semibold text-white"
            >
              <FaSave /> Salvar Tema
            </button>

            <button
              onClick={handleLogout}
              className="md:col-span-2 flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-4 font-semibold text-white"
            >
              <FaSignOutAlt />
              Sair da Conta
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}