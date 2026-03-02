"use client";

import { useState } from "react";

export default function CrearJugadorPage() {
  const [form, setForm] = useState({
    nombre: "",
    posicion: "",
    numero: "",
    edad: "",
    equipo: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl space-y-6 rounded-2xl bg-gray-900 p-8 shadow-2xl"
      >
        <h2 className="text-center text-3xl font-bold text-white">
          Registrar Jugador
        </h2>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={form.nombre}
          onChange={handleChange}
          required
          className="w-full rounded-lg bg-gray-800 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="posicion"
          value={form.posicion}
          onChange={handleChange}
          required
          className="w-full rounded-lg bg-gray-800 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecciona posición</option>
          <option value="portero">Portero</option>
          <option value="defensa">Defensa</option>
          <option value="mediocampista">Mediocampista</option>
          <option value="delantero">Delantero</option>
        </select>

        <input
          type="number"
          name="numero"
          placeholder="Número de camiseta"
          value={form.numero}
          onChange={handleChange}
          required
          className="w-full rounded-lg bg-gray-800 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="edad"
          placeholder="Edad"
          value={form.edad}
          onChange={handleChange}
          required
          className="w-full rounded-lg bg-gray-800 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="equipo"
          placeholder="Equipo"
          value={form.equipo}
          onChange={handleChange}
          required
          className="w-full rounded-lg bg-gray-800 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-green-600 p-3 font-semibold text-white transition hover:bg-green-700"
        >
          Guardar Jugador
        </button>
      </form>
    </main>
  );
}
