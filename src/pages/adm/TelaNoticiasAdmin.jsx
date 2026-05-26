import React, { useMemo, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  Edit,
  Eye,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { getApiErrorMessage, useConteudo } from "../../context/ConteudoContext";

const emptyForm = {
  title: "",
  category: "Comunicado",
  author: "",
  date: new Date().toISOString().slice(0, 10),
  summary: "",
  content: "",
  imageDataUrl: "",
};
const MAX_IMAGE_SIZE_MB = 5;
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024;

export default function AdminNewsCrud() {
  const {
    noticias: news,
    loadingConteudo,
    conteudoError,
    criarNoticia,
    atualizarNoticia,
    excluirNoticia,
  } = useConteudo();
  const [search] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReadingImage, setIsReadingImage] = useState(false);

  const filteredNews = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();
    if (!normalizedSearch) return news;

    return news.filter((item) =>
      [item.title, item.category, item.status, item.author]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch)
    );
  }, [news, search]);

  const publishedCount = news.filter((item) => item.status === "Publicado").length;

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFormError("Selecione um arquivo de imagem valido.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setFormError(`Selecione uma imagem de ate ${MAX_IMAGE_SIZE_MB}MB.`);
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    setIsReadingImage(true);

    reader.onload = () => {
      setForm((currentForm) => ({ ...currentForm, imageDataUrl: reader.result }));
      setFormError("");
      setIsReadingImage(false);
    };

    reader.onerror = () => {
      setFormError("Nao foi possivel carregar a imagem selecionada.");
      setIsReadingImage(false);
    };

    reader.readAsDataURL(file);
  }

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
    setIsFormOpen(true);
  }

  function openEditForm(item) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      category: item.category,
      author: item.author,
      date: item.date,
      summary: item.summary,
      content: item.content,
      imageDataUrl: item.imageUrl,
    });
    setFormError("");
    setIsFormOpen(true);
  }

  function openViewModal(item) {
    setSelectedNews(item);
    setIsViewOpen(true);
  }

  function closeFormModal() {
    setIsFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
    setIsReadingImage(false);
  }

  function closeViewModal() {
    setIsViewOpen(false);
    setSelectedNews(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isReadingImage) {
      setFormError("Aguarde a imagem terminar de carregar.");
      return;
    }

    const payload = {
      ...form,
      title: form.title.trim(),
      author: form.author.trim(),
      summary: form.summary.trim(),
      content: form.content.trim(),
    };

    if (!payload.title || !payload.author || !payload.summary || !payload.content) {
      setFormError("Preencha todos os campos obrigatorios.");
      return;
    }

    try {
      setIsSubmitting(true);
      setFormError("");

      if (editingId) {
        await atualizarNoticia(editingId, payload);
      } else {
        await criarNoticia(payload);
      }

      closeFormModal();
    } catch (error) {
      setFormError(
        getApiErrorMessage(error, "Nao foi possivel salvar a noticia.")
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id) {
    const shouldDelete = window.confirm(
      "Tem certeza que deseja apagar esta noticia? Esta acao nao podera ser desfeita."
    );

    if (!shouldDelete) return;

    try {
      await excluirNoticia(id);
    } catch (error) {
      window.alert(
        getApiErrorMessage(error, "Nao foi possivel excluir a noticia.")
      );
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 text-slate-900 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-6 text-white shadow-xl md:p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Gerenciar Noticias
            </h1>
          </div>
        </header>

        <section className="mb-4 grid gap-4 md:grid-cols-3">
          <DashboardCard
            title="Total de noticias"
            value={loadingConteudo ? "..." : news.length}
            description="Registros cadastrados"
          />
          <DashboardCard
            title="Publicadas"
            value={loadingConteudo ? "..." : publishedCount}
            description="Visiveis no portal"
          />
          <button
            onClick={openCreateForm}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-blue-700 shadow-lg transition hover:bg-blue-50"
          >
            <Plus size={20} />
            Nova noticia
          </button>
        </section>

        <main className="rounded-3xl bg-white p-6 shadow-lg md:p-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900">Noticias cadastradas</h2>
            <p className="text-sm text-slate-500">
              Visualize, edite ou exclua noticias do sistema hospitalar.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <div className="hidden grid-cols-12 bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 md:grid">
              <span className="col-span-4">Titulo</span>
              <span className="col-span-2">Categoria</span>
              <span className="col-span-2">Status</span>
              <span className="col-span-2">Data</span>
              <span className="col-span-2 text-right">Acoes</span>
            </div>

            {conteudoError ? (
              <EmptyState text={conteudoError} danger />
            ) : filteredNews.length > 0 ? (
              filteredNews.map((item) => (
                <article
                  key={item.id}
                  className="grid gap-3 border-t border-slate-200 p-2 transition hover:bg-blue-50/40 md:grid-cols-12 md:items-center"
                >
                  <div className="md:col-span-4">
                    <h3 className="p-8 font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-1 line-clamp-1 text-sm text-slate-500">
                      {item.summary}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                      {item.category}
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    <StatusBadge status={item.status} />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 md:col-span-2">
                    <CalendarDays size={16} />
                    {formatDate(item.date)}
                  </div>
                  <div className="flex justify-start gap-2 md:col-span-2 md:justify-end">
                    <ActionButton label="Visualizar" icon={<Eye size={17} />} onClick={() => openViewModal(item)} />
                    <ActionButton label="Editar" icon={<Edit size={17} />} onClick={() => openEditForm(item)} />
                    <ActionButton label="Apagar" icon={<Trash2 size={17} />} danger onClick={() => handleDelete(item.id)} />
                  </div>
                </article>
              ))
            ) : (
              <EmptyState text="Nenhuma noticia encontrada." />
            )}
          </div>
        </main>
      </div>

      {isFormOpen && (
        <Modal>
          <form onSubmit={handleSubmit} className="space-y-5">
            <ModalHeader
              title={editingId ? "Editar noticia" : "Criar noticia"}
              subtitle="Preencha as informacoes que serao exibidas no portal hospitalar."
              onClose={closeFormModal}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Titulo" name="title" value={form.title} onChange={handleChange} required />
              <Input label="Autor" name="author" value={form.author} onChange={handleChange} required />
              <Select
                label="Categoria"
                name="category"
                value={form.category}
                onChange={handleChange}
                options={["Comunicado", "Sistema", "Institucional", "Urgente"]}
              />
              <Input label="Data" name="date" type="date" value={form.date} onChange={handleChange} required />
            </div>
            <Textarea label="Resumo" name="summary" value={form.summary} onChange={handleChange} rows={3} required />
            <Textarea label="Conteudo" name="content" value={form.content} onChange={handleChange} rows={7} required />
            <ImagePicker imageUrl={form.imageDataUrl} onChange={handleImageChange} isLoading={isReadingImage} />
            {formError && (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {formError}
              </p>
            )}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeFormModal}
                className="rounded-2xl border border-slate-200 px-5 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isReadingImage}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Save size={18} />
                {isReadingImage ? "Carregando imagem..." : isSubmitting ? "Salvando..." : editingId ? "Salvar alteracoes" : "Cadastrar noticia"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {isViewOpen && selectedNews && (
        <Modal>
          <ModalHeader title="Visualizar noticia" subtitle="Previa da noticia cadastrada no sistema." onClose={closeViewModal} />
          <article className="space-y-5">
            <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-cyan-500 p-6 text-white">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                  {selectedNews.category}
                </span>
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                  {selectedNews.status}
                </span>
              </div>
              <h2 className="text-2xl font-bold">{selectedNews.title}</h2>
              <p className="mt-3 text-blue-50">{selectedNews.summary}</p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
              <span>Autor: {selectedNews.author}</span>
              <span>Data: {formatDate(selectedNews.date)}</span>
            </div>
            <p className="leading-7 text-slate-700">{selectedNews.content}</p>
            {selectedNews.imageUrl && (
              <img
                className="max-h-80 w-full rounded-2xl object-cover"
                src={selectedNews.imageUrl}
                alt={selectedNews.title}
              />
            )}
          </article>
        </Modal>
      )}
    </div>
  );
}

function DashboardCard({ title, value, description }) {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-lg">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <strong className="mt-2 block text-3xl font-bold text-blue-700">{value}</strong>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const isPublished = status === "Publicado";

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${isPublished ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
      {status}
    </span>
  );
}

function ActionButton({ label, icon, onClick, danger = false }) {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition ${danger ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-blue-50 text-blue-700 hover:bg-blue-100"}`}
    >
      {icon}
      <span className="sr-only">{label}</span>
    </button>
  );
}

function EmptyState({ text, danger = false }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 border-t border-slate-200 p-10 text-center">
      <AlertCircle className={danger ? "text-red-600" : "text-blue-600"} size={36} />
      <p className={`text-sm font-semibold ${danger ? "text-red-700" : "text-slate-600"}`}>{text}</p>
    </div>
  );
}

function Modal({ children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl md:p-7">
        {children}
      </div>
    </div>
  );
}

function ModalHeader({ title, subtitle, onClose }) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="rounded-xl bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
      >
        <X size={20} />
      </button>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        {...props}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}

function Select({ label, options, ...props }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <select
        {...props}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function Textarea({ label, ...props }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <textarea
        {...props}
        className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}

function ImagePicker({ imageUrl, onChange, isLoading = false }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-slate-700">Imagem</span>
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition file:mr-4 file:rounded-xl file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-semibold file:text-blue-700 hover:file:bg-blue-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Previa da imagem selecionada"
          className="h-44 w-full rounded-2xl object-cover"
        />
      )}
      {isLoading && (
        <p className="text-sm font-semibold text-blue-700">Carregando imagem...</p>
      )}
    </label>
  );
}

function formatDate(date) {
  if (!date) return "-";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}
