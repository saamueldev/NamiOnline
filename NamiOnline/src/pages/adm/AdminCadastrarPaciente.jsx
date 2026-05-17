import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import bgNami2 from "../../assets/bg_nami2.png";

export default function AdminCadastrarPaciente() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    email: "",
    password: "",
    telefone: "",
    data_nasc: "",
    sexo: "",
  });
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [loading, setLoading] = useState(false);

  function atualizarCampo(event) {
    const { name, value } = event.target;
    setFormData((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value,
    }));
  }

  async function cadastrarUsuario(event) {
    event.preventDefault();
    setErro("");
    setSucesso("");
    setLoading(true);

    try {
      await api.post("/usuarios", formData);
      setSucesso("Cadastro realizado com sucesso.");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1200);
    } catch (error) {
      setErro(error.response?.data?.error || "Nao foi possivel cadastrar o usuario");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgNami2})` }}
    >
      <form
        onSubmit={cadastrarUsuario}
        className="w-[600px] bg-white p-[30px] rounded-[10px] flex flex-col gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
      >
        <h2 className="text-center mt-4 text-3xl md:text-5xl font-extrabold text-[#132190] tracking-tight">Cadastro de Pacientes</h2>

        {erro && (
          <div className="rounded-lg border-l-4 border-[#d32f2f] bg-[#ffebee] px-[15px] py-3 text-sm text-[#d32f2f]">
            {erro}
          </div>
        )}

        {sucesso && (
          <div className="rounded-lg border-l-4 border-[#2e7d32] bg-[#e8f5e9] px-[15px] py-3 text-sm text-[#2e7d32]">
            {sucesso}
          </div>
        )}

        <div className="flex flex-col text-base">
          <span className="text-left mb-1 font-bold">Nome</span>
          <input
            className="p-2 border border-gray-300 rounded-[5px]"
            type="text"
            name="name"
            value={formData.name}
            onChange={atualizarCampo}
            placeholder="Digite seu nome"
            required
          />
        </div>

        <div className="flex flex-col text-base">
          <span className="text-left mb-1 font-bold">CPF</span>
          <input
            className="p-2 border border-gray-300 rounded-[5px]"
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={atualizarCampo}
            placeholder="Digite seu CPF"
            required
          />
        </div>

        <div className="flex flex-col text-base">
          <span className="text-left mb-1 font-bold">Email</span>
          <input
            className="p-2 border border-gray-300 rounded-[5px]"
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={atualizarCampo}
            placeholder="Digite seu email"
            required
          />
        </div>

        <div className="flex flex-col text-base">
          <span className="text-left mb-1 font-bold">Senha</span>
          <input
            className="p-2 border border-gray-300 rounded-[5px]"
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={atualizarCampo}
            placeholder="Digite sua senha"
            required
          />
        </div>

        <div className="flex flex-col text-base">
          <span className="text-left mb-1 font-bold">Telefone</span>
          <input
            className="p-2 border border-gray-300 rounded-[5px]"
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={atualizarCampo}
            placeholder="(99) 99999-9999"
            required
          />
        </div>

        <div className="flex flex-col text-base">
          <span className="text-left mb-1 font-bold">Data de Nascimento</span>
          <input
            className="p-2 border border-gray-300 rounded-[5px]"
            type="date"
            id="nascimento"
            name="data_nasc"
            value={formData.data_nasc}
            onChange={atualizarCampo}
            required
          />
        </div>

        <div className="flex flex-col text-base">
          <span className="text-left mb-1 font-bold">Gênero</span>
          <select
            className="w-full p-3 border border-gray-300 rounded-md text-sm outline-none bg-white cursor-pointer transition focus:border-[#4f8edc] focus:shadow-[0_0_4px_rgba(79,142,220,0.4)]"
            name="sexo"
            id="sexo"
            value={formData.sexo}
            onChange={atualizarCampo}
            required
          >
            <option value="">Selecionar</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
        </div>

        <div className="flex flex-col text-center mt-2">
          <button
            className="mt-2 p-[10px] border-none rounded-[5px] bg-[#4f8edc] text-white font-bold cursor-pointer hover:bg-[#3c74b8]"
            type="submit"
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </div>
      </form>
    </div>
  );
}
