import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaArrowLeft,
  FaCalendarCheck,
  FaCheckCircle,
} from "react-icons/fa";

export default function TelaNotificacoes() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f4f8ff] p-8">

      {/* HEADER */}
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#132190] text-white transition hover:bg-[#004AF7]"
        >
          <FaArrowLeft />
        </button>

        <h1 className="flex items-center gap-3 text-3xl font-bold text-[#132190]">
          <FaBell />
          Notificações
        </h1>
      </div>

      {/* CARD */}
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.1)]">

        <div className="mb-6 flex items-start gap-5 rounded-2xl border border-blue-100 bg-blue-50 p-5">

          <div className="rounded-full bg-[#004AF7] p-4 text-white">
            <FaCalendarCheck className="text-2xl" />
          </div>

          <div className="flex-1">
            <h2 className="mb-2 text-xl font-semibold text-[#132190]">
              Consulta Confirmada
            </h2>

            <p className="mb-4 text-gray-600">
              Sua consulta com <strong>Dr. João Silva</strong> foi
              agendada para <strong>15 de Maio às 09:30</strong>.
            </p>

            <div className="flex items-center gap-2 rounded-xl bg-green-100 px-4 py-3 text-green-700">
              <FaCheckCircle />
              Chegue 15 minutos antes da consulta.
            </div>
          </div>
        </div>

        {/* OUTRA NOTIFICAÇÃO */}
        <div className="flex items-start gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">

          <div className="rounded-full bg-[#132190] p-4 text-white">
            <FaBell className="text-2xl" />
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold text-[#132190]">
              Campanha de Vacinação
            </h2>

            <p className="text-gray-600">
              A campanha de vacinação contra gripe já está disponível
              no hospital NAMI.
            </p>
          </div>
        </div>

        {/* BOTÃO */}
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