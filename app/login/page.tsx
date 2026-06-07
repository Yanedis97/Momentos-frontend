"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUser } from "@/services/auth.service";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(201,168,76,0.04)",
    border: "1px solid rgba(201,168,76,0.15)",
    padding: "12px 14px",
    fontSize: 13,
    color: "#f0ede8",
    fontFamily: "'DM Sans', system-ui, sans-serif",
    outline: "none",
  };

  return (
    <main style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      position: "relative",
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      {/* Glow central */}
      <div style={{
        position: "absolute",
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        maxWidth: 380,
        border: "1px solid rgba(201,168,76,0.15)",
        padding: "40px 36px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}>
        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 24,
            color: "#c9a84c",
            letterSpacing: "0.06em",
            margin: "0 0 6px",
            fontWeight: 400,
          }}>
            Momentos
          </h1>
          <p style={{
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#9a9590",
            margin: 0,
          }}>
            Inicia sesión para continuar
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            border: "1px solid rgba(220,38,38,0.3)",
            background: "rgba(220,38,38,0.08)",
            padding: "10px 14px",
            fontSize: 12,
            color: "#f87171",
            textAlign: "center",
            letterSpacing: "0.02em",
          }}>
            {error}
          </div>
        )}

        {/* Campos */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={fieldStyle}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={fieldStyle}
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          onClick={(e) => {
            e.preventDefault();
            const form = (e.target as HTMLElement).closest("div")?.parentElement;
            if (form) handleSubmit({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>);
          }}
          style={{
            width: "100%",
            padding: 13,
            background: "transparent",
            border: "1px solid rgba(201,168,76,0.4)",
            color: "#c9a84c",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.5 : 1,
            marginTop: 4,
          }}
        >
          {loading ? "Entrando..." : "Entrar →"}
        </button>
      </div>
    </main>
  );
}