import React from "react";
import { FaFileUpload, FaIdCard, FaFileMedical } from "react-icons/fa";
import { Link } from "react-router-dom";

const AnexarGuiaConsulta = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E4F2FE] p-6 md:p-8 font-sans">
      <div className="w-full max-w-[760px]">

        {/* Cabeçalho */}
        <div className="text-center mb-6">
          <span className="inline-flex rounded-full border border-[#87B7FE]/30 bg-white px-4 py-1 text-sm font-medium text-[#004AF7]">
            Envio de documentos
          </span>

          <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-[#132190] tracking-tight">
            Anexar guia médica
          </h1>

          <p className="mt-3 text-sm md:text-lg leading-relaxed text-slate-600 max-w-[580px] mx-auto">
            Esta especialidade requer guia médica. Envie a guia e um documento
            de identidade com foto, frente e verso.
          </p>
        </div>

        {/* Card Principal */}
        <div className="rounded-3xl border border-[#87B7FE]/25 bg-white p-6 md:p-8 shadow-sm flex flex-col items-center text-center">

          {/* Ícone */}
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#E4F2FE] text-[#004AF7] shadow-sm">
            <FaFileUpload className="text-3xl" />
          </div>

          <h2 className="text-xl md:text-2xl text-[#132190] font-bold">
            Envie seus arquivos
          </h2>

          <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-600 max-w-[520px]">
            Anexe aqui sua guia médica e um documento de identidade.
            <br />
            Formatos aceitos:{" "}
            <span className="font-semibold text-[#132190]">
              PDF, PNG ou JPEG
            </span>.
          </p>

          {/* Itens Informativos */}
          <div className="mt-7 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex min-h-[64px] items-center justify-center gap-3 rounded-2xl border border-[#87B7FE]/25 bg-[#E4F2FE] px-4 py-3 text-sm md:text-base font-semibold text-[#132190]">
              <FaFileMedical className="text-[#004AF7] text-lg" />
              <span>Guia médica</span>
            </div>

            <div className="flex min-h-[64px] items-center justify-center gap-3 rounded-2xl border border-[#87B7FE]/25 bg-[#E4F2FE] px-4 py-3 text-sm md:text-base font-semibold text-[#132190]">
              <FaIdCard className="text-[#004AF7] text-lg" />
              <span>Identidade frente e verso</span>
            </div>
          </div>

          {/* Botão */}
          <button
            className="mt-8 w-full max-w-[280px] rounded-xl bg-[#004AF7] px-6 py-4 text-sm md:text-base font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#132190] active:scale-95"
            type="button"
          >
            Selecionar arquivos
          </button>
        </div>

        {/* Ações inferiores */}
        <div className="mt-8 flex justify-center">
          <Link
            to="/home"
            className="text-sm md:text-base font-semibold text-slate-600 transition-colors hover:text-[#132190]"
          >
            Voltar para o início
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AnexarGuiaConsulta;