import React from "react";
import {
  Calendar,
  Clock,
  User,
  ChevronRight,
  Filter
} from "lucide-react";

const ConsultasDoDia = () => {

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
    <div className="min-h-screen bg-[#E4F2FE] px-4 py-8 md:px-8 font-sans">

      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <header className="mb-10">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>

              <span className="inline-flex rounded-full border border-[#87B7FE]/30 bg-white px-4 py-1 text-sm font-medium text-[#004AF7]">
                Agenda médica
              </span>

              <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-[#132190] tracking-tight">
                Consultas do Dia
              </h1>

              <div className="mt-3 flex items-center gap-2 text-slate-600">
                <Calendar size={18} className="text-[#004AF7]" />
                <span className="font-medium">
                  Sexta-feira, 01 de Maio de 2026
                </span>
              </div>

            </div>

            <button className="flex items-center gap-2 rounded-xl bg-white border border-[#87B7FE]/20 px-5 py-3 text-sm font-bold text-[#132190] shadow-sm hover:bg-[#E4F2FE] transition-all">
              <Filter size={18} />
              Filtrar
            </button>

          </div>

        </header>

        {/* MÉDICOS */}
        <div className="space-y-10">

          {agenda.map((grupo, idx) => (

            <section key={idx}>

              {/* CARD MÉDICO */}
              <div className="mb-5 rounded-3xl bg-gradient-to-r from-[#132190] to-[#004AF7] p-5 text-white shadow-md">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 border border-white/20">
                      <User size={22} />
                    </div>

                    <div>

                      <h2 className="text-xl font-bold">
                        {grupo.medico}
                      </h2>

                      <span className="text-sm text-white/80">
                        {grupo.especialidade}
                      </span>

                    </div>

                  </div>

                  <div className="hidden md:flex rounded-full bg-white/10 px-4 py-2 text-xs font-bold">
                    {grupo.consultas.length} Consultas
                  </div>

                </div>

              </div>

              {/* CONSULTAS */}
              <div className="space-y-4">

                {grupo.consultas.map((consulta) => (

                  <div
                    key={consulta.id}
                    className="group flex items-center justify-between rounded-3xl border border-[#87B7FE]/20 bg-white p-5 shadow-sm transition-all hover:border-[#004AF7]/30 hover:shadow-md"
                  >

                    <div className="flex items-center gap-6">

                      {/* HORÁRIO */}
                      <div className="min-w-[80px] border-r border-slate-100 pr-5">

                        <h3 className="text-xl font-bold text-[#004AF7]">
                          {consulta.horario}
                        </h3>

                        <p className="text-[11px] font-medium text-slate-400">
                          {consulta.data}
                        </p>

                      </div>

                      {/* PACIENTE */}
                      <div>

                        <h3 className="text-lg font-bold text-[#132190] group-hover:text-[#004AF7] transition-colors">
                          {consulta.paciente}
                        </h3>

                        <div className="mt-1 flex items-center gap-2">

                          <Clock size={14} className="text-slate-400" />

                          <span className="text-sm text-slate-500">
                            Início previsto
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* AÇÃO */}
                    <div className="flex items-center gap-4">

                      <span
                        className={`
                          hidden sm:inline-flex rounded-full px-3 py-1 text-xs font-bold
                          ${consulta.tipo === "Retorno"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-[#E4F2FE] text-[#004AF7]"
                          }
                        `}
                      >
                        {consulta.tipo}
                      </span>

                      <button className="rounded-xl p-2 text-slate-400 hover:bg-[#E4F2FE] hover:text-[#004AF7] transition-all">
                        <ChevronRight size={22} />
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            </section>

          ))}

        </div>

        {/* FOOTER */}
        <footer className="mt-14 rounded-3xl border border-[#87B7FE]/20 bg-white p-6 text-center">

          <p className="text-sm text-slate-500">
            Você visualizou toda a agenda de hoje.
          </p>

        </footer>

      </div>

    </div>
  );
};

export default ConsultasDoDia;