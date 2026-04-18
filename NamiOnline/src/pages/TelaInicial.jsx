import './user/style_tela_inicial.css'
import { Link } from "react-router-dom"
import { FaUserCircle, FaChevronLeft, FaChevronRight, FaCalendarCheck, FaFileMedical, FaHistory, FaNotesMedical } from "react-icons/fa"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

import noticia1 from "../assets/nami-clinica.jpg"
import noticia2 from "../assets/nami-predio.jpg"
import noticia3 from "../assets/vacinacao-nami.jpg"
import logounifor from "../assets/LOGO.png"

export default function TelaInicial() {

    const { isAdmin } = useContext(AuthContext)

    const noticias = [
        {
            titulo: "Exames NAMI Unifor",
            imagem: noticia1,
            link: "/noticia1"
        },
        {
            titulo: "Hospital amplia horário de consultas",
            imagem: noticia2,
            link: "/noticia2"
        },
        {
            titulo: "Campanha de vacinação",
            imagem: noticia3,
            link: "/noticia3"
        }
    ]

    const [index, setIndex] = useState(0)

    function next() {
        setIndex((prev) => (prev + 1) % noticias.length)
    }

    function prev() {
        setIndex((prev) => (prev - 1 + noticias.length) % noticias.length)
    }

    useEffect(() => {
        const interval = setInterval(next, 8000)
        return () => clearInterval(interval)
    }, [])

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

            <main className="main">
                <section className="carousel">
                    <button className="arrow" onClick={prev}>
                        <FaChevronLeft />
                    </button>
                    <Link to={noticias[index].link} className="slide">
                        <img src={noticias[index].imagem} alt="" />
                        <div className="overlay">
                            <h3>{noticias[index].titulo}</h3>
                        </div>
                    </Link>
                    <button className="arrow right" onClick={next}>
                        <FaChevronRight />
                    </button>
                </section>

                <section className="actions">
                    <h3 className="section-title">
                              <span>Acesso rápido</span>
                        </h3>
                    <div className="actions-grid">
                        <Link to="/especialidades" className="action-card">
                            <FaCalendarCheck />
                            <span>Agendar Consulta</span>
                        </Link>
                        <Link to="/anexarguia" className="action-card">
                            <FaFileMedical />
                            <span>Meus Exames</span>
                        </Link>
                        <Link to="/agendamentos" className="action-card">
                            <FaHistory />
                            <span>Agendamentos</span>
                        </Link>
                        <Link to="/retornos" className="action-card">
                            <FaNotesMedical />
                            <span>Retornos</span>
                        </Link>
                    </div>
                </section>

                <section className="dashboard">
                    <div className="widget">
                        <h3 className="section-title">
                            <span>Próxima consulta</span>
                        </h3>
                        <p><strong>Clínico Geral</strong></p>
                        <p>Dr. João Silva</p>
                        <p>15 Maio - 09:30</p>
                        <button className="btn">Ver detalhes</button>
                    </div>

                    <div className="widget">
                        <h3 className="section-title">
                            <span>Avisos do hospital</span>
                        </h3>
                        <ul>
                            <li>Campanha de vacinação disponível</li>
                            <li>Nova ala pediátrica inaugurada</li>
                            <li>Horário ampliado até 20h</li>
                        </ul>
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