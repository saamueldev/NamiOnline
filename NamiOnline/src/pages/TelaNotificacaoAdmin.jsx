import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaBell, FaCheck, FaTimes, FaTrash, FaCheckDouble } from 'react-icons/fa'
import './user/style_notificacao_admin.css'

export default function TelaNotificacaoAdmin() {
  const navigate = useNavigate()
  const [notificacoes, setNotificacoes] = useState([
    {
      id: 1,
      tipo: 'nova_consulta',
      titulo: 'Nova Consulta Agendada',
      mensagem: 'João Silva agendou consulta com Cardiologia para 12/05/2026',
      timestamp: '2026-04-17T14:30:00',
      lida: false,
      urgencia: 'normal'
    },
    {
      id: 2,
      tipo: 'cancelamento',
      titulo: 'Consulta Cancelada',
      mensagem: 'Maria Santos cancelou consulta de Dermatologia do dia 08/06/2026',
      timestamp: '2026-04-17T13:15:00',
      lida: false,
      urgencia: 'alto'
    },
    {
      id: 3,
      tipo: 'novo_usuario',
      titulo: 'Novo Usuário Cadastrado',
      mensagem: 'Pedro Costa se cadastrou no sistema',
      timestamp: '2026-04-17T12:00:00',
      lida: true,
      urgencia: 'baixo'
    },
    {
      id: 4,
      tipo: 'retorno_agendado',
      titulo: 'Retorno Agendado',
      mensagem: 'Ana Silva agendou retorno em Cardiologia para 30/05/2026',
      timestamp: '2026-04-17T11:45:00',
      lida: true,
      urgencia: 'normal'
    },
    {
      id: 5,
      tipo: 'sistema',
      titulo: 'Atualização do Sistema',
      mensagem: 'Nova versão do aplicativo disponível para download',
      timestamp: '2026-04-17T10:30:00',
      lida: true,
      urgencia: 'baixo'
    }
  ])

  const [filtro, setFiltro] = useState('todas')

  const notificacoesNaoLidas = notificacoes.filter(n => !n.lida).length
  
  const notificacoesFiltradas = filtro === 'nao_lidas' 
    ? notificacoes.filter(n => !n.lida)
    : notificacoes

  const handleMarcarLida = (id) => {
    setNotificacoes(notificacoes.map(n => 
      n.id === id ? { ...n, lida: true } : n
    ))
  }

  const handleMarcarTodasLidas = () => {
    setNotificacoes(notificacoes.map(n => ({ ...n, lida: true })))
  }

  const handleDeletar = (id) => {
    setNotificacoes(notificacoes.filter(n => n.id !== id))
  }

  const getIconoTipo = (tipo) => {
    const iconos = {
      'nova_consulta': '📅',
      'cancelamento': '❌',
      'novo_usuario': '👤',
      'retorno_agendado': '🔄',
      'sistema': '⚙️'
    }
    return iconos[tipo] || '📬'
  }

  const getCorUrgencia = (urgencia) => {
    const cores = {
      'alto': '#ff6b6b',
      'normal': '#667eea',
      'baixo': '#4caf50'
    }
    return cores[urgencia] || '#667eea'
  }

  const formatarData = (timestamp) => {
    const data = new Date(timestamp)
    const agora = new Date()
    const diff = agora - data
    
    const minutos = Math.floor(diff / 60000)
    const horas = Math.floor(diff / 3600000)
    const dias = Math.floor(diff / 86400000)
    
    if (minutos < 1) return 'Agora'
    if (minutos < 60) return `${minutos}m atrás`
    if (horas < 24) return `${horas}h atrás`
    if (dias < 7) return `${dias}d atrás`
    
    return data.toLocaleDateString('pt-BR')
  }

  return (
    <div className="notif-admin-container">
      <div className="notif-admin-wrapper">
        
        {/* Header */}
        <div className="notif-admin-header">
          <button className="notif-admin-back-btn" onClick={() => navigate('/perfil')}>
            <FaArrowLeft />
          </button>
          <h1 className="notif-admin-title">
            <FaBell /> Notificações Admin
          </h1>
        </div>

        {/* Info Cards */}
        <div className="notif-admin-info">
          <div className="notif-info-card">
            <div className="notif-info-icon">📬</div>
            <div>
              <h3>{notificacoes.length}</h3>
              <p>Total de Notificações</p>
            </div>
          </div>
          <div className="notif-info-card notif-info-highlight">
            <div className="notif-info-icon">🔔</div>
            <div>
              <h3>{notificacoesNaoLidas}</h3>
              <p>Não Lidas</p>
            </div>
          </div>
        </div>

        {/* Controles */}
        <div className="notif-admin-controles">
          <div className="notif-filtros">
            <button 
              className={`notif-filtro ${filtro === 'todas' ? 'ativo' : ''}`}
              onClick={() => setFiltro('todas')}
            >
              Todas ({notificacoes.length})
            </button>
            <button 
              className={`notif-filtro ${filtro === 'nao_lidas' ? 'ativo' : ''}`}
              onClick={() => setFiltro('nao_lidas')}
            >
              Não Lidas ({notificacoesNaoLidas})
            </button>
          </div>

          {notificacoesNaoLidas > 0 && (
            <button 
              className="notif-btn-marcar-todas"
              onClick={handleMarcarTodasLidas}
            >
              <FaCheckDouble /> Marcar Todas como Lidas
            </button>
          )}
        </div>

        {/* Lista de Notificações */}
        <div className="notif-admin-lista">
          {notificacoesFiltradas.length === 0 ? (
            <div className="notif-vazio">
              <div className="notif-vazio-icon">📭</div>
              <h3>Nenhuma notificação</h3>
              <p>Você está com todas as notificações lidas</p>
            </div>
          ) : (
            notificacoesFiltradas.map((notif) => (
              <div 
                key={notif.id} 
                className={`notif-item ${!notif.lida ? 'nao-lida' : ''}`}
              >
                <div className="notif-item-esquerda">
                  <div className="notif-icone">
                    {getIconoTipo(notif.tipo)}
                  </div>
                  <div className="notif-conteudo">
                    <div className="notif-cabecalho">
                      <h3 className="notif-titulo">{notif.titulo}</h3>
                      <span 
                        className="notif-urgencia"
                        style={{backgroundColor: getCorUrgencia(notif.urgencia)}}
                      >
                        {notif.urgencia.charAt(0).toUpperCase() + notif.urgencia.slice(1)}
                      </span>
                    </div>
                    <p className="notif-mensagem">{notif.mensagem}</p>
                    <span className="notif-tempo">{formatarData(notif.timestamp)}</span>
                  </div>
                </div>

                <div className="notif-item-direita">
                  {!notif.lida && (
                    <button 
                      className="notif-btn-acao notif-btn-lida"
                      onClick={() => handleMarcarLida(notif.id)}
                      title="Marcar como lida"
                    >
                      <FaCheck />
                    </button>
                  )}
                  <button 
                    className="notif-btn-acao notif-btn-deletar"
                    onClick={() => handleDeletar(notif.id)}
                    title="Deletar notificação"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Voltar */}
        <div className="notif-admin-footer">
          <button 
            className="notif-btn-voltar"
            onClick={() => navigate('/perfil')}
          >
            ← Voltar
          </button>
        </div>

      </div>
    </div>
  )
}
