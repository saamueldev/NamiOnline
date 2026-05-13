import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const ConfirmarConsulta = () => {
  const navigate = useNavigate();

  const [selectedDoctor, setSelectedDoctor] = useState('Dra. Maria Silva');
  const [selectedDate, setSelectedDate] = useState(4);
  const [selectedTime, setSelectedTime] = useState('08:00');

  const doctors = [
    { id: 1, name: 'Dra. Maria Silva', specialty: 'Clínica Geral', crm: 'CRM-CE 12345' },
    { id: 2, name: 'Dr. João Pereira', specialty: 'Clínica Geral', crm: 'CRM-CE 54321' },
    { id: 3, name: 'Dra. Ana Costa', specialty: 'Clínica Geral', crm: 'CRM-CE 67890' },
  ];

  const times = [
    '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '13:00', '13:30'
  ];

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#E4F2FE] font-sans text-slate-900 p-4 md:p-8">

      <style>{`
        .glass-card {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(135,183,254,0.25);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #E4F2FE;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #87B7FE;
          border-radius: 999px;
        }
      `}</style>

      {/* Header */}
      <header className="max-w-6xl mx-auto text-center mb-10">

        <span className="inline-flex rounded-full border border-[#87B7FE]/30 bg-white px-4 py-1 text-sm font-medium text-[#004AF7]">
          Agendamento
        </span>

        <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-[#132190] tracking-tight">
          Clínica Geral
        </h1>

        <p className="mt-3 text-slate-600 text-lg max-w-2xl mx-auto">
          Escolha seu médico, data e horário para continuar.
        </p>

      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Coluna esquerda */}
        <div className="space-y-8">

          {/* Local */}
          <section className="glass-card rounded-3xl p-6 shadow-sm">

            <h2 className="text-lg font-bold text-[#132190] mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#004AF7]" />
              Local de atendimento
            </h2>

            <div className="bg-gradient-to-br from-[#132190] to-[#004AF7] rounded-2xl p-6 text-white relative overflow-hidden">

              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">
                  NAMI - Unifor
                </h3>

                <p className="text-white/85 text-sm leading-relaxed">
                  Av. Washington Soares, 1321
                  <br />
                  Edson Queiroz, Fortaleza - CE
                </p>
              </div>

              <MapPin className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-white/10" />

            </div>

          </section>

          {/* Calendário */}
          <section className="glass-card rounded-3xl p-6 shadow-sm">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-lg font-bold text-[#132190] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#004AF7]" />
                Escolha a data
              </h2>

              <div className="flex items-center gap-4 bg-[#E4F2FE] rounded-full px-4 py-2">

                <ChevronLeft className="h-4 w-4 cursor-pointer text-[#132190]" />

                <span className="text-sm font-bold text-[#132190]">
                  Abril 2026
                </span>

                <ChevronRight className="h-4 w-4 cursor-pointer text-[#132190]" />

              </div>

            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-slate-400 mb-4 uppercase">
              <div>Dom</div>
              <div>Seg</div>
              <div>Ter</div>
              <div>Qua</div>
              <div>Qui</div>
              <div>Sex</div>
              <div>Sáb</div>
            </div>

            <div className="grid grid-cols-7 gap-2">

              <div></div>
              <div></div>
              <div></div>

              {days.map(day => (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`
                    aspect-square rounded-xl text-sm font-bold transition-all
                    ${selectedDate === day
                      ? 'bg-[#132190] text-white'
                      : 'bg-white text-slate-600 hover:bg-[#E4F2FE]'
                    }
                  `}
                >
                  {day}
                </button>
              ))}

            </div>

          </section>

        </div>

        {/* Coluna direita */}
        <div className="space-y-8">

          {/* Médicos */}
          <section className="glass-card rounded-3xl p-6 shadow-sm">

            <h2 className="text-lg font-bold text-[#132190] mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-[#004AF7]" />
              Escolha o médico
            </h2>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">

              {doctors.map(doc => (

                <button
                  key={doc.id}
                  onClick={() => setSelectedDoctor(doc.name)}
                  className={`
                    w-full p-4 rounded-2xl border text-left flex justify-between items-center transition-all
                    ${selectedDoctor === doc.name
                      ? 'border-[#004AF7] bg-[#E4F2FE]'
                      : 'border-slate-100 bg-white hover:border-[#87B7FE]'
                    }
                  `}
                >

                  <div className="flex gap-3 items-center">

                    <div className={`
                      p-2 rounded-full
                      ${selectedDoctor === doc.name
                        ? 'bg-[#004AF7] text-white'
                        : 'bg-slate-100 text-slate-400'
                      }
                    `}>
                      <User className="w-5 h-5" />
                    </div>

                    <div>
                      <p className="font-bold text-[#132190]">
                        {doc.name}
                      </p>

                      <p className="text-xs text-slate-500">
                        {doc.specialty}
                      </p>
                    </div>

                  </div>

                  <div className="flex flex-col items-end gap-2">

                    <span className="text-[10px] font-bold text-slate-400">
                      {doc.crm}
                    </span>

                    {selectedDoctor === doc.name && (
                      <CheckCircle2 className="w-5 h-5 text-[#004AF7]" />
                    )}

                  </div>

                </button>

              ))}

            </div>

          </section>

          {/* Horários */}
          <section className="glass-card rounded-3xl p-6 shadow-sm">

            <h2 className="text-lg font-bold text-[#132190] mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#004AF7]" />
              Escolha o horário
            </h2>

            <div className="grid grid-cols-4 gap-3">

              {times.map(time => (

                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`
                    py-3 rounded-xl border font-bold text-sm transition-all
                    ${selectedTime === time
                      ? 'bg-[#004AF7] border-[#004AF7] text-white'
                      : 'bg-white border-slate-100 text-slate-600 hover:bg-[#E4F2FE]'
                    }
                  `}
                >
                  {time}
                </button>

              ))}

            </div>

          </section>

          {/* Botão */}
          <button
            onClick={() => navigate('/confirmacao')}
            className="w-full bg-[#004AF7] hover:bg-[#132190] text-white font-bold py-5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 group"
          >
            Confirmar Agendamento

            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>

        </div>

      </main>
    </div>
  );
};

export default ConfirmarConsulta;