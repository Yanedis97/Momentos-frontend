"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-950 p-8 text-white">
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>

      {/* Sección principal */}
      <div className="grid gap-6 md:grid-cols-3">

        {/* Mapa */}
        <div className="md:col-span-2 rounded-2xl bg-gray-900 p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-bold">Mapa de Momentos</h2>
          <Map />
        </div>

        {/* Panel lateral */}
        <div className="md:col-span-1 rounded-2xl bg-gray-900 p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-bold">Resumen</h2>
          <p>Nivel actual: 3</p>
          <p>Momentos completados: 5</p>
          <p>Momentos en pausa: 1</p>
        </div>

      </div>

      {/* Lista de momentos */}
      <div className="mt-8 rounded-2xl bg-gray-900 p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Lista de Momentos</h2>
        <ul className="space-y-3">
          <li className="rounded-lg bg-gray-800 p-3">
            Momento 1 - Completado
          </li>
          <li className="rounded-lg bg-gray-800 p-3">
            Momento 2 - Pendiente
          </li>
          <li className="rounded-lg bg-gray-800 p-3">
            Momento 3 - Bloqueado
          </li>
        </ul>
      </div>
    </main>
  );
}