"use client";

import { useState } from "react";

export default function CrearMomentoPage() {

  const [form, setForm] = useState({
    title: "",
    country: "",
    city: "",
    year: "",
    inicio: "",
    contexto: "",
    evento: "",
    suceso: "",
    reaccion: "",
    dato_curioso: "",
    deportistas: "",
    publico: false
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });

  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      year: Number(form.year),
      location: {
        country: form.country,
        city: form.city
      },
      states: {
        inicio: { text: form.inicio },
        contexto: { text: form.contexto },
        evento: { text: form.evento },
        suceso: { text: form.suceso },
        reaccion: { text: form.reaccion },
        dato_curioso: { text: form.dato_curioso }
      },
      observables: {
        deportistas: form.deportistas.split(","),
        publico: form.publico
      }
    };

    console.log(payload);
  };

  return (

    <main className="min-h-screen bg-gray-950 p-8 flex justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl space-y-8 rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-2xl text-white"
      >

        <h1 className="text-3xl font-bold text-center">
          Crear Momento
        </h1>

        {/* INFORMACIÓN GENERAL */}

        <div className="space-y-4">

          <h2 className="text-lg font-semibold text-gray-300">
            Información general
          </h2>

          <input
            name="title"
            placeholder="Título del momento"
            onChange={handleChange}
            className="w-full rounded-lg bg-gray-800 p-3"
          />

          <div className="grid grid-cols-3 gap-4">

            <input
              name="year"
              placeholder="Año"
              onChange={handleChange}
              className="rounded-lg bg-gray-800 p-3"
            />

            <input
              name="country"
              placeholder="País"
              onChange={handleChange}
              className="rounded-lg bg-gray-800 p-3"
            />

            <input
              name="city"
              placeholder="Ciudad"
              onChange={handleChange}
              className="rounded-lg bg-gray-800 p-3"
            />

          </div>

        </div>

        {/* DESARROLLO DEL MOMENTO */}

        <div className="space-y-4">

          <h2 className="text-lg font-semibold text-gray-300">
            Desarrollo del momento
          </h2>

          <textarea name="inicio" placeholder="Inicio" onChange={handleChange} className="w-full bg-gray-800 p-3 rounded-lg"/>
          <textarea name="contexto" placeholder="Contexto" onChange={handleChange} className="w-full bg-gray-800 p-3 rounded-lg"/>
          <textarea name="evento" placeholder="Evento" onChange={handleChange} className="w-full bg-gray-800 p-3 rounded-lg"/>
          <textarea name="suceso" placeholder="Suceso" onChange={handleChange} className="w-full bg-gray-800 p-3 rounded-lg"/>
          <textarea name="reaccion" placeholder="Reacción" onChange={handleChange} className="w-full bg-gray-800 p-3 rounded-lg"/>
          <textarea name="dato_curioso" placeholder="Dato curioso" onChange={handleChange} className="w-full bg-gray-800 p-3 rounded-lg"/>

        </div>

        {/* OBSERVABLES */}

        <div className="space-y-4">

          <h2 className="text-lg font-semibold text-gray-300">
            Observables
          </h2>

          <input
            name="deportistas"
            placeholder="Deportistas (separados por coma)"
            onChange={handleChange}
            className="w-full rounded-lg bg-gray-800 p-3"
          />

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              onChange={(e) =>
                setForm({ ...form, publico: e.target.checked })
              }
            />

            Había público

          </label>

        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-green-600 p-3 font-semibold hover:bg-green-700"
        >
          Crear momento
        </button>

      </form>

    </main>
  );
}