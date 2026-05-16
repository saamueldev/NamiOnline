import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../../services/api'

export default function TelaAgendarRetorno() {

  const navigate = useNavigate()

  // =========================
  // STATES
  // =========================
  const [especialidade, setEspecialidade] = useState('Cardiologia')
  const [medico, setMedico] = useState('Dra. Marina Soares')
  const [data, setData] = useState('')
  const [horario, setHorario] = useState('')
  const [observacoes, setObservacoes] = useState('')

  // =========================
  // AGENDAR RETORNO
  // =========================
  const agendarRetorno = async (e) => {

    e.preventDefault()

    try {

      const response = await api.post('/retornos', {
        medico,
        especialidade,
        data,
        horario,
        observacoes,
      })

      const dataResponse = response.data

      console.log(dataResponse)

      alert("Retorno agendado com sucesso!")

      navigate('/retornos')

    } catch (error) {

      console.error(error)

      alert("Erro ao agendar retorno")

    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#004AF7] to-[#132190] px-6 py-10 text-slate-200">

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">

        {/* MAIN CARD */}
        <main className="flex flex-col gap-7 rounded-[28px] border border-slate-400/10 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl">

          {/* TITLE */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

            <div>
              <span className="inline-flex rounded-full bg-sky-400/20 px-4 py-3 text-sm font-bold uppercase tracking-[0.08em] text-sky-200">
                Retorno médico
              </span>

              <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-50">
                Agende seu próximo retorno
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-300">
                Organize sua consulta de forma rápida e mantenha seu histórico clínico sempre atualizado.
              </p>
            </div>

            <div className="min-w-[220px] lg:text-right">
              <strong className="mb-2 block text-sm text-blue-300">
                Disponível em
              </strong>

              <p className="leading-relaxed text-slate-200">
                Segunda a sexta • 08:00 - 18:00
              </p>
            </div>

          </div>

          {/* FORM */}
          <form
            onSubmit={agendarRetorno}
            className="flex flex-col gap-6"
          >

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* ESPECIALIDADE */}
              <label className="flex flex-col gap-3 text-sm text-slate-300">
                Especialidade

                <select
                  value={especialidade}
                  onChange={(e) => setEspecialidade(e.target.value)}
                  className="w-full rounded-2xl border border-slate-400/20 bg-slate-800/80 px-4 py-4 text-white outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/10"
                >
                  <option>Cardiologia</option>
                  <option>Dermatologia</option>
                  <option>Ortopedia</option>
                </select>
              </label>

              {/* MÉDICO */}
              <label className="flex flex-col gap-3 text-sm text-slate-300">
                Médico responsável

                <select
                  value={medico}
                  onChange={(e) => setMedico(e.target.value)}
                  className="w-full rounded-2xl border border-slate-400/20 bg-slate-800/80 px-4 py-4 text-white outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/10"
                >
                  <option>Dra. Marina Soares</option>
                  <option>Dr. Lucas Mota</option>
                  <option>Dra. Fernanda Alves</option>
                </select>
              </label>

              {/* DATA */}
              <label className="flex flex-col gap-3 text-sm text-slate-300">
                Data do retorno

                <input
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className="w-full rounded-2xl border border-slate-400/20 bg-slate-800/80 px-4 py-4 text-white outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/10"
                />
              </label>

              {/* HORÁRIO */}
              <label className="flex flex-col gap-3 text-sm text-slate-300">
                Horário

                <input
                  type="time"
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                  className="w-full rounded-2xl border border-slate-400/20 bg-slate-800/80 px-4 py-4 text-white outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/10"
                />
              </label>

            </div>

            {/* OBSERVAÇÕES */}
            <label className="flex flex-col gap-3 text-sm text-slate-300">
              Observações adicionais

              <textarea
                rows="5"
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                placeholder="Informe se precisa de instruções especiais"
                className="min-h-[140px] w-full resize-y rounded-2xl border border-slate-400/20 bg-slate-800/80 px-4 py-4 text-white outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-400/10"
              />
            </label>

            {/* BUTTONS */}
            <div className="flex flex-col gap-4 md:flex-row">

              <Link
                to="/home"
                className="flex min-w-[190px] items-center justify-center rounded-2xl border border-slate-400/20 bg-white/5 px-6 py-4 font-bold text-slate-300 transition hover:-translate-y-1"
              >
                Voltar para início
              </Link>

              <button
              onClick={agendarRetorno}
              type="submit"
                className="flex min-w-[190px] items-center justify-center rounded-2xl border border-sky-400/30 bg-gradient-to-r from-sky-400 to-cyan-500 px-6 py-4 font-bold text-white shadow-xl transition hover:-translate-y-1"
              >
                Confirmar agendamento
              </button>

            </div>

          </form>
        </main>

        {/* ASIDE */}
        <aside className="flex flex-col gap-5 rounded-[28px] border border-slate-400/10 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl">

          <div>
            <h2 className="mb-3 text-2xl font-bold text-slate-50">
              Por que agendar aqui?
            </h2>

            <p className="leading-relaxed text-slate-300">
              Seu próximo retorno fica registrado em seu perfil e você recebe lembrete automaticamente.
            </p>
          </div>

          <div className="grid gap-4">

            <div className="rounded-3xl border border-slate-400/10 bg-slate-800/90 p-5">
              <strong className="mb-2 block text-blue-300">
                ✔ Agendamento rápido
              </strong>

              <p className="leading-relaxed text-slate-300">
                Escolha dia e horário em segundos.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-400/10 bg-slate-800/90 p-5">
              <strong className="mb-2 block text-blue-300">
                ✔ Atendimento priorizado
              </strong>

              <p className="leading-relaxed text-slate-300">
                Mantenha o histórico de consultas alinhado com a equipe.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-400/10 bg-slate-800/90 p-5">
              <strong className="mb-2 block text-blue-300">
                ✔ Alertas via app
              </strong>

              <p className="leading-relaxed text-slate-300">
                Receba aviso de retorno e instruções pré-consulta.
              </p>
            </div>

          </div>

          <div className="rounded-3xl border border-sky-400/20 bg-gradient-to-b from-sky-400/10 to-slate-900 p-6">

            <h3 className="mb-3 text-xl font-bold text-slate-50">
              Importante
            </h3>

            <p className="leading-relaxed text-slate-300">
              Leve seus exames mais recentes e medicamentos.
              Para alterações de horário, contate a central com antecedência.
            </p>

          </div>

        </aside>

      </div>
    </div>
  )
}
