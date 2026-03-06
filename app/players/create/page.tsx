"use client";

import { useState } from "react";

export default function CrearJugadorPage() {

  const [form, setForm] = useState({
    username: "",
    email: "",
    language: "es",
    experience_level: "beginner",
    show_paused_first: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {

    const { name, value, type } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });

  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      username: form.username,
      email: form.email,
      profile: {
        language: form.language,
        experience_level: form.experience_level,
        preferences: {
          show_paused_first: form.show_paused_first,
        },
      },
    };

    console.log(payload);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 p-6">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl space-y-6 rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-2xl text-white"
      >

        <div className="text-center space-y-2">
          <div className="text-4xl">👤</div>

          <h2 className="text-3xl font-bold">
            Crear Jugador
          </h2>

          <p className="text-gray-400 text-sm">
            Registra un nuevo usuario del sistema
          </p>
        </div>

        {/* INFORMACIÓN BÁSICA */}

        <div className="space-y-4">

          <h3 className="text-lg font-semibold text-gray-300">
            Información básica
          </h3>

          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-800 bg-gray-800 p-3 outline-none focus:border-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-800 bg-gray-800 p-3 outline-none focus:border-blue-500"
          />

        </div>

        {/* PERFIL */}

        <div className="space-y-4">

          <h3 className="text-lg font-semibold text-gray-300">
            Perfil
          </h3>

          <select
            name="language"
            value={form.language}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-800 bg-gray-800 p-3 outline-none focus:border-blue-500"
          >
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>

          <select
            name="experience_level"
            value={form.experience_level}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-800 bg-gray-800 p-3 outline-none focus:border-blue-500"
          >
            <option value="beginner">Principiante</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
          </select>

        </div>

        {/* PREFERENCIAS */}

        <div className="space-y-4">

          <h3 className="text-lg font-semibold text-gray-300">
            Preferencias
          </h3>

          <label className="flex items-center gap-3 text-sm">

            <input
              type="checkbox"
              name="show_paused_first"
              checked={form.show_paused_first}
              onChange={handleChange}
            />

            Mostrar momentos pausados primero

          </label>

        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-green-600 p-3 font-semibold transition hover:bg-green-700 active:scale-[0.98]"
        >
          Crear jugador
        </button>

      </form>

    </main>
  );
}