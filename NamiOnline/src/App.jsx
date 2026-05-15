import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import LayoutComNavbar from "./layouts/LayoutComNavbar";

// --- COMPONENTES DE AUTENTICAÇÃO & ACESSO COMUM ---
import TelaLogin from './pages/autenticacao/TelaLogin';
import TelaCadastro from './pages/autenticacao/TelaCadastro';
import RecuperarSenha from './pages/autenticacao/RecuperarSenha';
import RedefinirSenha from './pages/autenticacao/RedefinirSenha';

// --- COMPONENTES DO PACIENTE (USER) ---
import TelaInicial from "./pages/user/TelaInicial";
import TelaPerfil from './pages/user/TelaPerfil';
import TelaConfiguracaoUsuario from './pages/user/TelaConfiguracaoUsuario';
import TelaAgendamentos from './pages/user/TelaAgendamentos';
import ConsultaEspecialidade from "./pages/user/ConsultaEspecialidade";
import AnexarGuiaConsulta from "./pages/user/AnexarGuiaConsulta";
import ConfirmarConsulta from "./pages/user/ConfirmarConsulta";
import TelaRetorno from './pages/user/TelaRetorno';
import TelaAgendarRetorno from './pages/user/TelaAgendarRetorno';
import ExamesPaciente from './pages/user/Exames';
import AgendarExamePaciente from './pages/user/AgendarExame';
import ModalSolicitacaoSucesso from './pages/user/ModalSolicitacaoSucesso';

// --- COMPONENTES do ADMINISTRADOR (ADM) ---
import TelaInicialAdmin from './pages/adm/TelaInicialAdmin';
import AdicionarMedico from "./pages/adm/AdminAdicionarMedico";
import AdicionarEspecialidade from "./pages/adm/CadastroEspecialidades";
import TelaNotificacaoAdmin from './pages/adm/TelaNotificacaoAdmin';
import AdminAgendarExame from './pages/adm/AdminAgendarExame';
import AdminEditarExames from './pages/adm/AdminEditarExames';
import AdminCadastrarTipoExames from './pages/adm/AdminCadastrarTipoExames';
import TelaNoticiasAdmin from './pages/adm/TelaNoticiasAdmin';
import TelaEventosAdmin from './pages/adm/TelaEventosAdmin';
import AprovarGuia from './pages/adm/AprovarGuia';
import ConsultaDia from "./pages/adm/AdminConsultaDia"

function App() {
  const tipoUsuario = "user"; // ou "admin"
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas SEM Nav Bar*/}
          {/* 1. ROTAS PÚBLICAS (AUTENTICAÇÃO) */}
          <Route path="/" element={<TelaLogin />} />
          <Route path="/cadastro" element={<TelaCadastro />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route path="/redefinir-senha" element={<RedefinirSenha />} />

          {/* Rotas SEM Nav Bar*/}
         <Route element={<LayoutComNavbar />}>

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
          <Route path="/admin/exames/cadastrar-tipo-exames" element={<AdminCadastrarTipoExames />} />

          {/* Comunicação e Notificações */}
          <Route path="/admin/notificacoes" element={<TelaNotificacaoAdmin />} />
          <Route path="/admin/noticias" element={<TelaNoticiasAdmin />} />
          <Route path="/admin/eventos" element={<TelaEventosAdmin />} />
        </Route>
        </Routes>
    </BrowserRouter>
    </AuthProvider >
  );
}

export default App;
