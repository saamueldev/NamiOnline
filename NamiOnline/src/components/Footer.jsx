import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";



const Footer = () => {

    return (
        <footer className="bg-[#132190] text-white flex justify-around p-[30px]">
            <div>
                <h4>Suporte</h4>
                <p>Email: nami@unifor.br</p>
                <p>Telefone: (85) 99200-7069</p>
            </div>

            <div>
                <h4>Hospital</h4>
                <p>R. Maramaldo Campelo, nº 50 - Edson Queiroz</p>
                <p>Fortaleza - CE</p>
            </div>

            <div>
                <h4>Quem somos</h4>
                <p>Central de Ajuda</p>
                <p>Termos de Privacidade</p>
            </div>
        </footer>
    );
};

export default Footer