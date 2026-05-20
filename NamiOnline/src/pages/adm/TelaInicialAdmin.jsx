import { Link } from "react-router-dom";

export default function TelaInicialADM() {
  return (
    <div className="h-screen overflow-hidden flex flex-col bg-[#f7fbff]">
      <main className="flex gap-5 px-10 py-6">
        <aside className="w-[260px] h-fit bg-white rounded-xl p-[25px] shadow-[0_8px_20px_rgba(0,0,0,0.1)]">
          <h2 className="text-[22px] mb-5 text-[#132190] font-bold">
            Painel ADM
          </h2>

          <nav className="flex flex-col gap-3">
            <Link
              to="/admin/dashboard"
              className="no-underline px-[14px] py-3 rounded-lg text-[#333] font-medium transition duration-200 hover:bg-[#004AF7] hover:text-white"
            >
              Dashboard
            </Link>

            <Link
              to="/admin/cadastrar-paciente"
              className="no-underline px-[14px] py-3 rounded-lg text-[#333] font-medium transition duration-200 hover:bg-[#004AF7] hover:text-white"
            >
              Pacientes
            </Link>

            <Link
              to="/admin/cadastrar-medico"
              className="no-underline px-[14px] py-3 rounded-lg text-[#333] font-medium transition duration-200 hover:bg-[#004AF7] hover:text-white"
            >
              Médicos
            </Link>

            <Link
              to="/admin/consultas-dia"
              className="no-underline px-[14px] py-3 rounded-lg text-[#333] font-medium transition duration-200 hover:bg-[#004AF7] hover:text-white"
            >
              Agendamentos
            </Link>

            <Link
              to="/admin/consultas/agendar"
              className="no-underline px-[14px] py-3 rounded-lg text-[#333] font-medium transition duration-200 hover:bg-[#004AF7] hover:text-white"
            >
              Consultas
            </Link>

            <Link
              to="/admin/exames/agendar"
              className="no-underline px-[14px] py-3 rounded-lg text-[#333] font-medium transition duration-200 hover:bg-[#004AF7] hover:text-white"
            >
              Exames
            </Link>

            <Link
              to="/admin/cadastrar-exame"
              className="no-underline px-[14px] py-3 rounded-lg text-[#333] font-medium transition duration-200 hover:bg-[#004AF7] hover:text-white"
            >
              Cadastro Exames
            </Link>

            <Link
              to="/admin/cadastrar-especialidade"
              className="no-underline px-[14px] py-3 rounded-lg text-[#333] font-medium transition duration-200 hover:bg-[#004AF7] hover:text-white"
            >
              Especialidades
            </Link>

            <Link
              to="/admin/noticias"
              className="no-underline px-[14px] py-3 rounded-lg text-[#333] font-medium transition duration-200 hover:bg-[#004AF7] hover:text-white"
            >
              Notícias
            </Link>

            <Link
              to="/admin/eventos"
              className="no-underline px-[14px] py-3 rounded-lg text-[#333] font-medium transition duration-200 hover:bg-[#004AF7] hover:text-white"
            >
              Eventos
            </Link>

            <Link
              to="/admin/configuracoes"
              className="no-underline px-[14px] py-3 rounded-lg text-[#333] font-medium transition duration-200 hover:bg-[#004AF7] hover:text-white"
            >
              Configurações
            </Link>
          </nav>
        </aside>

        <section className="flex-1">
          <h2 className="text-[26px] text-[#132190] mb-[25px] font-bold">
            Dashboard Administrativo
          </h2>

          <div className="grid grid-cols-4 gap-5 mb-[30px]">
            <div className="bg-white p-[25px] rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.1)]">
              <h3 className="font-bold">Consultas Hoje</h3>
              <p className="text-[32px] font-bold text-[#004AF7] mt-[10px]">
                48
              </p>
            </div>

            <div className="bg-white p-[25px] rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.1)]">
              <h3 className="font-bold">Pacientes Atendidos</h3>
              <p className="text-[32px] font-bold text-[#004AF7] mt-[10px]">
                132
              </p>
            </div>

            <div className="bg-white p-[25px] rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.1)]">
              <h3 className="font-bold">Médicos Ativos</h3>
              <p className="text-[32px] font-bold text-[#004AF7] mt-[10px]">
                27
              </p>
            </div>

            <div className="bg-white p-[25px] rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.1)]">
              <h3 className="font-bold">Exames Pendentes</h3>
              <p className="text-[32px] font-bold text-[#004AF7] mt-[10px]">
                15
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[25px]">
            <div className="bg-white p-[25px] rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.1)]">
              <h3 className="font-bold mb-4">Consultas de Hoje</h3>

              <ul>
                <li className="mb-[10px]">09:00 - Maria Souza Cardiologia</li>
                <li className="mb-[10px]">
                  10:30 - João Pereira Clínico Geral
                </li>
                <li className="mb-[10px]">
                  11:15 - Ana Beatriz Dermatologia
                </li>
                <li className="mb-[10px]">
                  14:00 - Pedro Henrique Ortopedia
                </li>
              </ul>
            </div>

            <div className="bg-white p-[25px] rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.1)]">
              <h3 className="font-bold mb-4">Alertas do Sistema</h3>

              <ul>
                <li className="mb-[10px]"> 3 exames aguardando laudo</li>
                <li className="mb-[10px]">Sistema de vacinação atualizado</li>
                <li className="mb-[10px]">5 pacientes aguardando confirmação</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
