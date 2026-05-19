import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  FaArrowLeft,
  FaCalendarAlt,
  FaUserMd,
  FaClock,
  FaMapMarkerAlt,
  FaTrash,
  FaCalendarCheck,
  FaCheckCircle,
  FaHourglassHalf,
  FaRegCalendarPlus,
  FaRegCalendarTimes
} from 'react-icons/fa'

import api from '../../services/api'
import './style_agendamentos.css'

export default function TelaAgendamentos() {
  const navigate = useNavigate()

  const [agendamentos, setAgendamentos] = useState([])
  const [loading, setLoading] = useState(true)

  // =========================
  // CARREGAR RETORNOS DO BANCO
  // =========================
  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true)

        const user = JSON.parse(
          localStorage.getItem('nami_user') ||
          sessionStorage.getItem('nami_user') ||
          'null'
        )

        const usuarioId = user?._id || user?.id

        const { data } = await api.get('/retornos', {
          params: { usuarioId }
        })

        setAgendamentos(data)
      } catch (error) {
        console.error('Erro ao buscar retornos:', error)
      } finally {
        setLoading(false)
      }
    }

    carregar()
  }, [])

  const handleCancelar = async (id) => {
    try {
      await api.delete(`/retornos/${id}`)

      setAgendamentos(prev =>
        prev.filter(item => item._id !== id)
      )
    } catch (error) {
      alert('Erro ao cancelar retorno')
    }
  }

  const getStatusColor = (status) => {
    return status === 'confirmado' ? '#2e7d32' : '#f57c00'
  }

  const getStatusIcon = (status) => {
    return status === 'confirmado'
      ? FaCheckCircle
      : FaHourglassHalf
  }

  const getStatusText = (status) => {
    return status === 'confirmado'
      ? 'Confirmado'
      : 'Pendente'
  }

  return (
    <div className="agendamentos-container">
      <div className="agendamentos-wrapper">

        {/* HEADER */}
        <div className="agendamentos-header">
          <button
            className="agendamentos-back-btn"
            onClick={() => navigate('/home')}
          >
            <FaArrowLeft />
          </button>

          <h1 className="agendamentos-title">
            Meus Retornos
          </h1>
        </div>

        {/* LOADING */}
        {loading ? (
          <p>Carregando retornos...</p>
        ) : agendamentos.length === 0 ? (
          <div className="agendamentos-vazio">
            <FaRegCalendarTimes size={40} />
            <h3>Nenhum retorno agendado</h3>

            <button
              className="agendamentos-btn-novo"
              onClick={() => navigate('/retornos/agendar')}
            >
              <FaRegCalendarPlus />
              Agendar retorno
            </button>
          </div>
        ) : (
          <div className="agendamentos-list">

            {agendamentos.map((item) => {
              const StatusIcon = getStatusIcon(item.status)

              return (
                <div key={item._id} className="agendamento-card">

                  <div className="agendamento-card-left">

                    <div className="agendamento-especialidade">
                      {item.especialidade}
                    </div>

                    <div className="agendamento-detalhes">

                      <div className="detalhe">
                        <FaUserMd />
                        <span>{item.medico}</span>
                      </div>

                      <div className="detalhe">
                        <FaCalendarAlt />
                        <span>
                          {new Date(item.data).toLocaleDateString('pt-BR')}
                        </span>
                      </div>

                      <div className="detalhe">
                        <FaClock />
                        <span>{item.horario}</span>
                      </div>

                      <div className="detalhe">
                        <FaMapMarkerAlt />
                        <span>Clínica Nami</span>
                      </div>

                    </div>
                  </div>

                  <div className="agendamento-card-right">

                    <div
                      className="agendamento-status"
                      style={{
                        backgroundColor: `${getStatusColor(item.status)}20`,
                        color: getStatusColor(item.status)
                      }}
                    >
                      <StatusIcon />
                      {getStatusText(item.status)}
                    </div>

                    <button
                      className="agendamento-btn-cancelar"
                      onClick={() => handleCancelar(item._id)}
                    >
                      <FaTrash />
                    </button>

                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* FOOTER */}
        <div className="agendamentos-acoes">

          <button
            className="agendamentos-btn-voltar"
            onClick={() => navigate('/home')}
          >
            <FaArrowLeft />
            Voltar
          </button>

          <button
            className="agendamentos-btn-novo"
            onClick={() => navigate('/retornos/agendar')}
          >
            <FaRegCalendarPlus />
            Novo retorno
          </button>

        </div>

      </div>
    </div>
  )
}