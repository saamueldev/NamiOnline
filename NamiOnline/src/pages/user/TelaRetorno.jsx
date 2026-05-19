import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  FaCheckCircle,
  FaCalendarAlt,
  FaUserMd,
  FaMapMarkerAlt,
  FaClipboardList,
  FaPhoneAlt,
  FaArrowRight,
} from "react-icons/fa";

export default function TelaRetorno() {
  const [tema, setTema] = useState("claro");
  const [retornos, setRetornos] = useState([]);

  const dark = tema === "escuro";

  // =========================
  // CARREGAR TEMA
  // =========================
  useEffect(() => {
    const carregarConfig = async () => {
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
    };

    carregarConfig();
  }, []);

  // =========================
  // CARREGAR RETORNOS DO BANCO
  // =========================
  useEffect(() => {
    const carregarRetornos = async () => {
      try {
        const { data } = await api.get("/retornos");
        setRetornos(data);
      } catch (error) {
        console.error("Erro ao carregar retornos:", error);
      }
    };

    carregarRetornos();
  }, []);

  return (
    <div className={`min-h-screen px-6 py-10 ${
      dark
        ? "bg-[#0f172a] text-white"
        : "bg-gradient-to-br from-[#f4f8ff] to-white text-slate-800"
    }`}>

      <div className="mx-auto max-w-7xl">

        <h1 className="text-3xl font-bold mb-6">
          Meus Retornos
        </h1>

        {retornos.length === 0 ? (
          <p>Nenhum retorno encontrado.</p>
        ) : (
          retornos.map((r) => (
            <div
              key={r._id}
              className="mb-4 rounded-2xl border p-5 bg-white shadow"
            >
              <div className="flex items-center gap-2 text-green-600">
                <FaCheckCircle />
                <strong>Agendado com sucesso</strong>
              </div>

              <p><b>Especialidade:</b> {r.especialidade}</p>
              <p><b>Médico:</b> {r.medico}</p>
              <p><b>Data:</b> {r.data}</p>
              <p><b>Horário:</b> {r.horario}</p>
              <p><b>Observações:</b> {r.observacoes}</p>
            </div>
          ))
        )}

        <Link
          to="/retornos/agendar"
          className="inline-flex mt-6 items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white"
        >
          <FaArrowRight />
          Agendar novo retorno
        </Link>

      </div>
    </div>
  );
}