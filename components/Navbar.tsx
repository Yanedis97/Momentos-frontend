"use client";

import Link from "next/link";
import { Bell, UserCircle } from "lucide-react";

export default function Navbar() {
  const pendingMoments = 1; // luego vendrá del backend

  return (
    <nav className="flex items-center justify-between bg-gray-900 px-8 py-4 shadow-md">
      <h1 className="text-xl font-bold text-white">Momentos</h1>

      <div className="flex items-center gap-8">
        <Link href="/" className="text-gray-300 hover:text-white">
          Inicio
        </Link>
        <Link href="/dashboard" className="text-gray-300 hover:text-white">
          Dashboard
        </Link>

        {/* Notificaciones */}
        <div className="relative cursor-pointer">
          <Bell className="text-white" size={22} />
          {pendingMoments > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
              {pendingMoments}
            </span>
          )}
        </div>

        {/* Perfil jugador */}
        <div className="flex items-center gap-2 cursor-pointer">
          <UserCircle className="text-white" size={28} />
          <span className="text-sm text-gray-300">Yanedis</span>
        </div>
      </div>
    </nav>
  );
}