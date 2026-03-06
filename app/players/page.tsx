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
    <main className="min-h-screen bg-gray-950 p-10">

      <div className="mx-auto max-w-5xl space-y-8">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-white">
              Jugadores
            </h1>
            <p className="text-gray-400 text-sm">
              Administra los jugadores registrados
            </p>
          </div>

          <Link
            href="/jugadores/crear"
            className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700 transition"
          >
            + Nuevo Jugador
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-xl">

          <table className="w-full text-left text-white">

            <thead className="bg-gray-800 text-gray-300 text-sm uppercase">
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
                  className="border-t border-gray-800 hover:bg-gray-800/60 transition"
                >
                  <td className="p-4 font-medium">{jugador.nombre}</td>
                  <td className="p-4 text-gray-300">{jugador.posicion}</td>
                  <td className="p-4">{jugador.numero}</td>
                  <td className="p-4 text-gray-300">{jugador.equipo}</td>

                  <td className="p-4 text-center space-x-2">

                    <button className="rounded-md bg-yellow-600 px-3 py-1 text-sm hover:bg-yellow-700 transition">
                      Editar
                    </button>

                    <button className="rounded-md bg-red-600 px-3 py-1 text-sm hover:bg-red-700 transition">
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