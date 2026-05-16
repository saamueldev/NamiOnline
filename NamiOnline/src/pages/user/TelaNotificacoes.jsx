import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaArrowLeft,
  FaCalendarCheck,
  FaCheckCircle,
} from "react-icons/fa";
import api from "../../services/api";

export default function TelaNotificacoes() {
  const navigate = useNavigate();
  const [notificacoes, setNotificacoes] = useState([]);

  useEffect(() => {
    async function carregarNotificacoes() {
      try {
        const response = await api.get("/notificacoes");
        setNotificacoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar notificacoes:", error);
      }
    }

    carregarNotificacoes();
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f8ff] p-8 dark:bg-[#0f172a]">
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#132190] text-white transition hover:bg-[#004AF7]"
        >
          <FaArrowLeft />
        </button>

        <h1 className="flex items-center gap-3 text-3xl font-bold text-[#132190] dark:text-white">
          <FaBell />
          Notificacoes
        </h1>
      </div>

      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:bg-[#1e293b]">
        {notificacoes.length > 0 ? (
          <div className="space-y-6">
            {notificacoes.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-5 rounded-2xl border border-blue-100 bg-blue-50 p-5 dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="rounded-full bg-[#004AF7] p-4 text-white">
                  <FaCalendarCheck className="text-2xl" />
                </div>

                <div className="flex-1">
                  <h2 className="mb-2 text-xl font-semibold text-[#132190] dark:text-white">
                    {item.titulo}
                  </h2>

                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    {item.mensagem}
                  </p>

                  <div className="flex items-center gap-2 rounded-xl bg-green-100 px-4 py-3 text-green-700 dark:bg-green-900 dark:text-green-200">
                    <FaCheckCircle />
                    Notificacao recebida com sucesso.
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-slate-100 p-6 text-center dark:bg-slate-800">
            <h2 className="text-xl font-semibold text-[#132190] dark:text-white">
              Nenhuma notificacao encontrada
            </h2>

            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Voce ainda nao possui notificacoes.
            </p>
          </div>
        )}

        <div className="mt-6 flex items-start gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800">
          <div className="rounded-full bg-[#132190] p-4 text-white">
            <FaBell className="text-2xl" />
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold text-[#132190] dark:text-white">
              Campanha de Vacinacao
            </h2>

            <p className="text-gray-600 dark:text-gray-300">
              A campanha de vacinacao contra gripe ja esta disponivel no hospital NAMI.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/home")}
            className="rounded-2xl bg-gradient-to-r from-[#004AF7] to-[#132190] px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:scale-105"
          >
            Voltar para Home
          </button>
        </div>
      </div>
    </div>
  );
}
