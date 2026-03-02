"use client";

import Link from "next/link";

const jugadoresMock = [
  {
    id: 1,
    nombre: "Juan Pérez",
    posicion: "Delantero",
    numero: 9,
    equipo: "Leones FC",
  },
  {
    id: 2,
    nombre: "Carlos Gómez",
    posicion: "Defensa",
    numero: 4,
    equipo: "Tigres FC",
  },
];

export default function JugadoresPage() {
  return (
    <main className="min-h-screen bg-gray-950 p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">
            Lista de Jugadores
          </h1>

          <Link
            href="/jugadores/crear"
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            + Nuevo Jugador
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl bg-gray-900 shadow-xl">
          <table className="w-full text-left text-white">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-4">Nombre</th>
                <th className="p-4">Posición</th>
                <th className="p-4">Número</th>
                <th className="p-4">Equipo</th>
                <th className="p-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {jugadoresMock.map((jugador) => (
                <tr
                  key={jugador.id}
                  className="border-t border-gray-800 hover:bg-gray-800"
                >
                  <td className="p-4">{jugador.nombre}</td>
                  <td className="p-4">{jugador.posicion}</td>
                  <td className="p-4">{jugador.numero}</td>
                  <td className="p-4">{jugador.equipo}</td>
                  <td className="p-4 text-center space-x-2">
                    <button className="rounded bg-yellow-600 px-3 py-1 text-sm hover:bg-yellow-700">
                      Editar
                    </button>
                    <button className="rounded bg-red-600 px-3 py-1 text-sm hover:bg-red-700">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
