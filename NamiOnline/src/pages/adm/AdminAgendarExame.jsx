import {
  CalendarDays,
  Clock3,
  Search,
  FileText,
  ChevronRight,
  HeartPulse,
  UserRound,
  IdCard,
} from 'lucide-react'


export default function AdminAgendarExame() {
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
            <span className="font-semibold text-white">Agendamento pelo funcionário</span>
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
                    <p className="text-sm font-medium text-slate-500">Exame selecionado</p>
                    <h2 className="mt-1 text-xl font-bold text-[#132190]">
                      Exame Cardiológico
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Solicitação feita por colaborador para apoio ao paciente no processo
                      de agendamento.
                    </p>
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

            <form className="space-y-8">
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
                        placeholder="Digite o CPF do paciente"
                        className="w-full rounded-2xl border border-[#87B7FE]/30 bg-white py-4 pl-12 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#004AF7] focus:ring-4 focus:ring-[#004AF7]/10"
                      />
                    </div>
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-2xl bg-[#004AF7] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#132190]"
                    >
                      <Search className="h-4 w-4" />
                      Buscar paciente
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
                          Nome será exibido aqui
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
                          CPF será exibido aqui
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#132190]">
                    Data
                  </label>
                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#87B7FE]" />
                    <input
                      type="date"
                      className="w-full rounded-2xl border border-[#87B7FE]/30 bg-[#F8FBFF] py-4 pl-12 pr-4 text-sm text-slate-700 outline-none transition focus:border-[#004AF7] focus:ring-4 focus:ring-[#004AF7]/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#132190]">
                    Horário
                  </label>
                  <div className="relative">
                    <Clock3 className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#87B7FE]" />
                    <select className="w-full appearance-none rounded-2xl border border-[#87B7FE]/30 bg-[#F8FBFF] py-4 pl-12 pr-4 text-sm text-slate-700 outline-none transition focus:border-[#004AF7] focus:ring-4 focus:ring-[#004AF7]/10">
                      <option>Selecione um horário</option>
                      <option>08:00</option>
                      <option>09:30</option>
                      <option>11:00</option>
                      <option>14:00</option>
                      <option>15:30</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#132190]">
                    Guia do exame
                  </label>

                  <button
                    type="button"
                    className="flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#87B7FE]/50 bg-[#F8FBFF] px-6 py-6 text-center transition hover:border-[#004AF7] hover:bg-[#EAF4FF]"
                  >
                    <FileText className="mb-3 h-8 w-8 text-[#004AF7]" />

                    <span className="text-sm font-semibold text-[#132190]">
                      Anexar guia do exame
                    </span>

                    <span className="mt-1 text-xs text-slate-500">
                      Clique para adicionar a guia médica
                    </span>
                  </button>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#132190]">
                    Tipo de atendimento
                  </label>
                  <select className="w-full rounded-2xl border border-[#87B7FE]/30 bg-[#F8FBFF] px-4 py-4 text-sm text-slate-700 outline-none transition focus:border-[#004AF7] focus:ring-4 focus:ring-[#004AF7]/10">
                    <option>Particular</option>
                    <option>Convênio</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#132190]">
                  Observações
                </label>
                <textarea
                  rows="5"
                  placeholder="Informe alguma observação importante para o agendamento, se necessário."
                  className="w-full rounded-2xl border border-[#87B7FE]/30 bg-[#F8FBFF] px-4 py-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#004AF7] focus:ring-4 focus:ring-[#004AF7]/10"
                />
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="button"
                  className="rounded-2xl bg-[#004AF7] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#132190]"
                >
                  Confirmar agendamento
                </button>

                <button
                  type="button"
                  className="rounded-2xl border border-[#004AF7]/20 bg-white px-6 py-4 text-sm font-semibold text-[#004AF7] transition hover:border-[#004AF7] hover:bg-[#E4F2FE]"
                >
                  Voltar
                </button>
              </div>
            </form>
          </section>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-[#87B7FE]/25 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#132190]">Resumo do exame</h3>

              <div className="mt-5 space-y-4">
                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Exame
                  </p>
                  <p className="mt-1 text-base font-semibold text-[#132190]">
                    Exame Cardiológico
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Duração média
                  </p>
                  <p className="mt-1 text-base font-semibold text-[#132190]">
                    30 a 40 minutos
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Categoria
                  </p>
                  <p className="mt-1 text-base font-semibold text-[#132190]">
                    Cardiológicos
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-[#87B7FE]/25 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#132190]">Dados do paciente</h3>

              <div className="mt-5 space-y-4">
                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Nome
                  </p>
                  <p className="mt-1 text-base font-semibold text-[#132190]">
                    Aguardando busca do paciente
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    CPF
                  </p>
                  <p className="mt-1 text-base font-semibold text-[#132190]">
                    Aguardando busca do paciente
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Idade
                  </p>
                  <p className="mt-1 text-base font-semibold text-[#132190]">
                    Aguardando busca do paciente
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Endereço
                  </p>
                  <p className="mt-1 text-base font-semibold text-[#132190]">
                    Aguardando busca do paciente
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Número de telefone
                  </p>
                  <p className="mt-1 text-base font-semibold text-[#132190]">
                    Aguardando busca do paciente
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F8FBFF] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Sexo
                  </p>
                  <p className="mt-1 text-base font-semibold text-[#132190]">
                    Aguardando busca do paciente
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  )
}