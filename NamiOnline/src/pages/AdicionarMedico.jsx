import React from "react";
import "./user/style_adicionar_medico.css";

const AdicionarMedico = () => {
  return (
    <div className="container-adicionar-medico">
      <div className="card-adicionar-medico">
        <div className="topo-adicionar-medico">
          <div>
            <h1>Cadastro de Médicos</h1>
            <p className="subtitulo-medico">
              Adicione e visualize os médicos cadastrados no sistema
            </p>
          </div>
        </div>

        <form className="form-medico">
          <div className="grupo-form">
            <label htmlFor="nome">Nome completo</label>
            <input type="text" id="nome" placeholder="Digite o nome do médico" />
          </div>

          <div className="grupo-form">
            <label htmlFor="crm">CRM</label>
            <input type="text" id="crm" placeholder="Digite o CRM" />
          </div>

          <div className="grupo-form">
            <label htmlFor="especialidade">Especialidade</label>
            <input
              type="text"
              id="especialidade"
              placeholder="Digite a especialidade"
            />
          </div>

          <div className="grupo-form">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" placeholder="Digite o e-mail" />
          </div>

          <div className="grupo-form">
            <label htmlFor="telefone">Telefone</label>
            <input type="text" id="telefone" placeholder="Digite o telefone" />
          </div>

          <div className="grupo-form">
            <label htmlFor="turno">Turno</label>
            <select id="turno">
              <option>Selecione o turno</option>
              <option>Manhã</option>
              <option>Tarde</option>
              <option>Noite</option>
            </select>
          </div>

          <div className="botoes-form">
            <button type="submit" className="btn-salvar">
              Salvar Médico
            </button>

            <button type="button" className="btn-cancelar">
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <div className="card-lista-medicos">
        <div className="cabecalho-lista">
          <h2>Médicos Cadastrados</h2>

          <div className="campo-busca">
            <input type="text" placeholder="Pesquisar médico..." />
          </div>
        </div>

        <div className="tabela-wrapper">
          <table className="tabela-medicos">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CRM</th>
                <th>Especialidade</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Turno</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Dr. João Silva</td>
                <td>12345-CE</td>
                <td>Cardiologia</td>
                <td>joao@nami.com</td>
                <td>(85) 99999-1111</td>
                <td>Manhã</td>
                <td className="acoes">
                  <button className="btn-editar">Editar</button>
                  <button className="btn-excluir">Excluir</button>
                </td>
              </tr>

              <tr>
                <td>Dra. Maria Costa</td>
                <td>67890-CE</td>
                <td>Pediatria</td>
                <td>maria@nami.com</td>
                <td>(85) 98888-2222</td>
                <td>Tarde</td>
                <td className="acoes">
                  <button className="btn-editar">Editar</button>
                  <button className="btn-excluir">Excluir</button>
                </td>
              </tr>

              <tr>
                <td>Dr. Lucas Fernandes</td>
                <td>54321-CE</td>
                <td>Ortopedia</td>
                <td>lucas@nami.com</td>
                <td>(85) 97777-3333</td>
                <td>Noite</td>
                <td className="acoes">
                  <button className="btn-editar">Editar</button>
                  <button className="btn-excluir">Excluir</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdicionarMedico;