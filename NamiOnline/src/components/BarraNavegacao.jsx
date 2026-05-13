import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell, User } from "lucide-react";
import logounifor from "../assets/LOGO.png"

const BarraNavegacao = ({ tipoUsuario = "user" }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (tipoUsuario === "user") {
      navigate("/home");
    } else {
      navigate("/admin/telainicial");
    }
  };

  const handlePerfilClick = () => {
    if (tipoUsuario === "admin") {
      navigate("/admin/perfil");
    } else {
      navigate("/perfil");
    }
  };

  const handleNotificacaoClick = () => {
    navigate("/notificacoes");
  };

  const handleBusca = (e) => {
    if (e.key === "Enter") {
      const valor = e.target.value;
      navigate(`/busca?q=${valor}`);
    }
  };

  return (
    <nav className="w-full h-[90px] bg-blue-800 flex items-center justify-between px-8">

      {/* 🔹 Logo */}
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

      {/* 🔎 Busca */}
      <input
        type="text"
        placeholder="Buscar..."
        onKeyDown={handleBusca}
        className="w-[40%] px-4 py-2 rounded-full bg-blue-900 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
      />

      {/* 🔔 Ações */}
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