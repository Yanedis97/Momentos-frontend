"use client";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getDiscovery } from "@/services/discoveries.service";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

export default function DashboardPage() {

  const [position, setPosition] = useState<[number, number] | null>(null);

  const playerId = "player123";

  useEffect(() => {
    async function loadMoment() {

      const moment = await getDiscovery(playerId);

      if (moment?.location) {
        setPosition([
          moment.location.lat,
          moment.location.lng
        ]);
      }
    }

    loadMoment();

    const interval = setInterval(() => {
      loadMoment();
    }, 300000);

    return () => clearInterval(interval);

  }, [playerId]);

  return (
    <main className="min-h-screen bg-gray-950 p-8 text-white">

      <div className="mx-auto max-w-7xl space-y-10">

        {/* Header */}

        <div>
          <h1 className="text-3xl font-bold">
            Explorador de Momentos
          </h1>

          <p className="text-gray-400 text-sm">
            Descubre eventos importantes a través del tiempo y el mundo
          </p>
        </div>

        {/* Métricas */}

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <p className="text-gray-400 text-sm">Momentos registrados</p>
            <h3 className="mt-2 text-3xl font-bold">12</h3>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <p className="text-gray-400 text-sm">Países</p>
            <h3 className="mt-2 text-3xl font-bold">6</h3>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <p className="text-gray-400 text-sm">Años cubiertos</p>
            <h3 className="mt-2 text-3xl font-bold">1492 - 2020</h3>
          </div>

        </div>

        {/* Sección principal */}

        <div className="grid gap-6 md:grid-cols-3">

          {/* Mapa */}

          <div className="md:col-span-2 rounded-2xl border border-gray-800 bg-gray-900 p-6">

            <h2 className="mb-4 text-xl font-bold">
              Mapa de Momentos
            </h2>

            <div className="overflow-hidden rounded-xl">
              <Map position={position} />
            </div>

          </div>

          {/* Actividad */}

          <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">

            <h2 className="mb-4 text-xl font-bold">
              Últimos momentos
            </h2>

            <ul className="space-y-3 text-sm">

              <li className="rounded-lg bg-gray-800 p-3">
                🌍 Descubrimiento de América - 1492
              </li>

              <li className="rounded-lg bg-gray-800 p-3">
                🚀 Llegada a la Luna - 1969
              </li>

              <li className="rounded-lg bg-gray-800 p-3">
                🧱 Caída del Muro de Berlín - 1989
              </li>

            </ul>

          </div>

        </div>

      </div>

    </main>
  );
}