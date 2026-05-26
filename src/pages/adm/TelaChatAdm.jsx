import { useEffect, useRef, useState } from "react";
import {
  FaPaperPlane,
  FaArrowLeft,
  FaCheck,
  FaCheckDouble,
  FaUserShield,
  FaUser,
  FaComments,
  FaSync,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function TelaChatAdm() {
  const navigate = useNavigate();
  const mensagensRef = useRef(null);

  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [carregandoMensagens, setCarregandoMensagens] = useState(false);

  // 🔥 FIX ROBUSTO LOCALSTORAGE
  const storedUser = JSON.parse(localStorage.getItem("nami_user"));

  const adminId =
    storedUser?._id ||
    storedUser?.id ||
    storedUser?.user?._id ||
    storedUser?.user?.id;

  const adminNome =
    storedUser?.nome ||
    storedUser?.user?.nome ||
    "Administrador";

  // ❗ BLOQUEIO SE NÃO TIVER LOGIN
  if (!adminId) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0F172A] text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Sessão expirada</h1>
          <p className="mt-2 text-slate-400">
            Faça login novamente para continuar
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="mt-4 rounded-xl bg-blue-600 px-5 py-3"
          >
            Ir para login
          </button>
        </div>
      </div>
    );
  }

  const scrollFinal = () => {
    setTimeout(() => {
      mensagensRef.current?.scrollTo({
        top: mensagensRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const { data } = await api.get("/usuarios");

        const filtrados = (data || []).filter(
          (u) => (u._id || u.id) !== adminId
        );

        setUsuarios(filtrados);

        if (filtrados.length > 0 && !usuarioSelecionado) {
          setUsuarioSelecionado(filtrados[0]._id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    carregarUsuarios();
  }, [adminId]);

  const carregarMensagens = async (scroll = false) => {
    if (!usuarioSelecionado) return;

    try {
      setCarregandoMensagens(true);

      const { data } = await api.get(
        `/chat/conversa/${usuarioSelecionado}`
      );

      setMensagens(data || []);
      if (scroll) scrollFinal();
    } catch (error) {
      console.error(error);
    } finally {
      setCarregandoMensagens(false);
    }
  };

  useEffect(() => {
    if (usuarioSelecionado) carregarMensagens(true);
  }, [usuarioSelecionado]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (usuarioSelecionado) carregarMensagens(false);
    }, 2000);

    return () => clearInterval(interval);
  }, [usuarioSelecionado]);

  const enviarMensagem = async () => {
    if (!mensagem.trim()) return;

    const usuarioDestino = usuarios.find(
      (u) => (u._id || u.id) === usuarioSelecionado
    );

    if (!usuarioDestino) return alert("Usuário não encontrado");

    try {
      setLoading(true);

      const novaMensagem = {
        texto: mensagem,
        remetente: adminNome,
        remetenteId: adminId,
        destinatarioId: usuarioDestino._id,
        destinatarioNome: usuarioDestino.nome,
        role: "admin",
      };

      const tempId = Date.now();

      setMensagens((prev) => [
        ...prev,
        { ...novaMensagem, _id: tempId, createdAt: new Date() },
      ]);

      setMensagem("");
      scrollFinal();

      const { data } = await api.post("/chat", novaMensagem);

      setMensagens((prev) =>
        prev.map((m) => (m._id === tempId ? data : m))
      );

      await api.post("/notificacoes", {
        usuarioId: usuarioDestino._id,
        titulo: "Nova mensagem do administrador",
        mensagem: `${adminNome} enviou uma mensagem para você.`,
        tipo: "chat",
        rota: "/chat",
        lida: false,
      });

      carregarMensagens(false);
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar mensagem");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") enviarMensagem();
  };

  const usuarioAtual = usuarios.find(
    (u) => (u._id || u.id) === usuarioSelecionado
  );

  return (
    <div className="flex h-screen bg-[#0F172A] text-white">

      {/* SIDEBAR */}
      <div className="w-[340px] border-r border-slate-700 bg-[#111827]">
        <div className="flex items-center gap-3 border-b border-slate-700 px-5 py-5">
          <button onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="text-xl font-bold">Painel Admin</h1>
            <p className="text-sm text-slate-400">
              Atendimento em tempo real
            </p>
          </div>
        </div>

        <div className="h-[calc(100vh-90px)] overflow-y-auto">
          {usuarios.map((user) => (
            <button
              key={user._id}
              onClick={() => setUsuarioSelecionado(user._id)}
              className={`flex w-full items-center gap-4 px-5 py-4 ${
                usuarioSelecionado === user._id
                  ? "bg-[#132190]"
                  : "hover:bg-slate-800"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                {user.nome?.charAt(0)}
              </div>

              <div>
                <h2>{user.nome}</h2>
                <p className="text-sm text-slate-400">{user.email}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CHAT */}
      <div className="flex flex-1 flex-col">

        <div className="flex justify-between bg-[#132190] p-5">
          <h1 className="text-xl font-bold">
            {usuarioAtual?.nome || "Chat"}
          </h1>

          <button onClick={() => carregarMensagens(true)}>
            <FaSync />
          </button>
        </div>

        <div ref={mensagensRef} className="flex-1 overflow-y-auto p-6">
          {mensagens.map((msg) => {
            const minha = msg.remetenteId === adminId;

            return (
              <div
                key={msg._id}
                className={`flex ${
                  minha ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl p-4 ${
                    minha ? "bg-blue-600" : "bg-slate-700"
                  }`}
                >
                  <p>{msg.texto}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 flex gap-3">
          <input
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 rounded-xl bg-slate-800 p-3"
          />

          <button
            onClick={enviarMensagem}
            className="rounded-xl bg-blue-600 px-5"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}