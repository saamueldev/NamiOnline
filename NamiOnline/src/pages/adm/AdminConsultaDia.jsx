import React from "react";
import { Calendar, Clock, User, Stethoscope, ChevronRight, Filter } from "lucide-react";

const ConsultasDoDia = () => {
  // Mock de dados organizado por médico
  const agenda = [
    {
      medico: "Dr. João Silva",
      especialidade: "Cardiologia",
      consultas: [
        { id: 1, paciente: "Carlos Alberto", horario: "08:00", tipo: "Retorno", data: "01/05/2026" },
        { id: 2, paciente: "Ana Beatriz", horario: "08:30", tipo: "Consulta", data: "01/05/2026" },
        { id: 3, paciente: "Marcos Souza", horario: "09:00", tipo: "Exame", data: "01/05/2026" },
      ],
    },
    {
      medico: "Dra. Lara Costa",
      especialidade: "Pediatria",
      consultas: [
        { id: 4, paciente: "Enzo Gabriel", horario: "10:00", tipo: "Consulta", data: "01/05/2026" },
        { id: 5, paciente: "Julia Paiva", horario: "10:30", tipo: "Retorno", data: "01/05/2026" },
        { id: 6, paciente: "Arthur Lima", horario: "11:00", tipo: "Consulta", data: "01/05/2026" },
      ],
    },
  ];

  return (
    // Fundo da página forçado para branco (!bg-white)
    <div className="min-h-screen !bg-white px-4 py-8 md:px-8 font-sans">
      <div className="mx-auto max-w-5xl">
        
        {/* CABEÇALHO DA PÁGINA */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#1e293b]">Consultas do Dia</h1>
            <div className="mt-2 flex items-center gap-2 text-slate-500">
              <Calendar size={18} className="text-[#1d72f3]" />
              <span className="font-medium text-slate-600">Sexta-feira, 01 de Maio de 2026</span>
            </div>
          </div>
          
          <button className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-all">
            <Filter size={18} /> Filtrar por Especialidade
          </button>
        </header>

        {/* LISTAGEM POR MÉDICO */}
        <div className="space-y-12">
          {agenda.map((grupo, idx) => (
            <section key={idx} className="relative">
              
              {/* HEADER DO MÉDICO (STICKY) */}
              <div className="sticky top-4 z-20 mb-6 flex items-center justify-between rounded-2xl bg-[#1d72f3] p-5 shadow-lg shadow-blue-500/15 text-white">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 border border-white/30">
                    <User size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold leading-tight">{grupo.medico}</h2>
                    <span className="text-xs font-bold text-blue-100 uppercase tracking-widest">
                      {grupo.especialidade}
                    </span>
                  </div>
                </div>
                <div className="hidden sm:block rounded-full bg-black/10 px-4 py-1.5 text-xs font-bold uppercase border border-white/10">
                  {grupo.consultas.length} Agendamentos
                </div>
              </div>

              {/* LISTA DE CONSULTAS */}
              <div className="grid gap-4 ml-6 pl-6 border-l-2 border-slate-100">
                {grupo.consultas.map((consulta) => (
                  <div 
                    key={consulta.id}
                    className="group relative flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-[#1d72f3] hover:shadow-md"
                    style={{ backgroundColor: 'white' }}
                  >
                    <div className="flex items-center gap-6 md:gap-10">
                      {/* HORÁRIO */}
                      <div className="flex flex-col items-center min-w-[70px] border-r border-slate-100 pr-6">
                        <div className="flex items-center gap-1 text-[#1d72f3] font-black text-xl leading-none">
                          {consulta.horario}
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">
                          {consulta.data}
                        </span>
                      </div>

                      {/* PACIENTE */}
                      <div>
                        <h3 className="text-lg font-bold text-[#334155] group-hover:text-[#1d72f3] transition-colors leading-tight">
                          {consulta.paciente}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock size={14} className="text-slate-400" />
                          <span className="text-sm font-medium text-slate-500">Início previsto</span>
                        </div>
                      </div>
                    </div>

                    {/* STATUS / AÇÃO */}
                    <div className="flex items-center gap-4">
                      <span className={`hidden sm:inline-flex rounded-lg px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider border ${
                        consulta.tipo === 'Retorno' 
                        ? 'bg-amber-50 text-amber-600 border-amber-100' 
                        : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      }`}>
                        {consulta.tipo}
                      </span>
                      <button className="rounded-xl p-2.5 text-slate-300 hover:bg-slate-50 hover:text-[#1d72f3] transition-all border border-transparent hover:border-slate-100">
                        <ChevronRight size={22} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* RODAPÉ */}
        <footer className="mt-16 mb-8 rounded-2xl bg-white p-8 text-center border-2 border-dashed border-slate-100">
          <p className="text-sm text-slate-400 font-medium">
            Você visualizou toda a agenda de hoje.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ConsultasDoDia;