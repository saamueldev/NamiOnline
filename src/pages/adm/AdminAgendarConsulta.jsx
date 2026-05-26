import React, { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
  MapPin,
  Search,
  Stethoscope,
  User,
  X,
} from "lucide-react";
import api from "../../services/api";

const LOCAL_NAMI = {
  nome: "NAMI - Unifor",
  endereco: "Av. Washington Soares, 1321",
  bairro: "Edson Queiroz, Fortaleza - CE",
};

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const CHAVES_SEMANA = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

function normalizarId(valor) {
  if (!valor) return "";
  if (typeof valor === "string") return valor;
  return valor._id || valor.id || "";
}

function nomeEspecialidade(especialidade) {
  return especialidade?.name || especialidade?.nome || "Especialidade";
}

function especialidadeDoMedico(medico) {
  return medico?.especialidadeId || medico?.especialidade || medico?.especialidadeID || null;
}

function nomePaciente(paciente) {
  return paciente?.user?.name || paciente?.user?.nome || "Paciente";
}

function minutosDoHorario(horario) {
  const [hora, minuto] = horario.split(":").map(Number);
  return hora * 60 + minuto;
}

function formatarHorario(minutos) {
  const hora = String(Math.floor(minutos / 60)).padStart(2, "0");
  const minuto = String(minutos % 60).padStart(2, "0");
  return `${hora}:${minuto}`;
}

function gerarHorariosDoDia(data, horariosFixos, duracaoConsulta) {
  const chaveDia = CHAVES_SEMANA[data.getDay()];
  const faixas = horariosFixos[chaveDia] || [];
  const horarios = [];

  faixas.forEach((faixa) => {
    const inicio = minutosDoHorario(faixa.start);
    const fim = minutosDoHorario(faixa.end);

    for (let minuto = inicio; minuto + duracaoConsulta <= fim; minuto += duracaoConsulta) {
      horarios.push(formatarHorario(minuto));
    }
  });

  return horarios;
}

function mesmoDia(dataA, dataB) {
  return (
    dataA.getFullYear() === dataB.getFullYear() &&
    dataA.getMonth() === dataB.getMonth() &&
    dataA.getDate() === dataB.getDate()
  );
}

function criarDataConsulta(data, horario) {
  const [hora, minuto] = horario.split(":").map(Number);
  const dataConsulta = new Date(data);
  dataConsulta.setHours(hora, minuto, 0, 0);
  return dataConsulta;
}

