import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, User } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import logounifor from "../assets/LOGO.png";

const BarraNavegacao = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const isAdmin = user?.tipo === "admin";

  const handleLogoClick = () => {
    navigate(isAdmin ? "/admin/dashboard" : "/home");
  };

  const handlePerfilClick = () => {
    navigate(isAdmin ? "/admin/dashboard" : "/perfil");
  };

  const handleNotificacaoClick = () => {
    navigate(isAdmin ? "/admin/notificacoes" : "/notificacoes");
  };

  const handleBusca = (e) => {
    if (e.key === "Enter") {
      const valor = e.target.value;
      navigate(`/busca?q=${valor}`);
    }
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
          className="h-10 brightness-0 invert"
        />
      </div>

      <input
        type="text"
        placeholder="Buscar..."
        onKeyDown={handleBusca}
        className="w-[40%] px-4 py-2 rounded-full bg-blue-900 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
      />

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
