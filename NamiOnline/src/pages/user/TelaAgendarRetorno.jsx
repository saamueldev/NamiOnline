import { useState } from 'react'
<<<<<<< HEAD
import api from '../../services/api'
=======
import { Link, useNavigate } from 'react-router-dom'

import {
  FaCalendarCheck,
  FaUserMd,
  FaClock,
  FaNotesMedical,
  FaArrowLeft,
  FaCheckCircle
} from 'react-icons/fa'
>>>>>>> 155b987 (telas e backend funcionando)

export default function TelaAgendarRetorno() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    especialidade: 'Cardiologia',
    medico: 'Dr. Lucas Mota',
    data: '',
    horario: '',
    observacoes: '',
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const agendarRetorno = async (e) => {
    e.preventDefault()

    try {
<<<<<<< HEAD

      const response = await api.post('/retornos', {
        medico,
        especialidade,
        data,
        horario,
        observacoes,
      })

      const dataResponse = response.data
=======
      const response = await fetch('http://localhost:3000/retornos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const data = await response.json()
>>>>>>> 155b987 (telas e backend funcionando)

      console.log(data)

      alert('Retorno agendado com sucesso!')

      navigate('/retornos')

    } catch (error) {
      console.error(error)
      alert('Erro ao agendar retorno')
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-5 py-10">

      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
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

        {/* CARD */}
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-xl">

          <form
            onSubmit={agendarRetorno}
            className="space-y-6"
          >

            {/* GRID */}
            <div className="grid gap-5 md:grid-cols-2">

              {/* ESPECIALIDADE */}
              <div>
                <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">
                  <FaNotesMedical className="text-[#004AF7]" />
                  Especialidade
                </label>

                <select
                  name="especialidade"
                  value={form.especialidade}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#004AF7]"
                >
                  <option>Cardiologia</option>
                  <option>Dermatologia</option>
                  <option>Ortopedia</option>
                </select>
              </div>

              {/* MÉDICO */}
              <div>
                <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">
                  <FaUserMd className="text-[#004AF7]" />
                  Médico
                </label>

                <select
                  name="medico"
                  value={form.medico}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#004AF7]"
                >
                  <option>Dr. Lucas Mota</option>
                  <option>Dra. Marina Soares</option>
                  <option>Dra. Fernanda Alves</option>
                </select>
              </div>

              {/* DATA */}
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
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#004AF7]"
                />
              </div>

              {/* HORÁRIO */}
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
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#004AF7]"
                />
              </div>

            </div>

            {/* OBS */}
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
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#004AF7]"
              />
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col gap-4 md:flex-row">

              <Link
                to="/home"
                className="flex items-center justify-center rounded-xl bg-slate-200 px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-300"
              >
                Voltar
              </Link>

              <button
                type="submit"
                className="flex items-center justify-center gap-3 rounded-xl bg-[#004AF7] px-6 py-4 font-semibold text-white transition hover:bg-[#132190]"
              >
                <FaCheckCircle />
                Confirmar Agendamento
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  )
}
