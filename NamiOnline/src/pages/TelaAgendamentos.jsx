import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaCalendar, FaUser, FaClock, FaMapMarkerAlt, FaTrash } from 'react-icons/fa'
import './user/style_agendamentos.css'

export default function TelaAgendamentos() {
  const navigate = useNavigate()
  const [agendamentos, setAgendamentos] = useState([
    {
      id: 1,
      especialidade: 'Cardiologia',
      medico: 'Dra. Marina Soares',
      data: '2026-05-12',
      hora: '14:30',
      local: 'Clínica Nami • Sala 03',
      status: 'confirmado'
    },
    {
      id: 2,
      especialidade: 'Dermatologia',
      medico: 'Dr. Lucas Mota',
      data: '2026-06-08',
      hora: '10:00',
      local: 'Clínica Nami • Sala 05',
      status: 'confirmado'
    },
    {
      id: 3,
      especialidade: 'Ortopedia',
      medico: 'Dra. Fernanda Alves',
      data: '2026-07-15',
      hora: '09:30',
      local: 'Clínica Nami • Sala 02',
      status: 'pendente'
    }
  ])

  const handleCancelar = (id) => {
    setAgendamentos(agendamentos.filter(item => item.id !== id))
  }

  const getStatusColor = (status) => {
    return status === 'confirmado' ? '#2e7d32' : '#f57c00'
  }

  const getStatusText = (status) => {
    return status === 'confirmado' ? 'Confirmado' : 'Pendente'
  }

  return (
    <div className="agendamentos-container">
      <div className="agendamentos-wrapper">
        
        {/* Header */}
        <div className="agendamentos-header">
          <button className="agendamentos-back-btn" onClick={() => navigate('/telainicial')}>
            <FaArrowLeft />
          </button>
          <h1 className="agendamentos-title">Meus Agendamentos</h1>
        </div>

        {/* Info Cards */}
        <div className="agendamentos-info-cards">
          <div className="info-card">
            <div className="info-icon">📅</div>
            <div className="info-content">
              <h3>{agendamentos.length}</h3>
              <p>Agendamentos Totais</p>
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">✓</div>
            <div className="info-content">
              <h3>{agendamentos.filter(a => a.status === 'confirmado').length}</h3>
              <p>Confirmados</p>
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">⏳</div>
            <div className="info-content">
              <h3>{agendamentos.filter(a => a.status === 'pendente').length}</h3>
              <p>Pendentes</p>
            </div>
          </div>
        </div>

        {/* Agendamentos List */}
        <div className="agendamentos-section">
          <div className="agendamentos-section-title">
            <FaCalendar /> Próximas Consultas
          </div>

          {agendamentos.length === 0 ? (
            <div className="agendamentos-vazio">
              <div className="vazio-icon">📭</div>
              <h3>Nenhum agendamento</h3>
              <p>Você não possui agendamentos no momento</p>
              <button 
                className="agendamentos-btn-novo"
                onClick={() => navigate('/especialidades')}
              >
                Agendar Consulta
              </button>
            </div>
          ) : (
            <div className="agendamentos-list">
              {agendamentos.map((agendamento) => (
                <div key={agendamento.id} className="agendamento-card">
                  <div className="agendamento-card-left">
                    <div className="agendamento-especialidade">
                      {agendamento.especialidade}
                    </div>
                    
                    <div className="agendamento-detalhes">
                      <div className="detalhe">
                        <FaUser /> <span>{agendamento.medico}</span>
                      </div>
                      <div className="detalhe">
                        <FaCalendar /> <span>{new Date(agendamento.data).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="detalhe">
                        <FaClock /> <span>{agendamento.hora}</span>
                      </div>
                      <div className="detalhe">
                        <FaMapMarkerAlt /> <span>{agendamento.local}</span>
                      </div>
                    </div>
                  </div>

                  <div className="agendamento-card-right">
                    <div 
                      className="agendamento-status"
                      style={{backgroundColor: `${getStatusColor(agendamento.status)}20`, color: getStatusColor(agendamento.status)}}
                    >
                      {getStatusText(agendamento.status)}
                    </div>
                    <button 
                      className="agendamento-btn-cancelar"
                      onClick={() => handleCancelar(agendamento.id)}
                      title="Cancelar agendamento"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ações */}
        <div className="agendamentos-acoes">
          <button 
            className="agendamentos-btn-voltar"
            onClick={() => navigate('/telainicial')}
          >
            ← Voltar
          </button>
          <button 
            className="agendamentos-btn-novo"
            onClick={() => navigate('/especialidades')}
          >
            + Novo Agendamento
          </button>
        </div>

      </div>
    </div>
  )
}
