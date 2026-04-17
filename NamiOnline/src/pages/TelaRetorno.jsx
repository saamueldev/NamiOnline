import { useNavigate } from "react-router-dom";
import "./user/style_retorno.css";

export default function ConfirmarRetorno() {
  const navigate = useNavigate();

  // dados mockados
  const dados = {
    nome: "João Silva",
    especialidade: "Cardiologia",
    data: "2026-04-20",
    hora: "14:30"
  };

  function confirmarAgendamento() {
    console.log("Consulta confirmada:", dados);
    alert("Retorno confirmado com sucesso!");
    navigate("/retornos");
  }

  function agendarNovo() {
    navigate("/AgRetorno");
  }

  return (
    <div className="container">
      
      {/* LADO ESQUERDO */}
      <div className="left">
        <div className="form-box">
          <h2>Confirmar Retorno</h2>

          <div className="input-box">
            <span>Nome</span>
            <input value={dados.nome} disabled />
          </div>

          <div className="input-box">
            <span>Especialidade</span>
            <input value={dados.especialidade} disabled />
          </div>

          <div className="input-box">
            <span>Data</span>
            <input value={dados.data} disabled />
          </div>

          <div className="input-box">
            <span>Hora</span>
            <input value={dados.hora} disabled />
          </div>

          <button onClick={confirmarAgendamento}>
            Confirmar Retorno
          </button>

          <button 
            onClick={agendarNovo} 
            style={{ marginTop: "10px", background: "#555" }}
          >
            Agendar Novo Retorno
          </button>
        </div>
      </div>

      {/* LADO DIREITO */}
      <div className="right">
        <div className="overlay"></div>
      </div>

    </div>
  );
}