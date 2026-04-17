import "./user/style_consulta_especialidade.css"
import imgConsulta from "../assets/img_consulta.jpg"
import { useNavigate } from "react-router-dom"

const especialidades = [
  "Alergologia",
  "Cardiologia",
  "Cirurgia Geral",
  "Clínica Médica",
  "Dermatologia",
  "Endocrinologia",
  "Fisioterapia",
  "Gastroenterologia",
  "Ginecologia",
  "Neurologia",
  "Nutrição",
  "Ortopedia",
  "Otorrinolaringologia",
  "Pediatria",
  "Psicologia",
  "Psiquiatria",
  "Urologia"
]



const ConsultaEspecialidade = () => {
  const navigate = useNavigate()

  return (
    <div className="container-consulta">
      <section id="bannerConsulta">
        <img src={imgConsulta} alt="Consulta" id="imgConsulta" />

        <div className="banner-texto">
          <h1>Nossas Especialidades</h1>
          <p>
            Confira as especialidades médicas disponíveis e agende sua consulta.
          </p>
        </div>
      </section>

      <section id="searchEspecialidade">
        <div className="search-box">
          <input type="text" placeholder="Buscar Especialidade" />
        </div>
      </section>

      <section className="especialidades">
        {especialidades.map((item) => (
          <div className="card-especialidade" key={item}>
            <span className="nome-especialidade">{item}</span>
            <button className="botao-seta" type="button" onClick={() => navigate('/consulta/data')}>
              →
            </button>
          </div>
        ))}
      </section>
    </div>
  )
}



export default ConsultaEspecialidade