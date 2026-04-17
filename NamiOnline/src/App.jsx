import { BrowserRouter, Routes, Route } from "react-router-dom";
import TelaLogin from './pages/TelaLogin'
import RecuperarSenha from './pages/RecuperarSenha'
import TelaCadastro from './pages/TelaCadastro'
import RedefinirSenha from './pages/RedefinirSenha'
import TelaInicial from './pages/TelaInicial'
import TelaAgendarRetorno from './pages/TelaAgendarRetorno'
import TelaRetorno from './pages/TelaRetorno'

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<TelaLogin />} />
        <Route path="/recuperarsenha" element={<RecuperarSenha />} />
        <Route path="/cadastro" element={<TelaCadastro />} />
        <Route path="/redefinirsenha" element={<RedefinirSenha/>} />
        <Route path="/telainicial" element={<TelaInicial/>} />
        <Route path="/retornos" element={<TelaRetorno/>} />
        <Route path="/AgRetorno" element={<TelaAgendarRetorno/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App