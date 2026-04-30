import './style_tela_inicial_adm.css'
import { Link } from "react-router-dom"
import { FaUserCircle, FaChevronLeft, FaChevronRight, FaCalendarCheck, FaFileMedical, FaHistory, FaNotesMedical } from "react-icons/fa"
import { useState, useEffect, useContext } from "react"
import logounifor from "../../assets/LogoUnifor.png";
import { AuthContext } from "../../context/AuthContext"

export default function TelaInicialADM() {

    const { isAdmin } = useContext(AuthContext)
    return (

        <div className="home">
            <header className="header">

                <div className="logo-area">
                    <img
                        src={logounifor}
                        alt="Logo Hospital"
                        className="logo-img"
                    />
                </div>

                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="search-input"
                    />
                </div>

                <div className="header-actions">
                    <Link to="/notificacoes" className="notification-btn">
                        🔔
                    </Link>
                    <Link to="/perfil" className="avatar">
                        <FaUserCircle />
                    </Link>
                </div>
            </header>

            <main className="admin-main">

                <aside className="sidebar">

                    <h2 className="sidebar-title">Painel ADM</h2>

                    <nav className="sidebar-menu">

                        <Link to="/admin/dashboard" className="menu-item">
                            Dashboard
                        </Link>

                        <Link to="/admin/pacientes" className="menu-item">
                            Pacientes
                        </Link>

                        <Link to="/admin/medicos" className="menu-item">
                            Médicos
                        </Link>

                        <Link to="/admin/consultas" className="menu-item">
                            Consultas
                        </Link>

                        <Link to="/admin/cadastrarExames" className="menu-item">
                            Exames
                        </Link>

                        <Link to="/admin/noticias" className="menu-item">
                            Cadastrar Notícias
                        </Link>
                        <Link to="/admin/eventos" className="menu-item">
                            Cadastrar Eventos
                        </Link>

                        <Link to="/admin/configuracoes" className="menu-item">
                            Configurações
                        </Link>

                    </nav>

                </aside>

                <section className="admin-dashboard">

                    <h2 className="dashboard-title">Dashboard Administrativo</h2>

                    <div className="admin-cards">

                        <div className="admin-card">
                            <h3>Consultas Hoje</h3>
                            <p className="card-number">48</p>
                        </div>

                        <div className="admin-card">
                            <h3>Pacientes Atendidos</h3>
                            <p className="card-number">132</p>
                        </div>

                        <div className="admin-card">
                            <h3>Médicos Ativos</h3>
                            <p className="card-number">27</p>
                        </div>

                        <div className="admin-card">
                            <h3>Exames Pendentes</h3>
                            <p className="card-number">15</p>
                        </div>

                    </div>

                    <div className="admin-panels">

                        <div className="panel">
                            <h3>Consultas de Hoje</h3>

                            <ul className="consulta-list">
                                <li>09:00 - Maria Souza (Cardiologia)</li>
                                <li>10:30 - João Pereira (Clínico Geral)</li>
                                <li>11:15 - Ana Beatriz (Dermatologia)</li>
                                <li>14:00 - Pedro Henrique (Ortopedia)</li>
                            </ul>

                        </div>

                        <div className="panel">
                            <h3>Alertas do Sistema</h3>

                            <ul className="alert-list">
                                <li>⚠️ 3 exames aguardando laudo</li>
                                <li>⚠️ Sistema de vacinação atualizado</li>
                                <li>⚠️ 5 pacientes aguardando confirmação</li>
                            </ul>

                        </div>

                    </div>

                </section>

            </main>
            <footer className="footer">
                <div>
                    <h4>Suporte</h4>
                    <p>Email: suporte@nami.com</p>
                    <p>Telefone: (85) 99999-9999</p>
                </div>
                <div>
                    <h4>Hospital</h4>
                    <p>Av. Washington Soares</p>
                    <p>Fortaleza - CE</p>
                </div>
                <div>
                    <h4>Perguntas Frequentes</h4>
                    <p>Termos de privacidade</p>
                    <p>Parceiros</p>
                </div>
            </footer>
        </div>

    )

}