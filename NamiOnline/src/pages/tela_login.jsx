import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  return (
    <>
      <div className="container-login">
        <div className="video-box">
          <video autoPlay loop muted playsInline className="bg-video">
            <source src="nami_video.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="content-box">
          <div className="form-box">
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
              <a href="#">Esqueceu a senha?</a>
            </div>

            <div className="input-box">
              <input type="submit" value="Entrar" />
            </div>

            <div className="input-box">
              <p>
                Não tem uma conta? <a href="#">Cadastre-se</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App
