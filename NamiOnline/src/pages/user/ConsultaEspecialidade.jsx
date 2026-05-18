import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import imgConsulta from "../../assets/img_consulta.jpg";
import api from "../../services/api";

const ConsultaEspecialidade = () => {
  const navigate = useNavigate();

  const [busca, setBusca] = useState("");
  const [especialidades, setEspecialidades] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarEspecialidades();
  }, []);

  async function buscarEspecialidades() {
    try {
      const response = await api.get("/especialidades");

      console.log("Especialidades:", response.data);

      setEspecialidades(response.data || []);
    } catch (error) {
      console.error("Erro ao buscar especialidades:", error);
      setEspecialidades([]);
    } finally {
      setCarregando(false);
    }
  }

  const filtrados = especialidades.filter((especialidade) => {
    const nome = especialidade.nome || especialidade.name || "";

    return nome.toLowerCase().includes(busca.toLowerCase());
  });

  function selecionarEspecialidade(especialidade) {
    const precisaGuia =
      especialidade.requerGuia ??
      especialidade.necessitaGuia ??
      especialidade.requiresGuide ??
      false;

    if (precisaGuia) {
      navigate("/agendar/anexar-guia", {
        state: {
          especialidade
        }
      });
    } else {
      navigate("/agendamento/data", {
        state: {
          especialidade
        }
      });
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#E4F2FE] font-sans overflow-x-hidden flex flex-col">

      {/* Banner */}
      <section className="relative w-full h-[350px] md:h-[430px] shrink-0 overflow-hidden">
        <img
          src={imgConsulta}
          alt="Consulta"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#132190]/65 via-[#004AF7]/35 to-transparent" />

        <div className="absolute z-10 top-1/2 left-[8%] md:left-[12%] -translate-y-1/2 text-white max-w-[650px] px-4">

          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm">
            Área de Consultas
          </span>

          <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight tracking-tight">
            Nossas Especialidades
          </h1>

          <p className="mt-4 text-lg md:text-xl text-white/90 leading-7">
            Confira as especialidades médicas disponíveis e agende sua consulta no NamiOnline.
          </p>

        </div>
      </section>

      {/* Pesquisa */}
      <section className="relative z-30 -mt-10 px-6">
        <div className="w-full flex justify-center">
          <div className="relative flex items-center w-full max-w-2xl rounded-3xl border border-white/20 bg-white/10 p-3 backdrop-blur-md">

            <Search
              className="absolute left-8 h-6 w-6 text-[#87B7FE] pointer-events-none"
            />

            <input
              type="text"
              placeholder="Busque por uma especialidade..."
              className="w-full h-16 rounded-2xl bg-white pl-14 pr-6 text-base md:text-lg text-slate-700 outline-none shadow-lg placeholder:text-slate-400"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />

          </div>
        </div>
      </section>

      {/* Lista */}
      <main className="flex-1 max-w-5xl mx-auto w-full mt-12 px-6 pb-20">

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#132190]">
            Especialidades disponíveis
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            Selecione uma especialidade para continuar o agendamento.
          </p>
        </div>

        {carregando && (
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm text-slate-600">
            Carregando especialidades...
          </div>
        )}

        {!carregando && (
          <div className="flex flex-col gap-4">

            {filtrados.map((especialidade) => {
              const nome =
                especialidade.nome ||
                especialidade.name;

              const precisaGuia =
                especialidade.requerGuia ??
                especialidade.necessitaGuia ??
                especialidade.requiresGuide ??
                false;

              return (
                <div
                  key={especialidade._id}
                  onClick={() => selecionarEspecialidade(especialidade)}
                  className="group flex items-center justify-between rounded-3xl border border-[#87B7FE]/25 bg-white p-6 shadow-sm hover:shadow-md cursor-pointer"
                >

                  <div>
                    <span className="text-lg font-semibold text-[#132190]">
                      {nome}
                    </span>

                    <p className="mt-1 text-sm text-slate-500">
                      {precisaGuia
                        ? "Esta especialidade precisa de guia médica"
                        : "Ver horários disponíveis para esta especialidade"}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E4F2FE] text-[#004AF7]">
                    <ArrowRight size={18} />
                  </div>

                </div>
              );
            })}

          </div>
        )}

        {!carregando && filtrados.length === 0 && (
          <div className="mt-8 rounded-3xl border border-[#87B7FE]/25 bg-white p-8 text-center shadow-sm">

            <h3 className="text-lg font-bold text-[#132190]">
              Nenhuma especialidade encontrada
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Tente buscar por outro nome de especialidade.
            </p>

          </div>
        )}

      </main>
    </div>
  );
};

export default ConsultaEspecialidade;
