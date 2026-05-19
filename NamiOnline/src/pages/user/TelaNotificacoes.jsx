import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBell,
  FaArrowLeft,
  FaCalendarCheck,
  FaCheckCircle,
  FaQuestionCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import api from "../../services/api";

export default function TelaNotificacoes() {
  const navigate = useNavigate();

  const [notificacoes, setNotificacoes] = useState([]);
  const [tema, setTema] = useState(localStorage.getItem("tema") || "claro");

  const dark = tema === "escuro";

  const usuario =
    JSON.parse(localStorage.getItem("nami_user")) || {};

  // =========================
  // CARREGAR TEMA
  // =========================
  useEffect(() => {
    if (tema === "escuro") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [tema]);

  // =========================
  // CARREGAR NOTIFICAÇÕES
  // =========================
  useEffect(() => {
    if (!usuario?.id) return;

    carregarNotificacoes();

    const interval = setInterval(() => {
      carregarNotificacoes(false);
    }, 4000);

    return () => clearInterval(interval);
  }, [usuario?.id]);

  const carregarNotificacoes = async () => {
    try {
      const { data } = await api.get(
        `/notificacoes?usuarioId=${usuario.id}`
      );

      const ordenadas = (data || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setNotificacoes(ordenadas);
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
    }
  };

  return (
    <div
      className={`min-h-screen p-8 transition-all duration-300 ${
        dark ? "bg-[#0f172a] text-white" : "bg-[#f4f8ff] text-slate-800"
      }`}
    >
      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#132190] text-white"
          >
            <FaArrowLeft />
          </button>

          <h1 className="flex items-center gap-3 text-3xl font-bold">
            <FaBell />
            Notificações
          </h1>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-slate-800">
          {dark ? <FaMoon /> : <FaSun />}
        </div>
      </div>

      {/* CONTEÚDO */}
      <div
        className={`mx-auto max-w-3xl rounded-3xl p-8 shadow-lg ${
          dark ? "bg-slate-900" : "bg-white"
        }`}
      >
        {notificacoes.length > 0 ? (
          <div className="space-y-5">
            {notificacoes.map((item) => (
              <div
                key={item._id}
                className={`flex gap-4 rounded-2xl border p-5 ${
                  dark ? "border-slate-700 bg-slate-800" : "border-blue-100 bg-blue-50"
                }`}
              >
                <div className="rounded-full bg-[#004AF7] p-3 text-white">
                  <FaCalendarCheck />
                </div>

                <div>
                  <h2 className="text-lg font-bold">{item.titulo}</h2>
                  <p className="text-sm opacity-80">{item.mensagem}</p>

                  <div className="mt-3 flex items-center gap-2 text-green-500">
                    <FaCheckCircle />
                    Recebido
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center opacity-70">
            Nenhuma notificação encontrada
          </div>
        )}

        {/* FAQ */}
        <div className="mt-8 rounded-3xl border p-6">
          <div className="mb-4 flex items-center gap-3">
            <FaQuestionCircle className="text-[#004AF7]" />
            <h2 className="text-xl font-bold">FAQ</h2>
          </div>

          <div className="space-y-3">
            <button className="w-full rounded-xl border p-3 text-left">
              Como remarcar consulta?
            </button>

            <button className="w-full rounded-xl border p-3 text-left">
              Como acessar exames?
            </button>

            <button className="w-full rounded-xl border p-3 text-left">
              Como alterar retorno?
            </button>
          </div>
        </div>

        <button
          onClick={() => navigate("/home")}
          className="mt-8 w-full rounded-2xl bg-gradient-to-r from-[#004AF7] to-[#132190] py-4 font-bold text-white"
        >
          Voltar para Home
        </button>
      </div>
    </div>
  );
}