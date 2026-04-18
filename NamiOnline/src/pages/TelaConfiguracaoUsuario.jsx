import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaVenusMars, FaHeart, FaEdit, FaSave } from 'react-icons/fa'
import './user/style_configuracao_usuario.css'

export default function TelaConfiguracaoUsuario() {
  const navigate = useNavigate()
  const [editar, setEditar] = useState(false)
  const [formData, setFormData] = useState({
    nome: 'João Silva Santos',
    email: 'joao.silva@email.com',
    telefone: '(85) 99999-8888',
    cpf: '123.456.789-00',
    dataNascimento: '1990-05-15',
    sexo: 'masculino',
    sangue: 'O+',
    endereco: 'Rua das Flores, 123',
    cidade: 'Fortaleza',
    estado: 'CE',
    cep: '60000-000',
    responsavel: 'Maria Santos',
    telefonResponsavel: '(85) 98888-7777',
    alergias: 'Penicilina, Amendoim',
    medicamentos: 'Losartana 50mg (diariamente)'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSalvar = () => {
    // Aqui você poderia enviar para um servidor
    console.log('Dados salvos:', formData)
    setEditar(false)
  }

  return (
    <div className="config-usuario-container">
      <div className="config-usuario-wrapper">
        
        {/* Header */}
        <div className="config-usuario-header">
          <button className="config-usuario-back-btn" onClick={() => navigate('/perfil')}>
            <FaArrowLeft />
          </button>
          <h1 className="config-usuario-title">Configurações Pessoais</h1>
        </div>

        {/* Botão Editar */}
        <div className="config-usuario-action-top">
          {!editar && (
            <button 
              className="config-usuario-btn-editar"
              onClick={() => setEditar(true)}
            >
              <FaEdit /> Editar Informações
            </button>
          )}
        </div>

        {/* Dados Pessoais */}
        <div className="config-usuario-section">
          <div className="config-usuario-section-title">
            <FaUser /> Dados Pessoais
          </div>
          <div className="config-usuario-section-content">
            
            <div className="config-form-group">
              <label>Nome Completo *</label>
              <input 
                type="text" 
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                disabled={!editar}
                placeholder="Digite seu nome"
              />
            </div>

            <div className="config-form-row">
              <div className="config-form-group">
                <label>Data de Nascimento *</label>
                <input 
                  type="date" 
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                  disabled={!editar}
                />
              </div>
              <div className="config-form-group">
                <label>Sexo *</label>
                <select 
                  name="sexo"
                  value={formData.sexo}
                  onChange={handleChange}
                  disabled={!editar}
                >
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div className="config-form-group">
                <label>Tipo Sanguíneo</label>
                <select 
                  name="sangue"
                  value={formData.sangue}
                  onChange={handleChange}
                  disabled={!editar}
                >
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>

            <div className="config-form-group">
              <label>CPF *</label>
              <input 
                type="text" 
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                disabled
                placeholder="CPF"
                className="config-input-disabled"
              />
            </div>

          </div>
        </div>

        {/* Contato */}
        <div className="config-usuario-section">
          <div className="config-usuario-section-title">
            <FaEnvelope /> Contato
          </div>
          <div className="config-usuario-section-content">
            
            <div className="config-form-group">
              <label>Email *</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!editar}
                placeholder="seu@email.com"
              />
            </div>

            <div className="config-form-row">
              <div className="config-form-group">
                <label>Telefone *</label>
                <input 
                  type="tel" 
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  disabled={!editar}
                  placeholder="(85) 99999-8888"
                />
              </div>
              <div className="config-form-group">
                <label>Responsável</label>
                <input 
                  type="text" 
                  name="responsavel"
                  value={formData.responsavel}
                  onChange={handleChange}
                  disabled={!editar}
                  placeholder="Nome do responsável"
                />
              </div>
              <div className="config-form-group">
                <label>Telefone Responsável</label>
                <input 
                  type="tel" 
                  name="telefonResponsavel"
                  value={formData.telefonResponsavel}
                  onChange={handleChange}
                  disabled={!editar}
                  placeholder="(85) 98888-7777"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Endereço */}
        <div className="config-usuario-section">
          <div className="config-usuario-section-title">
            <FaMapMarkerAlt /> Endereço
          </div>
          <div className="config-usuario-section-content">
            
            <div className="config-form-group">
              <label>Endereço *</label>
              <input 
                type="text" 
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                disabled={!editar}
                placeholder="Rua, número, complemento"
              />
            </div>

            <div className="config-form-row">
              <div className="config-form-group">
                <label>CEP *</label>
                <input 
                  type="text" 
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  disabled={!editar}
                  placeholder="00000-000"
                />
              </div>
              <div className="config-form-group">
                <label>Cidade *</label>
                <input 
                  type="text" 
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  disabled={!editar}
                  placeholder="Fortaleza"
                />
              </div>
              <div className="config-form-group">
                <label>Estado *</label>
                <input 
                  type="text" 
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  disabled={!editar}
                  placeholder="CE"
                  maxLength="2"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Informações Médicas */}
        <div className="config-usuario-section">
          <div className="config-usuario-section-title">
            <FaHeart /> Informações Médicas
          </div>
          <div className="config-usuario-section-content">
            
            <div className="config-form-group">
              <label>Alergias Conhecidas</label>
              <textarea 
                name="alergias"
                value={formData.alergias}
                onChange={handleChange}
                disabled={!editar}
                placeholder="Liste suas alergias conhecidas"
                rows="3"
              />
            </div>

            <div className="config-form-group">
              <label>Medicamentos em Uso</label>
              <textarea 
                name="medicamentos"
                value={formData.medicamentos}
                onChange={handleChange}
                disabled={!editar}
                placeholder="Liste os medicamentos que está tomando"
                rows="3"
              />
            </div>

          </div>
        </div>

        {/* Ações */}
        {editar && (
          <div className="config-usuario-acoes">
            <button 
              className="config-usuario-btn-cancelar"
              onClick={() => setEditar(false)}
            >
              Cancelar
            </button>
            <button 
              className="config-usuario-btn-salvar"
              onClick={handleSalvar}
            >
              <FaSave /> Salvar Alterações
            </button>
          </div>
        )}

        {/* Voltar */}
        {!editar && (
          <div className="config-usuario-voltar">
            <button 
              className="config-usuario-btn-voltar"
              onClick={() => navigate('/perfil')}
            >
              ← Voltar
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
