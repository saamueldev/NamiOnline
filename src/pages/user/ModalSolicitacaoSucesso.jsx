import { CheckCircle2, FileText, X } from 'lucide-react'


export default function ModalSolicitacaoSucesso({ onClose }) {
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
            Solicitação enviada com sucesso
          </h2>

          <p className="mt-4 max-w-md text-[15px] leading-7 text-slate-600">
            Sua solicitação de exame foi registrada com sucesso. Em breve, nossa equipe
            fará a análise e dará continuidade ao processo.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-[#87B7FE]/20 bg-[#F8FBFF] p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E4F2FE]">
              <FileText className="h-6 w-6 text-[#004AF7]" />
            </div>

            <div className="text-left">
              <h3 className="text-base font-semibold text-[#132190]">
                Próximos passos
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Você poderá acompanhar o andamento da solicitação na área de agendamentos.
                Caso necessário, entraremos em contato para confirmar informações
                complementares.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
                type="button"
                className="rounded-2xl bg-[#004AF7] px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#132190]"
            >
                Voltar para exames
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