import { Link } from 'react-router-dom'
import './user/style_tela_cadastro.css' // reusing style

export default function TelaPerfil() {
  return (
    <div className="cadastro-page">
      <div className="cadastro-container">
        <h1>Perfil do Usuário</h1>
        <p>Esta é a página de perfil. Funcionalidades em desenvolvimento.</p>
        <Link to="/telainicial" className="btn">Voltar para Início</Link>
      </div>
    </div>
  )
}