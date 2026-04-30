import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext'
import TelaLogin from './pages/TelaLogin'
import RecuperarSenha from './pages/RecuperarSenha'
import TelaCadastro from './pages/TelaCadastro'
import RedefinirSenha from './pages/RedefinirSenha'
import TelaInicial from './pages/TelaInicial'
import ConsultaEspecialidade from "./pages/ConsultaEspecialidade";
import AnexarGuiaConsulta from "./pages/AnexarGuiaConsulta";
import ConfirmarConsulta from "./pages/ConfirmarConsulta";
import TelaRetorno from './pages/TelaRetorno'
import TelaAgendarRetorno from './pages/TelaAgendarRetorno'
import TelaPerfil from './pages/TelaPerfil'
import TelaAgendamentos from './pages/TelaAgendamentos'
import TelaConfiguracaoUsuario from './pages/TelaConfiguracaoUsuario'
import TelaNotificacaoAdmin from './pages/TelaNotificacaoAdmin'
import AdicionarEspecialidade from "./pages/AdicionarEspecialidade";
import AdicionarMedico from "./pages/AdicionarMedico";
import AdicionarConsulta from "./pages/AdicionarEspecialidade";
import TelaInicialAdmin from './pages/TelaInicialAdmin'
import Exames from './pages/Exames'
import ModalSolicitacaoSucesso from './pages/ModalSolicitacaoSucesso'
import AprovarGuia from './pages/AprovarGuia'
import AgendarExame from './pages/AgendarExame'
import AdminAgendarExame from './pages/adm/AdminAgendarExame'
import AdminEditarExames from './pages/adm/AdminEditarExames'
import AdminCadastrarExames from './pages/adm/AdminCadastrarExames'
import TelaNoticiasAdmin from './pages/TelaNoticiasAdmin'


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TelaLogin />} />
          <Route path="/recuperarsenha" element={<RecuperarSenha />} />
          <Route path="/cadastro" element={<TelaCadastro />} />
          <Route path="/redefinirsenha" element={<RedefinirSenha/>} />
          <Route path="/telainicial" element={<TelaInicial/>} />
          <Route path="/especialidades" element={<ConsultaEspecialidade/>} />
          <Route path="/anexarguia" element={<AnexarGuiaConsulta/>} />
          <Route path="/consulta/data" element={<ConfirmarConsulta/>} />
          <Route path="/retornos" element={<TelaRetorno />} />
          <Route path="/agendarretorno" element={<TelaAgendarRetorno />} />
          <Route path="/perfil" element={<TelaPerfil />} />
          <Route path="/agendamentos" element={<TelaAgendamentos />} />
          <Route path="/configuracao-usuario" element={<TelaConfiguracaoUsuario />} />
          <Route path="/notificacoes-admin" element={<TelaNotificacaoAdmin />} />
          <Route path="/adicionar/medico" element={<AdicionarMedico />} />
          <Route path="/adicionar/consulta" element={<AdicionarConsulta />} />
          <Route path="/admin/telainicial" element={<TelaInicialAdmin />} />
          <Route path="/Exames" element={<Exames />} />
          <Route path="/ModalSolicitacaoSucesso" element={<ModalSolicitacaoSucesso />} />
          <Route path="/AprovarGuia" element={<AprovarGuia />} />
          <Route path="/AgendarExame" element={<AgendarExame />} />
          <Route path="/admin/AdminAgendarExame" element={<AdminAgendarExame />} />
          <Route path="/admin/AdminEditarExames" element={<AdminEditarExames />} />
          <Route path="/admin/AdminCadastrarExames" element={<AdminCadastrarExames />} />
          <Route path="/admin/noticias" element={<TelaNoticiasAdmin />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App