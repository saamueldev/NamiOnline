import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CalendarDays,
  Clock3,
  Search,
  FileText,
  ChevronRight,
  ChevronLeft,
  HeartPulse,
  UserRound,
  IdCard,
  CheckCircle2,
  X,
} from 'lucide-react'

import api from '../../services/api'

function garantirArray(valor) {
  return Array.isArray(valor) ? valor : []
}

const nomesMeses = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

function ModalAgendamentoAdminSucesso({
  agendamento,
  onClose,
  onVoltarSelecao,
}) {
  const nomePaciente = agendamento?.usuarioId?.name || 'Paciente'
  const cpfPaciente = agendamento?.usuarioId?.cpf || ''
  const nomeExame = agendamento?.tipoExameId?.nome || 'Exame agendado'

  const dataFormatada = agendamento?.data
    ? new Date(agendamento.data).toLocaleDateString('pt-BR', {
        timeZone: 'UTC',
      })
    : ''

  const horario = agendamento?.horario || ''

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#132190]/35 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-[28px] border border-white/40 bg-white p-8 shadow-[0_25px_70px_rgba(19,33,144,0.20)] md:p-10">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#E4F2FE] text-[#132190] transition hover:bg-[#87B7FE]/30"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E4F2FE] shadow-inner">
            <CheckCircle2 className="h-10 w-10 text-[#004AF7]" />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-[#132190]">
            Agendamento realizado com sucesso
          </h2>

          <p className="mt-4 max-w-md text-[15px] leading-7 text-slate-600">
            O exame foi agendado para o paciente informado. O agendamento foi
            registrado com o status adequado conforme a necessidade de guia.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-[#87B7FE]/20 bg-[#F8FBFF] p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E4F2FE]">
              <CalendarDays className="h-6 w-6 text-[#004AF7]" />
            </div>

            <div className="text-left">
              <h3 className="text-base font-semibold text-[#132190]">
                Resumo do agendamento
              </h3>

              <div className="mt-2 space-y-1 text-sm leading-6 text-slate-600">
                <p>
                  <strong className="text-[#132190]">Paciente:</strong>{' '}
                  {nomePaciente}
                </p>

                {cpfPaciente && (
                  <p>
                    <strong className="text-[#132190]">CPF:</strong>{' '}
                    {cpfPaciente}
                  </p>
                )}

                <p>
                  <strong className="text-[#132190]">Exame:</strong>{' '}
                  {nomeExame}
                </p>

                {dataFormatada && (
                  <p>
                    <strong className="text-[#132190]">Data:</strong>{' '}
                    {dataFormatada}
                  </p>
                )}

                {horario && (
                  <p>
                    <strong className="text-[#132190]">Horário:</strong>{' '}
                    {horario}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onVoltarSelecao}
            className="rounded-2xl bg-[#004AF7] px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#132190]"
          >
            Agendar outro exame
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-[#004AF7]/20 bg-white px-6 py-4 text-sm font-semibold text-[#004AF7] transition hover:border-[#004AF7] hover:bg-[#E4F2FE]"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminAgendarExame() {
  const { exameId } = useParams()
  const navigate = useNavigate()

  const [exame, setExame] = useState(null)
  const [paciente, setPaciente] = useState(null)
  const [cpfBusca, setCpfBusca] = useState('')

  const [mesAtual, setMesAtual] = useState(new Date())
  const [dataSelecionada, setDataSelecionada] = useState('')
  const [horario, setHorario] = useState('')

  const [horariosDisponiveis, setHorariosDisponiveis] = useState([])
  const [horariosOcupados, setHorariosOcupados] = useState([])

  const [diasDisponiveis, setDiasDisponiveis] = useState([])
  const [diasLotados, setDiasLotados] = useState([])
  const [diasPassados, setDiasPassados] = useState([])

  const [guiaArquivo, setGuiaArquivo] = useState(null)
  const [observacoes, setObservacoes] = useState('')

  const [carregandoExame, setCarregandoExame] = useState(true)
  const [buscandoPaciente, setBuscandoPaciente] = useState(false)
  const [carregandoHorarios, setCarregandoHorarios] = useState(false)
  const [carregandoDisponibilidade, setCarregandoDisponibilidade] =
    useState(false)
  const [salvandoAgendamento, setSalvandoAgendamento] = useState(false)

  const [modalSucessoAberto, setModalSucessoAberto] = useState(false)
  const [agendamentoCriado, setAgendamentoCriado] = useState(null)

  const tipoAtendimento = 'Particular'

  async function carregarExame() {
    if (!exameId || exameId === 'undefined') {
      setExame(null)
      setCarregandoExame(false)
      return
    }

    try {
      setCarregandoExame(true)

      const resposta = await api.get(`/tipos-exames/${exameId}`)
      setExame(resposta.data)
    } catch (error) {
      console.error('Erro ao carregar exame:', error)
      alert('Erro ao carregar dados do exame.')
    } finally {
      setCarregandoExame(false)
    }
  }

  async function buscarPacientePorCpf() {
    const cpfLimpo = cpfBusca.replace(/\D/g, '')

    if (!cpfLimpo) {
      alert('Informe o CPF do paciente.')
      return
    }

    try {
      setBuscandoPaciente(true)
      setPaciente(null)

      const resposta = await api.get(`/usuarios/buscar-cpf/${cpfLimpo}`)
      setPaciente(resposta.data)
    } catch (error) {
      console.error('Erro ao buscar paciente:', error)

      const mensagem =
        error.response?.data?.error ||
        error.response?.data?.mensagem ||
        'Paciente não encontrado.'

      alert(mensagem)
    } finally {
      setBuscandoPaciente(false)
    }
  }

  function formatarMesParaApi(data) {
    const ano = data.getFullYear()
    const mes = String(data.getMonth() + 1).padStart(2, '0')

    return `${ano}-${mes}`
  }

  function formatarDataParaInput(data) {
    const ano = data.getFullYear()
    const mes = String(data.getMonth() + 1).padStart(2, '0')
    const dia = String(data.getDate()).padStart(2, '0')

    return `${ano}-${mes}-${dia}`
  }

  function gerarDiasDoMes() {
    const ano = mesAtual.getFullYear()
    const mes = mesAtual.getMonth()

    const primeiroDiaDoMes = new Date(ano, mes, 1)
    const ultimoDiaDoMes = new Date(ano, mes + 1, 0)
    const quantidadeDias = ultimoDiaDoMes.getDate()
    const diaSemanaInicio = primeiroDiaDoMes.getDay()

    const espacosAntes = Array.from({ length: diaSemanaInicio }, () => null)

    const dias = Array.from({ length: quantidadeDias }, (_, index) => {
      const dia = index + 1
      return new Date(ano, mes, dia)
    })

    return [...espacosAntes, ...dias]
  }

  async function carregarDisponibilidadeMensal(dataMes = mesAtual) {
    if (!exameId || exameId === 'undefined') return

    try {
      setCarregandoDisponibilidade(true)

      const resposta = await api.get('/agendamentos-exames/disponibilidade', {
        params: {
          tipoExameId: exameId,
          mes: formatarMesParaApi(dataMes),
        },
      })

      setDiasDisponiveis(garantirArray(resposta.data?.diasDisponiveis))
      setDiasLotados(garantirArray(resposta.data?.diasLotados))
      setDiasPassados(garantirArray(resposta.data?.diasPassados))
    } catch (error) {
      console.error('Erro ao carregar disponibilidade mensal:', error)

      const mensagem =
        error.response?.data?.mensagem ||
        'Erro ao carregar disponibilidade do calendário.'

      alert(mensagem)

      setDiasDisponiveis([])
      setDiasLotados([])
      setDiasPassados([])
    } finally {
      setCarregandoDisponibilidade(false)
    }
  }

  async function carregarHorariosDisponiveis(data) {
    if (!data) return

    try {
      setCarregandoHorarios(true)

      const resposta = await api.get('/agendamentos-exames/horarios-disponiveis', {
        params: {
          tipoExameId: exameId,
          data,
        },
      })

      setHorariosDisponiveis(garantirArray(resposta.data?.horariosDisponiveis))
      setHorariosOcupados(garantirArray(resposta.data?.horariosOcupados))
    } catch (error) {
      console.error('Erro ao carregar horários:', error)

      const mensagem =
        error.response?.data?.mensagem ||
        'Erro ao carregar horários disponíveis.'

      alert(mensagem)

      setHorariosDisponiveis([])
      setHorariosOcupados([])
    } finally {
      setCarregandoHorarios(false)
    }
  }

  function obterNomeCategoria() {
    if (exame?.categoriaExameId?.nome) {
      return exame.categoriaExameId.nome
    }

    return 'Categoria não informada'
  }

  function formatarTempoMedio(minutos) {
    if (!minutos) {
      return 'Tempo não informado'
    }

    if (minutos < 60) {
      return `${minutos} minutos`
    }

    if (minutos === 60) {
      return '1 hora'
    }

    const horas = Math.floor(minutos / 60)
    const minutosRestantes = minutos % 60

    if (minutosRestantes === 0) {
      return `${horas} horas`
    }

    return `${horas}h ${minutosRestantes}min`
  }

  function formatarDataNascimento(data) {
    if (!data) return 'Não informado'

    return new Date(data).toLocaleDateString('pt-BR', {
      timeZone: 'UTC',
    })
  }

  function calcularIdade(dataNascimento) {
    if (!dataNascimento) return 'Não informado'

    const nascimento = new Date(dataNascimento)
    const hoje = new Date()

    let idade = hoje.getFullYear() - nascimento.getFullYear()
    const mes = hoje.getMonth() - nascimento.getMonth()

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade -= 1
    }

    return `${idade} anos`
  }

  function mudarMes(direcao) {
    setMesAtual((dataAtual) => {
      const novoMes = new Date(dataAtual)
      novoMes.setMonth(dataAtual.getMonth() + direcao)
      return novoMes
    })

    setDataSelecionada('')
    setHorario('')
    setHorariosDisponiveis([])
    setHorariosOcupados([])
  }

  function dataEstaSelecionada(data) {
    return formatarDataParaInput(data) === dataSelecionada
  }

  function dataEstaNoPassado(data) {
    const dataFormatada = formatarDataParaInput(data)

    if (diasPassados.includes(dataFormatada)) {
      return true
    }

    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)

    const dataComparada = new Date(data)
    dataComparada.setHours(0, 0, 0, 0)

    return dataComparada < hoje
  }

  function dataEstaLotada(data) {
    return diasLotados.includes(formatarDataParaInput(data))
  }

  function dataEstaDisponivel(data) {
    return diasDisponiveis.includes(formatarDataParaInput(data))
  }

  function dataEstaBloqueada(data) {
    const passada = dataEstaNoPassado(data)
    const lotada = dataEstaLotada(data)
    const disponivel = dataEstaDisponivel(data)

    return passada || lotada || !disponivel || carregandoDisponibilidade
  }

  async function selecionarData(data) {
    if (dataEstaBloqueada(data) || salvandoAgendamento) return

    const dataFormatada = formatarDataParaInput(data)

    setDataSelecionada(dataFormatada)
    setHorario('')
    setHorariosDisponiveis([])
    setHorariosOcupados([])

    await carregarHorariosDisponiveis(dataFormatada)
  }

  async function confirmarAgendamento(event) {
    event.preventDefault()

    if (!paciente?._id) {
      alert('Busque e selecione um paciente antes de confirmar.')
      return
    }

    if (!exame?._id) {
      alert('Exame não encontrado.')
      return
    }

    if (!dataSelecionada || !horario) {
      alert('Preencha data e horário.')
      return
    }

    if (exame.guiaNecessaria && !guiaArquivo) {
      alert('Este exame exige guia médica. Anexe a guia para continuar.')
      return
    }

    try {
      setSalvandoAgendamento(true)

      const resposta = await api.post('/agendamentos-exames/admin', {
        usuarioId: paciente._id,
        tipoExameId: exameId,
        data: dataSelecionada,
        horario,
        tipoAtendimento,
        observacoes,
        guiaArquivoNome: guiaArquivo?.name || '',
      })

      setAgendamentoCriado(resposta.data.agendamento)
      setModalSucessoAberto(true)

      await carregarDisponibilidadeMensal(mesAtual)
      await carregarHorariosDisponiveis(dataSelecionada)
    } catch (error) {
      console.error('Erro ao confirmar agendamento:', error)

      const mensagem =
        error.response?.data?.mensagem ||
        'Erro ao confirmar agendamento. Tente novamente.'

      alert(mensagem)

      if (dataSelecionada) {
        await carregarDisponibilidadeMensal(mesAtual)
        await carregarHorariosDisponiveis(dataSelecionada)
      }
    } finally {
      setSalvandoAgendamento(false)
    }
  }

  function voltarParaSelecaoExame() {
    navigate('/admin/exames/selecionar')
  }

  function fecharModalSucesso() {
    setModalSucessoAberto(false)
  }

  useEffect(() => {
    carregarExame()
  }, [exameId])

  useEffect(() => {
    carregarDisponibilidadeMensal(mesAtual)
  }, [exameId, mesAtual])

  const nomeExame = exame?.nome || 'Carregando exame...'
  const descricaoExame =
    exame?.descricao ||
    'Solicitação feita por colaborador para apoio ao paciente no processo de agendamento.'
  const nomeCategoria = obterNomeCategoria()
  const tempoMedioFormatado = formatarTempoMedio(exame?.tempoMedioMinutos)
  const guiaObrigatoria = Boolean(exame?.guiaNecessaria)
  const diasDoMes = gerarDiasDoMes()

  return (
    <div className="min-h-screen bg-[#E4F2FE]">
      <section className="relative overflow-hidden bg-gradient-to-r from-[#132190] to-[#004AF7]">
        <div className="absolute inset-0 bg-white/5" />

        <div className="relative mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-14">
          <div className="flex flex-wrap items-center gap-2 text-sm text-white/80">
            <span>Início</span>
            <ChevronRight className="h-4 w-4" />
            <span>Exames</span>
            <ChevronRight className="h-4 w-4" />
            <span className="font-semibold text-white">
              Agendamento pelo funcionário
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm font-medium text-white/90">
                Agendamento Interno
              </span>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
                Agende um exame para o paciente
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-white/85 md:text-lg">
                Busque o paciente pelo CPF, confirme os dados encontrados e realize o
                agendamento do exame de forma rápida.
              </p>
            </div>

            <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
              <div className="rounded-2xl bg-white p-5 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E4F2FE]">
                    <HeartPulse className="h-7 w-7 text-[#004AF7]" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Exame selecionado
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-[#132190]">
                      {nomeExame}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {descricaoExame}
                    </p>

                    {!carregandoExame && exame && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#E4F2FE] px-3 py-1.5 text-xs font-semibold text-[#132190]">
                          <Clock3 className="h-4 w-4 text-[#004AF7]" />
                          {tempoMedioFormatado}
                        </span>

                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                            guiaObrigatoria
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-green-50 text-green-700'
                          }`}
                        >
                          <FileText className="h-4 w-4" />
                          {guiaObrigatoria
                            ? 'Guia obrigatória'
                            : 'Guia opcional'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl border border-[#87B7FE]/25 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#132190]">
                Preencha os dados do agendamento
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Localize o paciente, confira os dados e preencha as informações abaixo
                para concluir o agendamento.
              </p>
            </div>

            <form onSubmit={confirmarAgendamento} className="space-y-8">
              <div className="rounded-3xl border border-[#87B7FE]/20 bg-[#F8FBFF] p-5">
                <h3 className="text-lg font-bold text-[#132190]">
                  Buscar paciente
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  Informe o CPF do paciente para localizar o cadastro no sistema.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#132190]">
                      CPF do paciente
                    </label>

                    <div className="relative">
                      <IdCard className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#87B7FE]" />

                      <input
                        type="text"
                        value={cpfBusca}
                        onChange={(event) => {
                          setCpfBusca(event.target.value)
                          setPaciente(null)
                        }}
                        placeholder="Digite o CPF do paciente"
                        disabled={salvandoAgendamento}
                        className="w-full rounded-2xl border border-[#87B7FE]/30 bg-white py-4 pl-12 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#004AF7] focus:ring-4 focus:ring-[#004AF7]/10 disabled:cursor-not-allowed disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={buscarPacientePorCpf}
                      disabled={buscandoPaciente || salvandoAgendamento}
                      className="inline-flex items-center gap-2 rounded-2xl bg-[#004AF7] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#132190] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Search className="h-4 w-4" />
                      {buscandoPaciente ? 'Buscando...' : 'Buscar paciente'}
                    </button>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-[#87B7FE]/20 bg-white p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E4F2FE]">
                        <UserRound className="h-5 w-5 text-[#004AF7]" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Nome do paciente
                        </p>

                        <p className="mt-1 text-sm font-semibold text-[#132190]">
                          {paciente?.name || 'Nome será exibido aqui'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#87B7FE]/20 bg-white p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E4F2FE]">
                        <IdCard className="h-5 w-5 text-[#004AF7]" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          CPF encontrado
                        </p>

                        <p className="mt-1 text-sm font-semibold text-[#132190]">
                          {paciente?.cpf || 'CPF será exibido aqui'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <section className="rounded-3xl border border-[#87B7FE]/25 bg-[#F8FBFF] p-5">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-[#132190]">
                    <CalendarDays className="h-5 w-5 text-[#004AF7]" />
                    Escolha a data
                  </h3>

                  <div className="flex items-center gap-4 rounded-full bg-[#E4F2FE] px-4 py-2">
                    <button
                      type="button"
                      onClick={() => mudarMes(-1)}
                      disabled={salvandoAgendamento}
                      className="rounded-full p-1 text-[#132190] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>

                    <span className="min-w-[130px] text-center text-sm font-bold text-[#132190]">
                      {nomesMeses[mesAtual.getMonth()]} {mesAtual.getFullYear()}
                    </span>

                    <button
                      type="button"
                      onClick={() => mudarMes(1)}
                      disabled={salvandoAgendamento}
                      className="rounded-full p-1 text-[#132190] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {carregandoDisponibilidade && (
                  <div className="mb-4 rounded-2xl bg-white p-3 text-sm text-slate-500">
                    Carregando disponibilidade do calendário...
                  </div>
                )}

                <div className="mb-4 grid grid-cols-7 gap-2 text-center text-[11px] font-bold uppercase text-slate-400">
                  {diasSemana.map((dia) => (
                    <div key={dia}>{dia}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {diasDoMes.map((data, index) => {
                    if (!data) {
                      return <div key={`empty-${index}`} />
                    }

                    const selecionada = dataEstaSelecionada(data)
                    const passada = dataEstaNoPassado(data)
                    const lotada = dataEstaLotada(data)
                    const disponivel = dataEstaDisponivel(data)
                    const bloqueada = dataEstaBloqueada(data)

                    return (
                      <button
                        key={formatarDataParaInput(data)}
                        type="button"
                        onClick={() => selecionarData(data)}
                        disabled={bloqueada || salvandoAgendamento}
                        title={
                          passada
                            ? 'Data passada'
                            : lotada
                              ? 'Dia lotado'
                              : disponivel
                                ? 'Dia disponível'
                                : 'Sem disponibilidade'
                        }
                        className={`aspect-square rounded-xl text-sm font-bold transition-all ${
                          selecionada
                            ? 'bg-[#132190] text-white shadow-md'
                            : passada
                              ? 'cursor-not-allowed bg-slate-100 text-slate-300'
                              : lotada
                                ? 'cursor-not-allowed bg-red-50 text-red-300'
                                : disponivel
                                  ? 'bg-white text-slate-600 hover:bg-[#E4F2FE] hover:text-[#004AF7]'
                                  : 'cursor-not-allowed bg-slate-50 text-slate-300'
                        }`}
                      >
                        {data.getDate()}
                      </button>
                    )
                  })}
                </div>

                <div className="mt-5 flex flex-wrap gap-3 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-white ring-1 ring-slate-200" />
                    Disponível
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-50 ring-1 ring-red-100" />
                    Lotado
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-slate-100 ring-1 ring-slate-200" />
                    Indisponível
                  </span>
                </div>

                {dataSelecionada && (
                  <div className="mt-5 rounded-2xl bg-white p-4 text-sm text-slate-600">
                    Data selecionada:{' '}
                    <strong className="text-[#132190]">
                      {dataSelecionada.split('-').reverse().join('/')}
                    </strong>
                  </div>
                )}
              </section>

              <section className="rounded-3xl border border-[#87B7FE]/25 bg-[#F8FBFF] p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#132190]">
                  <Clock3 className="h-5 w-5 text-[#004AF7]" />
                  Escolha o horário
                </h3>

                {!dataSelecionada && (
                  <p className="rounded-2xl bg-white p-4 text-sm text-slate-500">
                    Selecione uma data disponível para carregar os horários.
                  </p>
                )}

                {dataSelecionada && carregandoHorarios && (
                  <p className="rounded-2xl bg-white p-4 text-sm text-slate-500">
                    Carregando horários disponíveis...
                  </p>
                )}

                {dataSelecionada &&
                  !carregandoHorarios &&
                  horariosDisponiveis.length === 0 && (
                    <div className="rounded-2xl bg-white p-4 text-sm text-slate-500">
                      Nenhum horário disponível para esta data.
                    </div>
                  )}

                {dataSelecionada &&
                  !carregandoHorarios &&
                  horariosDisponiveis.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                      {horariosDisponiveis.map((horarioDisponivel) => (
                        <button
                          key={horarioDisponivel}
                          type="button"
                          onClick={() => setHorario(horarioDisponivel)}
                          disabled={salvandoAgendamento}
                          className={`rounded-xl border py-3 text-sm font-bold transition-all ${
                            horario === horarioDisponivel
                              ? 'border-[#004AF7] bg-[#004AF7] text-white'
                              : 'border-slate-100 bg-white text-slate-600 hover:bg-[#E4F2FE] hover:text-[#004AF7]'
                          } disabled:cursor-not-allowed disabled:opacity-60`}
                        >
                          {horarioDisponivel}
                        </button>
                      ))}
                    </div>
                  )}

                {horariosOcupados.length > 0 && (
                  <p className="mt-3 text-xs text-slate-500">
                    Horários já ocupados nesta data:{' '}
                    <strong>{horariosOcupados.join(', ')}</strong>
                  </p>
                )}
              </section>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#132190]">
                    {guiaObrigatoria
                      ? 'Guia do exame obrigatória'
                      : 'Guia do exame opcional'}
                  </label>

                  <label
                    className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-6 text-center transition ${
                      guiaObrigatoria
                        ? 'border-amber-300 bg-amber-50/60 hover:border-amber-500 hover:bg-amber-50'
                        : 'border-[#87B7FE]/50 bg-[#F8FBFF] hover:border-[#004AF7] hover:bg-[#EAF4FF]'
                    }`}
                  >
                    <FileText
                      className={`mb-3 h-8 w-8 ${
                        guiaObrigatoria ? 'text-amber-600' : 'text-[#004AF7]'
                      }`}
                    />

                    <span className="text-sm font-semibold text-[#132190]">
                      {guiaArquivo
                        ? guiaArquivo.name
                        : guiaObrigatoria
                          ? 'Anexar guia obrigatória'
                          : 'Anexar guia, se houver'}
                    </span>

                    <span className="mt-1 text-xs text-slate-500">
                      {guiaObrigatoria
                        ? 'Este exame exige guia médica para prosseguir.'
                        : 'Este exame não exige guia para solicitação inicial.'}
                    </span>

                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      disabled={salvandoAgendamento}
                      onChange={(event) =>
                        setGuiaArquivo(event.target.files?.[0] || null)
                      }
                    />
                  </label>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#132190]">
                    Tipo de atendimento
                  </label>

                  <div className="rounded-2xl border border-[#87B7FE]/30 bg-[#F8FBFF] px-4 py-4 text-sm font-semibold text-[#132190]">
                    Particular
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    O hospital trabalha exclusivamente com atendimento particular para exames.
                  </p>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#132190]">
                  Observações
                </label>

                <textarea
                  rows="5"
                  value={observacoes}
                  onChange={(event) => setObservacoes(event.target.value)}
                  disabled={salvandoAgendamento}
                  placeholder="Informe alguma observação importante para o agendamento, se necessário."
                  className="w-full rounded-2xl border border-[#87B7FE]/30 bg-[#F8FBFF] px-4 py-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#004AF7] focus:ring-4 focus:ring-[#004AF7]/10 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="submit"
                  disabled={salvandoAgendamento || carregandoHorarios}
                  className="rounded-2xl bg-[#004AF7] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#132190] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {salvandoAgendamento
                    ? 'Confirmando...'
                    : 'Confirmar agendamento'}
                </button>

                <button
                  type="button"
                  onClick={voltarParaSelecaoExame}
                  disabled={salvandoAgendamento}
                  className="rounded-2xl border border-[#004AF7]/20 bg-white px-6 py-4 text-sm font-semibold text-[#004AF7] transition hover:border-[#004AF7] hover:bg-[#E4F2FE] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Voltar
                </button>
              </div>
            </form>
          </section>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-[#87B7FE]/25 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#132190]">
                Resumo do exame
              </h3>

              <div className="mt-5 space-y-4">
                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Exame
                  </p>

                  <p className="mt-1 text-base font-semibold text-[#132190]">
                    {nomeExame}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Duração média
                  </p>

                  <p className="mt-1 text-base font-semibold text-[#132190]">
                    {tempoMedioFormatado}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Categoria
                  </p>

                  <p className="mt-1 text-base font-semibold text-[#132190]">
                    {nomeCategoria}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Guia médica
                  </p>

                  <p
                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-bold ${
                      guiaObrigatoria
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-green-50 text-green-700'
                    }`}
                  >
                    {guiaObrigatoria ? 'Obrigatória' : 'Opcional'}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Data
                  </p>

                  <p className="mt-1 text-base font-semibold text-[#132190]">
                    {dataSelecionada
                      ? dataSelecionada.split('-').reverse().join('/')
                      : 'Não selecionada'}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Horário
                  </p>

                  <p className="mt-1 text-base font-semibold text-[#132190]">
                    {horario || 'Não selecionado'}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Atendimento
                  </p>

                  <p className="mt-1 text-base font-semibold text-[#132190]">
                    {tipoAtendimento}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-[#87B7FE]/25 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#132190]">
                Dados do paciente
              </h3>

              <div className="mt-5 space-y-4">
                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Nome
                  </p>

                  <p className="mt-1 text-base font-semibold text-[#132190]">
                    {paciente?.name || 'Aguardando busca do paciente'}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    CPF
                  </p>

                  <p className="mt-1 text-base font-semibold text-[#132190]">
                    {paciente?.cpf || 'Aguardando busca do paciente'}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Idade
                  </p>

                  <p className="mt-1 text-base font-semibold text-[#132190]">
                    {paciente?.data_nasc
                      ? calcularIdade(paciente.data_nasc)
                      : 'Aguardando busca do paciente'}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Data de nascimento
                  </p>

                  <p className="mt-1 text-base font-semibold text-[#132190]">
                    {paciente?.data_nasc
                      ? formatarDataNascimento(paciente.data_nasc)
                      : 'Aguardando busca do paciente'}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Número de telefone
                  </p>

                  <p className="mt-1 text-base font-semibold text-[#132190]">
                    {paciente?.telefone || 'Aguardando busca do paciente'}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Sexo
                  </p>

                  <p className="mt-1 text-base font-semibold text-[#132190]">
                    {paciente?.sexo || 'Aguardando busca do paciente'}
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>

      {modalSucessoAberto && (
        <ModalAgendamentoAdminSucesso
          agendamento={agendamentoCriado}
          onClose={fecharModalSucesso}
          onVoltarSelecao={voltarParaSelecaoExame}
        />
      )}
    </div>
  )
}