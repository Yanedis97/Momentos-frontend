"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

const momentosMock = [
  {
    id: 1,
    tipo: "Gol",
    descripcion: "Gol de cabeza en el minuto 75",
    fecha: "2026-02-10",
  },
  {
    id: 2,
    tipo: "Asistencia",
    descripcion: "Pase filtrado en el minuto 40",
    fecha: "2026-02-12",
  },
];

export default function MomentosJugadorPage() {
  const params = useParams();
  const id = params.id;

  return (
    <main className="min-h-screen bg-gray-950 p-8 text-white">
      <div className="mx-auto max-w-4xl space-y-6">

        <Link
          href={`/jugadores/${id}`}
          className="text-blue-400 hover:underline"
        >
          ← Volver al jugador
        </Link>

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            Momentos del Jugador #{id}
          </h1>

          <Link
            href={`/jugadores/${id}/momentos/crear`}
            className="rounded-lg bg-green-600 px-4 py-2 font-semibold hover:bg-green-700"
          >
            + Nuevo Momento
          </Link>
        </div>

        <div className="space-y-4">
          {momentosMock.map((momento) => (
            <div
              key={momento.id}
              className="rounded-2xl bg-gray-900 p-6 shadow-xl hover:bg-gray-800"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {momento.tipo}
                </h2>
                <span className="text-sm text-gray-400">
                  {momento.fecha}
                </span>
              </div>

              <p className="mt-2 text-gray-300">
                {momento.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
