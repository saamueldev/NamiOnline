import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaBell,
  FaCheck,
  FaCheckDouble,
  FaTrash,
} from "react-icons/fa";

import api from "../../services/api";

export default function TelaNotificacoesAdmin() {
  const navigate = useNavigate();

  const [notificacoes, setNotificacoes] = useState([]);

  const [tema] = useState(
    localStorage.getItem("tema") || "claro"
  );

  const dark = tema === "escuro";

  const usuario =
    JSON.parse(localStorage.getItem("nami_user")) || {};

  // =========================
  // TEMA GLOBAL
  // =========================
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  // =========================
  // CARREGAR NOTIFICAÇÕES
  // =========================
  useEffect(() => {
    if (!usuario?.id) return;

    carregarNotificacoes();

    const interval = setInterval(() => {
      carregarNotificacoes();
    }, 5000);

    return () => clearInterval(interval);
  }, [usuario?.id]);

  const carregarNotificacoes = async () => {
    try {
      const { data } = await api.get(
        `/notificacoes?usuarioId=${usuario.id}`
      );

      setNotificacoes(data || []);
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
    }
  };

  // =========================
  // MARCAR COMO LIDA
  // =========================
  const marcarComoLida = async (id) => {
    try {
      await api.patch(`/notificacoes/${id}/lida`);

      setNotificacoes((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, lida: true } : n
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // DELETAR
  // =========================
  const deletarNotificacao = async (id) => {
    try {
      await api.delete(`/notificacoes/${id}`);

      setNotificacoes((prev) =>
        prev.filter((n) => n._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const naoLidas = notificacoes.filter((n) => !n.lida).length;

  return (
    <div
      className={`min-h-screen p-8 transition-all duration-300 ${
        dark
          ? "bg-[#0F172A] text-white"
          : "bg-[#F8FAFC] text-slate-800"
      }`}
    >
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="mb-8 flex items-center gap-4">

          <button
            onClick={() => navigate(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#132190] text-white hover:bg-[#004AF7] transition"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold">
              <FaBell />
              Notificações Admin
            </h1>

            <p className="mt-1 opacity-70">
              Central de notificações do sistema
            </p>
          </div>

        </div>

        {/* CARDS */}
        <div className="mb-8 grid gap-5 md:grid-cols-2">

          {/* TOTAL */}
          <div
            className={`rounded-3xl p-6 shadow-xl border ${
              dark
                ? "bg-[#1E293B] border-slate-700"
                : "bg-white border-slate-200"
            }`}
          >
            <h2 className="text-4xl font-bold">
              {notificacoes.length}
            </h2>
            <p className="mt-2 opacity-70">Total</p>
          </div>

          {/* NÃO LIDAS */}
          <div className="rounded-3xl bg-gradient-to-r from-[#004AF7] to-[#132190] p-6 shadow-xl text-white">
            <h2 className="text-4xl font-bold">
              {naoLidas}
            </h2>
            <p className="mt-2 opacity-90">Não lidas</p>
          </div>

        </div>

        {/* MARCAR TODAS */}
        {naoLidas > 0 && (
          <div className="mb-6">
            <button
              onClick={() =>
                Promise.all(
                  notificacoes.map((n) =>
                    !n.lida ? marcarComoLida(n._id) : null
                  )
                )
              }
              className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#004AF7] to-[#132190] px-6 py-4 font-semibold text-white hover:scale-[1.02] transition"
            >
              <FaCheckDouble />
              Marcar todas como lidas
            </button>
          </div>
        )}

        {/* LISTA */}
        <div className="space-y-5">

          {notificacoes.map((notif) => (
            <div
              key={notif._id}
              className={`rounded-3xl border p-6 transition ${
                dark
                  ? notif.lida
                    ? "border-slate-700 bg-[#1E293B]"
                    : "border-[#004AF7] bg-[#132190]"
                  : notif.lida
                  ? "border-slate-200 bg-white"
                  : "border-blue-200 bg-blue-50"
              }`}
            >

              <div className="flex items-start justify-between gap-5">

                <div>
                  <h2 className="text-2xl font-bold">
                    {notif.titulo}
                  </h2>

                  <p className="mt-3 opacity-80">
                    {notif.mensagem}
                  </p>
                </div>

                <div className="flex gap-3">

                  {!notif.lida && (
                    <button
                      onClick={() =>
                        marcarComoLida(notif._id)
                      }
                      className="rounded-xl bg-green-600 p-3 text-white hover:scale-105 transition"
                    >
                      <FaCheck />
                    </button>
                  )}

                  <button
                    onClick={() =>
                      deletarNotificacao(notif._id)
                    }
                    className="rounded-xl bg-red-600 p-3 text-white hover:scale-105 transition"
                  >
                    <FaTrash />
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}