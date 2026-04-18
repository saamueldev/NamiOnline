import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaBell, FaLock, FaEye, FaGlobe, FaQuestionCircle, FaSignOutAlt, FaCamera, FaCalendarAlt, FaCog, FaClipboardList } from 'react-icons/fa'
import { AuthContext } from '../context/AuthContext'
import './user/style_tela_perfil.css'

export default function TelaPerfil() {
  const navigate = useNavigate()
  const { user, logout, isAdmin } = useContext(AuthContext)
  const [avatar, setAvatar] = useState(user?.avatar || '👤')
  const [notificacoes, setNotificacoes] = useState(true)
  const [emailNotif, setEmailNotif] = useState(true)
  const [tema, setTema] = useState('claro')
  const [idioma, setIdioma] = useState('pt-BR')

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        console.log('Imagem selecionada:', file.name)
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleNotificacao = () => {
    setNotificacoes(!notificacoes)
  }

  const toggleEmailNotif = () => {
    setEmailNotif(!emailNotif)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="perfil-container">
      <div className="perfil-wrapper">
        
        {/* Header */}
        <div className="perfil-header">
          <button className="perfil-back-btn" onClick={() => navigate('/telainicial')}>
            <FaArrowLeft />
          </button>
          <h1 className="perfil-title">Meu Perfil</h1>
        </div>

        {/* Avatar Section */}
        <div className="perfil-avatar-section">
          <div className="perfil-avatar-wrapper">
            <div className="perfil-avatar">{avatar}</div>
            <label className="perfil-avatar-upload" title="Alterar foto de perfil">
              <FaCamera />
              <input 
                type="file" 
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </label>
          </div>

          <div className="perfil-user-info">
            <h2>{user?.nome || 'Usuário Nami'}</h2>
            <p className="perfil-user-email">{user?.email || 'usuario@nami.com.br'}</p>
            <div className="perfil-user-status">
              {isAdmin() ? '👨‍💼 Administrador' : '✓ Conta Verificada'}
            </div>
          </div>
        </div>

        {/* Seções de Configurações */}
        <div className="perfil-sections">

          {/* Notificações */}
          <div className="perfil-section">
            <div className="perfil-section-title">
              <FaBell /> Notificações
            </div>
            <div className="perfil-section-content">
              
              <div className="perfil-option">
                <div className="perfil-option-info">
                  <div className="perfil-option-icon">🔔</div>
                  <div className="perfil-option-text">
                    <h3>Notificações do App</h3>
                    <p>Receba avisos de consultas e retornos</p>
                  </div>
                </div>
                <div className="perfil-option-control">
                  <button 
                    className={`toggle-switch ${notificacoes ? 'active' : ''}`}
                    onClick={toggleNotificacao}
                  />
                </div>
              </div>

              <div className="perfil-option">
                <div className="perfil-option-info">
                  <div className="perfil-option-icon">✉️</div>
                  <div className="perfil-option-text">
                    <h3>Notificações por Email</h3>
                    <p>Receberá atualizações importantes</p>
                  </div>
                </div>
                <div className="perfil-option-control">
                  <button 
                    className={`toggle-switch ${emailNotif ? 'active' : ''}`}
                    onClick={toggleEmailNotif}
                  />
                </div>
              </div>

              <div className="perfil-option">
                <div className="perfil-option-info">
                  <div className="perfil-option-icon">📅</div>
                  <div className="perfil-option-text">
                    <h3>Lembretes de Agendamentos</h3>
                    <p>24h antes de sua consulta</p>
                  </div>
                </div>
                <div className="perfil-option-control">
                  <button className="toggle-switch active" />
                </div>
              </div>
            </div>
          </div>

          {/* Preferências */}
          <div className="perfil-section">
            <div className="perfil-section-title">
              <FaEye /> Preferências
            </div>
            <div className="perfil-section-content">

              <div className="perfil-option">
                <div className="perfil-option-info">
                  <div className="perfil-option-icon">🎨</div>
                  <div className="perfil-option-text">
                    <h3>Tema</h3>
                    <p>Altere a aparência do app</p>
                  </div>
                </div>
                <div className="perfil-option-control">
                  <select 
                    className="perfil-select" 
                    value={tema}
                    onChange={(e) => setTema(e.target.value)}
                  >
                    <option value="claro">Claro</option>
                    <option value="escuro">Escuro</option>
                    <option value="auto">Automático</option>
                  </select>
                </div>
              </div>

              <div className="perfil-option">
                <div className="perfil-option-info">
                  <div className="perfil-option-icon">
                    <FaGlobe />
                  </div>
                  <div className="perfil-option-text">
                    <h3>Idioma</h3>
                    <p>Idioma de preferência</p>
                  </div>
                </div>
                <div className="perfil-option-control">
                  <select 
                    className="perfil-select"
                    value={idioma}
                    onChange={(e) => setIdioma(e.target.value)}
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English</option>
                    <option value="es-ES">Español</option>
                  </select>
                </div>
              </div>

              <div className="perfil-option">
                <div className="perfil-option-info">
                  <div className="perfil-option-icon">📱</div>
                  <div className="perfil-option-text">
                    <h3>Sincronizar Dados</h3>
                    <p>Sincronize entre seus dispositivos</p>
                  </div>
                </div>
                <div className="perfil-option-control">
                  <button className="toggle-switch active" />
                </div>
              </div>
            </div>
          </div>

          {/* Segurança */}
          <div className="perfil-section">
            <div className="perfil-section-title">
              <FaLock /> Segurança
            </div>
            <div className="perfil-section-content">

              <div className="perfil-option">
                <div className="perfil-option-info">
                  <div className="perfil-option-icon">🔐</div>
                  <div className="perfil-option-text">
                    <h3>Alterar Senha</h3>
                    <p>Atualize sua senha regularmente</p>
                  </div>
                </div>
                <div className="perfil-option-control">
                  <button className="perfil-btn perfil-btn-secondary" style={{width: '120px'}}>
                    Alterar
                  </button>
                </div>
              </div>

              <div className="perfil-option">
                <div className="perfil-option-info">
                  <div className="perfil-option-icon">✔️</div>
                  <div className="perfil-option-text">
                    <h3>Autenticação em Dois Passos</h3>
                    <p>Maior segurança para sua conta</p>
                  </div>
                </div>
                <div className="perfil-option-control">
                  <button className="toggle-switch" />
                </div>
              </div>

              <div className="perfil-option">
                <div className="perfil-option-info">
                  <div className="perfil-option-icon">👁️</div>
                  <div className="perfil-option-text">
                    <h3>Dispositivos Conectados</h3>
                    <p>Gerencie seus acessos</p>
                  </div>
                </div>
                <div className="perfil-option-control">
                  <button className="perfil-btn perfil-btn-secondary" style={{width: '120px'}}>
                    Gerenciar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Gerenciamento */}
          <div className="perfil-section">
            <div className="perfil-section-title">
              <FaCog /> Gerenciamento
            </div>
            <div className="perfil-section-content">

              <div className="perfil-option">
                <div className="perfil-option-info">
                  <div className="perfil-option-icon">📅</div>
                  <div className="perfil-option-text">
                    <h3>Meus Agendamentos</h3>
                    <p>Visualize e gerencie suas consultas</p>
                  </div>
                </div>
                <div className="perfil-option-control">
                  <button 
                    className="perfil-btn perfil-btn-secondary"
                    onClick={() => navigate('/agendamentos')}
                    style={{width: '120px'}}
                  >
                    Acessar
                  </button>
                </div>
              </div>

              <div className="perfil-option">
                <div className="perfil-option-info">
                  <div className="perfil-option-icon">⚙️</div>
                  <div className="perfil-option-text">
                    <h3>Configurações de Usuário</h3>
                    <p>Edite seus dados pessoais</p>
                  </div>
                </div>
                <div className="perfil-option-control">
                  <button 
                    className="perfil-btn perfil-btn-secondary"
                    onClick={() => navigate('/configuracao-usuario')}
                    style={{width: '120px'}}
                  >
                    Acessar
                  </button>
                </div>
              </div>

              {isAdmin() && (
                <div className="perfil-option">
                  <div className="perfil-option-info">
                    <div className="perfil-option-icon">📬</div>
                    <div className="perfil-option-text">
                      <h3>Notificações Admin</h3>
                      <p>Gerencie notificações do sistema</p>
                    </div>
                  </div>
                  <div className="perfil-option-control">
                    <button 
                      className="perfil-btn perfil-btn-secondary"
                      onClick={() => navigate('/notificacoes-admin')}
                      style={{width: '120px'}}
                    >
                      Acessar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Ajuda */}
          <div className="perfil-section">
            <div className="perfil-section-title">
              <FaQuestionCircle /> Ajuda
            </div>
            <div className="perfil-section-content">

              <div className="perfil-option">
                <div className="perfil-option-info">
                  <div className="perfil-option-icon">📖</div>
                  <div className="perfil-option-text">
                    <h3>Centro de Ajuda</h3>
                    <p>Dúvidas frequentes e suporte</p>
                  </div>
                </div>
                <div className="perfil-option-control">
                  <span style={{fontSize: '16px'}}>→</span>
                </div>
              </div>

              <div className="perfil-option">
                <div className="perfil-option-info">
                  <div className="perfil-option-icon">📞</div>
                  <div className="perfil-option-text">
                    <h3>Contato com Suporte</h3>
                    <p>Fale com nosso time (11) 4000-1234</p>
                  </div>
                </div>
                <div className="perfil-option-control">
                  <span style={{fontSize: '16px'}}>→</span>
                </div>
              </div>

              <div className="perfil-option">
                <div className="perfil-option-info">
                  <div className="perfil-option-icon">ℹ️</div>
                  <div className="perfil-option-text">
                    <h3>Sobre o App</h3>
                    <p>Versão 1.0.0</p>
                  </div>
                </div>
                <div className="perfil-option-control">
                  <span style={{fontSize: '16px'}}>→</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="perfil-section">
            <div className="perfil-section-content">
              <div className="perfil-actions">
                <button 
                  className="perfil-btn perfil-btn-secondary"
                  onClick={() => navigate('/telainicial')}
                >
                  ← Voltar
                </button>
                <button 
                  className="perfil-btn perfil-btn-secondary"
                >
                  💾 Salvar
                </button>
                <button 
                  className="perfil-btn perfil-btn-danger"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt /> Sair da Conta
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="perfil-footer">
          <p>© 2026 Nami Online - Todos os direitos reservados</p>
        </div>

      </div>
    </div>
  )
}