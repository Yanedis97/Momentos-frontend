"use client";

import { useState } from "react";
import { loginUser } from "@/services/auth.service";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);
      console.log("Login exitoso:", data);

      alert("Login exitoso");

    } catch (error) {
      console.error(error);
      alert("Error en el login");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4 rounded-2xl bg-gray-900 p-8 shadow-2xl"
      >
        <h2 className="text-2xl font-bold text-white text-center">
          Iniciar Sesión
        </h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          className="rounded-lg bg-gray-800 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="rounded-lg bg-gray-800 p-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
