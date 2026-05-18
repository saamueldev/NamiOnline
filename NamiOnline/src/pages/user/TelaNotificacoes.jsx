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

  // =========================
  // TEMA
  // =========================
  const [tema, setTema] = useState(
    localStorage.getItem("tema") || "claro"
  );

  useEffect(() => {
    const temaSalvo = localStorage.getItem("tema") || "claro";

    setTema(temaSalvo);

    if (temaSalvo === "escuro") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  const dark = tema === "escuro";

  // =========================
  // BUSCAR NOTIFICAÇÕES
  // =========================
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
    <div className={`min-h-screen bg-[#f4f8ff] p-6 transition-colors duration-300 dark:bg-[#0f172a]`}>
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-col gap-6 rounded-[32px] bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-colors duration-300 dark:bg-[#1e293b]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#132190] text-white transition hover:bg-[#004AF7]"
              >
                <FaArrowLeft />
              </button>

              <h1 className={`flex items-center gap-3 text-3xl font-bold ${dark ? "text-white" : "text-[#132190]"}`}>
                <FaBell />
                Notificações
              </h1>
            </div>

            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${dark ? "bg-[#1e293b]" : "bg-white shadow-lg"}`}>
              {dark ? <FaMoon /> : <FaSun />}
            </div>
          </div>

          <div className="space-y-6">
            {notificacoes.length > 0 ? (
              <div className="space-y-6">
                {notificacoes.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col gap-5 rounded-2xl border p-5 transition-all duration-300 ${dark ? "border-slate-700 bg-slate-800" : "border-blue-100 bg-blue-50"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-[#004AF7] p-4 text-white">
                        <FaCalendarCheck className="text-2xl" />
                      </div>
                      <div className="flex-1">
                        <h2 className={`mb-2 text-xl font-semibold ${dark ? "text-white" : "text-[#132190]"}`}>
                          {item.titulo}
                        </h2>
                        <p className={`${dark ? "text-gray-300" : "text-gray-600"}`}>{item.mensagem}</p>
                      </div>
                    </div>

                    <div className={`flex items-center gap-2 rounded-xl px-4 py-3 ${dark ? "bg-green-900 text-green-200" : "bg-green-100 text-green-700"}`}>
                      <FaCheckCircle />
                      Notificação recebida com sucesso.
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`rounded-2xl p-8 text-center transition-colors duration-300 ${dark ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-800"}`}>
                <h2 className="text-xl font-semibold">Nenhuma notificação encontrada</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Você ainda não possui notificações.
                </p>
              </div>
            )}

            <div className={`rounded-3xl border p-6 transition-colors duration-300 ${dark ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-slate-50"}`}>
              <div className="flex items-start gap-5">
                <div className="rounded-full bg-[#132190] p-4 text-white">
                  <FaBell className="text-2xl" />
                </div>
                <div>
                  <h2 className={`mb-2 text-xl font-semibold ${dark ? "text-white" : "text-[#132190]"}`}>
                    Campanha de Vacinação
                  </h2>
                  <p className={`${dark ? "text-gray-300" : "text-gray-600"}`}>
                    A campanha de vacinação contra gripe já está disponível no hospital NAMI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`rounded-[32px] border p-8 transition-colors duration-300 ${dark ? "border-slate-700 bg-slate-800" : "border-slate-200 bg-slate-50"}`}>
          <div className="mb-6 flex items-center gap-3">
            <FaQuestionCircle className="text-2xl text-[#004AF7]" />
            <h2 className={`text-2xl font-bold ${dark ? "text-white" : "text-[#132190]"}`}>Perguntas Frequentes</h2>
          </div>

          <div className="grid gap-4">
            <button className={`w-full rounded-2xl border p-4 text-left transition-all duration-300 ${dark ? "border-slate-700 bg-[#0f172a] text-white hover:bg-[#334155]" : "border-slate-200 bg-white text-slate-800 hover:bg-[#E4F2FE]"}`}>
              Como remarcar uma consulta?
            </button>
            <button className={`w-full rounded-2xl border p-4 text-left transition-all duration-300 ${dark ? "border-slate-700 bg-[#0f172a] text-white hover:bg-[#334155]" : "border-slate-200 bg-white text-slate-800 hover:bg-[#E4F2FE]"}`}>
              Como acessar meus exames?
            </button>
            <button className={`w-full rounded-2xl border p-4 text-left transition-all duration-300 ${dark ? "border-slate-700 bg-[#0f172a] text-white hover:bg-[#334155]" : "border-slate-200 bg-white text-slate-800 hover:bg-[#E4F2FE]"}`}>
              Como alterar meu retorno?
            </button>
          </div>
        </div>

        <div className="flex justify-center">
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
