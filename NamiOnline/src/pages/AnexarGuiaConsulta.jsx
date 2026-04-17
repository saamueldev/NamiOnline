import React from "react"
import { FaFileUpload, FaIdCard, FaFileMedical } from "react-icons/fa"
import { Link } from "react-router-dom"
import "../pages/user/style_anexar_guia_consulta.css"

const AnexarGuiaConsulta = () => {
  return (
    <div className="pagina-anexo">
      <div className="container-anexo">
        <div className="topo-anexo">
          <span className="badge-anexo">Envio de documentos</span>
          <h1>Anexar guia médica</h1>
          <p>
            Esta especialidade requer guia médica. Envie a guia e um documento
            de identidade com foto, frente e verso.
          </p>
        </div>

        <div className="card-anexo">
          <div className="icone-principal">
            <FaFileUpload />
          </div>

          <h2>Envie seus arquivos</h2>

          <p className="descricao-anexo">
            Anexe aqui sua guia médica e um documento de identidade.
            <br />
            Formatos aceitos: PDF, PNG ou JPEG.
          </p>

          <div className="info-arquivos">
            <div className="info-item">
              <FaFileMedical />
              <span>Guia médica</span>
            </div>

            <div className="info-item">
              <FaIdCard />
              <span>Identidade frente e verso</span>
            </div>
          </div>

          <button className="botao-enviar" type="button">
            Selecionar arquivos
          </button>
        </div>

        <div className="acoes-anexo">
          <Link to="/telainicial" className="botao-voltar">Voltar</Link>
        </div>
      </div>
    </div>
  )
}

export default AnexarGuiaConsulta