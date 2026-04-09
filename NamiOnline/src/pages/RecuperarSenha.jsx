import './user/style_recuperar_senha.css'
import imagemRecuperacao from '../assets/bg_nami2.png'
import imagemLateral from '../assets/bg_nami.png'
import { Link } from "react-router-dom";

export default function RecuperarSenha() {
  return (
    <div className="container-recuperar">
      <div
        className="image-box"
        style={{ backgroundImage: `url(${imagemLateral})` }}
      >
        <img src={imagemRecuperacao} alt="Recuperação de senha" className="side-image" />
      </div>

      <div
        className="content-box-recuperar"
        style={{ backgroundImage: `url(${imagemRecuperacao})` }}
      >
        <form className="form-box-recuperar">
          <h2>Recuperar Senha</h2>

          <p className="descricao-recuperar">
            Informe seu e-mail cadastrado para receber as instruções de
            recuperação de senha.
          </p>

          <div className="input-box-recuperar">
            <span>E-mail</span>
            <input
              type="text"
              placeholder="Digite seu e-mail"
            />
          </div>

          <div className="input-box-recuperar">
            <button type="submit">Enviar</button>
          </div>

          <div className="input-box-recuperar">
            <p>
              <Link to="/">Voltar para login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}