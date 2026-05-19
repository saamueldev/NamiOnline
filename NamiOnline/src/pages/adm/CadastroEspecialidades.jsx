import React, { useEffect, useMemo, useState } from "react";
import {
  Save,
  X,
  Search,
  Edit,
  Trash2,
  Stethoscope,
  Loader2,
} from "lucide-react";
import api from "../../services/api";

const estadoInicial = {
  name: "",
  duracaoConsulta: 30,
  requerGuia: false,
};

const CadastroEspecialidades = () => {
  const [busca, setBusca] = useState("");
  const [especialidades, setEspecialidades] = useState([]);
  const [formCadastro, setFormCadastro] = useState(estadoInicial);
  const [formEdicao, setFormEdicao] = useState(estadoInicial);
  const [especialidadeEditando, setEspecialidadeEditando] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const inputStyle =
    "w-full px-4 py-3 bg-white border border-[#87B7FE]/25 rounded-xl outline-none transition-all text-slate-700 placeholder:text-slate-400 focus:border-[#004AF7] focus:ring-2 focus:ring-[#004AF7]/10";

  const carregarEspecialidades = async () => {
    setCarregando(true);
    setErro("");

    try {
      const resposta = await api.get("/especialidades");
      setEspecialidades(resposta.data || []);
    } catch (error) {
      setErro(
        error.response?.data?.mensagem ||
          "Não foi possível carregar as especialidades."
      );
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarEspecialidades();
  }, []);

  const especialidadesFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    if (!termo) return especialidades;

    return especialidades.filter((especialidade) =>
      especialidade.name?.toLowerCase().includes(termo)
    );
  }, [busca, especialidades]);

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

  const montarPayload = (form) => ({
    name: form.name.trim(),
    duracaoConsulta: Number(form.duracaoConsulta),
    requerGuia: Boolean(form.requerGuia),
  });

  const limparFormularioCadastro = () => {
    setFormCadastro(estadoInicial);
    setErro("");
    setSucesso("");
  };

  const fecharModalEdicao = () => {
    setEspecialidadeEditando(null);
    setFormEdicao(estadoInicial);
    setErro("");
  };

  const salvarEspecialidade = async (event) => {
    event.preventDefault();
    setSalvando(true);
    setErro("");
    setSucesso("");

    try {
      await api.post("/especialidades", montarPayload(formCadastro));
      setSucesso("Especialidade cadastrada com sucesso.");
      setFormCadastro(estadoInicial);
      await carregarEspecialidades();
    } catch (error) {
      setErro(
        error.response?.data?.mensagem ||
          "Não foi possível salvar a especialidade."
      );
    } finally {
      setSalvando(false);
    }
  };

  const abrirModalEdicao = (especialidade) => {
    setFormEdicao({
      name: especialidade.name || "",
      duracaoConsulta: especialidade.duracaoConsulta || 30,
      requerGuia: Boolean(especialidade.requerGuia),
    });
    setEspecialidadeEditando(especialidade);
    setErro("");
    setSucesso("");
  };

  const atualizarEspecialidade = async (event) => {
    event.preventDefault();

    if (!especialidadeEditando) return;

    setAtualizando(true);
    setErro("");
    setSucesso("");

    try {
      await api.patch(
        `/especialidades/${especialidadeEditando._id}`,
        montarPayload(formEdicao)
      );
      setSucesso("Especialidade atualizada com sucesso.");
      fecharModalEdicao();
      await carregarEspecialidades();
    } catch (error) {
      setErro(
        error.response?.data?.mensagem ||
          "Não foi possível atualizar a especialidade."
      );
    } finally {
      setAtualizando(false);
    }
  };

  const excluirEspecialidade = async (especialidade) => {
    const confirmou = window.confirm(`Deseja excluir ${especialidade.name}?`);

    if (!confirmou) return;

    setErro("");
    setSucesso("");

    try {
      await api.delete(`/especialidades/${especialidade._id}`);
      setSucesso("Especialidade excluída com sucesso.");

      if (especialidadeEditando?._id === especialidade._id) {
        fecharModalEdicao();
      }

      await carregarEspecialidades();
    } catch (error) {
      setErro(
        error.response?.data?.mensagem ||
          "Não foi possível excluir a especialidade."
      );
    }
  };

  const renderCamposEspecialidade = (form, atualizarCampo, sufixo = "") => (
    <>
      <div className="flex flex-col gap-2">
        <label
          htmlFor={`nome-especialidade${sufixo}`}
          className="text-sm font-bold text-[#132190]"
        >
          Nome da especialidade
        </label>

        <input
          id={`nome-especialidade${sufixo}`}
          type="text"
          placeholder="Ex: Cardiologia"
          value={form.name}
          onChange={(event) => atualizarCampo("name", event.target.value)}
          className={inputStyle}
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor={`duracao-consulta${sufixo}`}
          className="text-sm font-bold text-[#132190]"
        >
          Duração da consulta
        </label>

        <input
          id={`duracao-consulta${sufixo}`}
          type="number"
          min="1"
          step="1"
          placeholder="Ex: 30"
          value={form.duracaoConsulta}
          onChange={(event) =>
            atualizarCampo("duracaoConsulta", event.target.value)
          }
          className={inputStyle}
          required
        />
      </div>

      <label className="flex min-h-12 items-center gap-3 rounded-xl border border-[#87B7FE]/25 bg-white px-4 py-3 text-sm font-bold text-[#132190] md:col-span-2">
        <input
          type="checkbox"
          checked={form.requerGuia}
          onChange={(event) =>
            atualizarCampo("requerGuia", event.target.checked)
          }
          className="h-4 w-4 accent-[#004AF7]"
        />
        Requer guia para agendamento
      </label>
    </>
  );

  return (
    <div className="min-h-screen bg-[#E4F2FE] p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-[#87B7FE]/30 bg-white px-4 py-1 text-sm font-medium text-[#004AF7]">
            Gestão médica
          </span>

          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-[#132190] tracking-tight">
            Cadastro de Especialidades
          </h1>

          <p className="mt-3 text-slate-600 text-lg">
            Gerencie as especialidades médicas da unidade.
          </p>
        </div>

        <section className="rounded-3xl border border-[#87B7FE]/20 bg-white p-6 md:p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#132190]">
              Nova especialidade
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Cadastre apenas as informações usadas no agendamento.
            </p>
          </div>

          <form
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
            onSubmit={salvarEspecialidade}
          >
            {renderCamposEspecialidade(formCadastro, atualizarCampoCadastro)}

            {(erro || sucesso) && !especialidadeEditando && (
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

            <div className="flex flex-wrap gap-4 pt-2 md:col-span-2">
              <button
                type="submit"
                disabled={salvando}
                className="flex items-center gap-2 rounded-xl bg-[#004AF7] px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#132190] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {salvando ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                Salvar Especialidade
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
        </section>

        <section className="rounded-3xl border border-[#87B7FE]/20 bg-white p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-[#132190]">
              Especialidades Cadastradas
            </h2>

            <div className="relative max-w-sm w-full">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#87B7FE]"
              />

              <input
                type="text"
                placeholder="Pesquisar especialidade..."
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-[#87B7FE]/25 rounded-xl outline-none text-slate-700 placeholder:text-slate-400 focus:border-[#004AF7]"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#87B7FE]/15">
            <table className="w-full min-w-[760px] text-left border-collapse">
              <thead className="bg-[#E4F2FE]">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                    Nome
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                    Duração
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                    Guia
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase text-center text-slate-500">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>
                {carregando && (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-slate-500">
                      Carregando especialidades...
                    </td>
                  </tr>
                )}

                {!carregando &&
                  especialidadesFiltradas.map((especialidade) => (
                    <tr
                      key={especialidade._id}
                      className="border-t border-slate-100 hover:bg-[#f8fbff] transition-colors"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E4F2FE] text-[#004AF7]">
                            <Stethoscope size={18} />
                          </div>

                          <span className="font-semibold text-[#132190]">
                            {especialidade.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {especialidade.duracaoConsulta} min
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                            especialidade.requerGuia
                              ? "bg-amber-50 text-amber-700"
                              : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          {especialidade.requerGuia ? "Sim" : "Não"}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => abrirModalEdicao(especialidade)}
                            className="p-2 text-[#004AF7] hover:bg-[#E4F2FE] rounded-xl transition-all"
                            title="Editar especialidade"
                          >
                            <Edit size={18} />
                          </button>

                          <button
                            type="button"
                            onClick={() => excluirEspecialidade(especialidade)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            title="Excluir especialidade"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                {!carregando && especialidadesFiltradas.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-slate-500">
                      Nenhuma especialidade encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-6 text-sm text-slate-500">
            Mostrando {especialidadesFiltradas.length} especialidade
            {especialidadesFiltradas.length === 1 ? "" : "s"}
          </div>
        </section>
      </div>

      {especialidadeEditando && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#132190]/40 px-4 py-6">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl md:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex rounded-full bg-[#E4F2FE] px-3 py-1 text-xs font-bold text-[#004AF7]">
                  Editando especialidade
                </span>
                <h2 className="mt-3 text-2xl font-extrabold text-[#132190]">
                  {especialidadeEditando.name}
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

            <form
              className="grid grid-cols-1 gap-5 md:grid-cols-2"
              onSubmit={atualizarEspecialidade}
            >
              {renderCamposEspecialidade(
                formEdicao,
                atualizarCampoEdicao,
                "-edicao"
              )}

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
                  Atualizar especialidade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CadastroEspecialidades;
