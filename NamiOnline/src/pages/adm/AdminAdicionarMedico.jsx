import React, { useState } from "react";
import { Search, Edit, Trash2, Save, X } from "lucide-react";

const AdicionarMedico = () => {
  const [busca, setBusca] = useState("");

  // Estilo blindado para os inputs (força o fundo branco e texto escuro)
  const inputStyle = {
    backgroundColor: 'white',
    color: '#334155',
    paddingLeft: '14px'
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 py-8 md:px-5 font-sans">
      
      {/* CARD DE CADASTRO */}
      <div className="mx-auto mb-8 max-w-[1200px] rounded-[24px] bg-white p-6 md:p-8 shadow-sm border border-slate-200">
        <div className="mb-8">
          <h1 className="text-2xl md:text-[2rem] font-bold text-[#1e293b] leading-tight">
            Cadastro de Médicos
          </h1>
          <p className="mt-1 text-sm md:text-[0.98rem] text-[#64748b]">
            Adicione e gerencie os profissionais da unidade
          </p>
        </div>

        <form className="grid grid-cols-1 gap-6 md:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          {[
            { label: "Nome completo", id: "nome", ph: "Digite o nome do médico", type: "text" },
            { label: "CRM", id: "crm", ph: "Digite o CRM", type: "text" },
            { label: "Especialidade", id: "especialidade", ph: "Digite a especialidade", type: "text" },
            { label: "E-mail", id: "email", ph: "Digite o e-mail", type: "email" },
            { label: "Telefone", id: "telefone", ph: "Digite o telefone", type: "text" },
          ].map((field) => (
            <div key={field.id} className="flex flex-col gap-2">
              <label htmlFor={field.id} className="text-sm font-bold text-[#334155]">
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.id}
                placeholder={field.ph}
                style={inputStyle}
                className="h-12 w-full rounded-xl border border-slate-300 !bg-white !text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[#1d72f3] focus:ring-2 focus:ring-[#1d72f3]/10"
              />
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <label htmlFor="turno" className="text-sm font-bold text-[#334155]">Turno</label>
            <select
              id="turno"
              style={inputStyle}
              className="h-12 w-full rounded-xl border border-slate-300 !bg-white !text-slate-700 outline-none transition-all focus:border-[#1d72f3] focus:ring-2"
            >
              <option>Selecione o turno</option>
              <option>Manhã</option>
              <option>Tarde</option>
              <option>Noite</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-3 mt-2 md:col-span-2">
            <button className="flex items-center gap-2 rounded-xl bg-[#1d72f3] px-6 py-3 text-[0.94rem] font-bold text-white transition-all hover:bg-[#155ecc] shadow-md shadow-blue-500/20">
              <Save size={18} /> Salvar Médico
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-slate-100 px-6 py-3 text-[0.94rem] font-bold text-slate-600 transition-all hover:bg-slate-200">
              <X size={18} /> Cancelar
            </button>
          </div>
        </form>
      </div>

      {/* CARD DA LISTA - COM BUSCA IGUAL À DE ESPECIALIDADES */}
      <div className="mx-auto max-w-[1200px] rounded-[24px] bg-white p-6 md:p-8 shadow-sm border border-slate-200">
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl md:text-2xl font-bold text-[#1e293b]">Médicos Cadastrados</h2>

          {/* BUSCA COM LUPA CORRIGIDA */}
          <div className="relative w-full md:w-[350px]" style={{ position: 'relative' }}>
            <div 
              style={{ 
                position: 'absolute', 
                left: '14px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                zIndex: 10, 
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Search size={20} className="text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Pesquisar médico..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={{ paddingLeft: '45px', backgroundColor: 'white', color: '#334155' }}
              className="h-12 w-full rounded-xl border border-slate-300 !bg-white !text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-[#1d72f3] focus:ring-2 focus:ring-[#1d72f3]/10"
            />
          </div>
        </div>

        {/* TABELA CLEAN */}
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full min-w-[950px] border-collapse">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Nome</th>
                <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">CRM</th>
                <th className="p-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Especialidade</th>
                <th className="p-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 text-sm text-slate-700 font-semibold">Dr. João Silva</td>
                <td className="p-4 text-sm text-slate-500 font-mono">12345-CE</td>
                <td className="p-4">
                  <span className="inline-flex rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600 border border-blue-100">
                    Cardiologia
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={18} /></button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
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