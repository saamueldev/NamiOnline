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
  // AGENDAR RETORNO
  // =========================
  const agendarRetorno = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await api.post("/retornos", form);

      console.log("Resposta:", response.data);

      alert("Retorno agendado com sucesso!");

      navigate("/retornos");
    } catch (error) {
      console.error("Erro ao agendar retorno:", error);
      alert("Erro ao agendar retorno");
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

              {/* ESPECIALIDADE */}
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

              {/* MÉDICO */}
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

              {/* DATA */}
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

              {/* HORÁRIO */}
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

            {/* OBS */}
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

            {/* BOTÕES */}
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