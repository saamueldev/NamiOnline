import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';

// --- COMPONENTES DE AUTENTICAÇÃO & ACESSO COMUM ---
import TelaLogin from './pages/TelaLogin';
import TelaCadastro from './pages/TelaCadastro';
import RecuperarSenha from './pages/RecuperarSenha';
import RedefinirSenha from './pages/RedefinirSenha';

// --- COMPONENTES DO PACIENTE (USER) ---
import TelaInicial from './pages/TelaInicial';
import TelaPerfil from './pages/TelaPerfil';
import TelaConfiguracaoUsuario from './pages/TelaConfiguracaoUsuario';
import TelaAgendamentos from './pages/TelaAgendamentos';
import ConsultaEspecialidade from "./pages/user/ConsultaEspecialidade";
import AnexarGuiaConsulta from "./pages/user/AnexarGuiaConsulta";
import ConfirmarConsulta from "./pages/user/ConfirmarConsulta";
import TelaRetorno from './pages/TelaRetorno';
import TelaAgendarRetorno from './pages/TelaAgendarRetorno';
import ExamesPaciente from './pages/Exames';
import AgendarExamePaciente from './pages/AgendarExame';
import ModalSolicitacaoSucesso from './pages/ModalSolicitacaoSucesso';

// --- COMPONENTES do ADMINISTRADOR (ADM) ---
import TelaInicialAdmin from './pages/adm/TelaInicialAdmin';
import AdicionarMedico from "./pages/adm/AdminAdicionarMedico";
import AdicionarEspecialidade from "./pages/adm/CadastroEspecialidades"; 
import TelaNotificacaoAdmin from './pages/adm/TelaNotificacaoAdmin';
import AdminAgendarExame from './pages/adm/AdminAgendarExame';
import AdminEditarExames from './pages/adm/AdminEditarExames';
import AdminCadastrarExames from './pages/adm/AdminCadastrarExames';
import TelaNoticiasAdmin from './pages/adm/TelaNoticiasAdmin';
import TelaEventosAdmin from './pages/adm/TelaEventosAdmin';
import AprovarGuia from './pages/AprovarGuia';
import ConsultaDia from "./pages/adm/AdminConsultaDia"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 1. ROTAS PÚBLICAS (AUTENTICAÇÃO) */}
          <Route path="/" element={<TelaLogin />} />
          <Route path="/cadastro" element={<TelaCadastro />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route path="/redefinir-senha" element={<RedefinirSenha />} />

          {/* 2. ROTAS DO PACIENTE (USER) */}
          <Route path="/home" element={<TelaInicial />} />
          <Route path="/perfil" element={<TelaPerfil />} />
          <Route path="/perfil/configuracoes" element={<TelaConfiguracaoUsuario />} />
          
          {/* Consultas e Retornos */}
          <Route path="/meus-agendamentos" element={<TelaAgendamentos />} />
          <Route path="/agendar/especialidades" element={<ConsultaEspecialidade />} />
          <Route path="/agendar/anexar-guia" element={<AnexarGuiaConsulta />} />
          <Route path="/agendar/confirmar-data" element={<ConfirmarConsulta />} />
          <Route path="/retornos" element={<TelaRetorno />} />
          <Route path="/retornos/agendar" element={<TelaAgendarRetorno />} />
          
          {/* Exames */}
          <Route path="/exames" element={<ExamesPaciente />} />
          <Route path="/exames/agendar" element={<AgendarExamePaciente />} />
          <Route path="/exames/sucesso" element={<ModalSolicitacaoSucesso />} />

          {/* 3. ROTAS ADMINISTRATIVAS (ADM) */}
          <Route path="/admin/dashboard" element={<TelaInicialAdmin />} />
          
          {/* Gestão de Médicos e Consultas */}
          <Route path="/admin/cadastrar-medico" element={<AdicionarMedico />} />
          <Route path="/admin/cadastrar-especialidade" element={<AdicionarEspecialidade />} />
          <Route path="/admin/aprovar-guias" element={<AprovarGuia />} />
          <Route path="/admin/consultas-dia" element={<ConsultaDia />} />
          
          {/* Gestão de Exames */}
          <Route path="/admin/exames/agendar" element={<AdminAgendarExame />} />
          <Route path="/admin/exames/editar" element={<AdminEditarExames />} />
          <Route path="/admin/exames/cadastrar" element={<AdminCadastrarExames />} />
          
          {/* Comunicação e Notificações */}
          <Route path="/admin/notificacoes" element={<TelaNotificacaoAdmin />} />
          <Route path="/admin/noticias" element={<TelaNoticiasAdmin />} />
          <Route path="/admin/eventos" element={<TelaEventosAdmin />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;