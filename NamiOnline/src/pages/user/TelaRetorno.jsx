import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  FaCheckCircle,
  FaArrowRight,
  FaCalendarAlt,
  FaUserMd,
  FaClock,
  FaNotesMedical,
} from "react-icons/fa";

export default function TelaRetorno() {
  const navigate = useNavigate();

  const [tema, setTema] = useState("claro");
  const [retornos, setRetornos] = useState([]);
  const [loading, setLoading] = useState(true);

  const dark = tema === "escuro";

  // =========================
  // PEGAR USUÁRIO LOGADO
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
  // CARREGAR TEMA
  // =========================
  useEffect(() => {
    async function carregarTema() {
      try {
        const { data } = await api.get("/configuracoes");

        if (data?.tema) {
          setTema(data.tema);

          if (data.tema === "escuro") {
            document.body.classList.add("dark");
          } else {
            document.body.classList.remove("dark");
          }
        }
      } catch (error) {
        console.error("Erro ao carregar tema:", error);
      }
    }

    carregarTema();
  }, []);

  // =========================
  // CARREGAR RETORNOS
  // =========================
  useEffect(() => {
    async function carregarRetornos() {
      try {
        setLoading(true);

        const user = getUser();

        console.log("USUARIO LOGADO:");
        console.log(user);

        const usuarioId = String(
          user?.id || user?._id || ""
        );

        console.log("ID USUARIO:", usuarioId);

        if (!usuarioId) {
          alert("Sessão expirada.");
          navigate("/");
          return;
        }

        // =========================
        // BUSCAR RETORNOS
        // =========================
        const response = await api.get("/retornos");

        console.log("RETORNOS BRUTOS:");
        console.log(
          JSON.stringify(response.data, null, 2)
        );

        // =========================
        // FILTRAR RETORNOS
        // =========================
        const retornosFiltrados = response.data.filter(
          (retorno) => {

            console.log("RETORNO INDIVIDUAL:");
            console.log(retorno);

            // TENTA PEGAR O ID EM TODOS FORMATOS
            const retornoUsuarioId =
              retorno.usuarioId?._id ||
              retorno.usuarioId ||
              retorno.userId?._id ||
              retorno.userId ||
              retorno.usuario?._id ||
              retorno.usuario ||
              "";

            console.log(
              "ID RETORNO:",
              String(retornoUsuarioId)
            );

            console.log(
              "COMPARAÇÃO:",
              String(retornoUsuarioId),
              "===",
              usuarioId
            );

            return (
              String(retornoUsuarioId) ===
              String(usuarioId)
            );
          }
        );

        console.log(
          "RETORNOS FILTRADOS:"
        );

        console.log(retornosFiltrados);

        setRetornos(retornosFiltrados);

      } catch (error) {
        console.error(
          "Erro ao carregar retornos:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    }

    carregarRetornos();
  }, [navigate]);

  return (
    <div
      className={`min-h-screen px-6 py-10 ${
        dark
          ? "bg-[#0f172a] text-white"
          : "bg-gradient-to-br from-[#f4f8ff] to-white text-slate-800"
      }`}
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold">
              Meus Retornos
            </h1>

            <p className="mt-1 text-slate-500">
              Veja seus retornos agendados
            </p>
          </div>

          <Link
            to="/retornos/agendar"
            className="inline-flex items-center gap-2 rounded-xl bg-[#004AF7] px-6 py-3 font-semibold text-white transition hover:bg-[#0037b8]"
          >
            <FaArrowRight />
            Agendar Retorno
          </Link>

        </div>

        {/* LOADING */}
        {loading ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <h2 className="text-xl font-semibold">
              Carregando retornos...
            </h2>
          </div>

        ) : retornos.length === 0 ? (

          <div className="rounded-3xl bg-white p-12 text-center shadow-xl">
            <h2 className="text-2xl font-bold text-slate-700">
              Nenhum retorno encontrado
            </h2>

            <p className="mt-3 text-slate-500">
              Você ainda não possui retornos agendados.
            </p>
          </div>

        ) : (

          <div className="grid gap-6 md:grid-cols-2">

            {retornos.map((r) => (
              <div
                key={r._id}
                className="rounded-3xl border bg-white p-6 shadow-xl"
              >

                {/* STATUS */}
                <div className="mb-4 flex items-center gap-2 text-green-600">
                  <FaCheckCircle />
                  <strong>
                    Agendado com sucesso
                  </strong>
                </div>

                {/* ESPECIALIDADE */}
                <div className="mb-3 flex items-center gap-3">
                  <FaNotesMedical className="text-[#004AF7]" />

                  <div>
                    <p className="text-sm text-slate-500">
                      Especialidade
                    </p>

                    <h3 className="font-bold">
                      {r.especialidade}
                    </h3>
                  </div>
                </div>

                {/* MÉDICO */}
                <div className="mb-3 flex items-center gap-3">
                  <FaUserMd className="text-[#004AF7]" />

                  <div>
                    <p className="text-sm text-slate-500">
                      Médico
                    </p>

                    <h3 className="font-bold">
                      {r.medico}
                    </h3>
                  </div>
                </div>

                {/* DATA */}
                <div className="mb-3 flex items-center gap-3">
                  <FaCalendarAlt className="text-[#004AF7]" />

                  <div>
                    <p className="text-sm text-slate-500">
                      Data
                    </p>

                    <h3 className="font-bold">
                      {r.data}
                    </h3>
                  </div>
                </div>

                {/* HORÁRIO */}
                <div className="mb-3 flex items-center gap-3">
                  <FaClock className="text-[#004AF7]" />

                  <div>
                    <p className="text-sm text-slate-500">
                      Horário
                    </p>

                    <h3 className="font-bold">
                      {r.horario}
                    </h3>
                  </div>
                </div>

                {/* OBSERVAÇÕES */}
                {r.observacoes && (
                  <div className="mt-4 rounded-2xl bg-slate-100 p-4">
                    <p className="text-sm font-semibold text-slate-600">
                      Observações
                    </p>

                    <p className="mt-1 text-slate-700">
                      {r.observacoes}
                    </p>
                  </div>
                )}

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}