import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
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

    setTimeout(() => {
      if (!email || !senha) {
        setErro('Por favor, preencha todos os campos')
        setLoading(false)
        return
      }

      const resultado = login(email, senha)

      if (resultado.sucesso) {
        navigate('/telainicial')
      } else {
        setErro('Email ou senha inválidos')
      }

      setLoading(false)
    }, 500)
  }

  return (
    <div className="relative flex h-screen w-full overflow-hidden font-sans">
      <div className="relative hidden h-full w-[60%] bg-white md:block">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src={namiVideo} type="video/mp4" />
          Seu navegador não suporta vídeo em HTML5.
        </video>

        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div
        className="relative flex h-full w-full items-center justify-center bg-cover bg-center bg-no-repeat md:w-[40%]"
        style={{ backgroundImage: `url(${bgNami2})` }}
      >
        <div className="absolute inset-0 bg-white/30" />

        <form
          onSubmit={handleLogin}
          className="relative z-10 w-[90%] rounded-[14px] bg-white/80 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-md sm:w-[80%] sm:p-9 md:w-[60%]"
        >
          <h2 className="mb-5 text-center font-['Lucida_Sans'] text-3xl font-semibold uppercase text-black">
            Login
          </h2>

          {erro && (
            <div className="mb-[18px] rounded-lg border-l-4 border-[#d32f2f] bg-[#ffebee] px-[15px] py-3 text-sm text-[#d32f2f]">
              {erro}
            </div>
          )}

          <div className="mb-[18px]">
            <span className="mb-1 inline-block text-base font-bold text-[#32324f]">
              Email ou CPF
            </span>

            <input
              type="text"
              placeholder="Digite seu email ou CPF"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-[#d9e2ec] bg-white px-[14px] py-3 text-[17px] font-normal outline-none placeholder:text-[#a9adb6] focus:border-[#132190] focus:shadow-[0_0_0_3px_rgba(19,33,144,0.15)]"
            />
          </div>

          <div className="mb-[18px]">
            <span className="mb-1 inline-block text-base font-bold text-[#32324f]">
              Senha
            </span>

            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full rounded-lg border border-[#d9e2ec] bg-white px-[14px] py-3 text-[17px] font-normal outline-none placeholder:text-[#a9adb6] focus:border-[#132190] focus:shadow-[0_0_0_3px_rgba(19,33,144,0.15)]"
            />
          </div>

          <div className="mb-5 flex flex-wrap justify-between gap-2 text-sm font-normal text-[#32324f]">
            <label className="cursor-pointer">
              <input type="checkbox" className="mr-1" />
              Lembre-me
            </label>

            <Link
              to="/recuperarsenha"
              className="text-[#132190] no-underline hover:text-[#004AF7]"
            >
              Esqueceu a senha?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-lg border-0 bg-gradient-to-br from-[#004AF7] to-[#132190] px-[14px] py-3 text-center text-xl font-semibold text-white transition hover:bg-[#004AF7] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="mb-[18px] mt-[18px] text-center">
            <p className="mt-2.5 text-[#32324f]">
              <Link
                to="/cadastro"
                className="text-[#132190] no-underline hover:text-[#004AF7]"
              >
                Cadastre-se
              </Link>
            </p>
          </div>

          <div className="mt-[15px] rounded-lg bg-[#f5f5f5] p-[15px]">
            <p className="mt-[15px] text-center text-xs text-[#888]">
              <strong>Teste Admin:</strong> admin@nami.com / admin123
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}