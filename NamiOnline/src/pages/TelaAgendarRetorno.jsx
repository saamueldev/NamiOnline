import { Link, useNavigate } from 'react-router-dom'
import './user/style_agendar_retorno.css'

export default function TelaAgendarRetorno() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you could add form validation or API call
    navigate('/retornos')
  }
  return (
    <div className="agendar-page">
      <div className="agendar-shell">
        <main className="agendar-card agendar-main-card">
          <div className="agendar-title-bar">
            <div>
              <span className="agendar-badge">Retorno médico</span>
              <h1>Agende seu próximo retorno</h1>
              <p>Organize sua consulta de forma rápida e mantenha seu histórico clínico sempre atualizado.</p>
            </div>
            <div className="agendar-meta">
              <strong>Disponível em</strong>
              <p>Segunda a sexta • 08:00 - 18:00</p>
               </div>
          </div>

          <form className="agendar-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                Especialidade
                <select>
                  <option>Cardiologia</option>
                  <option>Dermatologia</option>
                  <option>Ortopedia</option>
                </select>
              </label>

              <label>
                Médico responsável
                <select>
                  <option>Dra. Marina Soares</option>
                  <option>Dr. Lucas Mota</option>
                  <option>Dra. Fernanda Alves</option>
                </select>
              </label>
              <label>
                Data do retorno
                <input type="date" />
              </label>

              <label>
                Horário
                <input type="time" />
              </label>
            </div>

            <label className="form-fullwidth">
              Observações adicionais
              <textarea placeholder="Informe se precisa de instruções especiais" rows="4" />
            </label>

            <div className="form-actions">
              <Link to="/telainicial" className="btn btn-cancel">Voltar para início</Link>
              <button type="submit" className="btn btn-confirm">Confirmar agendamento</button>
               </div>
          </form>
        </main>

        <aside className="agendar-card agendar-aside-card">
          <div className="aside-header">
            <h2>Por que agendar aqui?</h2>
            <p>Seu próximo retorno fica registrado em seu perfil e você recebe lembrete automaticamente.</p>
          </div>

          <div className="aside-list">
            <div>
              <strong>✔ Agendamento rápido</strong>
              <p>Escolha dia e horário em segundos.</p>
            </div>
            <div>
              <strong>✔ Atendimento priorizado</strong>
              <p>Mantenha o histórico de consultas alinhado com a equipe.</p>
            </div>
            <div>
              <strong>✔ Alertas via app</strong>
              <p>Receba aviso de retorno e instruções pré-consulta.</p>
            </div>
          </div>

          <div className="aside-note">
            <h3>Importante</h3>
            <p>Leve seus exames mais recentes e medicamentos. Para alterações de horário, contate a central com antecedência.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}