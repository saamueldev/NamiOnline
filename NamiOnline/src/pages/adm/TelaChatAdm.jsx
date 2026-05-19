import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  FaPaperPlane,
  FaArrowLeft,
  FaCheck,
  FaCheckDouble,
  FaUserShield,
  FaUser,
  FaComments,
  FaCircle,
  FaSync,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import api from "../../services/api";

export default function TelaChatAdm() {

  const navigate = useNavigate();

  const mensagensRef = useRef(null);

  const [usuarios, setUsuarios] =
    useState([]);

  const [
    usuarioSelecionado,
    setUsuarioSelecionado,
  ] = useState("");

  const [mensagem, setMensagem] =
    useState("");

  const [mensagens, setMensagens] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [
    carregandoMensagens,
    setCarregandoMensagens,
  ] = useState(false);

  // =====================================
  // ADMIN
  // =====================================
  const admin =
    JSON.parse(
      localStorage.getItem("nami_user")
    ) || {};

  // =====================================
  // SCROLL
  // =====================================
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

  // =====================================
  // CARREGAR USERS
  // =====================================
  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios =
    async () => {
      try {

        const { data } =
          await api.get("/usuarios");

        const filtrados =
          (data || []).filter(
            (u) => u._id !== admin.id
          );

        setUsuarios(filtrados);

        if (
          filtrados.length > 0 &&
          !usuarioSelecionado
        ) {
          setUsuarioSelecionado(
            filtrados[0]._id
          );
        }

      } catch (error) {

        console.error(
          "Erro usuários:",
          error.response?.data ||
            error.message
        );
      }
    };

  // =====================================
  // BUSCAR MSG
  // =====================================
  useEffect(() => {

    if (usuarioSelecionado) {
      carregarMensagens(true);
    }

  }, [usuarioSelecionado]);

  // =====================================
  // AUTO UPDATE
  // =====================================
  useEffect(() => {

    const interval = setInterval(() => {

      if (usuarioSelecionado) {
        carregarMensagens(false);
      }

    }, 2000);

    return () =>
      clearInterval(interval);

  }, [usuarioSelecionado]);

  // =====================================
  // CARREGAR CHAT
  // =====================================
  const carregarMensagens =
    async (scroll = false) => {

      try {

        setCarregandoMensagens(
          true
        );

        const { data } =
          await api.get(
            `/chat/conversa/${usuarioSelecionado}`
          );

        setMensagens(data || []);

        if (scroll) {
          scrollFinal();
        }

      } catch (error) {

        console.error(
          "Erro mensagens:",
          error.response?.data ||
            error.message
        );

      } finally {

        setCarregandoMensagens(
          false
        );
      }
    };

  // =====================================
  // ENVIAR MSG
  // =====================================
  const enviarMensagem =
    async () => {

      if (!mensagem.trim())
        return;

      try {

        setLoading(true);

        const usuarioDestino =
          usuarios.find(
            (u) =>
              u._id ===
              usuarioSelecionado
          );

        if (!usuarioDestino) {
          alert(
            "Usuário não encontrado"
          );
          return;
        }

        // =====================================
        // OBJETO
        // =====================================
        const novaMensagem = {
          texto: mensagem,

          remetente:
            admin.nome ||
            "Administrador",

          remetenteId: admin.id,

          destinatarioId:
            usuarioDestino._id,

          destinatarioNome:
            usuarioDestino.nome,

          role: "admin",
        };

        // =====================================
        // TEMP
        // =====================================
        const tempId =
          Date.now();

        const msgTemp = {
          ...novaMensagem,

          _id: tempId,

          createdAt:
            new Date(),

          visualizada: false,
        };

        setMensagens((prev) => [
          ...prev,
          msgTemp,
        ]);

        setMensagem("");

        scrollFinal();

        // =====================================
        // ENVIA CHAT
        // =====================================
        const response =
          await api.post(
            "/chat",
            novaMensagem
          );

        const mensagemReal =
          response.data;

        setMensagens((prev) =>
          prev.map((msg) =>
            msg._id === tempId
              ? mensagemReal
              : msg
          )
        );

        // =====================================
        // NOTIFICAÇÃO
        // =====================================
        await api.post(
          "/notificacoes",
          {
            usuarioId:
              usuarioDestino._id,

            titulo:
              "Nova mensagem do administrador",

            mensagem: `${admin.nome} enviou uma mensagem para você.`,

            tipo: "chat",

            rota: "/chat",

            lida: false,
          }
        );

        carregarMensagens(false);

      } catch (error) {

        console.error(
          "Erro enviar:",
          error.response?.data ||
            error.message
        );

        setMensagens((prev) =>
          prev.filter(
            (msg) =>
              typeof msg._id !==
              "number"
          )
        );

        alert(
          "Erro ao enviar mensagem"
        );

      } finally {

        setLoading(false);
      }
    };

  // =====================================
  // ENTER
  // =====================================
  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      enviarMensagem();
    }
  };

  // =====================================
  // USER ATUAL
  // =====================================
  const usuarioAtual =
    usuarios.find(
      (u) =>
        u._id ===
        usuarioSelecionado
    );

  return (
    <div className="flex h-screen bg-[#0F172A] text-white">

      {/* SIDEBAR */}
      <div className="w-[340px] border-r border-slate-700 bg-[#111827]">

        <div className="flex items-center gap-3 border-b border-slate-700 px-5 py-5">

          <button
            onClick={() =>
              navigate(-1)
            }
            className="rounded-full bg-white/10 p-3 hover:bg-white/20"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="text-xl font-bold">
              Painel Admin
            </h1>

            <p className="text-sm text-slate-400">
              Atendimento em tempo real
            </p>
          </div>

        </div>

        <div className="h-[calc(100vh-90px)] overflow-y-auto">

          {usuarios.map((user) => (

            <button
              key={user._id}
              onClick={() =>
                setUsuarioSelecionado(
                  user._id
                )
              }
              className={`flex w-full items-center gap-4 border-b border-slate-800 px-5 py-4 text-left transition ${
                usuarioSelecionado ===
                user._id
                  ? "bg-[#132190]"
                  : "hover:bg-slate-800"
              }`}
            >

              <div className="relative">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#004AF7] to-[#132190] text-lg font-bold">
                  {user.nome?.charAt(0)}
                </div>

                <FaCircle className="absolute bottom-0 right-0 text-[10px] text-green-400" />

              </div>

              <div className="flex-1 overflow-hidden">

                <h2 className="truncate font-semibold">
                  {user.nome}
                </h2>

                <p className="truncate text-sm text-slate-400">
                  {user.email}
                </p>

              </div>

            </button>

          ))}

        </div>

      </div>

      {/* CHAT */}
      <div className="flex flex-1 flex-col">

        {/* TOP */}
        <div className="flex items-center justify-between border-b border-slate-700 bg-[#132190] px-6 py-5">

          <div className="flex items-center gap-4">

            <div className="rounded-full bg-white/10 p-3">
              <FaComments />
            </div>

            <div>

              <h1 className="text-2xl font-bold">
                {usuarioAtual?.nome ||
                  "Chat Administrativo"}
              </h1>

              <p className="text-sm text-slate-200">
                {usuarioAtual?.email}
              </p>

            </div>

          </div>

          <button
            onClick={() =>
              carregarMensagens(
                true
              )
            }
            className="rounded-xl bg-white/10 p-3 hover:bg-white/20"
          >
            <FaSync />
          </button>

        </div>

        {/* MENSAGENS */}
        <div
          ref={mensagensRef}
          className="flex-1 overflow-y-auto px-6 py-6 space-y-5"
        >

          {carregandoMensagens &&
            mensagens.length === 0 && (
              <div className="text-center text-slate-400">
                Carregando...
              </div>
            )}

          {mensagens.map((msg) => {

            const minhaMensagem =
              msg.remetenteId ===
              admin.id;

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

                  <p className="break-words leading-relaxed text-slate-100">
                    {msg.texto}
                  </p>

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
                          <FaCheck />
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
              className="flex-1 rounded-2xl border border-slate-600 bg-[#1E293B] px-5 py-4 outline-none focus:border-[#004AF7]"
            />

            <button
              onClick={
                enviarMensagem
              }
              disabled={loading}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-[#004AF7] to-[#132190] text-xl hover:scale-105 disabled:opacity-50"
            >
              <FaPaperPlane />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}