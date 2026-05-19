import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  FaPaperPlane,
  FaCheck,
  FaCheckDouble,
  FaUserShield,
  FaUser,
} from "react-icons/fa";

import api from "../../services/api";

export default function TelaChat() {

  const [mensagem, setMensagem] =
    useState("");

  const [mensagens, setMensagens] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const mensagensRef =
    useRef(null);

  // ====================================
  // USUÁRIO LOGADO
  // ====================================
  const usuario =
    JSON.parse(
      localStorage.getItem(
        "nami_user"
      )
    ) || {};

  // ====================================
  // CARREGAR MENSAGENS
  // ====================================
  useEffect(() => {

    if (usuario?.id) {

      carregarMensagens();

    }

    const interval =
      setInterval(() => {

        if (usuario?.id) {

          carregarMensagens();

        }

      }, 2000);

    return () =>
      clearInterval(interval);

  }, [usuario?.id]);

  // ====================================
  // SCROLL
  // ====================================
  const scrollFinal = () => {

    setTimeout(() => {

      mensagensRef.current?.scrollTo({
        top:
          mensagensRef.current
            .scrollHeight,

        behavior: "smooth",
      });

    }, 100);
  };

  // ====================================
  // BUSCAR CHAT
  // ====================================
  const carregarMensagens =
    async () => {

      try {

        const { data } =
          await api.get(
            `/chat/conversa/${usuario.id}`
          );

        setMensagens(data || []);

        scrollFinal();

      } catch (error) {

        console.error(
          "Erro ao carregar mensagens:",
          error.response?.data ||
            error.message
        );

      }
    };

  // ====================================
  // ENVIAR MENSAGEM
  // ====================================
  const enviarMensagem =
    async () => {

      if (!mensagem.trim())
        return;

      try {

        setLoading(true);

        const novaMensagem = {
          texto: mensagem,

          remetente:
            usuario.nome,

          remetenteId:
            usuario.id,

          destinatarioId: "1",

          destinatarioNome:
            "Administrador",

          role: "usuario",
        };

        await api.post(
          "/chat",
          novaMensagem
        );

        setMensagem("");

        carregarMensagens();

      } catch (error) {

        console.error(
          "Erro ao enviar:",
          error.response?.data ||
            error.message
        );

      } finally {

        setLoading(false);

      }
    };

  // ====================================
  // ENTER
  // ====================================
  const handleKeyDown = (e) => {

    if (e.key === "Enter") {

      enviarMensagem();

    }
  };

  return (
    <div className="flex h-screen flex-col bg-[#0F172A] text-white">

      {/* HEADER */}
      <div className="border-b border-slate-700 bg-[#132190] px-6 py-5">

        <h1 className="text-2xl font-bold">
          Atendimento
        </h1>

        <p className="text-sm text-slate-200">
          Converse com o administrador
        </p>

      </div>

      {/* MENSAGENS */}
      <div
        ref={mensagensRef}
        className="flex-1 space-y-5 overflow-y-auto px-6 py-6"
      >

        {mensagens.map((msg) => {

          const minhaMensagem =
            msg.remetenteId ===
            usuario.id;

          return (

            <div
              key={msg._id}
              className={`flex ${
                minhaMensagem
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-[75%] rounded-3xl px-5 py-4 shadow-xl ${
                  minhaMensagem
                    ? "bg-gradient-to-r from-[#004AF7] to-[#132190]"
                    : "bg-[#1E293B]"
                }`}
              >

                {/* HEADER */}
                <div className="mb-2 flex items-center gap-2">

                  {msg.role ===
                  "admin" ? (
                    <FaUserShield className="text-cyan-300" />
                  ) : (
                    <FaUser className="text-slate-300" />
                  )}

                  <span className="text-sm font-semibold">
                    {msg.remetente}
                  </span>

                </div>

                {/* TEXTO */}
                <p className="break-words leading-relaxed text-slate-100">
                  {msg.texto}
                </p>

                {/* FOOTER */}
                <div className="mt-3 flex items-center justify-end gap-2 text-xs text-slate-300">

                  <span>
                    {new Date(
                      msg.createdAt
                    ).toLocaleTimeString(
                      "pt-BR",
                      {
                        hour:
                          "2-digit",

                        minute:
                          "2-digit",
                      }
                    )}
                  </span>

                  {minhaMensagem && (
                    <>
                      {msg.visualizada ? (
                        <FaCheckDouble className="text-cyan-300" />
                      ) : (
                        <FaCheck className="text-slate-300" />
                      )}
                    </>
                  )}

                </div>

              </div>

            </div>

          );
        })}

      </div>

      {/* INPUT */}
      <div className="border-t border-slate-700 bg-[#111827] p-5">

        <div className="flex items-center gap-4">

          <input
            type="text"
            value={mensagem}
            onChange={(e) =>
              setMensagem(
                e.target.value
              )
            }
            onKeyDown={
              handleKeyDown
            }
            placeholder="Digite sua mensagem..."
            className="flex-1 rounded-2xl border border-slate-600 bg-[#1E293B] px-5 py-4 text-white outline-none transition focus:border-[#004AF7]"
          />

          <button
            onClick={
              enviarMensagem
            }
            disabled={loading}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-[#004AF7] to-[#132190] text-xl transition hover:scale-105 disabled:opacity-50"
          >
            <FaPaperPlane />
          </button>

        </div>

      </div>

    </div>
  );
}