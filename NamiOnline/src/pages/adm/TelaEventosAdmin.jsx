import React, { useMemo, useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import {
  AlertCircle,
  CalendarCheck,
  CalendarDays,
  Clock,
  Edit,
  Eye,
  MapPin,
  Plus,
  Save,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";

const initialEvents = [
  {
    id: 1,
    title: "Mutirão de consultas cardiológicas",
    status: "Publicado",
    date: "2026-05-10",
    time: "08:00",
    location: "Ambulatório Central - Ala B",
    summary: "Atendimento especial para pacientes na fila de cardiologia.",
    description:
      "Evento voltado para otimizar a marcação e realização de consultas cardiológicas. Os pacientes previamente cadastrados serão chamados conforme prioridade clínica e disponibilidade médica.",
  },
  {
    id: 2,
    title: "Campanha de atualização cadastral",
    status: "Publicado",
    date: "2026-05-20",
    time: "09:00",
    location: "Recepção Principal",
    summary: "Ação para atualizar dados dos pacientes no sistema hospitalar.",
    description:
      "Durante a campanha, pacientes poderão atualizar telefone, e-mail, endereço e documentos para melhorar a comunicação sobre consultas, exames e retornos médicos.",
  },
];

const emptyForm = {
  title: "",
  date: new Date().toISOString().slice(0, 10),
  time: "08:00",
  location: "",
  summary: "",
  description: "",
};

export default function AdminEventsCrud() {
  const [events, setEvents] = useState(initialEvents);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredEvents = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    if (!normalizedSearch) return events;

    return events.filter((item) => {
      return (
        item.title.toLowerCase().includes(normalizedSearch) ||
        item.type.toLowerCase().includes(normalizedSearch) ||
        item.status.toLowerCase().includes(normalizedSearch) ||
        item.location.toLowerCase().includes(normalizedSearch) ||
        item.organizer.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [events, search]);

  const publishedCount = events.filter((item) => item.status === "Publicado").length;

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyForm);
    setIsFormOpen(true);
  }

  function openEditForm(item) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      status: item.status,
      date: item.date,
      time: item.time,
      location: item.location,
      summary: item.summary,
      description: item.description,
    });
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
  }

  function closeViewModal() {
    setIsViewOpen(false);
    setSelectedEvent(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      ...form,
      title: form.title.trim(),
      location: form.location.trim(),
      organizer: form.organizer.trim(),
      summary: form.summary.trim(),
      description: form.description.trim(),
    };

    if (
      !payload.title ||
      !payload.location ||
      !payload.organizer ||
      !payload.summary ||
      !payload.description ||
      !payload.capacity
    ) {
      return;
    }

    if (editingId) {
      setEvents((currentEvents) =>
        currentEvents.map((item) =>
          item.id === editingId ? { ...item, ...payload } : item
        )
      );
    } else {
      const newEvent = {
        id: Date.now(),
        ...payload,
      };
      setEvents((currentEvents) => [newEvent, ...currentEvents]);
    }

    closeFormModal();
  }

  function handleDelete(id) {
    const shouldDelete = window.confirm(
      "Tem certeza que deseja apagar este evento? Esta ação não poderá ser desfeita."
    );

    if (!shouldDelete) return;

    setEvents((currentEvents) => currentEvents.filter((item) => item.id !== id));
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 text-slate-900 md:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 p-6 text-white shadow-xl md:p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Gerenciar Eventos
              </h1>
            </div>
            <div className="relative w-full md:max-w-sm">
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <DashboardCard
            title="Total de eventos"
            value={events.length}
            description="Eventos cadastrados"
          />
          <DashboardCard
            title="Publicados"
            value={publishedCount}
            description="Visíveis no portal"
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
          <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Eventos cadastrados</h2>
              <p className="text-sm text-slate-500">
                Visualize, edite, exclua ou publique eventos do sistema hospitalar.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <div className="hidden grid-cols-12 bg-slate-50 px-6 py-4 text-xs font-bold uppercase tracking-wide text-slate-500 md:grid">
              <span className="col-span-3">Evento</span>
              <span className="col-span-2">Status</span>
              <span className="col-span-2">Data/Hora</span>
              <span className="col-span-1">Vagas</span>
              <span className="col-span-2 text-right">Ações</span>
            </div>

            {filteredEvents.length > 0 ? (
              filteredEvents.map((item) => (
                <article
                  key={item.id}
                  className="grid gap-5 border-t border-slate-200 px-6 py-6 transition hover:bg-blue-50/40 md:grid-cols-12 md:items-center"
                >
                  <div className="md:col-span-3">
                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-1 line-clamp-1 text-sm text-slate-500">
                      {item.summary}
                    </p>
                    <p className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                      <MapPin size={14} />
                      {item.location}
                    </p>
                  </div>


                  <div className="md:col-span-2">
                    <StatusBadge status={item.status} />
                  </div>

                  <div className="space-y-1 text-sm text-slate-500 md:col-span-2">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      {formatDate(item.date)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      {item.time}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 md:col-span-1">
                    <Users size={16} />
                    {item.capacity}
                  </div>

                  <div className="flex justify-start gap-2 md:col-span-2 md:justify-end">
                    <ActionButton
                      label="Visualizar"
                      icon={<Eye size={17} />}
                      onClick={() => openViewModal(item)}
                    />
                    <ActionButton
                      label="Editar"
                      icon={<Edit size={17} />}
                      onClick={() => openEditForm(item)}
                    />
                    <ActionButton
                      label="Apagar"
                      icon={<Trash2 size={17} />}
                      danger
                      onClick={() => handleDelete(item.id)}
                    />
                  </div>
                </article>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 border-t border-slate-200 p-10 text-center">
                <AlertCircle className="text-blue-600" size={36} />
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Nenhum evento encontrado
                  </h3>
                  <p className="text-sm text-slate-500">
                    Tente buscar por outro termo ou cadastre um novo evento.
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {isFormOpen && (
        <Modal onClose={closeFormModal}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <ModalHeader
              title={editingId ? "Editar evento" : "Criar evento"}
              subtitle="Preencha as informações do evento que será exibido no sistema hospitalar."
              onClose={closeFormModal}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Título"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Digite o nome do evento"
                required
              />

              <Select
                label="Status"
                name="status"
                value={form.status}
                onChange={handleChange}
                options={["Publicado", "Rascunho"]}
              />

              <Input
                label="Data"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                required
              />

              <Input
                label="Horário"
                name="time"
                type="time"
                value={form.time}
                onChange={handleChange}
                required
              />

              <Input
                label="Local"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Ex: Ambulatório Central"
                required
              />
            </div>

            <Textarea
              label="Resumo"
              name="summary"
              value={form.summary}
              onChange={handleChange}
              placeholder="Escreva um resumo curto do evento"
              rows={3}
              required
            />

            <Textarea
              label="Descrição"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Digite a descrição completa do evento"
              rows={7}
              required
            />

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
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
              >
                <Save size={18} />
                {editingId ? "Salvar alterações" : "Cadastrar evento"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {isViewOpen && selectedEvent && (
        <Modal onClose={closeViewModal}>
          <ModalHeader
            title="Visualizar evento"
            subtitle="Prévia do evento cadastrado no sistema."
            onClose={closeViewModal}
          />

          <article className="space-y-5">
            <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-cyan-500 p-6 text-white">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                  {selectedEvent.type}
                </span>
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                  {selectedEvent.status}
                </span>
              </div>
              <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
              <p className="mt-3 text-blue-50">{selectedEvent.summary}</p>
            </div>

            <div className="grid gap-4 rounded-2xl bg-slate-50 p-5 text-sm text-slate-600 md:grid-cols-2">
              <InfoItem icon={<CalendarDays size={17} />} label="Data" value={formatDate(selectedEvent.date)} />
              <InfoItem icon={<Clock size={17} />} label="Horário" value={selectedEvent.time} />
              <InfoItem icon={<MapPin size={17} />} label="Local" value={selectedEvent.location} />
            </div>

            <p className="leading-7 text-slate-700">{selectedEvent.description}</p>

            <div className="flex justify-end border-t border-slate-200 pt-5">
              <button
                onClick={closeViewModal}
                className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Fechar
              </button>
            </div>
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
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        isPublished
          ? "bg-emerald-100 text-emerald-700"
          : "bg-amber-100 text-amber-700"
      }`}
    >
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
      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition ${
        danger
          ? "bg-red-50 text-red-600 hover:bg-red-100"
          : "bg-blue-50 text-blue-700 hover:bg-blue-100"
      }`}
    >
      {icon}
      <span className="sr-only">{label}</span>
    </button>
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
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}
