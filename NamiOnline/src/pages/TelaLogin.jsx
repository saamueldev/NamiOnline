import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import './user/style_tela_login.css'
import namiVideo from '../assets/nami_video.mp4'
import bgNami2 from '../assets/bg_nami2.png'

export default function TelaLogin() {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setErro('')
    setLoading(true)

    // Simula um pequeno delay
    setTimeout(() => {
      if (!email || !senha) {
        setErro('Por favor, preencha todos os campos')
        setLoading(false)
        return
      }

      const resultado = login(email, senha)
      
      if (resultado.sucesso) {
        // Redireciona baseado no tipo de usuário
        navigate('/telainicial')
      } else {
        setErro('Email ou senha inválidos')
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div className="container-login">
      <div className="video-box">
        <video autoPlay loop muted playsInline className="bg-video">
          <source src={namiVideo} type="video/mp4" />
          Seu navegador não suporta vídeo em HTML5.
        </video>
      </div>

      <div
        className="content-box"
        style={{ backgroundImage: `url(${bgNami2})` }}
      >
        <form className="form-box" onSubmit={handleLogin}>
          <h2>Login</h2>

          {erro && <div className="login-erro">{erro}</div>}

          <div className="input-box">
            <span>Email ou CPF</span>
            <input 
              type="text" 
              placeholder="Digite seu email ou CPF"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-box">
            <span>Senha</span>
            <input 
              type="password" 
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div className="lembrar">
            <label>
              <input type="checkbox" /> Lembre-me
            </label>
            <Link to="/recuperarsenha">Esqueceu a senha?</Link>
          </div>

          <div className="input-box-entrar">
            <button type="submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>

          <div className="input-box">
            <p>
              <Link to="/cadastro">Cadastre-se</Link>
            </p>
          </div>

          <div className="info-admin">
            <p style={{fontSize: '12px', color: '#888', marginTop: '15px', textAlign: 'center'}}>
              <strong>Teste Admin:</strong> admin@nami.com / admin123
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}