function formatarData(data) {
  return data.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

const AdminAgendarConsulta = () => {
  const hoje = useMemo(() => {
    const data = new Date();
    data.setHours(0, 0, 0, 0);
    return data;
  }, []);

  const [cpf, setCpf] = useState("");
  const [paciente, setPaciente] = useState(null);
  const [buscandoPaciente, setBuscandoPaciente] = useState(false);
  const [especialidades, setEspecialidades] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [horariosFixos, setHorariosFixos] = useState({});
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [selectedEspecialidadeId, setSelectedEspecialidadeId] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [mesAtual, setMesAtual] = useState(() => new Date(hoje.getFullYear(), hoje.getMonth(), 1));
  const [confirmando, setConfirmando] = useState(false);
  const [consultaConfirmada, setConsultaConfirmada] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        setErro("");

        const [especialidadesResponse, medicosResponse, horariosResponse, consultasResponse] =
          await Promise.all([
            api.get("/especialidades"),
            api.get("/medicos"),
            api.get("/horarios-fixos"),
            api.get("/consultas"),
          ]);

        const especialidadesApi = Array.isArray(especialidadesResponse.data)
          ? especialidadesResponse.data
          : [];
        const medicosApi = Array.isArray(medicosResponse.data) ? medicosResponse.data : [];

        setEspecialidades(especialidadesApi);
        setMedicos(medicosApi);
        setHorariosFixos(horariosResponse.data || {});
        setConsultas(Array.isArray(consultasResponse.data) ? consultasResponse.data : []);
        setSelectedEspecialidadeId(normalizarId(especialidadesApi[0]));
      } catch (error) {
        console.error("Erro ao carregar dados de agendamento:", error);
        setErro("Não foi possível carregar especialidades, médicos e horários.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  const especialidadeSelecionada = useMemo(
    () =>
      especialidades.find(
        (especialidade) => normalizarId(especialidade) === selectedEspecialidadeId
      ),
    [especialidades, selectedEspecialidadeId]
  );

  const duracaoConsulta = Number(especialidadeSelecionada?.duracaoConsulta) || 30;

  const medicosDaEspecialidade = useMemo(() => {
    if (!selectedEspecialidadeId) return [];

    const nomeSelecionado = nomeEspecialidade(especialidadeSelecionada).toLowerCase();

    return medicos.filter(
      (medico) => {
        const especialidadeMedico = especialidadeDoMedico(medico);
        const medicoEspecialidadeId = normalizarId(especialidadeMedico);
        const medicoEspecialidadeNome = nomeEspecialidade(especialidadeMedico).toLowerCase();

        return (
          medicoEspecialidadeId === selectedEspecialidadeId ||
          medicoEspecialidadeNome === nomeSelecionado
        );
      }
    );
  }, [especialidadeSelecionada, medicos, selectedEspecialidadeId]);

  const selectedDoctor = useMemo(
    () => medicosDaEspecialidade.find((medico) => normalizarId(medico) === selectedDoctorId),
    [medicosDaEspecialidade, selectedDoctorId]
  );

  const horariosOcupados = useMemo(() => {
    if (!selectedDoctor || !selectedDate) return new Set();

    return new Set(
      consultas
        .filter((consulta) => {
          const consultaData = new Date(consulta.dataConsulta);
          return (
            normalizarId(consulta.medicoId) === normalizarId(selectedDoctor) &&
            consulta.status !== "CANCELADO" &&
            mesmoDia(consultaData, selectedDate)
          );
        })
        .map((consulta) => {
          const consultaData = new Date(consulta.dataConsulta);
          return formatarHorario(consultaData.getHours() * 60 + consultaData.getMinutes());
        })
    );
  }, [consultas, selectedDate, selectedDoctor]);

  const horariosDisponiveis = useMemo(() => {
    if (!selectedDate || !selectedDoctor) return [];

    return gerarHorariosDoDia(selectedDate, horariosFixos, duracaoConsulta).filter(
      (horario) => !horariosOcupados.has(horario)
    );
  }, [duracaoConsulta, horariosFixos, horariosOcupados, selectedDate, selectedDoctor]);

  const diasDoMes = useMemo(() => {
    const ano = mesAtual.getFullYear();
    const mes = mesAtual.getMonth();
    const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
    const quantidadeDias = new Date(ano, mes + 1, 0).getDate();

    const espacosIniciais = Array.from({ length: primeiroDiaSemana }, (_, index) => ({
      tipo: "empty",
      id: `empty-${index}`,
    }));

    const dias = Array.from({ length: quantidadeDias }, (_, index) => {
      const data = new Date(ano, mes, index + 1);
      data.setHours(0, 0, 0, 0);

      const horarios = gerarHorariosDoDia(data, horariosFixos, duracaoConsulta);
      const horariosLivres = selectedDoctor
        ? horarios.filter((horario) => {
            const ocupado = consultas.some((consulta) => {
              const consultaData = new Date(consulta.dataConsulta);
              return (
                normalizarId(consulta.medicoId) === normalizarId(selectedDoctor) &&
                consulta.status !== "CANCELADO" &&
                mesmoDia(consultaData, data) &&
                formatarHorario(consultaData.getHours() * 60 + consultaData.getMinutes()) === horario
              );
            });

            return !ocupado;
          })
        : horarios;

      return {
        tipo: "day",
        id: data.toISOString(),
        data,
        dia: index + 1,
        disponivel: data >= hoje && horariosLivres.length > 0 && Boolean(selectedDoctor),
      };
    });

    return [...espacosIniciais, ...dias];
  }, [consultas, duracaoConsulta, hoje, horariosFixos, mesAtual, selectedDoctor]);

  useEffect(() => {
    setSelectedDoctorId(normalizarId(medicosDaEspecialidade[0]));
    setSelectedDate(null);
    setSelectedTime("");
  }, [medicosDaEspecialidade]);

  useEffect(() => {
    const dataAindaExiste =
      selectedDate &&
      diasDoMes.some(
        (dia) => dia.tipo === "day" && dia.disponivel && mesmoDia(dia.data, selectedDate)
      );

    if (dataAindaExiste) return;

    const primeiroDiaDisponivel = diasDoMes.find((dia) => dia.tipo === "day" && dia.disponivel);
    setSelectedDate(primeiroDiaDisponivel?.data || null);
  }, [diasDoMes, selectedDate]);

  useEffect(() => {
    if (!horariosDisponiveis.length) {
      setSelectedTime("");
      return;
    }

    setSelectedTime((horarioAtual) =>
      horariosDisponiveis.includes(horarioAtual) ? horarioAtual : horariosDisponiveis[0]
    );
  }, [horariosDisponiveis]);

async function buscarPaciente(event) {
    event.preventDefault();

    const cpfBusca = cpf.trim();

    if (!cpfBusca) {
      setErro("Informe o CPF do paciente.");
      setPaciente(null);
      return;
    }

    try {
      setBuscandoPaciente(true);
      setErro("");
      setPaciente(null);

      const response = await api.get(`/pacientes/cpf/${encodeURIComponent(cpfBusca)}`);
      setPaciente(response.data);
    } catch (error) {
      setErro(error.response?.data?.error || "Paciente não encontrado para este CPF.");
    } finally {
      setBuscandoPaciente(false);
    }
  }

  function alterarMes(direcao) {
    setMesAtual((mes) => new Date(mes.getFullYear(), mes.getMonth() + direcao, 1));
  }

  async function confirmarAgendamento() {
    if (!paciente) {
      setErro("Busque e selecione um paciente pelo CPF antes de confirmar.");
      return;
    }

    if (!selectedDoctor || !selectedDate || !selectedTime || !selectedEspecialidadeId) {
      setErro("Escolha especialidade, médico, data e horário para confirmar.");
      return;
    }

    try {
      setConfirmando(true);
      setErro("");

      const dataConsulta = criarDataConsulta(selectedDate, selectedTime);

      const response = await api.post("/consultas", {
        pacienteId: normalizarId(paciente),
        medicoId: normalizarId(selectedDoctor),
        especialidadeId: selectedEspecialidadeId,
        guiaId: null,
        dataConsulta: dataConsulta.toISOString(),
        tipo: "CONSULTA",
        status: "AGENDADO",
      });

      setConsultas((consultasAtuais) => [...consultasAtuais, response.data]);
      setConsultaConfirmada({
        local: LOCAL_NAMI,
        data: selectedDate,
        horario: selectedTime,
        medico: selectedDoctor,
        paciente,
        especialidade: especialidadeSelecionada,
      });
    } catch (error) {
      console.error("Erro ao confirmar consulta:", error);
      setErro(error.response?.data?.error || "Não foi possível confirmar a consulta.");
    } finally {
      setConfirmando(false);
    }
  }

  const mesFormatado = mesAtual.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#E4F2FE] font-sans text-slate-900 p-4 md:p-8">
      <style>{`
        .glass-card {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(135,183,254,0.25);
        }

        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #E4F2FE; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #87B7FE;
          border-radius: 999px;
        }
      `}</style>

      <header className="max-w-6xl mx-auto text-center mb-10">
        <span className="inline-flex rounded-full border border-[#87B7FE]/30 bg-white px-4 py-1 text-sm font-medium text-[#004AF7]">
          Agendamento administrativo
        </span>

        <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-[#132190] tracking-tight">
          Marcar Consulta
        </h1>

        <p className="mt-3 text-slate-600 text-lg max-w-2xl mx-auto">
          Localize o paciente pelo CPF e escolha especialidade, médico, data e horário.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-8">
        <section className="glass-card rounded-3xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#132190] mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-[#004AF7]" />
            Paciente
          </h2>

          <form className="flex flex-col gap-3 md:flex-row" onSubmit={buscarPaciente}>
            <input
              type="text"
              value={cpf}
              onChange={(event) => setCpf(event.target.value)}
              placeholder="Digite o CPF do paciente"
              className="h-12 flex-1 rounded-xl border border-[#87B7FE]/30 bg-white px-4 text-slate-700 outline-none placeholder:text-slate-400 focus:border-[#004AF7] focus:ring-2 focus:ring-[#004AF7]/10"
            />

            <button
              type="submit"
              disabled={buscandoPaciente}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#004AF7] px-6 text-sm font-bold text-white shadow-md transition-all hover:bg-[#132190] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {buscandoPaciente ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              Buscar paciente
            </button>
          </form>

          {paciente && (
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-emerald-700">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-[#132190]">{nomePaciente(paciente)}</p>
                  <p className="text-sm text-slate-600">
                    CPF: {paciente.user?.cpf || "Não informado"} | Prontuário: {paciente.prontuario}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <section className="glass-card rounded-3xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#132190] mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#004AF7]" />
                Local de atendimento
              </h2>

              <div className="bg-gradient-to-br from-[#132190] to-[#004AF7] rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">{LOCAL_NAMI.nome}</h3>
                  <p className="text-white/85 text-sm leading-relaxed">
                    {LOCAL_NAMI.endereco}
                    <br />
                    {LOCAL_NAMI.bairro}
                  </p>
                </div>
                <MapPin className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-white/10" />
              </div>
            </section>

            <section className="glass-card rounded-3xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#132190] mb-4 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-[#004AF7]" />
                Especialidade
              </h2>

              {carregando && (
                <div className="flex items-center gap-2 rounded-2xl bg-white p-4 text-sm font-semibold text-slate-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Carregando dados do banco...
                </div>
              )}

              {!carregando && (
                <select
                  value={selectedEspecialidadeId}
                  onChange={(event) => setSelectedEspecialidadeId(event.target.value)}
                  className="h-12 w-full rounded-xl border border-[#87B7FE]/30 bg-white px-4 text-slate-700 outline-none focus:border-[#004AF7] focus:ring-2 focus:ring-[#004AF7]/10"
                >
                  <option value="">Selecione a especialidade</option>
                  {especialidades.map((especialidade) => (
                    <option key={normalizarId(especialidade)} value={normalizarId(especialidade)}>
                      {nomeEspecialidade(especialidade)}
                    </option>
                  ))}
                </select>
              )}
            </section>

            <section className="glass-card rounded-3xl p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-6">
                <h2 className="text-lg font-bold text-[#132190] flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#004AF7]" />
                  Escolha a data
                </h2>

                <div className="flex items-center justify-between gap-4 bg-[#E4F2FE] rounded-full px-4 py-2">
                  <button type="button" onClick={() => alterarMes(-1)} className="rounded-full p-1 text-[#132190] hover:bg-white" aria-label="Mês anterior">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="min-w-[130px] text-center text-sm font-bold capitalize text-[#132190]">
                    {mesFormatado}
                  </span>
                  <button type="button" onClick={() => alterarMes(1)} className="rounded-full p-1 text-[#132190] hover:bg-white" aria-label="Próximo mês">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-slate-400 mb-4 uppercase">
                {DIAS_SEMANA.map((dia) => (
                  <div key={dia}>{dia}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {diasDoMes.map((dia) => {
                  if (dia.tipo === "empty") return <div key={dia.id} />;

                  const selecionado = selectedDate && mesmoDia(dia.data, selectedDate);

                  return (
                    <button
                      key={dia.id}
                      type="button"
                      onClick={() => dia.disponivel && setSelectedDate(dia.data)}
                      disabled={!dia.disponivel}
                      className={`
                        aspect-square rounded-none border text-sm font-bold transition-all
                        ${selecionado
                          ? "border-[#132190] bg-[#132190] text-white shadow-md"
                          : dia.disponivel
                            ? "border-[#8FD7A5] bg-[#DDF8E6] text-[#137333] hover:border-[#28A745] hover:bg-[#C8F1D5]"
                            : "border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed"
                        }
                      `}
                    >
                      {dia.dia}
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="glass-card rounded-3xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#132190] mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[#004AF7]" />
                Escolha o médico
              </h2>

              {!selectedEspecialidadeId && (
                <div className="rounded-2xl bg-white p-4 text-sm font-semibold text-slate-500">
                  Selecione uma especialidade para listar os médicos.
                </div>
              )}

              {selectedEspecialidadeId && medicosDaEspecialidade.length === 0 && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
                  Nenhum médico encontrado para esta especialidade.
                </div>
              )}

              {medicosDaEspecialidade.length > 0 && (
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {medicosDaEspecialidade.map((doc) => {
                    const doctorId = normalizarId(doc);
                    const selecionado = selectedDoctorId === doctorId;

                    return (
                      <button
                        key={doctorId}
                        type="button"
                        onClick={() => setSelectedDoctorId(doctorId)}
                        className={`
                          w-full p-4 rounded-2xl border text-left flex justify-between items-center transition-all
                          ${selecionado ? "border-[#004AF7] bg-[#E4F2FE]" : "border-slate-100 bg-white hover:border-[#87B7FE]"}
                        `}
                      >
                        <div className="flex gap-3 items-center">
                          <div className={`p-2 rounded-full ${selecionado ? "bg-[#004AF7] text-white" : "bg-slate-100 text-slate-400"}`}>
                            <User className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-[#132190]">{doc.name || doc.nome}</p>
                            <p className="text-xs text-slate-500">{nomeEspecialidade(especialidadeDoMedico(doc))}</p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <span className="text-[10px] font-bold text-slate-400">{doc.crm}</span>
                          {selecionado && <CheckCircle2 className="w-5 h-5 text-[#004AF7]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </section>

            <section className="glass-card rounded-3xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-[#132190] mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#004AF7]" />
                Escolha o horário
              </h2>

              {horariosDisponiveis.length === 0 && (
                <div className="rounded-2xl bg-white p-4 text-sm font-semibold text-slate-500">
                  Selecione um médico e um dia disponível para ver os horários.
                </div>
              )}

              {horariosDisponiveis.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {horariosDisponiveis.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 rounded-xl border font-bold text-sm transition-all ${
                        selectedTime === time
                          ? "bg-[#004AF7] border-[#004AF7] text-white"
                          : "bg-white border-slate-100 text-slate-600 hover:bg-[#E4F2FE]"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
            </section>

            {erro && (
              <div className="flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {erro}
              </div>
            )}

            <button
              type="button"
              onClick={confirmarAgendamento}
              disabled={confirmando || !paciente || !selectedDoctor || !selectedDate || !selectedTime}
              className="w-full bg-[#004AF7] hover:bg-[#132190] disabled:cursor-not-allowed disabled:bg-slate-300 text-white font-bold py-5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              {confirmando ? "Confirmando..." : "Confirmar Agendamento"}
              {confirmando ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </div>
        </div>
      </main>

      {consultaConfirmada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#DDF8E6] text-[#137333]">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-extrabold text-[#132190]">Consulta marcada</h2>
                <p className="mt-1 text-sm text-slate-500">Confira os dados do agendamento.</p>
              </div>

              <button
                type="button"
                onClick={() => setConsultaConfirmada(null)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 rounded-2xl border border-[#87B7FE]/25 bg-[#F7FBFF] p-4">
              <div className="flex gap-3">
                <User className="mt-1 h-5 w-5 shrink-0 text-[#004AF7]" />
                <div>
                  <p className="font-bold text-[#132190]">Paciente</p>
                  <p className="text-sm text-slate-600">{nomePaciente(consultaConfirmada.paciente)}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Stethoscope className="mt-1 h-5 w-5 shrink-0 text-[#004AF7]" />
                <div>
                  <p className="font-bold text-[#132190]">Especialidade</p>
                  <p className="text-sm text-slate-600">{nomeEspecialidade(consultaConfirmada.especialidade)}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Calendar className="mt-1 h-5 w-5 shrink-0 text-[#004AF7]" />
                <div>
                  <p className="font-bold text-[#132190]">Data marcada</p>
                  <p className="text-sm capitalize text-slate-600">{formatarData(consultaConfirmada.data)}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-[#004AF7]" />
                <div>
                  <p className="font-bold text-[#132190]">Horário</p>
                  <p className="text-sm text-slate-600">{consultaConfirmada.horario}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#004AF7]" />
                <div>
                  <p className="font-bold text-[#132190]">{consultaConfirmada.local.nome}</p>
                  <p className="text-sm text-slate-600">
                    {consultaConfirmada.local.endereco}, {consultaConfirmada.local.bairro}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setConsultaConfirmada(null)}
              className="mt-5 w-full rounded-2xl bg-[#004AF7] py-4 font-bold text-white transition-colors hover:bg-[#132190]"
            >
              Concluir
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAgendarConsulta;
