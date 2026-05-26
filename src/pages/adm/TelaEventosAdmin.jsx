import React, { useMemo, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  Clock,
  Edit,
  Eye,
  MapPin,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { getApiErrorMessage, useConteudo } from "../../context/ConteudoContext";

const emptyForm = {
  title: "",
  date: new Date().toISOString().slice(0, 10),
  time: "08:00",
  location: "",
  description: "",
};

export default function AdminEventsCrud() {
  const {
    eventos: events,
    loadingConteudo,
    conteudoError,
    criarEvento,
    atualizarEvento,
    excluirEvento,
  } = useConteudo();
  const [search] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredEvents = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();
    if (!normalizedSearch) return events;

    return events.filter((item) =>
      [item.title, item.status, item.location, item.description]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch)
    );
  }, [events, search]);

  const publishedCount = events.filter((item) => item.status === "Publicado").length;

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
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
      date: item.date,
      time: item.time,
      location: item.location,
      description: item.description,
    });
    setFormError("");
    setIsFormOpen(true);
  }

  function openViewModal(item) {
    setSelectedEvent(item);
    setIsViewOpen(true);
  }

  function closeFormModal() {
    setIsFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setFormError("");
  }

  function closeViewModal() {
    setIsViewOpen(false);
    setSelectedEvent(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      ...form,
      title: form.title.trim(),
      location: form.location.trim(),
      description: form.description.trim(),
    };

    if (!payload.title || !payload.date || !payload.time || !payload.location || !payload.description) {
      setFormError("Preencha todos os campos obrigatorios.");
      return;
    }

    try {
      setIsSubmitting(true);
      setFormError("");

      if (editingId) {
        await atualizarEvento(editingId, payload);
      } else {
        await criarEvento(payload);
      }

      closeFormModal();
    } catch (error) {
      setFormError(
        getApiErrorMessage(error, "Nao foi possivel salvar o evento.")
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id) {
    const shouldDelete = window.confirm(
      "Tem certeza que deseja apagar este evento? Esta acao nao podera ser desfeita."
    );

    if (!shouldDelete) return;

    try {
      await excluirEvento(id);
    } catch (error) {
      window.alert(
        getApiErrorMessage(error, "Nao foi possivel excluir o evento.")
      );
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 text-slate-900 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-6 text-white shadow-xl md:p-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Gerenciar Eventos
          </h1>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <DashboardCard
            title="Total de eventos"
            value={loadingConteudo ? "..." : events.length}
            description="Eventos cadastrados"
          />
          <DashboardCard
            title="Publicados"
            value={loadingConteudo ? "..." : publishedCount}
            description="Visiveis no portal"
          />
          <button
            onClick={openCreateForm}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-blue-700 shadow-lg transition hover:bg-blue-50"
          >
            <Plus size={20} />
            Novo evento
          </button>
        </section>

        <main className="min-h-[55vh] rounded-3xl bg-white p-6 shadow-lg md:p-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900">Eventos cadastrados</h2>
            <p className="text-sm text-slate-500">
              Visualize, edite ou exclua eventos do sistema hospitalar.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <div className="hidden grid-cols-12 bg-slate-50 px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500 md:grid">
              <span className="col-span-4">Evento</span>
              <span className="col-span-2">Status</span>
              <span className="col-span-3">Data/Hora</span>
              <span className="col-span-3 text-right">Acoes</span>
            </div>

            {conteudoError ? (
              <EmptyState text={conteudoError} danger />
            ) : filteredEvents.length > 0 ? (
              filteredEvents.map((item) => (
                <article
                  key={item.id}
                  className="grid gap-5 border-t border-slate-200 px-6 py-6 transition hover:bg-blue-50/40 md:grid-cols-12 md:items-center"
                >
                  <div className="md:col-span-4">
                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-1 line-clamp-1 text-sm text-slate-500">
                      {item.description}
                    </p>
                    <p className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                      <MapPin size={14} />
                      {item.location}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <StatusBadge status={item.status} />
                  </div>

                  <div className="space-y-1 text-sm text-slate-500 md:col-span-3">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      {formatDate(item.date)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      {item.time}
                    </div>
                  </div>

                  <div className="flex justify-start gap-2 md:col-span-3 md:justify-end">
                    <ActionButton label="Visualizar" icon={<Eye size={17} />} onClick={() => openViewModal(item)} />
                    <ActionButton label="Editar" icon={<Edit size={17} />} onClick={() => openEditForm(item)} />
                    <ActionButton label="Apagar" icon={<Trash2 size={17} />} danger onClick={() => handleDelete(item.id)} />
                  </div>
                </article>
              ))
            ) : (
              <EmptyState text="Nenhum evento encontrado." />
            )}
          </div>
        </main>
      </div>

      {isFormOpen && (
        <Modal>
          <form onSubmit={handleSubmit} className="space-y-5">
            <ModalHeader
              title={editingId ? "Editar evento" : "Criar evento"}
              subtitle="Preencha as informacoes do evento que sera exibido no sistema hospitalar."
              onClose={closeFormModal}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Titulo" name="title" value={form.title} onChange={handleChange} required />
              <Input label="Data" name="date" type="date" value={form.date} onChange={handleChange} required />
              <Input label="Horario" name="time" type="time" value={form.time} onChange={handleChange} required />
              <Input label="Local" name="location" value={form.location} onChange={handleChange} required />
            </div>
            <Textarea label="Descricao" name="description" value={form.description} onChange={handleChange} rows={7} required />
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
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Save size={18} />
                {isSubmitting ? "Salvando..." : editingId ? "Salvar alteracoes" : "Cadastrar evento"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {isViewOpen && selectedEvent && (
        <Modal>
          <ModalHeader title="Visualizar evento" subtitle="Previa do evento cadastrado no sistema." onClose={closeViewModal} />
          <article className="space-y-5">
            <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-cyan-500 p-6 text-white">
              <span className="mb-4 inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                {selectedEvent.status}
              </span>
              <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
            </div>
            <div className="grid gap-4 rounded-2xl bg-slate-50 p-5 text-sm text-slate-600 md:grid-cols-2">
              <InfoItem icon={<CalendarDays size={17} />} label="Data" value={formatDate(selectedEvent.date)} />
              <InfoItem icon={<Clock size={17} />} label="Horario" value={selectedEvent.time} />
              <InfoItem icon={<MapPin size={17} />} label="Local" value={selectedEvent.location} />
            </div>
            <p className="leading-7 text-slate-700">{selectedEvent.description}</p>
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
  return (
    <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
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


function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-xl bg-blue-100 p-2 text-blue-700">{icon}</div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="font-semibold text-slate-700">{value}</p>
      </div>
    </div>
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
