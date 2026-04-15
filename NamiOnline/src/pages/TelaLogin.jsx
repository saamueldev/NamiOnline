import './user/style_tela_login.css'
import namiVideo from '../assets/nami_video.mp4'
import bgNami2 from '../assets/bg_nami2.png'
import { Link } from "react-router-dom";

export default function TelaLogin() {
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
        <form className="form-box">
          <h2>Login</h2>

          <div className="input-box">
            <span>CPF</span>
            <input type="text" placeholder="Digite o seu CPF" />
          </div>

          <div className="input-box">
            <span>Senha</span>
            <input type="password" placeholder="Digite sua senha" />
          </div>

          <div className="lembrar">
            <label>
              <input type="checkbox" /> Lembre-me
            </label>
            <Link to="/recuperarsenha">Esqueceu a senha?</Link>
          </div>

          <div className="input-box-entrar">
            <Link to ="/telainicial" type="submit">Entrar</Link>
          </div>

          <div className="input-box">
            <p>
              <Link to="/cadastro">Cadastre-se</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}