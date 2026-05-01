import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import imgConsulta from "../../assets/img_consulta.jpg";

const especialidadesLista = [
  "Alergologia", "Cardiologia", "Cirurgia Geral", "Clínica Médica",
  "Dermatologia", "Endocrinologia", "Fisioterapia", "Gastroenterologia",
  "Ginecologia", "Neurologia", "Nutrição", "Ortopedia",
  "Otorrinolaringologia", "Pediatria", "Psicologia", "Psiquiatria", "Urologia"
];

const ConsultaEspecialidade = () => {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");

  const filtrados = especialidadesLista.filter((e) =>
    e.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-white font-sans overflow-x-hidden flex flex-col">
      {/* Banner */}
      <section className="relative w-full h-[350px] md:h-[430px] shrink-0">
        <img src={imgConsulta} alt="Consulta" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-400/60" />
        <div className="absolute z-10 top-1/2 left-[8%] md:left-[12%] -translate-y-1/2 text-white max-w-[600px] px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">Nossas Especialidades</h1>
          <p className="text-lg md:text-xl opacity-90">Confira as especialidades médicas disponíveis e agende sua consulta.</p>
        </div>
      </section>

      {/* Barra de Pesquisa Blindada */}
      <section className="relative z-30 -mt-10 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative flex items-center w-full" style={{ position: 'relative' }}>
            
            {/* Ícone posicionado manualmente para não falhar */}
            <div 
              style={{ 
                position: 'absolute', 
                left: '20px', 
                zIndex: 10, 
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Search className="text-blue-500" size={24} />
            </div>

            {/* Input com Padding manual forçado */}
            <input
              type="text"
              placeholder="Busque por uma especialidade..."
              style={{ 
                paddingLeft: '60px', /* Garante que o texto comece DEPOIS da lupa */
                backgroundColor: 'white',
                border: 'none'
              }}
              className="w-full h-20 pr-8 rounded-2xl shadow-[0_15px_40px_-12px_rgba(0,0,0,0.15)] text-lg outline-none ring-2 ring-transparent focus:ring-blue-500/20 transition-all placeholder:text-slate-400 text-slate-700"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Lista de Cards */}
      <main className="flex-1 max-w-5xl mx-auto w-full mt-12 px-6 pb-20">
        <div className="flex flex-col gap-4">
          {filtrados.map((item) => (
            <div 
              key={item} 
              onClick={() => navigate('/consulta/data')}
              className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all group cursor-pointer"
            >
              <span className="text-lg font-medium text-slate-800 group-hover:text-blue-600">{item}</span>
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <ArrowRight size={18} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ConsultaEspecialidade;