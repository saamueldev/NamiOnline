import { BrowserRouter, Routes, Route } from "react-router-dom";
import TelaLogin from './pages/TelaLogin'
import RecuperarSenha from './pages/RecuperarSenha'
import TelaCadastro from './pages/TelaCadastro'
import RedefinirSenha from './pages/RedefinirSenha'
import TelaInicial from './pages/TelaInicial'

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<TelaLogin />} />
        <Route path="/recuperarsenha" element={<RecuperarSenha />} />
        <Route path="/cadastro" element={<TelaCadastro />} />
        <Route path="/redefinirsenha" element={<RedefinirSenha/>} />
        <Route path="/telainicial" element={<TelaInicial/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App