import React, { useState } from "react";
import { Save, X, Search, Edit, Trash2 } from "lucide-react";

const CadastroEspecialidades = () => {
  const [busca, setBusca] = useState("");

  const inputStyle = "w-full px-4 py-3 !bg-white border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#004AF7] focus:border-[#004AF7] !text-slate-800 placeholder:text-[#9CA3AF] transition-all outline-none";

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* SEÇÃO: FORMULÁRIO DE CADASTRO */}
        <section className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-6 md:p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-[#132190]">Cadastro de Especialidades</h1>
            <p className="text-slate-500 mt-1">Gerencie as especialidades médicas da unidade</p>
          </header>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#132190]" htmlFor="specialty-name">
                  Nome da Especialidade
                </label>
                <input type="text" id="specialty-name" placeholder="Ex: Cardiologia" className={inputStyle} />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#132190]" htmlFor="specialty-code">
                  Código
                </label>
                <input type="text" id="specialty-code" placeholder="Ex: ESP-001" className={inputStyle} />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[#132190]" htmlFor="specialty-description">
                Descrição
              </label>
              <textarea id="specialty-description" placeholder="Descreva brevemente a especialidade..." rows="4" className={`${inputStyle} resize-none`}></textarea>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button type="submit" className="flex items-center justify-center gap-2 px-6 py-3 bg-[#004AF7] text-white font-semibold rounded-xl hover:bg-opacity-90 transition-all shadow-md shadow-blue-200">
                <Save size={20} /> Salvar Especialidade
              </button>
              <button type="button" className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-600 font-semibold rounded-xl hover:bg-slate-200 transition-all">
                <X size={20} /> Cancelar
              </button>
            </div>
          </form>
        </section>

        {/* SEÇÃO: LISTA DE ESPECIALIDADES */}
        <section className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-[#132190]">Especialidades Cadastradas</h2>
            
            {/* Campo de Busca com Lupa Fixa */}
            <div className="relative max-w-sm w-full" style={{ position: 'relative' }}>
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
                <Search size={20} className="text-[#9CA3AF]" />
              </div>
              <input
                type="text"
                placeholder="Pesquisar especialidade..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                style={{ paddingLeft: '45px' }} // Garante que o texto não fique em cima da lupa
                className="w-full pr-4 py-2.5 !bg-white border border-[#E5E7EB] rounded-xl focus:ring-2 focus:ring-[#004AF7] focus:border-[#004AF7] !text-slate-800 placeholder:text-[#9CA3AF] text-sm transition-all outline-none shadow-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-slate-50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Código</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5 text-[#132190] font-medium">Cardiologia</td>
                  <td className="px-6 py-5 text-slate-600">ESP-001</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-4">
                      <button className="text-[#004AF7] hover:text-[#132190] transition-colors" title="Editar">
                        <Edit size={18} />
                      </button>
                      <button className="text-red-500 hover:text-red-700 transition-colors" title="Excluir">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
            <p>Mostrando 1 especialidade</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-[#E5E7EB] rounded hover:bg-slate-50 disabled:opacity-50" disabled>Anterior</button>
              <button className="px-3 py-1 border border-[#E5E7EB] rounded hover:bg-slate-50">Próximo</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CadastroEspecialidades;