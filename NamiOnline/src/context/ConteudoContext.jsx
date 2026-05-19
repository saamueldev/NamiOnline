import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";

const ConteudoContext = createContext(null);

function formatDateInput(value) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

function normalizeNoticia(item) {
  return {
    id: item._id ?? item.id,
    title: item.Titulo ?? item.title ?? "",
    category: item.Categoria ?? item.category ?? "Comunicado",
    status: item.status ?? "Publicado",
    author: item.Autor ?? item.author ?? "",
    date: formatDateInput(item.Data ?? item.date),
    summary: item.Resumo ?? item.summary ?? "",
    content: item.Conteudo ?? item.content ?? "",
    imageUrl: item.imageUrl ?? item.imagemUrl ?? "",
    raw: item,
  };
}

function normalizeEvento(item) {
  const description = item.descricao ?? item.description ?? "";

  return {
    id: item._id ?? item.id,
    title: item.titulo ?? item.title ?? "",
    status: item.status ?? "Publicado",
    date: formatDateInput(item.data ?? item.date),
    time: item.horario ?? item.time ?? "",
    location: item.local ?? item.location ?? "",
    summary: item.summary ?? description.slice(0, 130),
    description,
    imageUrl: item.imageUrl ?? item.imagemUrl ?? "",
    raw: item,
  };
}

function noticiaPayload(form) {
  return {
    Autor: form.author.trim(),
    Titulo: form.title.trim(),
    Data: form.date,
    Categoria: form.category,
    Resumo: form.summary.trim(),
    Conteudo: form.content.trim(),
    imageDataUrl: form.imageDataUrl,
  };
}

function eventoPayload(form) {
  return {
    titulo: form.title.trim(),
    data: form.date,
    horario: form.time,
    local: form.location.trim(),
    descricao: form.description.trim(),
    imageDataUrl: form.imageDataUrl,
  };
}

export function getApiErrorMessage(error, fallback) {
  return (
    error.response?.data?.mensagem ||
    error.response?.data?.error ||
    error.response?.data?.erro ||
    error.message ||
    fallback
  );
}

export function ConteudoProvider({ children }) {
  const [noticias, setNoticias] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [loadingConteudo, setLoadingConteudo] = useState(true);
  const [conteudoError, setConteudoError] = useState("");

  const carregarConteudo = useCallback(async () => {
    try {
      setConteudoError("");
      const [noticiasResponse, eventosResponse] = await Promise.all([
        api.get("/noticias"),
        api.get("/eventos"),
      ]);

      setNoticias(noticiasResponse.data.map(normalizeNoticia));
      setEventos(eventosResponse.data.map(normalizeEvento));
    } catch (error) {
      setConteudoError(
        getApiErrorMessage(error, "Nao foi possivel carregar noticias e eventos.")
      );
    } finally {
      setLoadingConteudo(false);
    }
  }, []);

  useEffect(() => {
    carregarConteudo();
  }, [carregarConteudo]);

  useEffect(() => {
    const interval = setInterval(carregarConteudo, 15000);

    return () => clearInterval(interval);
  }, [carregarConteudo]);

  const criarNoticia = useCallback(async (form) => {
    const response = await api.post("/noticias", noticiaPayload(form));
    const noticia = normalizeNoticia(response.data);
    setNoticias((atuais) => [noticia, ...atuais]);
    return noticia;
  }, []);

  const atualizarNoticia = useCallback(async (id, form) => {
    const response = await api.put(`/noticias/${id}`, noticiaPayload(form));
    const noticia = normalizeNoticia(response.data);
    setNoticias((atuais) => atuais.map((item) => (item.id === id ? noticia : item)));
    return noticia;
  }, []);

  const excluirNoticia = useCallback(async (id) => {
    await api.delete(`/noticias/${id}`);
    setNoticias((atuais) => atuais.filter((item) => item.id !== id));
  }, []);

  const criarEvento = useCallback(async (form) => {
    const response = await api.post("/eventos", eventoPayload(form));
    const evento = normalizeEvento(response.data);
    setEventos((atuais) => [evento, ...atuais]);
    return evento;
  }, []);

  const atualizarEvento = useCallback(async (id, form) => {
    const response = await api.put(`/eventos/${id}`, eventoPayload(form));
    const evento = normalizeEvento(response.data);
    setEventos((atuais) => atuais.map((item) => (item.id === id ? evento : item)));
    return evento;
  }, []);

  const excluirEvento = useCallback(async (id) => {
    await api.delete(`/eventos/${id}`);
    setEventos((atuais) => atuais.filter((item) => item.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      noticias,
      eventos,
      loadingConteudo,
      conteudoError,
      carregarConteudo,
      criarNoticia,
      atualizarNoticia,
      excluirNoticia,
      criarEvento,
      atualizarEvento,
      excluirEvento,
    }),
    [
      noticias,
      eventos,
      loadingConteudo,
      conteudoError,
      carregarConteudo,
      criarNoticia,
      atualizarNoticia,
      excluirNoticia,
      criarEvento,
      atualizarEvento,
      excluirEvento,
    ]
  );

  return <ConteudoContext.Provider value={value}>{children}</ConteudoContext.Provider>;
}

export function useConteudo() {
  const context = useContext(ConteudoContext);

  if (!context) {
    throw new Error("useConteudo deve ser usado dentro de ConteudoProvider.");
  }

  return context;
}
