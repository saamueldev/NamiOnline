import React from "react";
import { FaFileUpload, FaIdCard, FaFileMedical } from "react-icons/fa";
import { Link } from "react-router-dom";

const AnexarGuiaConsulta = () => {
  return (
    /* Background padronizado como branco sólido */
    <div className="min-h-screen flex items-center justify-center p-6 md:p-4 bg-white">
      <div className="w-full max-w-[760px]">
        {/* Cabeçalho */}
        <div className="text-center mb-5">
          <span className="inline-block bg-[#004AF7]/10 text-[#004AF7] px-3.5 py-1.5 rounded-full text-[13px] font-bold mb-3 uppercase tracking-wide">
            Envio de documentos
          </span>
          <h1 className="text-[26px] md:text-[32px] text-[#132190] font-bold mb-2.5 leading-tight">
            Anexar guia médica
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-[#4b5d7a] max-w-[560px] mx-auto">
            Esta especialidade requer guia médica. Envie a guia e um documento
            de identidade com foto, frente e verso.
          </p>
        </div>

        {/* Card Principal - Ajustado para se destacar no fundo branco */}
        <div className="bg-white border border-[#d1e4ff] rounded-[22px] p-5 md:p-7 shadow-[0_15px_40px_rgba(19,33,144,0.08)] flex flex-col items-center text-center">
          {/* Ícone com Gradiente */}
          <div className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-[20px] bg-gradient-to-br from-[#004AF7] to-[#87B7FE] flex items-center justify-center text-white text-2xl md:text-[28px] mb-4 shadow-[0_10px_20px_rgba(0,74,247,0.18)]">
            <FaFileUpload />
          </div>

          <h2 className="text-lg md:text-[22px] text-[#132190] font-bold mb-2.5">
            Envie seus arquivos
          </h2>

          <p className="text-[13px] md:text-[15px] leading-relaxed text-[#4b5d7a] mb-6 max-w-[500px]">
            Anexe aqui sua guia médica e um documento de identidade.
            <br />
            Formatos aceitos: <span className="font-semibold text-[#132190]">PDF, PNG ou JPEG</span>.
          </p>

          {/* Grid de Itens Informativos */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-3.5 mb-6">
            <div className="bg-[#f0f7ff] border border-[#87B7FE]/30 rounded-[16px] p-3 md:p-3.5 flex items-center justify-center gap-2.5 text-[#132190] font-semibold min-h-[54px] md:min-h-[58px] text-[13px] md:text-[15px]">
              <FaFileMedical className="text-[#004AF7] text-base" />
              <span>Guia médica</span>
            </div>

            <div className="bg-[#f0f7ff] border border-[#87B7FE]/30 rounded-[16px] p-3 md:p-3.5 flex items-center justify-center gap-2.5 text-[#132190] font-semibold min-h-[54px] md:min-h-[58px] text-[13px] md:text-[15px]">
              <FaIdCard className="text-[#004AF7] text-base" />
              <span>Identidade frente e verso</span>
            </div>
          </div>

          {/* Botão de Envio */}
          <button 
            className="w-full max-w-[260px] border-none bg-gradient-to-br from-[#004AF7] to-[#132190] text-white text-[14px] md:text-[15px] font-bold py-3.5 px-6 rounded-[14px] cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_24px_rgba(19,33,144,0.22)] shadow-[0_10px_22px_rgba(19,33,144,0.18)] active:scale-95" 
            type="button"
          >
            Selecionar arquivos
          </button>
        </div>

        {/* Ações Inferiores */}
        <div className="mt-8 flex justify-center">
          <Link 
            to="/home" 
            className="text-[#4b5d7a] font-semibold hover:text-[#132190] transition-colors flex items-center gap-2 text-sm md:text-base"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnexarGuiaConsulta;