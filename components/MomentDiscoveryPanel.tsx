"use client";

import { useEffect, useState } from "react";

type Props = {
  momentId: string;
  title: string;
  expiresIn: number;
  onAccepted: () => void;
  onExpired: () => void;
};

export default function MomentDiscoveryPanel({
  title,
  expiresIn,
  onAccepted,
  onExpired,
}: Props) {
  const [seconds, setSeconds] = useState(expiresIn);

  useEffect(() => {
    if (seconds <= 0) { onExpired(); return; }
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const pct = Math.max(0, (seconds / expiresIn) * 100);
  const urgency = seconds < 60;
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 flex flex-col gap-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">
          Momento descubierto
        </p>
        <h2 className="text-xl font-bold leading-snug">{title}</h2>
      </div>

      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Tiempo para aceptar</span>
          <span className={`font-mono font-semibold ${urgency ? "text-red-400" : "text-white"}`}>
            {mm}:{ss}
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-gray-700 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${urgency ? "bg-red-500" : "bg-amber-400"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <p className="text-sm text-gray-400">
        Haz clic en el marcador del mapa o acepta directamente para comenzar.
      </p>

      <button
        onClick={onAccepted}
        className="w-full rounded-xl bg-amber-400 text-gray-950 font-bold py-3 hover:bg-amber-300 transition"
      >
        Jugar →
      </button>
    </div>
  );
}