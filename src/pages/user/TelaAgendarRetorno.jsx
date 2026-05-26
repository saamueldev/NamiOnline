import { useState, useEffect } from "react";
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

  // =========================
  // LISTAS
  // =========================
  const [especialidades, setEspecialidades] = useState([]);
  const [medicos, setMedicos] = useState([]);

  // =========================
  // FORM
  // =========================
  const [form, setForm] = useState({
    especialidade: "",
    medico: "",
    data: "",
    horario: "",
    observacoes: "",
  });

  // =========================
  // BUSCAR ESPECIALIDADES
  // =========================
  useEffect(() => {
    async function buscarEspecialidades() {
      try {
        const response = await api.get("/especialidades");

        console.log("ESPECIALIDADES:");
        console.log(response.data);

        setEspecialidades(response.data || []);
      } catch (error) {
        console.error(
          "Erro ao buscar especialidades:",
          error.response?.data || error.message
        );
      }
    }

    buscarEspecialidades();
  }, []);

  // =========================
  // BUSCAR MÉDICOS
  // =========================
  useEffect(() => {
    async function buscarMedicos() {
      try {
        const response = await api.get("/medicos");

        console.log("MEDICOS:");
        console.log(response.data);

        setMedicos(response.data || []);
      } catch (error) {
        console.error(
          "Erro ao buscar médicos:",
          error.response?.data || error.message
        );
      }
    }

    buscarMedicos();
  }, []);

  // =========================
  // FILTRAR MÉDICOS
  // =========================
  const medicosFiltrados = medicos.filter((medico) => {
    return medico.especialidadeId?.name === form.especialidade;
  });

  // =========================
  // ALTERAR CAMPOS
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "especialidade" && { medico: "" }),
    }));
  };

  // =========================
  // PEGAR USUÁRIO
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
  // AGENDAR RETORNO
  // =========================
  const agendarRetorno = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const user = getUser();

      console.log("USUARIO LOGADO:");
      console.log(user);

      const usuarioId = user?.id || user?._id;
      const usuarioNome = user?.nome || user?.name || "Usuário";

      console.log("ID USUARIO:", usuarioId);

      if (!usuarioId) {
        alert("Sessão expirada.");
        navigate("/");
        return;
      }

      if (
        !form.especialidade ||
        !form.medico ||
        !form.data ||
        !form.horario
      ) {
        alert("Preencha todos os campos.");
        return;
      }

      // =========================
      // OBJETO RETORNO
      // =========================
      const novoRetorno = {
        especialidade: form.especialidade,
        medico: form.medico,
        data: form.data,
        horario: form.horario,
        observacoes: form.observacoes,

        // CAMPOS IMPORTANTES
        usuarioId,
        usuarioNome,
      };

      console.log("RETORNO ENVIADO:");
      console.log(novoRetorno);

      // =========================
      // SALVAR RETORNO
      // =========================
      const response = await api.post("/retornos", novoRetorno);

      console.log("RETORNO SALVO:");
      console.log(response.data);

      // =========================
      // NOTIFICAÇÃO
      // =========================
      try {
        await api.post("/notificacoes", {
          usuarioId,
          titulo: "Retorno agendado com sucesso",
          mensagem: `Olá ${usuarioNome}, seu retorno com ${form.medico} foi agendado para ${form.data} às ${form.horario}.`,
          tipo: "retorno",
          rota: "/retornos",
          lida: false,
          createdAt: new Date().toISOString(),
        });
      } catch (erroNotificacao) {
        console.error(
          "Erro ao criar notificação:",
          erroNotificacao.response?.data || erroNotificacao.message
        );
      }

      alert("Retorno agendado com sucesso!");

      // =========================
      // LIMPAR FORM
      // =========================
      setForm({
        especialidade: "",
        medico: "",
        data: "",
        horario: "",
        observacoes: "",
      });

      navigate("/retornos");

    } catch (error) {
      console.error(
        "Erro ao agendar retorno:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Erro ao agendar retorno."
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
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#132190] text-white transition hover:bg-[#004AF7]"
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

          <form
            onSubmit={agendarRetorno}
            className="space-y-6"
          >

            <div className="grid gap-5 md:grid-cols-2">

              {/* ESPECIALIDADE */}
              <div>
                <label className="mb-2 flex items-center gap-2 font-semibold">
                  <FaNotesMedical />
                  Especialidade
                </label>

                <select
                  name="especialidade"
                  value={form.especialidade}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#004AF7]"
                >
                  <option value="">
                    Selecione uma especialidade
                  </option>

                  {especialidades.map((esp) => (
                    <option
                      key={esp._id}
                      value={esp.name}
                    >
                      {esp.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* MÉDICO */}
              <div>
                <label className="mb-2 flex items-center gap-2 font-semibold">
                  <FaUserMd />
                  Médico
                </label>

                <select
                  name="medico"
                  value={form.medico}
                  onChange={handleChange}
                  disabled={!form.especialidade}
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#004AF7] disabled:bg-slate-100"
                >
                  <option value="">
                    Selecione um médico
                  </option>

                  {medicosFiltrados.map((medico) => (
                    <option
                      key={medico._id}
                      value={medico.name}
                    >
                      {medico.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* DATA */}
              <div>
                <label className="mb-2 flex items-center gap-2 font-semibold">
                  <FaCalendarCheck />
                  Data
                </label>

                <input
                  type="date"
                  name="data"
                  value={form.data}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#004AF7]"
                />
              </div>

              {/* HORÁRIO */}
              <div>
                <label className="mb-2 flex items-center gap-2 font-semibold">
                  <FaClock />
                  Horário
                </label>

                <input
                  type="time"
                  name="horario"
                  value={form.horario}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#004AF7]"
                />
              </div>

            </div>

            {/* OBSERVAÇÕES */}
            <div>
              <label className="mb-2 flex items-center gap-2 font-semibold">
                <FaNotesMedical />
                Observações
              </label>

              <textarea
                name="observacoes"
                value={form.observacoes}
                onChange={handleChange}
                rows={5}
                placeholder="Digite observações adicionais..."
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-[#004AF7]"
              />
            </div>

            {/* BOTÕES */}
            <div className="flex gap-4">

              <Link
                to="/home"
                className="rounded-xl bg-slate-200 px-6 py-4 font-semibold transition hover:bg-slate-300"
              >
                Voltar
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-[#004AF7] px-6 py-4 font-semibold text-white transition hover:bg-[#0037b8] disabled:opacity-60"
              >
                <FaCheckCircle />

                {loading
                  ? "Salvando..."
                  : "Confirmar"}
              </button>

            </div>

          </form>

        </div>

      </div>
    </div>
  );
}