import { useState } from "react";
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

import {
  FaCalendarCheck,
  FaUserMd,
  FaClock,
  FaNotesMedical,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";

export default function TelaAgendarRetorno() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    especialidade: "Cardiologia",
    medico: "Dr. Lucas Mota",
    data: "",
    horario: "",
    observacoes: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =========================
  // PEGAR USUÁRIO (ROBUSTO)
  // =========================
  const getUser = () => {
    try {
      const stored =
        localStorage.getItem("nami_user") ||
        sessionStorage.getItem("nami_user");

      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  };

  // =========================
  // AGENDAR RETORNO + NOTIFICAÇÃO
  // =========================
  const agendarRetorno = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = getUser();

      const usuarioId = user?._id || user?.id;
      const usuarioNome = user?.nome || "Usuário";

      if (!usuarioId) {
        alert("Sessão expirada. Faça login novamente.");
        navigate("/login");
        return;
      }

      if (!form.data || !form.horario) {
        alert("Preencha data e horário.");
        return;
      }

      // =========================
      // 1. SALVAR RETORNO
      // =========================
      await api.post("/retornos", {
        especialidade: form.especialidade,
        medico: form.medico,
        data: form.data,
        horario: form.horario,
        observacoes: form.observacoes,
        usuarioId,
        usuarioNome,
      });

      // =========================
      // 2. CRIAR NOTIFICAÇÃO
      // =========================
      await api.post("/notificacoes", {
        usuarioId,
        titulo: "Retorno agendado com sucesso",
        mensagem: `Olá ${usuarioNome}, seu retorno com ${form.medico} foi agendado para ${form.data} às ${form.horario}.`,
        tipo: "retorno",
        rota: "/retornos",
        lida: false,
        createdAt: new Date().toISOString(),
      });

      alert("Retorno agendado com sucesso!");
      navigate("/retornos");

    } catch (error) {
      console.error("Erro ao agendar retorno:", error?.response?.data || error.message);
      alert(
        error?.response?.data?.message ||
        "Erro ao agendar retorno"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-5 py-10">
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="mb-8 flex items-center gap-4">
          <Link
            to="/home"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#132190] text-white hover:bg-[#004AF7]"
          >
            <FaArrowLeft />
          </Link>

          <div>
            <h1 className="text-3xl font-bold text-[#132190]">
              Agendar Retorno
            </h1>
            <p className="text-slate-500">
              Agende seu próximo atendimento
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="rounded-[28px] border bg-white p-8 shadow-xl">
          <form onSubmit={agendarRetorno} className="space-y-6">

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="flex items-center gap-2 font-semibold">
                  <FaNotesMedical /> Especialidade
                </label>

                <select
                  name="especialidade"
                  value={form.especialidade}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-4 py-3"
                >
                  <option>Cardiologia</option>
                  <option>Dermatologia</option>
                  <option>Ortopedia</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 font-semibold">
                  <FaUserMd /> Médico
                </label>

                <select
                  name="medico"
                  value={form.medico}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-4 py-3"
                >
                  <option>Dr. Lucas Mota</option>
                  <option>Dra. Marina Soares</option>
                  <option>Dra. Fernanda Alves</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 font-semibold">
                  <FaCalendarCheck /> Data
                </label>

                <input
                  type="date"
                  name="data"
                  value={form.data}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 font-semibold">
                  <FaClock /> Horário
                </label>

                <input
                  type="time"
                  name="horario"
                  value={form.horario}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-4 py-3"
                />
              </div>

            </div>

            <div>
              <label className="flex items-center gap-2 font-semibold">
                <FaNotesMedical /> Observações
              </label>

              <textarea
                name="observacoes"
                value={form.observacoes}
                onChange={handleChange}
                rows={5}
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

            <div className="flex gap-4">
              <Link
                to="/home"
                className="rounded-xl bg-slate-200 px-6 py-4 font-semibold"
              >
                Voltar
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-[#004AF7] px-6 py-4 text-white disabled:opacity-60"
              >
                <FaCheckCircle />
                {loading ? "Salvando..." : "Confirmar"}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}