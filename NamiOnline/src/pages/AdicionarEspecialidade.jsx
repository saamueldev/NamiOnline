import React from "react";
import "./user/style_adicionar_especialidade.css";

const AdicionarEspecialidade = () => {
  return (
    <div className="container-especialidade">
      <div className="card-especialidade">
        <div className="topo-especialidade">
          <div>
            <h1>Cadastro de Especialidades</h1>
            <p className="subtitulo-especialidade">
              Adicione e gerencie especialidades médicas
            </p>
          </div>
        </div>

        <form className="form-especialidade">
          <div className="grupo-form">
            <label htmlFor="nome">Nome da Especialidade</label>
            <input type="text" id="nome" placeholder="Ex: Cardiologia" />
          </div>

          <div className="grupo-form">
            <label htmlFor="codigo">Código</label>
            <input type="text" id="codigo" placeholder="Ex: ESP-001" />
          </div>

          <div className="grupo-form-full">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              placeholder="Descreva a especialidade..."
            ></textarea>
          </div>

          <div className="botoes-form">
            <button type="submit" className="btn-salvar">
              Salvar Especialidade
            </button>

            <button type="button" className="btn-cancelar">
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <div className="card-lista">
        <div className="cabecalho-lista">
          <h2>Especialidades Cadastradas</h2>

          <div className="campo-busca">
            <input type="text" placeholder="Pesquisar especialidade..." />
          </div>
        </div>

        <div className="tabela-wrapper">
          <table className="tabela">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Código</th>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Cardiologia</td>
                <td>ESP-001</td>
                <td>Cuida do coração</td>
                <td className="acoes">
                  <button className="btn-editar">Editar</button>
                  <button className="btn-excluir">Excluir</button>
                </td>
              </tr>

              <tr>
                <td>Pediatria</td>
                <td>ESP-002</td>
                <td>Cuida de crianças</td>
                <td className="acoes">
                  <button className="btn-editar">Editar</button>
                  <button className="btn-excluir">Excluir</button>
                </td>
              </tr>

              <tr>
                <td>Ortopedia</td>
                <td>ESP-003</td>
                <td>Cuida de ossos e articulações</td>
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

export default AdicionarEspecialidade;