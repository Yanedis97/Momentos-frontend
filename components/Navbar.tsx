"use client";

import Link from "next/link";
import { Bell, UserCircle } from "lucide-react";

export default function Navbar() {

  const pendingMoments = 1;

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-800 bg-gray-900/80 px-8 py-4 backdrop-blur">

      <h1 className="text-xl font-bold text-white">
        
      </h1>

      <div className="flex items-center gap-8">

        <Link
          href="/"
          className="text-gray-400 hover:text-white transition"
        >
          Inicio
        </Link>

        <Link
          href="/dashboard"
          className="text-gray-400 hover:text-white transition"
        >
          Dashboard
        </Link>

        {/* Notificaciones */}
        <div className="relative cursor-pointer hover:scale-105 transition">

          <Bell className="text-white" size={22} />

          {pendingMoments > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
              {pendingMoments}
            </span>
          )}

        </div>

        {/* Usuario */}
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">

          <UserCircle size={28} className="text-white" />

          <span className="text-sm text-gray-300">
            Yanedis
          </span>

        </div>

      </div>

    </nav>
  );
}