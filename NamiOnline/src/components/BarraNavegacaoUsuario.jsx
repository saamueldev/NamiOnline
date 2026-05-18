import { useNavigate } from "react-router-dom";
import { Bell, User } from "lucide-react";
import logounifor from "../assets/LOGO.png";

const BarraNavegacao = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/home");
  };

  const handleConsultasClick = () => {
    navigate("/agendar/especialidades");
  };

  const handleExamesClick = () => {
    navigate("/exames");
  };

  const handleRetornosClick = () => {
    navigate("/retornos");
  };

  const handleAgendamentosClick = () => {
    navigate("/meus-agendamentos");
  };

  const handlePerfilClick = () => {
    navigate("/perfil");
  };

  const handleNotificacaoClick = () => {
    navigate("/notificacoes");
  };


  return (
    <nav className="w-full h-[90px] bg-blue-800 flex items-center justify-between px-8">
      <div
        onClick={handleLogoClick}
        className="flex items-center gap-2 cursor-pointer p-2 rounded-xl"
      >
        <img
          src={logounifor}
          alt="Logo"
          className="h-14 brightness-0 invert"
        />
      </div>

      <div className="flex items-center gap-10">
        <div
          onClick={handleConsultasClick}
          className="cursor-pointer"
        >
          <span className="text-white text-lg font-medium hover:text-gray-300 transition duration-300">
            Consultas
          </span>
        </div>

        <div
          onClick={handleExamesClick}
          className="cursor-pointer"
        >
          <span className="text-white text-lg font-medium hover:text-gray-300 transition duration-300">
            Exames
          </span>
        </div>

        <div
          onClick={handleRetornosClick}
          className="cursor-pointer"
        >
          <span className="text-white text-lg font-medium hover:text-gray-300 transition duration-300">
            Retornos
          </span>
        </div>

        <div
          onClick={handleAgendamentosClick}
          className="cursor-pointer"
        >
          <span className="text-white text-lg font-medium hover:text-gray-300 transition duration-300">
            Agendamentos
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Bell
          size={28}
          onClick={handleNotificacaoClick}
          className="text-white cursor-pointer hover:text-gray-300 transition"
        />

        <User
          size={28}
          onClick={handlePerfilClick}
          className="text-white cursor-pointer hover:text-gray-300 transition"
        />
      </div>
    </nav>
  );
};

export default BarraNavegacao;
