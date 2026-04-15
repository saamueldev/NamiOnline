import './user/style_tela_inicial.css'
import { Link } from "react-router-dom"
import { FaUserCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useState, useEffect } from "react"
import noticia1 from "../assets/nami-clinica.jpg"
import noticia2 from "../assets/nami-predio.jpg"
import noticia3 from "../assets/vacinacao-nami.jpg"

export default function TelaInicial() {

    const noticias = [
        {
            titulo: "Exames Nami Unifor",
            imagem: noticia1,
            link: "/noticia1"
        },
        {
            titulo: "Hospital amplia horário de consultas",
            imagem: noticia2,
            link: "/noticia2"
        },
        {
            titulo: "Campanha de Vacinação Nami Unifor",
            imagem: noticia3,
            link: "/noticia3"
        }
    ]

    const [index, setIndex] = useState(0)

    function proxima() {
        setIndex((prev) => (prev + 1) % noticias.length)
    }

    function anterior() {
        setIndex((prev) => (prev - 1 + noticias.length) % noticias.length)
    }

    useEffect(() => {
        const intervalo = setInterval(proxima, 10000)
        return () => clearInterval(intervalo)
    }, [])

    return (
        <div className="container-home">

            <header className="header">
                <h1 className="logo">Nami Online</h1>

                <nav className="navbar">
                    <Link to="/consultas">Consultas</Link>
                    <Link to="/exames">Exames</Link>
                    <Link to="/agendamentos">Agendamentos</Link>
                    <Link to="/retornos">Retornos</Link>
                    <Link to="/perfil" className="avatar"><FaUserCircle /></Link>
                </nav>
            </header>
            <main className="main-content">
                <div className="news-box">

                    <button className="seta esquerda" onClick={anterior}><FaChevronLeft /></button>
                    <Link to={noticias[index].link} className="news-slide"><img src={noticias[index].imagem} alt={noticias[index].titulo} />
                        <div className="news-title">
                            {noticias[index].titulo}
                        </div>
                    </Link>
                    <button className="seta direita" onClick={proxima}><FaChevronRight /></button>
                </div>
            </main>
        </div>
    )
}