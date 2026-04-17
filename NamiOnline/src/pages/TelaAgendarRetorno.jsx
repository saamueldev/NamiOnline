import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./user/style_retorno.css";

export default function TelaAgendarRetorno() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    especialidade: "",
    data: "",
    hora: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log(form);
    alert("Consulta agendada com sucesso!");

    // redireciona após agendar
    navigate("/confirmar-retorno");
  }

  return (
    <div className="container-agendar">

      {/* LADO ESQUERDO */}
      <div className="left-agendar">
        <form className="form-box" onSubmit={handleSubmit}>
          <h2>Agendar Retorno</h2>

          <div className="input-box">
            <span>Nome</span>
            <input
              name="nome"
              placeholder="Digite o nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <span>Especialidade</span>
            <select
              name="especialidade"
              value={form.especialidade}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option>Clínico Geral</option>
              <option>Dermatologia</option>
              <option>Cardiologia</option>
            </select>
          </div>

          <div className="input-box">
            <span>Data</span>
            <input
              type="date"
              name="data"
              value={form.data}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <span>Hora</span>
            <input
              type="time"
              name="hora"
              value={form.hora}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" style={{ marginTop: "10px" }}>
            Agendar Retorno
          </button>
        </form>
      </div>

      {/* LADO DIREITO (IMAGEM) */}
      <div className="right-agendar">
        <div className="overlay-agendar"></div>
      </div>

    </div>
  );
}