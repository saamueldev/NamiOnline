import React, { useState } from "react";
import {
  Save,
  X,
  Search,
  Edit,
  Trash2,
  Stethoscope
} from "lucide-react";

const CadastroEspecialidades = () => {

  const [busca, setBusca] = useState("");

  const inputStyle =
    "w-full px-4 py-3 bg-white border border-[#87B7FE]/25 rounded-xl outline-none transition-all text-slate-700 placeholder:text-slate-400 focus:border-[#004AF7] focus:ring-2 focus:ring-[#004AF7]/10";

  return (
    <div className="min-h-screen bg-[#E4F2FE] p-4 md:p-8 font-sans">

      <div className="max-w-5xl mx-auto space-y-8">

        {/* HEADER */}
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

        {/* FORM */}
        <section className="rounded-3xl border border-[#87B7FE]/20 bg-white p-6 md:p-8 shadow-sm">

          <form
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="flex flex-col gap-2">

                <label className="text-sm font-bold text-[#132190]">
                  Nome da Especialidade
                </label>

                <input
                  type="text"
                  placeholder="Ex: Cardiologia"
                  className={inputStyle}
                />

              </div>

              <div className="flex flex-col gap-2">

                <label className="text-sm font-bold text-[#132190]">
                  Código
                </label>

                <input
                  type="text"
                  placeholder="Ex: ESP-001"
                  className={inputStyle}
                />

              </div>

            </div>

            <div className="flex flex-col gap-2">

              <label className="text-sm font-bold text-[#132190]">
                Descrição
              </label>

              <textarea
                rows="4"
                placeholder="Descreva brevemente a especialidade..."
                className={`${inputStyle} resize-none`}
              />

            </div>

            {/* Botões */}
            <div className="flex flex-wrap gap-4 pt-2">

              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-[#004AF7] px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#132190]"
              >
                <Save size={18} />
                Salvar Especialidade
              </button>

              <button
                type="button"
                className="flex items-center gap-2 rounded-xl bg-[#E4F2FE] px-6 py-3 text-sm font-bold text-[#132190] transition-all hover:bg-[#d8ebff]"
              >
                <X size={18} />
                Cancelar
              </button>

            </div>

          </form>

        </section>

        {/* LISTA */}
        <section className="rounded-3xl border border-[#87B7FE]/20 bg-white p-6 md:p-8 shadow-sm">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">

            <h2 className="text-2xl font-bold text-[#132190]">
              Especialidades Cadastradas
            </h2>

            {/* Busca */}
            <div className="relative max-w-sm w-full">

              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#87B7FE]"
              />

              <input
                type="text"
                placeholder="Pesquisar especialidade..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-[#87B7FE]/25 rounded-xl outline-none text-slate-700 placeholder:text-slate-400 focus:border-[#004AF7]"
              />

            </div>

          </div>

          {/* Tabela */}
          <div className="overflow-x-auto rounded-2xl border border-[#87B7FE]/15">

            <table className="w-full text-left border-collapse">

              <thead className="bg-[#E4F2FE]">

                <tr>

                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                    Nome
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                    Código
                  </th>

                  <th className="px-6 py-4 text-xs font-bold uppercase text-center text-slate-500">
                    Ações
                  </th>

                </tr>

              </thead>

              <tbody>

                <tr className="border-t border-slate-100 hover:bg-[#f8fbff] transition-colors">

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E4F2FE] text-[#004AF7]">
                        <Stethoscope size={18} />
                      </div>

                      <span className="font-semibold text-[#132190]">
                        Cardiologia
                      </span>

                    </div>

                  </td>

                  <td className="px-6 py-5 text-slate-500 font-mono">
                    ESP-001
                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-2">

                      <button className="p-2 text-[#004AF7] hover:bg-[#E4F2FE] rounded-xl transition-all">
                        <Edit size={18} />
                      </button>

                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all">
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between text-sm text-slate-500">

            <p>
              Mostrando 1 especialidade
            </p>

            <div className="flex gap-2">

              <button className="rounded-lg border border-[#87B7FE]/20 px-3 py-2 bg-white hover:bg-[#E4F2FE]">
                Anterior
              </button>

              <button className="rounded-lg border border-[#87B7FE]/20 px-3 py-2 bg-white hover:bg-[#E4F2FE]">
                Próximo
              </button>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
};

export default CadastroEspecialidades;