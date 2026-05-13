import imagemRecuperacao from '../assets/bg_nami2.png'
import imagemLateral from '../assets/bg_nami.png'
import { Link } from 'react-router-dom'

export default function RecuperarSenha() {
  return (
    <div className="flex h-screen w-full overflow-hidden font-sans">
      <div
        className="relative hidden h-full w-[40%] items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat md:flex"
        style={{ backgroundImage: `url(${imagemLateral})` }}
      >
        <div className="absolute inset-0 bg-[#132190]/20" />

        <img
          src={imagemRecuperacao}
          alt="Recuperação de senha"
          className="relative z-10 w-[82%] max-w-[420px] rounded-[20px] object-contain shadow-[0_12px_35px_rgba(0,0,0,0.15)]"
        />
      </div>

      <div
        className="relative flex h-full w-full items-center justify-center bg-cover bg-center bg-no-repeat md:w-[60%]"
        style={{ backgroundImage: `url(${imagemRecuperacao})` }}
      >
        <div className="absolute inset-0 bg-white/35" />

        <form className="relative z-10 w-[90%] rounded-2xl bg-white/80 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.10)] backdrop-blur-md sm:w-[80%] sm:p-9 lg:w-[55%] lg:p-10">
          <h2 className="mb-[14px] text-center font-['Lucida_Sans'] text-[1.6em] font-bold uppercase text-black sm:text-[2em]">
            Recuperar Senha
          </h2>

          <p className="mb-6 text-center text-sm leading-6 text-[#4b4b68] sm:text-[15px]">
            Informe seu e-mail cadastrado para receber as instruções de
            recuperação de senha.
          </p>

          <div className="mb-[18px]">
            <span className="mb-1.5 inline-block text-base font-bold text-[#32324f]">
              E-mail
            </span>

            <input
              type="text"
              placeholder="Digite seu e-mail"
              className="w-full rounded-lg border border-[#d9e2ec] bg-white px-[14px] py-[13px] text-[17px] font-normal outline-none placeholder:text-[#a9adb6] focus:border-[#132190] focus:shadow-[0_0_0_3px_rgba(19,33,144,0.15)]"
            />
          </div>

          <div className="mb-[18px]">
            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg border-0 bg-gradient-to-br from-[#004AF7] to-[#132190] px-[14px] py-[13px] text-xl font-semibold text-white transition hover:bg-[#004AF7]"
            >
              Enviar
            </button>
          </div>

          <div className="mb-[18px] text-center">
            <p className="mt-2 text-[#32324f]">
              <Link
                to="/"
                className="font-semibold text-[#132190] no-underline hover:text-[#004AF7]"
              >
                Voltar para login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}