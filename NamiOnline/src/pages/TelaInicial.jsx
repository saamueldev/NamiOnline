import { Link } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCalendarCheck,
  FaFileMedical,
  FaHistory,
  FaNotesMedical,
} from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import noticia1 from "../assets/nami-clinica.jpg";
import noticia2 from "../assets/nami-predio.jpg";
import noticia3 from "../assets/vacinacao-nami.jpg";

export default function TelaInicial() {
  const { isAdmin } = useContext(AuthContext);

  const noticias = [
    {
      titulo: "Exames NAMI Unifor",
      imagem: noticia1,
      link: "/noticia1",
    },
    {
      titulo: "Hospital amplia horário de consultas",
      imagem: noticia2,
      link: "/noticia2",
    },
    {
      titulo: "Campanha de vacinação",
      imagem: noticia3,
      link: "/noticia3",
    },
  ];

  const [index, setIndex] = useState(0);

  function next() {
    setIndex((prev) => (prev + 1) % noticias.length);
  }

  function prev() {
    setIndex((prev) => (prev - 1 + noticias.length) % noticias.length);
  }

  useEffect(() => {
    const interval = setInterval(next, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f7fbff]">
      <main className="px-20 py-10">
        <section className="relative w-[40%] mx-auto mb-10 rounded-[14px] overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.15)]">
          <button
            className="absolute left-[0px] top-1/2 -translate-y-1/2 bg-black/40 border-none text-white p-[10px] cursor-pointer hover:bg-[#464646] z-10"
            onClick={prev}
          >
            <FaChevronLeft />
          </button>

          <Link to={noticias[index].link} className="block w-full">
            <img
              className="w-full h-[400px] block"
              src={noticias[index].imagem}
              alt=""
            />

            <div>
              <h3 className="bg-[#f7fbff] text-center text-black text-[18px]">
                {noticias[index].titulo}
              </h3>
            </div>
          </Link>

          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/40 border-none text-white p-[10px] cursor-pointer hover:bg-[#464646] z-10"
            onClick={next}
          >
            <FaChevronRight />
          </button>
        </section>

        <section className="mb-10">
          <h3 className="text-[22px] font-semibold text-[#132190] mb-5 flex items-center gap-[10px] relative">
            <span>Acesso rápido</span>
          </h3>

          <div className="grid grid-cols-4 gap-5 mt-5">
            <Link
              to="/agendar/especialidades"
              className="bg-white rounded-xl p-[30px] flex flex-col items-center gap-[10px] text-[22px] text-[#004AF7] no-underline shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition duration-200 hover:-translate-y-1"
            >
              <FaCalendarCheck />
              <span>Agendar Consulta</span>
            </Link>

            <Link
              to="/agendar/anexar-guia"
              className="bg-white rounded-xl p-[30px] flex flex-col items-center gap-[10px] text-[22px] text-[#004AF7] no-underline shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition duration-200 hover:-translate-y-1"
            >
              <FaFileMedical />
              <span>Meus Exames</span>
            </Link>

            <Link
              to="/meus-agendamentos"
              className="bg-white rounded-xl p-[30px] flex flex-col items-center gap-[10px] text-[22px] text-[#004AF7] no-underline shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition duration-200 hover:-translate-y-1"
            >
              <FaHistory />
              <span>Agendamentos</span>
            </Link>

            <Link
              to="/retornos"
              className="bg-white rounded-xl p-[30px] flex flex-col items-center gap-[10px] text-[22px] text-[#004AF7] no-underline shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition duration-200 hover:-translate-y-1"
            >
              <FaNotesMedical />
              <span>Retornos</span>
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-[25px]">
          <div className="bg-white p-[25px] rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.1)]">
            <h3 className="text-[22px] font-semibold text-[#132190] mb-[15px] flex items-center gap-[10px] relative">
              <span>Próxima consulta</span>
            </h3>

            <p>
              <strong>Clínico Geral</strong>
            </p>
            <p>Dr. João Silva</p>
            <p>15 Maio - 09:30</p>

            <Link className="mt-[8px] bg-[#004AF7] text-white border-none px-[20px] py-1 rounded-md cursor-pointer" to = "/ver-detalhes">Ver detalhes</Link>
              
            
          </div>

          <div className="bg-white p-[25px] rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.1)]">
            <h3 className="text-[22px] font-semibold text-[#132190] mb-[15px] flex items-center gap-[10px] relative">
              <span>Avisos do hospital</span>
            </h3>

            <ul>
              <li>Campanha de vacinação disponível</li>
              <li>Nova ala pediátrica inaugurada</li>
              <li>Horário ampliado até 20h</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="mt-[60px] bg-[#132190] text-white flex justify-around p-[30px]">
        <div>
          <h4>Suporte</h4>
          <p>Email: suporte@nami.com</p>
          <p>Telefone: (85) 99999-9999</p>
        </div>

        <div>
          <h4>Hospital</h4>
          <p>Av. Washington Soares</p>
          <p>Fortaleza - CE</p>
        </div>

        <div>
          <h4>Perguntas Frequentes</h4>
          <p>Termos de privacidade</p>
          <p>Parceiros</p>
        </div>
      </footer>
    </div>
  );
}