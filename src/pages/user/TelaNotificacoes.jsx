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

export default function TelaNotificacoes() {
  const navigate = useNavigate();

  const [notificacoes, setNotificacoes] = useState([]);
  const [loading, setLoading] = useState(false);

  const usuario =
    JSON.parse(localStorage.getItem("nami_user")) ||
    JSON.parse(sessionStorage.getItem("nami_user"));

  const usuarioId = usuario?._id || usuario?.id;

  // =========================
  // CARREGAR NOTIFICAÇÕES (AUTO UPDATE)
  // =========================
  const carregarNotificacoes = async () => {
    if (!usuarioId) return;

    try {
      setLoading(true);

      const { data } = await api.get(
        `/notificacoes?usuarioId=${usuarioId}`
      );

      setNotificacoes(data || []);
    } catch (error) {
      console.error("Erro ao carregar notificações:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // USE EFFECT AUTO REFRESH
  // =========================
  useEffect(() => {
    carregarNotificacoes();

    const interval = setInterval(() => {
      carregarNotificacoes();
    }, 5000);

    return () => clearInterval(interval);
  }, [usuarioId]);

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
      console.error("Erro ao marcar como lida:", error);
    }
  };

  // =========================
  // DELETAR NOTIFICAÇÃO
  // =========================
  const deletarNotificacao = async (id) => {
    try {
      await api.delete(`/notificacoes/${id}`);

      setNotificacoes((prev) =>
        prev.filter((n) => n._id !== id)
      );
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  const naoLidas = notificacoes.filter((n) => !n.lida).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#132190] text-white"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold">
              <FaBell />
              Notificações
            </h1>
            <p className="opacity-70">
              Suas notificações do sistema
            </p>
          </div>
        </div>

        {/* CARDS */}
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-3xl font-bold">
              {notificacoes.length}
            </h2>
            <p>Total</p>
          </div>

          <div className="rounded-2xl bg-blue-600 p-6 text-white shadow">
            <h2 className="text-3xl font-bold">
              {naoLidas}
            </h2>
            <p>Não lidas</p>
          </div>
        </div>

        {/* MARCAR TODAS */}
        {naoLidas > 0 && (
          <button
            onClick={() =>
              Promise.all(
                notificacoes.map((n) =>
                  !n.lida ? marcarComoLida(n._id) : null
                )
              )
            }
            className="mb-6 flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white"
          >
            <FaCheckDouble />
            Marcar todas como lidas
          </button>
        )}

        {/* LISTA */}
        {loading ? (
          <p>Carregando notificações...</p>
        ) : (
          <div className="space-y-4">
            {notificacoes.map((notif) => (
              <div
                key={notif._id}
                className={`rounded-2xl border p-5 ${
                  notif.lida
                    ? "bg-white"
                    : "bg-blue-50 border-blue-200"
                }`}
              >
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-xl font-bold">
                      {notif.titulo}
                    </h2>
                    <p className="opacity-80">
                      {notif.mensagem}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {!notif.lida && (
                      <button
                        onClick={() =>
                          marcarComoLida(notif._id)
                        }
                        className="rounded-lg bg-green-600 p-2 text-white"
                      >
                        <FaCheck />
                      </button>
                    )}

                    <button
                      onClick={() =>
                        deletarNotificacao(notif._id)
                      }
                      className="rounded-lg bg-red-600 p-2 text-white"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}