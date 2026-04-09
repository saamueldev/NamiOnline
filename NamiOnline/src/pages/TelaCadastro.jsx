import './user/style_tela_cadastro.css'
import { Link } from "react-router-dom";
import bgNami2 from '../assets/bg_nami2.png'

export default function TelaCadastro(){
    return (
        <div
            className="content-box-cadastrar"
            style={{ backgroundImage: `url(${bgNami2})` }}
        >
     <form className="form-box-cadastrar">
      <h2>Cadastre-se</h2>

      <div className="input-box-cadastrar">
        <span>Nome</span>
        <input type="text" placeholder="Digite seu nome" required />
      </div>

      <div className="input-box-cadastrar">
        <span>CPF</span>
        <input type="text" placeholder="Digite seu CPF" required />
      </div>

      <div className="input-box-cadastrar">
        <span>Email</span>
        <input type="email" name="email" id="email" placeholder="Digite seu email" required/>
      </div>

      <div className="input-box-cadastrar">
        <span>Senha</span>
        <input type="password" name="password" id="password" placeholder="Digite sua senha"required/>
      </div>

      <div className="input-box-cadastrar">
        <span>Telefone</span>
        <input type="tel" id="telefone" name="telefone"placeholder="(99) 99999-9999"required/>
      </div>

      <div className="input-box-cadastrar">
        <span>Data de Nascimento</span>
        <input type="date" id="nascimento" name="nascimento" required />
      </div>

      <div className="input-box-cadastrar">
        <span>Gênero</span>
         <select name="sexo" id="sexo" required>
            <option value="">Selecionar</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
        </select>
      </div>

      <div className="input-box-cadastrar">
        <button type="submit">Cadastrar</button>
      </div>

      <div className="input-box-cadastrar">
        <p>
         <Link to="/">Já tem uma conta?</Link>
        </p>
    </div>
    </form>
    </div>
  );
}
