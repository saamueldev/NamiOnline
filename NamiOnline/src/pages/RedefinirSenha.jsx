import './user/style_redefinir_senha.css'
import imagemRedefinicao from '../assets/bg_nami2.png'
import imagemLateral from '../assets/bg_nami.png'
import { Link } from "react-router-dom";

export default function RedefinirSenha() {
  return (
    <div className="container-redefinir">
      <div
        className="image-box"
        style={{ backgroundImage: `url(${imagemLateral})` }}
      >
        <img src={imagemRedefinicao} alt="Recuperação de senha" className="side-image" />
      </div>

      <div
        className="content-box-recuperar"
        style={{ backgroundImage: `url(${imagemRedefinicao})` }}
      >
        <form className="form-box-redefinir">
          <h2>Redefinir Senha</h2>

          <p className="descricao-redefinir">
            Digite sua nova senha e confirme a alteração.
          </p>

          <div className="input-box-redefinir">
            <span>Nova Senha</span>
            <input
              type="password"
              placeholder="Digite sua nova senha"
            />
          </div>

          <div className="input-box-redefinir">
            <input
              type="password"
              placeholder="Digite sua nova senha novamente"
            />
          </div>

          <div className="input-box-redefinir">
            <button type="submit">Enviar</button>
          </div>

          <div className="input-box-redefinir">
            <p>
              <Link to="/">Voltar para login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}