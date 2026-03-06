"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUser } from "@/services/auth.service";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await loginUser(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Error inesperado");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-6">

      <div className="absolute h-[400px] w-[400px] rounded-full bg-blue-600/20 blur-3xl"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 flex w-full max-w-md flex-col gap-5 rounded-2xl border border-gray-800 bg-gray-900/80 p-10 shadow-2xl backdrop-blur"
      >
        <div className="text-center space-y-2">
          <div className="text-4xl">⚽</div>
          <h2 className="text-2xl font-bold text-white">
            Bienvenido
          </h2>
          <p className="text-gray-400 text-sm">
            Inicia sesión para continuar
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400 text-center">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Correo electrónico"
          className="rounded-lg border border-gray-800 bg-gray-800 p-3 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="rounded-lg border border-gray-800 bg-gray-800 p-3 text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="mt-2 rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}