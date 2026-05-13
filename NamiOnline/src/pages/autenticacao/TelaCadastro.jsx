import { Link } from "react-router-dom";
import bgNami2 from "../../assets/bg_nami2.png";

export default function TelaCadastro() {
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgNami2})` }}
    >
      <form className="w-[600px] bg-white p-[30px] rounded-[10px] flex flex-col gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
        <h2 className="text-center mb-2 text-2xl font-bold">Cadastre-se</h2>

        <div className="flex flex-col text-base">
          <span className="text-left mb-1 font-bold">Nome</span>
          <input
            className="p-2 border border-gray-300 rounded-[5px]"
            type="text"
            placeholder="Digite seu nome"
            required
          />
        </div>

        <div className="flex flex-col text-base">
          <span className="text-left mb-1 font-bold">CPF</span>
          <input
            className="p-2 border border-gray-300 rounded-[5px]"
            type="text"
            placeholder="Digite seu CPF"
            required
          />
        </div>

        <div className="flex flex-col text-base">
          <span className="text-left mb-1 font-bold">Email</span>
          <input
            className="p-2 border border-gray-300 rounded-[5px]"
            type="email"
            name="email"
            id="email"
            placeholder="Digite seu email"
            required
          />
        </div>

        <div className="flex flex-col text-base">
          <span className="text-left mb-1 font-bold">Senha</span>
          <input
            className="p-2 border border-gray-300 rounded-[5px]"
            type="password"
            name="password"
            id="password"
            placeholder="Digite sua senha"
            required
          />
        </div>

        <div className="flex flex-col text-base">
          <span className="text-left mb-1 font-bold">Telefone</span>
          <input
            className="p-2 border border-gray-300 rounded-[5px]"
            type="tel"
            id="telefone"
            name="telefone"
            placeholder="(99) 99999-9999"
            required
          />
        </div>

        <div className="flex flex-col text-base">
          <span className="text-left mb-1 font-bold">Data de Nascimento</span>
          <input
            className="p-2 border border-gray-300 rounded-[5px]"
            type="date"
            id="nascimento"
            name="nascimento"
            required
          />
        </div>

        <div className="flex flex-col text-base">
          <span className="text-left mb-1 font-bold">Gênero</span>
          <select
            className="w-full p-3 border border-gray-300 rounded-md text-sm outline-none bg-white cursor-pointer transition focus:border-[#4f8edc] focus:shadow-[0_0_4px_rgba(79,142,220,0.4)]"
            name="sexo"
            id="sexo"
            required
          >
            <option value="">Selecionar</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
        </div>

        <div className="flex flex-col text-center mt-2">
          <button
            className="mt-2 p-[10px] border-none rounded-[5px] bg-[#4f8edc] text-white font-bold cursor-pointer hover:bg-[#3c74b8]"
            type="submit"
          >
            Cadastrar
          </button>
        </div>

        <div className="flex flex-col text-center mt-2">
          <p>
            <Link className="no-underline text-[#4f8edc]" to="/">
              Já tem uma conta?
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}