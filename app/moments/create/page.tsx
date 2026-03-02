"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function CrearMomentoPage() {
  const params = useParams();
  const id = params.id;

  const [form, setForm] = useState({
    tipo: "",
    descripcion: "",
    fecha: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      jugadorId: id,
      ...form,
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl space-y-6 rounded-2xl bg-gray-900 p-8 shadow-2xl text-white"
      >
        <Link
          href={`/jugadores/${id}/momentos`}
          className="text-blue-400 hover:underline"
        >
          ← Volver a momentos
        </Link>

        <h2 className="text-center text-3xl font-bold">
          Crear Nuevo Momento
        </h2>

        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          required
          className="w-full rounded-lg bg-gray-800 p-3 outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Selecciona tipo</option>
          <option value="Gol">Gol</option>
          <option value="Asistencia">Asistencia</option>
          <option value="Tarjeta Amarilla">Tarjeta Amarilla</option>
          <option value="Tarjeta Roja">Tarjeta Roja</option>
        </select>

        <textarea
          name="descripcion"
          placeholder="Descripción del momento"
          value={form.descripcion}
          onChange={handleChange}
          required
          className="w-full rounded-lg bg-gray-800 p-3 outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          required
          className="w-full rounded-lg bg-gray-800 p-3 outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-green-600 p-3 font-semibold transition hover:bg-green-700"
        >
          Guardar Momento
        </button>
      </form>
    </main>
  );
}