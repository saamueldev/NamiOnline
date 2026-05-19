import { useState } from 'react';

import api from '../../services/api';

import { Link, useNavigate } from 'react-router-dom';

import {
  FaCalendarCheck,
  FaUserMd,
  FaClock,
  FaNotesMedical,
  FaArrowLeft,
  FaCheckCircle
} from 'react-icons/fa';

export default function TelaAgendarRetorno() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    especialidade: 'Cardiologia',
    medico: 'Dr. Lucas Mota',
    data: '',
    horario: '',
    observacoes: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const agendarRetorno = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await api.post('/retornos', {
        medico: form.medico,
        especialidade: form.especialidade,
        data: form.data,
        horario: form.horario,
        observacoes: form.observacoes,
      });

      console.log(response.data);

      alert('Retorno agendado com sucesso!');

      navigate('/retornos');
    } catch (error) {
      console.error('Erro ao agendar retorno:', error);
      alert('Erro ao agendar retorno');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center gap-4">
          <Link
            to="/home"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#132190] text-white transition hover:bg-[#004AF7]"
          >
            <FaArrowLeft />
          </Link>

          <div>
            <h1 className="text-3xl font-bold text-[#132190]">
              Agendar Retorno
            </h1>
            <p className="text-slate-500">
              Agende seu próximo atendimento
            </p>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-xl">
          <form onSubmit={agendarRetorno} className="space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">
                  <FaNotesMedical className="text-[#004AF7]" />
                  Especialidade
                </label>

                <select
                  name="especialidade"
                  value={form.especialidade}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#004AF7]"
                >
                  <option value="Cardiologia">Cardiologia</option>
                  <option value="Dermatologia">Dermatologia</option>
                  <option value="Ortopedia">Ortopedia</option>
                </select>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">
                  <FaUserMd className="text-[#004AF7]" />
                  Médico
                </label>

                <select
                  name="medico"
                  value={form.medico}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#004AF7]"
                >
                  <option value="Dr. Lucas Mota">Dr. Lucas Mota</option>
                  <option value="Dra. Marina Soares">Dra. Marina Soares</option>
                  <option value="Dra. Fernanda Alves">Dra. Fernanda Alves</option>
                </select>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">
                  <FaCalendarCheck className="text-[#004AF7]" />
                  Data
                </label>

                <input
                  type="date"
                  name="data"
                  value={form.data}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#004AF7]"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">
                  <FaClock className="text-[#004AF7]" />
                  Horário
                </label>

                <input
                  type="time"
                  name="horario"
                  value={form.horario}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#004AF7]"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">
                <FaNotesMedical className="text-[#004AF7]" />
                Observações
              </label>

              <textarea
                rows="5"
                name="observacoes"
                value={form.observacoes}
                onChange={handleChange}
                placeholder="Digite observações adicionais..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#004AF7]"
              />
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
              <Link
                to="/home"
                className="flex items-center justify-center rounded-xl bg-slate-200 px-6 py-4 font-semibold text-slate-700 hover:bg-slate-300"
              >
                Voltar
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-3 rounded-xl bg-[#004AF7] px-6 py-4 font-semibold text-white hover:bg-[#132190] disabled:opacity-60"
              >
                <FaCheckCircle />
                {loading ? 'Salvando...' : 'Confirmar Agendamento'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}