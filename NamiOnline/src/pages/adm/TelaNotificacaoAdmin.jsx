import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaBell,
  FaCheck,
  FaCheckDouble,
  FaTrash,
  FaComments,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function TelaNotificacaoAdmin() {
  const navigate = useNavigate();

  const [notificacoes, setNotificacoes] = useState([]);

  // =========================
  // BUSCAR NOTIFICAÇÕES
  // =========================
  useEffect(() => {
    carregarNotificacoes();
  }, []);

  const carregarNotificacoes = async () => {
    try {
      const response = await api.get(
        "/notificacoes"
      );

      setNotificacoes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // MARCAR COMO LIDA
  // =========================
  const marcarComoLida = async (id) => {
    try {
      await api.patch(
        `/notificacoes/${id}/lida`
      );

      setNotificacoes((prev) =>
        prev.map((n) =>
          n._id === id
            ? { ...n, lida: true }
            : n
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

  // =========================
  // TODAS LIDAS
  // =========================
  const marcarTodas = async () => {
    try {
      await api.patch(
        "/notificacoes/marcar-todas"
      );

      carregarNotificacoes();
    } catch (error) {
      console.error(error);
    }
  };

  const naoLidas = notificacoes.filter(
    (n) => !n.lida
  ).length;

  return (
    <div className="min-h-screen bg-[#0F172A] p-8 text-white">

      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="mb-8 flex items-center gap-4">

          <button
            onClick={() => navigate(-1)}
            className="rounded-full bg-[#132190] p-4 transition hover:bg-[#004AF7]"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="flex items-center gap-3 text-4xl font-bold">
              <FaBell />
              Notificações Admin
            </h1>

            <p className="mt-1 text-slate-300">
              Central de notificações do sistema
            </p>
          </div>

        </div>

        {/* CARDS */}
        <div className="mb-8 grid gap-5 md:grid-cols-3">

          <div className="rounded-3xl bg-[#1E293B] p-6 shadow-xl">
            <h2 className="text-4xl font-bold">
              {notificacoes.length}
            </h2>

            <p className="mt-2 text-slate-300">
              Total
            </p>
          </div>

          <div className="rounded-3xl bg-gradient-to-r from-[#004AF7] to-[#132190] p-6 shadow-xl">
            <h2 className="text-4xl font-bold">
              {naoLidas}
            </h2>

            <p className="mt-2 text-slate-100">
              Não lidas
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/admin/chat")
            }
            className="rounded-3xl bg-[#1E293B] p-6 text-left transition hover:scale-105"
          >
            <FaComments className="mb-3 text-4xl text-cyan-400" />

            <h2 className="text-2xl font-bold">
              Novo Chat
            </h2>

            <p className="mt-2 text-slate-300">
              Iniciar atendimento
            </p>
          </button>

        </div>

        {/* BOTÃO */}
        {naoLidas > 0 && (
          <div className="mb-6">
            <button
              onClick={marcarTodas}
              className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#004AF7] to-[#132190] px-6 py-4 font-semibold transition hover:scale-105"
            >
              <FaCheckDouble />
              Marcar todas como lidas
            </button>
          </div>
        )}

        {/* LISTA */}
        <div className="space-y-5">

          {notificacoes.map((notif) => (
            <button
              key={notif._id}
              onClick={() =>
                navigate(
                  notif.rota || "/chat-admin"
                )
              }
              className={`w-full rounded-3xl border p-6 text-left transition hover:scale-[1.01] ${
                notif.lida
                  ? "border-slate-700 bg-[#1E293B]"
                  : "border-[#004AF7] bg-[#132190]"
              }`}
            >

              <div className="flex items-start justify-between gap-5">

                <div>
                  <h2 className="text-2xl font-bold">
                    {notif.titulo}
                  </h2>

                  <p className="mt-3 text-slate-200">
                    {notif.mensagem}
                  </p>
                </div>

                <div className="flex gap-3">

                  {!notif.lida && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        marcarComoLida(notif._id);
                      }}
                      className="rounded-xl bg-green-600 p-3"
                    >
                      <FaCheck />
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deletarNotificacao(
                        notif._id
                      );
                    }}
                    className="rounded-xl bg-red-600 p-3"
                  >
                    <FaTrash />
                  </button>

                </div>

              </div>

            </button>
          ))}

        </div>

      </div>
    </div>
  );
}