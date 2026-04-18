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
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App