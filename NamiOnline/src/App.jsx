import { BrowserRouter, Routes, Route } from "react-router-dom";
import TelaLogin from './pages/TelaLogin'
import RecuperarSenha from './pages/RecuperarSenha'
import TelaCadastro from './pages/TelaCadastro'
import RedefinirSenha from './pages/RedefinirSenha'
import TelaInicial from './pages/TelaInicial'
import ConsultaEspecialidade from "./pages/ConsultaEspecialidade";
import AnexarGuiaConsulta from "./pages/AnexarGuiaConsulta";
import ConfirmarConsulta from "./pages/ConfirmarConsulta";

function App() {
  return (
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
      </Routes>
    </BrowserRouter>
  )
}

export default App