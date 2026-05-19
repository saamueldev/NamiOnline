import React, { useEffect, useMemo, useState } from "react";
import { Search, Edit, Trash2, Save, X, User, Loader2 } from "lucide-react";
import api from "../../services/api";

const estadoInicial = {
  name: "",
  crm: "",
  especialidadeId: "",
};

const getEspecialidadeNome = (medico) => {
  if (!medico?.especialidadeId) return "Sem especialidade";
  if (typeof medico.especialidadeId === "string") return "Sem especialidade";
  return medico.especialidadeId.name || "Sem especialidade";
};

const getEspecialidadeId = (medico) => {
  if (!medico?.especialidadeId) return "";
  if (typeof medico.especialidadeId === "string") return medico.especialidadeId;
  return medico.especialidadeId._id || "";
};

const AdicionarMedico = () => {
  const [busca, setBusca] = useState("");
  const [medicos, setMedicos] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [formCadastro, setFormCadastro] = useState(estadoInicial);
  const [formEdicao, setFormEdicao] = useState(estadoInicial);
  const [medicoEditando, setMedicoEditando] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const inputStyle = {
    backgroundColor: "white",
    color: "#334155",
    paddingLeft: "14px",
  };

  const carregarDados = async () => {
    setCarregando(true);
    setErro("");

    try {
      const [respostaMedicos, respostaEspecialidades] = await Promise.all([
        api.get("/medicos"),
        api.get("/especialidades"),
      ]);

      setMedicos(respostaMedicos.data || []);
      setEspecialidades(respostaEspecialidades.data || []);
    } catch (error) {
      setErro(
        error.response?.data?.error ||
          error.response?.data?.mensagem ||
          "Não foi possível carregar os dados."
      );
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const medicosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    if (!termo) return medicos;

    return medicos.filter((medico) => {
      const especialidade = getEspecialidadeNome(medico).toLowerCase();

      return (
        medico.name?.toLowerCase().includes(termo) ||
        medico.crm?.toLowerCase().includes(termo) ||
        especialidade.includes(termo)
      );
    });
  }, [busca, medicos]);

  const atualizarCampoCadastro = (campo, valor) => {
    setFormCadastro((formAtual) => ({
      ...formAtual,
      [campo]: valor,
    }));
  };

  const atualizarCampoEdicao = (campo, valor) => {
    setFormEdicao((formAtual) => ({
      ...formAtual,
      [campo]: valor,
    }));
  };

  const limparFormularioCadastro = () => {
    setFormCadastro(estadoInicial);
    setErro("");
    setSucesso("");
  };

  const fecharModalEdicao = () => {
    setMedicoEditando(null);
    setFormEdicao(estadoInicial);
    setErro("");
  };

  const montarPayload = (form) => ({
    name: form.name.trim(),
    crm: form.crm.trim(),
    especialidadeId: form.especialidadeId,
  });

  const salvarMedico = async (event) => {
    event.preventDefault();
    setSalvando(true);
    setErro("");
    setSucesso("");

    try {
      await api.post("/medicos", montarPayload(formCadastro));
      setSucesso("Médico cadastrado com sucesso.");
      setFormCadastro(estadoInicial);
      await carregarDados();
    } catch (error) {
      setErro(
        error.response?.data?.error ||
          error.response?.data?.mensagem ||
          "Não foi possível salvar o médico."
      );
    } finally {
      setSalvando(false);
    }
  };

  const abrirModalEdicao = (medico) => {
    setFormEdicao({
      name: medico.name || "",
      crm: medico.crm || "",
      especialidadeId: getEspecialidadeId(medico),
    });
    setMedicoEditando(medico);
    setErro("");
    setSucesso("");
  };

  const atualizarMedico = async (event) => {
    event.preventDefault();

    if (!medicoEditando) return;

    setAtualizando(true);
    setErro("");
    setSucesso("");

    try {
      await api.patch(`/medicos/${medicoEditando._id}`, montarPayload(formEdicao));
      setSucesso("Médico atualizado com sucesso.");
      fecharModalEdicao();
      await carregarDados();
    } catch (error) {
      setErro(
        error.response?.data?.error ||
          error.response?.data?.mensagem ||
          "Não foi possível atualizar o médico."
      );
    } finally {
      setAtualizando(false);
    }
  };

  const excluirMedico = async (medico) => {
    const confirmou = window.confirm(`Deseja excluir ${medico.name}?`);

    if (!confirmou) return;

    setErro("");
    setSucesso("");

    try {
      await api.delete(`/medicos/${medico._id}`);
      setSucesso("Médico excluído com sucesso.");

      if (medicoEditando?._id === medico._id) {
        fecharModalEdicao();
      }

      await carregarDados();
    } catch (error) {
      setErro(
        error.response?.data?.error ||
          error.response?.data?.mensagem ||
          "Não foi possível excluir o médico."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#E4F2FE] px-4 py-8 md:px-6 font-sans">
      <div className="mx-auto mb-8 max-w-[1200px] text-center">
        <span className="inline-flex rounded-full border border-[#87B7FE]/30 bg-white px-4 py-1 text-sm font-medium text-[#004AF7]">
          Gestão médica
        </span>

        <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-[#132190] tracking-tight">
          Cadastro de Médicos
        </h1>

        <p className="mt-3 text-slate-600 text-lg">
          Adicione e gerencie os profissionais da unidade.
        </p>
      </div>

      <div className="mx-auto mb-8 max-w-[1200px] rounded-3xl border border-[#87B7FE]/20 bg-white p-6 md:p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#132190]">Novo médico</h2>
          <p className="mt-1 text-sm text-slate-500">
            Use este formulário apenas para cadastrar um novo profissional.
          </p>
        </div>

        <form className="grid grid-cols-1 gap-6 md:grid-cols-2" onSubmit={salvarMedico}>
          <div className="flex flex-col gap-2">
            <label htmlFor="nome" className="text-sm font-bold text-[#132190]">
              Nome completo
            </label>

            <input
              type="text"
              id="nome"
              placeholder="Digite o nome do médico"
              value={formCadastro.name}
              onChange={(event) =>
                atualizarCampoCadastro("name", event.target.value)
              }
              style={inputStyle}
              className="h-12 w-full rounded-xl border border-[#87B7FE]/30 outline-none transition-all placeholder:text-slate-400 focus:border-[#004AF7] focus:ring-2 focus:ring-[#004AF7]/10"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="crm" className="text-sm font-bold text-[#132190]">
              CRM
            </label>

            <input
              type="text"
              id="crm"
              placeholder="Digite o CRM"
              value={formCadastro.crm}
              onChange={(event) =>
                atualizarCampoCadastro("crm", event.target.value)
              }
              style={inputStyle}
              className="h-12 w-full rounded-xl border border-[#87B7FE]/30 outline-none transition-all placeholder:text-slate-400 focus:border-[#004AF7] focus:ring-2 focus:ring-[#004AF7]/10"
              required
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label
              htmlFor="especialidade"
              className="text-sm font-bold text-[#132190]"
            >
              Especialidade
            </label>

            <select
              id="especialidade"
              value={formCadastro.especialidadeId}
              onChange={(event) =>
                atualizarCampoCadastro("especialidadeId", event.target.value)
              }
              style={inputStyle}
              className="h-12 w-full rounded-xl border border-[#87B7FE]/30 outline-none transition-all focus:border-[#004AF7] focus:ring-2 focus:ring-[#004AF7]/10"
              required
            >
              <option value="">Selecione a especialidade</option>
              {especialidades.map((especialidade) => (
                <option key={especialidade._id} value={especialidade._id}>
                  {especialidade.name}
                </option>
              ))}
            </select>
          </div>

          {(erro || sucesso) && !medicoEditando && (
            <div
              className={`rounded-xl px-4 py-3 text-sm font-semibold md:col-span-2 ${
                erro
                  ? "bg-red-50 text-red-600"
                  : "bg-emerald-50 text-emerald-700"
              }`}
            >
              {erro || sucesso}
            </div>
          )}

          <div className="flex flex-wrap gap-3 mt-2 md:col-span-2">
            <button
              type="submit"
              disabled={salvando}
              className="flex items-center gap-2 rounded-xl bg-[#004AF7] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#132190] disabled:cursor-not-allowed disabled:opacity-70 shadow-md"
            >
              {salvando ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              Salvar Médico
            </button>

            <button
              type="button"
              onClick={limparFormularioCadastro}
              className="flex items-center gap-2 rounded-xl bg-[#E4F2FE] px-6 py-3 text-sm font-bold text-[#132190] transition-all hover:bg-[#d8ebff]"
            >
              <X size={18} />
              Limpar
            </button>
          </div>
        </form>
      </div>

      <div className="mx-auto max-w-[1200px] rounded-3xl border border-[#87B7FE]/20 bg-white p-6 md:p-8 shadow-sm">
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-[#132190]">
            Médicos Cadastrados
          </h2>

          <div className="relative w-full md:w-[350px]">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#87B7FE]"
            />

            <input
              type="text"
              placeholder="Pesquisar médico..."
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
              style={{ ...inputStyle, paddingLeft: "45px" }}
              className="h-12 w-full rounded-xl border border-[#87B7FE]/30 outline-none placeholder:text-slate-400 focus:border-[#004AF7]"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#87B7FE]/20">
          <table className="w-full min-w-[900px] border-collapse">
            <thead className="bg-[#E4F2FE]">
              <tr>
                <th className="p-4 text-left text-xs font-bold uppercase text-slate-500">
                  Nome
                </th>

                <th className="p-4 text-left text-xs font-bold uppercase text-slate-500">
                  CRM
                </th>

                <th className="p-4 text-left text-xs font-bold uppercase text-slate-500">
                  Especialidade
                </th>

                <th className="p-4 text-center text-xs font-bold uppercase text-slate-500">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody>
              {carregando && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-slate-500">
                    Carregando médicos...
                  </td>
                </tr>
              )}

              {!carregando &&
                medicosFiltrados.map((medico) => (
                  <tr
                    key={medico._id}
                    className="border-t border-slate-100 hover:bg-[#f8fbff] transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E4F2FE] text-[#004AF7]">
                          <User size={18} />
                        </div>

                        <span className="font-semibold text-[#132190]">
                          {medico.name}
                        </span>
                      </div>
                    </td>

                    <td className="p-4 text-slate-500 font-mono">
                      {medico.crm}
                    </td>

                    <td className="p-4">
                      <span className="inline-flex rounded-full bg-[#E4F2FE] px-3 py-1 text-xs font-bold text-[#004AF7]">
                        {getEspecialidadeNome(medico)}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => abrirModalEdicao(medico)}
                          className="p-2 text-[#004AF7] hover:bg-[#E4F2FE] rounded-xl transition-colors"
                          title="Editar médico"
                        >
                          <Edit size={18} />
                        </button>

                        <button
                          type="button"
                          onClick={() => excluirMedico(medico)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                          title="Excluir médico"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

              {!carregando && medicosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-slate-500">
                    Nenhum médico encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {medicoEditando && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#132190]/40 px-4 py-6">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl md:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex rounded-full bg-[#E4F2FE] px-3 py-1 text-xs font-bold text-[#004AF7]">
                  Editando médico
                </span>
                <h2 className="mt-3 text-2xl font-extrabold text-[#132190]">
                  {medicoEditando.name}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  As alterações serão aplicadas somente após confirmar.
                </p>
              </div>

              <button
                type="button"
                onClick={fecharModalEdicao}
                className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-[#E4F2FE] hover:text-[#132190]"
                title="Fechar edição"
              >
                <X size={22} />
              </button>
            </div>

            <form className="grid grid-cols-1 gap-5 md:grid-cols-2" onSubmit={atualizarMedico}>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="nome-edicao"
                  className="text-sm font-bold text-[#132190]"
                >
                  Nome completo
                </label>

                <input
                  type="text"
                  id="nome-edicao"
                  value={formEdicao.name}
                  onChange={(event) =>
                    atualizarCampoEdicao("name", event.target.value)
                  }
                  style={inputStyle}
                  className="h-12 w-full rounded-xl border border-[#87B7FE]/30 outline-none transition-all placeholder:text-slate-400 focus:border-[#004AF7] focus:ring-2 focus:ring-[#004AF7]/10"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="crm-edicao"
                  className="text-sm font-bold text-[#132190]"
                >
                  CRM
                </label>

                <input
                  type="text"
                  id="crm-edicao"
                  value={formEdicao.crm}
                  onChange={(event) =>
                    atualizarCampoEdicao("crm", event.target.value)
                  }
                  style={inputStyle}
                  className="h-12 w-full rounded-xl border border-[#87B7FE]/30 outline-none transition-all placeholder:text-slate-400 focus:border-[#004AF7] focus:ring-2 focus:ring-[#004AF7]/10"
                  required
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label
                  htmlFor="especialidade-edicao"
                  className="text-sm font-bold text-[#132190]"
                >
                  Especialidade
                </label>

                <select
                  id="especialidade-edicao"
                  value={formEdicao.especialidadeId}
                  onChange={(event) =>
                    atualizarCampoEdicao("especialidadeId", event.target.value)
                  }
                  style={inputStyle}
                  className="h-12 w-full rounded-xl border border-[#87B7FE]/30 outline-none transition-all focus:border-[#004AF7] focus:ring-2 focus:ring-[#004AF7]/10"
                  required
                >
                  <option value="">Selecione a especialidade</option>
                  {especialidades.map((especialidade) => (
                    <option key={especialidade._id} value={especialidade._id}>
                      {especialidade.name}
                    </option>
                  ))}
                </select>
              </div>

              {erro && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 md:col-span-2">
                  {erro}
                </div>
              )}

              <div className="flex flex-wrap justify-end gap-3 md:col-span-2">
                <button
                  type="button"
                  onClick={fecharModalEdicao}
                  className="flex items-center gap-2 rounded-xl bg-[#E4F2FE] px-5 py-3 text-sm font-bold text-[#132190] transition-all hover:bg-[#d8ebff]"
                >
                  <X size={18} />
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={atualizando}
                  className="flex items-center gap-2 rounded-xl bg-[#004AF7] px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#132190] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {atualizando ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}
                  Atualizar médico
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdicionarMedico;
