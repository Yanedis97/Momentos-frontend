"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function JugadorDetallePage() {
  const params = useParams();
  const id = params.id;

  // Mock temporal
  const jugador = {
    id,
    nombre: "Juan Pérez",
    posicion: "Delantero",
    numero: 9,
    edad: 24,
    equipo: "Leones FC",
  };

  return (
    <main className="min-h-screen bg-gray-950 p-8 text-white">
      <div className="mx-auto max-w-3xl space-y-6">
        
        <Link
          href="/jugadores"
          className="text-blue-400 hover:underline"
        >
          ← Volver a jugadores
        </Link>

        <div className="rounded-2xl bg-gray-900 p-8 shadow-2xl space-y-4">
          <h1 className="text-3xl font-bold">
            {jugador.nombre}
          </h1>

          <div className="grid grid-cols-2 gap-4 text-lg">
            <p><strong>Posición:</strong> {jugador.posicion}</p>
            <p><strong>Número:</strong> {jugador.numero}</p>
            <p><strong>Edad:</strong> {jugador.edad}</p>
            <p><strong>Equipo:</strong> {jugador.equipo}</p>
          </div>

          <div className="pt-6">
            <Link
              href={`/jugadores/${id}/momentos`}
              className="rounded-lg bg-green-600 px-4 py-2 font-semibold hover:bg-green-700"
            >
              Ver Momentos
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
