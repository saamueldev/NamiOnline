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
  
  // Estados para gerenciar as seleções do usuário
  const [selectedDoctor, setSelectedDoctor] = useState('Dra. Maria Silva');
  const [selectedDate, setSelectedDate] = useState(4);
  const [selectedTime, setSelectedTime] = useState('08:00');

  const doctors = [
    { id: 1, name: 'Dra. Maria Silva', specialty: 'Clínica Geral', crm: 'CRM-CE 12345' },
    { id: 2, name: 'Dr. João Pereira', specialty: 'Clínica Geral', crm: 'CRM-CE 54321' },
    { id: 3, name: 'Dra. Ana Costa', specialty: 'Clínica Geral', crm: 'CRM-CE 67890' },
  ];

  const times = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '13:00', '13:30'];
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 p-4 md:p-8">
      {/* Estilos inline para manter a fidelidade ao seu layout original */}
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(226, 232, 240, 0.8);
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>

      {/* Cabeçalho */}
      <header className="max-w-6xl mx-auto text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#132190] mb-2 tracking-tight">
          Clínica Geral
        </h1>
        <div className="h-1.5 w-24 bg-[#004AF7] mx-auto mb-4 rounded-full"></div>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Selecione a data, o médico e o horário do seu atendimento no NAMI.
        </p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Coluna Esquerda: Local e Calendário */}
        <div className="space-y-8">
          {/* Seção: Local de Atendimento */}
          <section className="glass-card rounded-3xl p-6 shadow-xl shadow-blue-100/50">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#004AF7]" /> Local de atendimento
            </h2>
            <div className="bg-gradient-to-br from-[#1E40AF] to-[#132190] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">NAMI - Unifor</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Av. Washington Soares, 1321<br/>
                  Edson Queiroz, Fortaleza - CE
                </p>
              </div>
              <MapPin className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-white/10 group-hover:scale-110 transition-transform" />
            </div>
          </section>

          {/* Seção: Calendário */}
          <section className="glass-card rounded-3xl p-6 shadow-xl shadow-blue-100/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#004AF7]" /> Escolha a data
              </h2>
              <div className="flex items-center gap-4 bg-slate-100 rounded-full px-4 py-1.5">
                <ChevronLeft className="h-4 w-4 cursor-pointer hover:text-[#004AF7] transition-colors" />
                <span className="text-sm font-bold text-[#132190] min-w-[80px] text-center uppercase">Abril 2026</span>
                <ChevronRight className="h-4 w-4 cursor-pointer hover:text-[#004AF7] transition-colors" />
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-black text-slate-300 mb-4 uppercase">
              <div>Dom</div><div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div><div>Sáb</div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {/* Alinhamento para Abril 2026 (Começa na quarta) */}
              <div className="aspect-square"></div><div className="aspect-square"></div><div className="aspect-square"></div>
              {days.map(day => (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`aspect-square flex items-center justify-center rounded-xl text-sm font-bold transition-all transform active:scale-90 ${
                    selectedDate === day 
                      ? 'bg-[#004AF7] text-white shadow-md shadow-blue-500/30 ring-2 ring-offset-2 ring-[#004AF7]' 
                      : 'border border-slate-50 hover:bg-blue-50 text-slate-600'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Coluna Direita: Médico e Horário */}
        <div className="space-y-8">
          {/* Seção: Médicos */}
          <section className="glass-card rounded-3xl p-6 shadow-xl shadow-blue-100/50">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-[#004AF7]" /> Escolha o médico
            </h2>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {doctors.map(doc => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDoctor(doc.name)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                    selectedDoctor === doc.name
                      ? 'border-[#004AF7] bg-blue-50/50 shadow-sm'
                      : 'border-slate-100 bg-white hover:border-blue-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${selectedDoctor === doc.name ? 'bg-[#004AF7] text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={`font-bold transition-colors ${selectedDoctor === doc.name ? 'text-[#132190]' : 'text-slate-700'}`}>
                        {doc.name}
                      </p>
                      <p className="text-xs text-slate-500">{doc.specialty}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-100">
                      {doc.crm}
                    </span>
                    {selectedDoctor === doc.name && <CheckCircle2 className="w-5 h-5 text-[#004AF7] animate-in zoom-in" />}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Seção: Horários */}
          <section className="glass-card rounded-3xl p-6 shadow-xl shadow-blue-100/50">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#004AF7]" /> Escolha o horário
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {times.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 px-2 rounded-xl text-xs font-bold border-2 transition-all active:scale-95 ${
                    selectedTime === time
                      ? 'bg-[#132190] text-white border-[#132190] shadow-md'
                      : 'bg-white text-slate-500 border-slate-100 hover:border-blue-200'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </section>

          {/* Botão de Ação */}
          <div className="pt-2">
            <button 
              onClick={() => navigate()}
              className="w-full bg-gradient-to-r from-[#1E40AF] to-[#132190] text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
              Confirmar Agendamento
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-[10px] text-slate-400 mt-4 italic">
              Ao confirmar, você concorda com os termos de agendamento do NAMI.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConfirmarConsulta;