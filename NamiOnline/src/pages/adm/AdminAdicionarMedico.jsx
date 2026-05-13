import React, { useState } from "react";
import { Search, Edit, Trash2, Save, X, User } from "lucide-react";

const AdicionarMedico = () => {
  const [busca, setBusca] = useState("");

  const inputStyle = {
    backgroundColor: "white",
    color: "#334155",
    paddingLeft: "14px",
  };

  return (
    <div className="min-h-screen bg-[#E4F2FE] px-4 py-8 md:px-6 font-sans">

      {/* HEADER */}
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

      {/* FORM */}
      <div className="mx-auto mb-8 max-w-[1200px] rounded-3xl border border-[#87B7FE]/20 bg-white p-6 md:p-8 shadow-sm">

        <form
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          onSubmit={(e) => e.preventDefault()}
        >

          {[
            { label: "Nome completo", id: "nome", ph: "Digite o nome do médico", type: "text" },
            { label: "CRM", id: "crm", ph: "Digite o CRM", type: "text" },
            { label: "Especialidade", id: "especialidade", ph: "Digite a especialidade", type: "text" },
            { label: "E-mail", id: "email", ph: "Digite o e-mail", type: "email" },
            { label: "Telefone", id: "telefone", ph: "Digite o telefone", type: "text" },
          ].map((field) => (
            <div key={field.id} className="flex flex-col gap-2">

              <label
                htmlFor={field.id}
                className="text-sm font-bold text-[#132190]"
              >
                {field.label}
              </label>

              <input
                type={field.type}
                id={field.id}
                placeholder={field.ph}
                style={inputStyle}
                className="h-12 w-full rounded-xl border border-[#87B7FE]/30 outline-none transition-all placeholder:text-slate-400 focus:border-[#004AF7] focus:ring-2 focus:ring-[#004AF7]/10"
              />

            </div>
          ))}

          {/* Turno */}
          <div className="flex flex-col gap-2">

            <label
              htmlFor="turno"
              className="text-sm font-bold text-[#132190]"
            >
              Turno
            </label>

            <select
              id="turno"
              style={inputStyle}
              className="h-12 w-full rounded-xl border border-[#87B7FE]/30 outline-none focus:border-[#004AF7]"
            >
              <option>Selecione o turno</option>
              <option>Manhã</option>
              <option>Tarde</option>
              <option>Noite</option>
            </select>

          </div>

          {/* Botões */}
          <div className="flex flex-wrap gap-3 mt-2 md:col-span-2">

            <button className="flex items-center gap-2 rounded-xl bg-[#004AF7] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#132190] shadow-md">
              <Save size={18} />
              Salvar Médico
            </button>

            <button className="flex items-center gap-2 rounded-xl bg-[#E4F2FE] px-6 py-3 text-sm font-bold text-[#132190] transition-all hover:bg-[#d8ebff]">
              <X size={18} />
              Cancelar
            </button>

          </div>

        </form>
      </div>

      {/* LISTA */}
      <div className="mx-auto max-w-[1200px] rounded-3xl border border-[#87B7FE]/20 bg-white p-6 md:p-8 shadow-sm">

        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">

          <h2 className="text-2xl font-bold text-[#132190]">
            Médicos Cadastrados
          </h2>

          {/* Busca */}
          <div className="relative w-full md:w-[350px]">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#87B7FE]"
            />

            <input
              type="text"
              placeholder="Pesquisar médico..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={{ ...inputStyle, paddingLeft: "45px" }}
              className="h-12 w-full rounded-xl border border-[#87B7FE]/30 outline-none placeholder:text-slate-400 focus:border-[#004AF7]"
            />

          </div>

        </div>

        {/* Tabela */}
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

              <tr className="border-t border-slate-100 hover:bg-[#f8fbff] transition-colors">

                <td className="p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E4F2FE] text-[#004AF7]">
                      <User size={18} />
                    </div>

                    <span className="font-semibold text-[#132190]">
                      Dr. João Silva
                    </span>

                  </div>

                </td>

                <td className="p-4 text-slate-500 font-mono">
                  12345-CE
                </td>

                <td className="p-4">

                  <span className="inline-flex rounded-full bg-[#E4F2FE] px-3 py-1 text-xs font-bold text-[#004AF7]">
                    Cardiologia
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-2">

                    <button className="p-2 text-[#004AF7] hover:bg-[#E4F2FE] rounded-xl transition-colors">
                      <Edit size={18} />
                    </button>

                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AdicionarMedico;