import { useNavigate } from 'react-router-dom'
import {
  FaArrowLeft,
  FaQuestionCircle
} from 'react-icons/fa'

export default function CentralAjuda() {
  const navigate = useNavigate()

  const perguntas = [
    {
      pergunta: 'Como agendar uma consulta?',
      resposta:
        'Vá até a tela inicial e clique em "Agendar Consulta".',
    },
    {
      pergunta: 'Como visualizar meus exames?',
      resposta:
        'Acesse a aba de exames no menu principal.',
    },
    {
      pergunta: 'Como alterar minha senha?',
      resposta:
        'Entre na seção Segurança dentro do perfil.',
    },
    {
      pergunta: 'Como cancelar um agendamento?',
      resposta:
        'Abra "Meus Agendamentos" e clique em cancelar.',
    },
    {
      pergunta: 'Como falar com o suporte?',
      resposta:
        'Envie um email para suporte@nami.com.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#f5f7ff] px-5 py-10">

      <div className="mx-auto max-w-4xl">

        {/* HEADER */}
        <div className="mb-8 flex items-center gap-4">

          <button
            onClick={() => navigate('/perfil')}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#132190] text-white transition hover:bg-[#004AF7]"
          >
            <FaArrowLeft />
          </button>

          <h1 className="text-3xl font-bold text-[#132190]">
            Central de Ajuda
          </h1>
        </div>

        {/* LISTA */}
        <div className="space-y-5">

          {perguntas.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-6 shadow-lg"
            >
              <div className="mb-3 flex items-center gap-3 text-[#132190]">
                <FaQuestionCircle />

                <h2 className="text-lg font-semibold">
                  {item.pergunta}
                </h2>
              </div>

              <p className="text-slate-600">
                {item.resposta}
              </p>
            </div>
          ))}

        </div>

      </div>
    </div>
  )
}