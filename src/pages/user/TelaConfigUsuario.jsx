import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaCalendarAlt,
  FaVenusMars,
  FaSave,
} from "react-icons/fa";

import api from "../../services/api";

export default function TelaConfigUsuario() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    name: "",
    cpf: "",
    email: "",
    telefone: "",
    data_nasc: "",
    sexo: "",
  });

  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  // =========================
  // BUSCAR DADOS DO USUÁRIO
  // =========================
  useEffect(() => {
    async function buscarUsuario() {
      try {
        setLoading(true);

        const token =
          localStorage.getItem("nami_token") ||
          sessionStorage.getItem("nami_token");

        if (!token) {
          setErro("Usuário não autenticado.");
          return;
        }

        const response = await api.get("/usuarios/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const dados = response.data;

        console.log("USUARIO:", dados);

        setUsuario({
          name: dados.name || "",
          cpf: dados.cpf || "",
          email: dados.email || "",
          telefone: dados.telefone || "",
          data_nasc: dados.data_nasc
            ? dados.data_nasc.split("T")[0]
            : "",
          sexo: dados.sexo || "",
        });

      } catch (error) {
        console.error(error);

        setErro(
          error.response?.data?.error ||
          "Erro ao carregar dados do usuário."
        );
      } finally {
        setLoading(false);
      }
    }

    buscarUsuario();
  }, []);

  // =========================
  // ALTERAR INPUTS
  // =========================
  function atualizarCampo(event) {
    const { name, value } = event.target;

    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // =========================
  // SALVAR ALTERAÇÕES
  // =========================
  async function salvarAlteracoes(event) {
    event.preventDefault();

    try {
      setSalvando(true);
      setErro("");
      setSucesso("");

      const token =
        localStorage.getItem("nami_token") ||
        sessionStorage.getItem("nami_token");

      // BUSCAR USUÁRIO LOGADO
      const response = await api.get("/usuarios/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const usuarioId = response.data._id;

      // FORMATAR DADOS
      const usuarioFormatado = {
        ...usuario,

        cpf: String(usuario.cpf || "")
          .replace(/\D/g, "")
          .trim(),

        telefone: String(usuario.telefone || "")
          .replace(/\D/g, "")
          .trim(),
      };

      console.log("ENVIANDO:", usuarioFormatado);

      // ATUALIZAR
      await api.put(`/usuarios/${usuarioId}`, usuarioFormatado, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSucesso("Dados atualizados com sucesso.");

    } catch (error) {
      console.error(error);

      setErro(
        error.response?.data?.error ||
        "Erro ao atualizar usuário."
      );
    } finally {
      setSalvando(false);
    }
  }

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f8ff]">
        <h1 className="text-2xl font-bold text-[#132190]">
          Carregando...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f8ff] p-8">

      {/* HEADER */}
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#132190] text-white transition hover:bg-[#004AF7]"
        >
          <FaArrowLeft />
        </button>

        <h1 className="text-3xl font-bold text-[#132190]">
          Configurações do Usuário
        </h1>
      </div>

      {/* FORM */}
      <form
        onSubmit={salvarAlteracoes}
        className="mx-auto flex max-w-3xl flex-col gap-5 rounded-3xl bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
      >

        {/* ERRO */}
        {erro && (
          <div className="rounded-xl border-l-4 border-red-600 bg-red-100 p-4 text-red-700">
            {erro}
          </div>
        )}

        {/* SUCESSO */}
        {sucesso && (
          <div className="rounded-xl border-l-4 border-green-600 bg-green-100 p-4 text-green-700">
            {sucesso}
          </div>
        )}

        {/* NOME */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 font-semibold text-[#132190]">
            <FaUser />
            Nome
          </label>

          <input
            type="text"
            name="name"
            value={usuario.name}
            onChange={atualizarCampo}
            placeholder="Digite seu nome"
            className="rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#004AF7]"
          />
        </div>

        {/* CPF */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 font-semibold text-[#132190]">
            <FaIdCard />
            CPF
          </label>

          <input
            type="text"
            name="cpf"
            value={usuario.cpf}
            onChange={atualizarCampo}
            placeholder="Digite seu CPF"
            className="rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#004AF7]"
          />
        </div>

        {/* EMAIL */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 font-semibold text-[#132190]">
            <FaEnvelope />
            Email
          </label>

          <input
            type="email"
            name="email"
            value={usuario.email}
            onChange={atualizarCampo}
            placeholder="Digite seu email"
            className="rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#004AF7]"
          />
        </div>

        {/* TELEFONE */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 font-semibold text-[#132190]">
            <FaPhone />
            Telefone
          </label>

          <input
            type="text"
            name="telefone"
            value={usuario.telefone}
            onChange={atualizarCampo}
            placeholder="(99) 99999-9999"
            className="rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#004AF7]"
          />
        </div>

        {/* DATA NASCIMENTO */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 font-semibold text-[#132190]">
            <FaCalendarAlt />
            Data de Nascimento
          </label>

          <input
            type="date"
            name="data_nasc"
            value={usuario.data_nasc}
            onChange={atualizarCampo}
            className="rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#004AF7]"
          />
        </div>

        {/* SEXO */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 font-semibold text-[#132190]">
            <FaVenusMars />
            Gênero
          </label>

          <select
            name="sexo"
            value={usuario.sexo}
            onChange={atualizarCampo}
            className="rounded-xl border border-gray-300 p-3 outline-none transition focus:border-[#004AF7]"
          >
            <option value="">
              Selecionar
            </option>

            <option value="M">
              Masculino
            </option>

            <option value="F">
              Feminino
            </option>
          </select>
        </div>

        {/* BOTÃO */}
        <button
          type="submit"
          disabled={salvando}
          className="mt-4 flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#004AF7] to-[#132190] px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:scale-[1.02]"
        >
          <FaSave />

          {salvando
            ? "Salvando..."
            : "Salvar Alterações"}
        </button>

      </form>
    </div>
  );
}