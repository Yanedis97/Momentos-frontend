"use client";

import { createPlayer } from "@/services/players.service";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CrearJugadorPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    language: "es",
    experience_level: "beginner",
    show_paused_first: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createPlayer({
        username: form.username,
        email: form.email,
        profile: {
          language: form.language,
          experience_level: form.experience_level,
          preferences: { show_paused_first: form.show_paused_first },
        },
      });
      router.push("/players");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(201,168,76,0.12)",
    padding: "11px 14px",
    fontSize: 13,
    color: "#f0ede8",
    fontFamily: "'DM Sans', system-ui, sans-serif",
    outline: "none",
    marginBottom: 10,
  };

  const sectionLabel: React.CSSProperties = {
    fontSize: 9,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "rgba(201,168,76,0.55)",
    marginBottom: 12,
    marginTop: 20,
    display: "block",
  };

  return (
    <main style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "#f0ede8",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      fontWeight: 300,
      display: "flex",
      justifyContent: "center",
      padding: "40px 24px",
    }}>
      <form onSubmit={handleSubmit} style={{
        width: "100%",
        maxWidth: 480,
        border: "1px solid rgba(201,168,76,0.12)",
        padding: "36px 32px",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Header */}
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 22,
          color: "#f0ede8",
          fontWeight: 400,
          margin: "0 0 4px",
        }}>
          Crear jugador
        </h1>
        <p style={{
          fontSize: 11,
          letterSpacing: "0.08em",
          color: "#9a9590",
          margin: "0 0 28px",
        }}>
          Registra un nuevo usuario del sistema
        </p>

        {error && (
          <div style={{
            border: "1px solid rgba(220,38,38,0.3)",
            background: "rgba(220,38,38,0.08)",
            padding: "10px 14px",
            fontSize: 12,
            color: "#f87171",
            marginBottom: 20,
          }}>
            {error}
          </div>
        )}

        <span style={sectionLabel}>Información básica</span>
        <input name="username" type="text" placeholder="Nombre de usuario" value={form.username} onChange={handleChange} required style={fieldStyle} />
        <input name="email" type="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} required style={fieldStyle} />

        <span style={sectionLabel}>Perfil</span>
        <select name="language" value={form.language} onChange={handleChange} style={fieldStyle}>
          <option value="es">Español</option>
          <option value="en">Inglés</option>
        </select>
        <select name="experience_level" value={form.experience_level} onChange={handleChange} style={fieldStyle}>
          <option value="beginner">Principiante</option>
          <option value="intermediate">Intermedio</option>
          <option value="advanced">Avanzado</option>
        </select>

        <span style={sectionLabel}>Preferencias</span>
        <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "#9a9590", cursor: "pointer" }}>
          <input type="checkbox" name="show_paused_first" checked={form.show_paused_first} onChange={handleChange} />
          Mostrar momentos pausados primero
        </label>

        <button type="submit" disabled={loading} style={{
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
          marginTop: 28,
        }}>
          {loading ? "Creando..." : "Crear jugador →"}
        </button>
      </form>
    </main>
  );
}