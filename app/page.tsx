import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gray-950 text-white px-6">
      
      <Image
        src="/logo-v2.png"
        alt="Logo Momentos"
        width={400}
        height={400}
        priority
        className="drop-shadow-2xl"
      />

      <p className="text-gray-400 text-center max-w-md">
        Vive cada momento. Guarda tu progreso. Construye tu historia.
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
        >
          Iniciar Sesión
        </Link>

        <Link
          href="/players/create"
          className="rounded-lg border border-gray-600 px-6 py-3 font-semibold transition hover:bg-gray-800"
        >
          Registrarse
        </Link>
      </div>

    </main>
  );
}