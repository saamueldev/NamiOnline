import { Link } from 'react-router-dom'
import './user/style_retorno.css'

export default function TelaRetorno() {
  return (
    <div className="retorno-page">
      <div className="retorno-glow" />
      <div className="retorno-shell">
        <section className="retorno-card retorno-main-card">
          <div className="retorno-headline">
            <div>
              <span className="retorno-chip">Retorno de Consulta</span>
              <h1>Consulta registrada com sucesso</h1>
              <p>Seu retorno já está agendado e você pode acompanhar as próximas etapas por aqui.</p>
               </div>
            <div className="retorno-status-box">
              <span className="retorno-status retorno-status-success">Confirmado</span>
              <p>Próximo retorno sugerido em 30 dias.</p>
            </div>
          </div>

          <div className="retorno-grid">
            <article className="retorno-info-card">
              <h2>Especialidade</h2>
              <p>Cardiologia</p>
            </article>
            <article className="retorno-info-card">
              <h2>Médico</h2>
              <p>Dra. Marina Soares</p>
            </article>
             <article className="retorno-info-card">
              <h2>Data</h2>
              <p>12 de Maio • 14:30</p>
            </article>
            <article className="retorno-info-card">
              <h2>Local</h2>
              <p>Clínica Nami • Sala 03</p>
            </article>
          </div>
           <div className="retorno-text-block">
            <h2>Observações importantes</h2>
            <p>Continue seguindo as orientações médicas e mantenha seu histórico atualizado. Se houver qualquer alteração nos sintomas, volte a consultar a equipe imediatamente.</p>
          </div>

          <div className="retorno-actions">
            <Link to="/agendarretorno" className="btn btn-primary">Agendar próximo retorno</Link>
            <Link to="/telainicial" className="btn btn-outline">Voltar para início</Link>
          </div>
        </section>
        <aside className="retorno-card retorno-aside-card">
          <div className="aside-tag">Resumo rápido</div>
          <div className="aside-block">
            <strong>Próxima ação</strong>
            <p>Agende seu retorno até 10 dias antes da data sugerida para garantir o melhor horário.</p>
          </div>
          <div className="aside-block">
            <strong>Checklist</strong>
            <ul>
              <li>Verificar exames recentes</li>
              <li>Levar lista de medicamentos</li>
              <li>Anotar sintomas</li>
            </ul>
          </div>
          <div className="aside-block aside-highlight">
            <strong>Contato</strong>
                        <p>Suporte Nami: (11) 4000-1234</p>
          </div>
        </aside>
      </div>
    </div>
  )
}