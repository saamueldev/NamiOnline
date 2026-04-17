import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/user/style_confirmar_consulta.css";

function ConfirmarConsulta() {
  const navigate = useNavigate();

  return (
    <div className="pagina-agendamento">
      <div className="agendamento-container">
        <header className="agendamento-topo">
          <h1>Clínica Geral</h1>
          <p>
            Selecione a data, o médico e o horário do seu atendimento no NAMI.
          </p>
        </header>

        <div className="agendamento-grid">
          <div className="coluna-esquerda">
            <section className="card-agendamento unidade-card">
              <h2>Local de atendimento</h2>

              <div className="unidade-fixa">
                <h3>NAMI - Unifor</h3>
                <p>Av. Washington Soares, 1321</p>
                <p>Edson Queiroz, Fortaleza - CE</p>
              </div>
            </section>

            <section className="card-agendamento calendario-card">
              <div className="card-header">
                <h2>Escolha a data</h2>

                <div className="navegacao-mes">
                  <button type="button">←</button>
                  <span>Abril 2026</span>
                  <button type="button">→</button>
                </div>
              </div>

              <div className="dias-semana">
                <span>Dom</span>
                <span>Seg</span>
                <span>Ter</span>
                <span>Qua</span>
                <span>Qui</span>
                <span>Sex</span>
                <span>Sáb</span>
              </div>

              <div className="grade-calendario">
                <button className="dia-calendario vazio" disabled></button>
                <button className="dia-calendario vazio" disabled></button>
                <button className="dia-calendario">1</button>
                <button className="dia-calendario">2</button>
                <button className="dia-calendario">3</button>
                <button className="dia-calendario ativo">4</button>
                <button className="dia-calendario">5</button>

                <button className="dia-calendario">6</button>
                <button className="dia-calendario">7</button>
                <button className="dia-calendario">8</button>
                <button className="dia-calendario">9</button>
                <button className="dia-calendario">10</button>
                <button className="dia-calendario">11</button>
                <button className="dia-calendario">12</button>

                <button className="dia-calendario">13</button>
                <button className="dia-calendario">14</button>
                <button className="dia-calendario">15</button>
                <button className="dia-calendario">16</button>
                <button className="dia-calendario">17</button>
                <button className="dia-calendario">18</button>
                <button className="dia-calendario">19</button>

                <button className="dia-calendario">20</button>
                <button className="dia-calendario">21</button>
                <button className="dia-calendario">22</button>
                <button className="dia-calendario">23</button>
                <button className="dia-calendario">24</button>
                <button className="dia-calendario">25</button>
                <button className="dia-calendario">26</button>

                <button className="dia-calendario">27</button>
                <button className="dia-calendario">28</button>
                <button className="dia-calendario">29</button>
                <button className="dia-calendario">30</button>
              </div>
            </section>
          </div>

          <div className="lado-direito">
            <section className="card-agendamento medicos-card">
              <h2>Escolha o médico</h2>

              <div className="lista-medicos">
                <button className="medico-item ativo" type="button">
                  <div>
                    <strong>Dra. Maria Silva</strong>
                    <p>Clínica Geral</p>
                  </div>
                  <span>CRM-CE 12345</span>
                </button>

                <button className="medico-item" type="button">
                  <div>
                    <strong>Dr. João Pereira</strong>
                    <p>Clínica Geral</p>
                  </div>
                  <span>CRM-CE 54321</span>
                </button>

                <button className="medico-item" type="button">
                  <div>
                    <strong>Dra. Ana Costa</strong>
                    <p>Clínica Geral</p>
                  </div>
                  <span>CRM-CE 67890</span>
                </button>
              </div>
            </section>

            <section className="card-agendamento horarios-card">
              <h2>Escolha o horário</h2>

              <div className="lista-horarios">
                <button className="horario-item ativo" type="button">
                  08:00
                </button>
                <button className="horario-item" type="button">
                  08:30
                </button>
                <button className="horario-item" type="button">
                  09:00
                </button>
                <button className="horario-item" type="button">
                  09:30
                </button>
                <button className="horario-item" type="button">
                  10:00
                </button>
                <button className="horario-item" type="button">
                  10:30
                </button>
                <button className="horario-item" type="button">
                  13:00
                </button>
                <button className="horario-item" type="button">
                  13:30
                </button>
              </div>
            </section>

            <button className="botao-continuar" type="button" onClick={() => navigate('/retornos')}>
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmarConsulta;
