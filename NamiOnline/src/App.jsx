import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext, AuthProvider } from './context/AuthContext';
import LayoutComNavbar from "./layouts/LayoutComNavbar";

// --- COMPONENTES DE AUTENTICACAO & ACESSO COMUM ---
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
import TelaNotificacoes from "./pages/user/TelaNotificacoes";
import CentralAjuda from './pages/user/CentralAjuda';

// --- COMPONENTES DO ADMINISTRADOR (ADM) ---
import TelaInicialAdmin from './pages/adm/TelaInicialAdmin';
import AdicionarMedico from "./pages/adm/AdminAdicionarMedico";
import CadastrarPaciente from "./pages/adm/AdminCadastrarPaciente"
import AdicionarEspecialidade from "./pages/adm/CadastroEspecialidades";
import TelaNotificacaoAdmin from './pages/adm/TelaNotificacaoAdmin';
import AdminAgendarExame from './pages/adm/AdminAgendarExame';
import AdminEditarExames from './pages/adm/AdminEditarExames';
import AdminCadastrarCategoriasExames from './pages/adm/AdminCadastrarCategoriasExames';
import AdminCadastrarTiposExames from './pages/adm/AdminCadastrarTiposExames';
import TelaNoticiasAdmin from './pages/adm/TelaNoticiasAdmin';
import TelaEventosAdmin from './pages/adm/TelaEventosAdmin';
import AprovarGuia from './pages/adm/AprovarGuia';
import ConsultaDia from "./pages/adm/AdminConsultaDia";

function ProtectedLayout() {
  const { authLoading, isLoggedIn } = useContext(AuthContext);

  if (authLoading) {
    return null;
  }

  if (!isLoggedIn()) {
    return <Navigate to="/" replace />;
  }

  return <LayoutComNavbar />;
}

function RoleGuard({ allowedRoles, redirectTo }) {
  const { user } = useContext(AuthContext);

  if (!allowedRoles.includes(user?.tipo)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}

function App() {
  useEffect(() => {
    const temaSalvo = localStorage.getItem("tema") || "claro";

    if (temaSalvo === "escuro") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ROTAS PÚBLICAS */}
          <Route path="/" element={<TelaLogin />} />
          <Route path="/cadastro" element={<TelaCadastro />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route path="/redefinir-senha/:token" element={<RedefinirSenha />} />

          <Route element={<ProtectedLayout />}>
            <Route element={<RoleGuard allowedRoles={['usuario']} redirectTo="/admin/dashboard" />}>
            {/* USER */}
              <Route path="/home" element={<TelaInicial />} />
              <Route path="/perfil" element={<TelaPerfil />} />
              <Route path="/perfil/configuracoes" element={<TelaConfiguracaoUsuario />} />
              <Route path="/notificacoes" element={<TelaNotificacoes />} />
              <Route path="/central-ajuda" element={<CentralAjuda />} />
              {/* CONSULTAS */}
              <Route path="/meus-agendamentos" element={<TelaAgendamentos />} />
              <Route path="/especialidades" element={<ConsultaEspecialidade />} />
              <Route path="/agendar/anexar-guia" element={<AnexarGuiaConsulta />} />
              <Route path="/agendamento/data" element={<ConfirmarConsulta />} />
              <Route path="/retornos" element={<TelaRetorno />} />
              <Route path="/retornos/agendar" element={<TelaAgendarRetorno />} />
               {/* EXAMES */}
              <Route path="/exames" element={<ExamesPaciente />} />
              <Route path="/exames/agendar" element={<AgendarExamePaciente />} />
              <Route path="/exames/sucesso" element={<ModalSolicitacaoSucesso />} />
            </Route>

              {/* ADMIN */}

            <Route element={<RoleGuard allowedRoles={['admin']} redirectTo="/home" />}>
            
              <Route path="/admin/dashboard" element={<TelaInicialAdmin />} />
              <Route path="/admin/cadastrar-medico" element={<AdicionarMedico />} />
              <Route path="/admin/cadastrar-paciente" element={<CadastrarPaciente />} />
              <Route path="/admin/cadastrar-especialidade" element={<AdicionarEspecialidade />} />
              <Route path="/admin/aprovar-guias" element={<AprovarGuia />} />
              <Route path="/admin/consultas-dia" element={<ConsultaDia />} />
              {/* Gestão de Exames */}
              <Route path="/admin/exames/agendar" element={<AdminAgendarExame />} />
              <Route path="/admin/categorias-exames/:categoriaId/exames" element={<AdminEditarExames />} />
              <Route path="/admin/exames/cadastrar-categorias-exames" element={<AdminCadastrarCategoriasExames />} />
              <Route path="/admin/exames/cadastrar-tipos-exames" element={<AdminCadastrarTiposExames />} />
              {/* NOTIFICAÇÕES */}
              <Route path="/admin/notificacoes" element={<TelaNotificacaoAdmin />} />
              <Route path="/admin/noticias" element={<TelaNoticiasAdmin />} />
              <Route path="/admin/eventos" element={<TelaEventosAdmin />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
