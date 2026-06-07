"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createMoment } from "@/services/moments.service";

export default function CrearMomentoPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "", country: "", city: "", year: "",
    inicio: "", contexto: "", evento: "",
    suceso: "", reaccion: "", dato_curioso: "",
    deportistas: "", publico: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setForm({ ...form, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createMoment({
        title: form.title,
        year: Number(form.year),
        location: { country: form.country, city: form.city },
        states: {
          inicio: { text: form.inicio },
          contexto: { text: form.contexto },
          evento: { text: form.evento },
          suceso: { text: form.suceso },
          reaccion: { text: form.reaccion },
          dato_curioso: { text: form.dato_curioso },
        },
        observables: {
          deportistas: form.deportistas.split(",").map((d) => d.trim()).filter(Boolean),
          publico: form.publico,
        },
      });
      router.push("/moments");
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

  const textareaStyle: React.CSSProperties = {
    ...fieldStyle,
    resize: "vertical",
    minHeight: 72,
    lineHeight: 1.6,
  };

  const sectionLabel: React.CSSProperties = {
    fontSize: 9,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "rgba(201,168,76,0.55)",
    marginBottom: 12,
    marginTop: 24,
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
        maxWidth: 600,
        border: "1px solid rgba(201,168,76,0.12)",
        padding: "36px 32px",
        display: "flex",
        flexDirection: "column",
      }}>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 22,
          color: "#f0ede8",
          fontWeight: 400,
          margin: "0 0 4px",
        }}>
          Crear momento
        </h1>
        <p style={{ fontSize: 11, letterSpacing: "0.08em", color: "#9a9590", margin: "0 0 28px" }}>
          Define el momento histórico y su narrativa
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

        <span style={sectionLabel}>Información general</span>
        <input name="title" placeholder="Título del momento" value={form.title} onChange={handleChange} required style={fieldStyle} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 10 }}>
          <input name="year" placeholder="Año" value={form.year} onChange={handleChange} required style={{ ...fieldStyle, marginBottom: 0 }} />
          <input name="country" placeholder="País" value={form.country} onChange={handleChange} required style={{ ...fieldStyle, marginBottom: 0 }} />
          <input name="city" placeholder="Ciudad" value={form.city} onChange={handleChange} required style={{ ...fieldStyle, marginBottom: 0 }} />
        </div>

        <span style={sectionLabel}>Narrativa</span>
        <textarea name="inicio" placeholder="Inicio" value={form.inicio} onChange={handleChange} style={textareaStyle} />
        <textarea name="contexto" placeholder="Contexto" value={form.contexto} onChange={handleChange} style={textareaStyle} />
        <textarea name="evento" placeholder="Evento" value={form.evento} onChange={handleChange} style={textareaStyle} />
        <textarea name="suceso" placeholder="Suceso" value={form.suceso} onChange={handleChange} style={textareaStyle} />
        <textarea name="reaccion" placeholder="Reacción" value={form.reaccion} onChange={handleChange} style={textareaStyle} />
        <textarea name="dato_curioso" placeholder="Dato curioso" value={form.dato_curioso} onChange={handleChange} style={textareaStyle} />

        <span style={sectionLabel}>Observables</span>
        <input name="deportistas" placeholder="Deportistas (separados por coma)" value={form.deportistas} onChange={handleChange} style={fieldStyle} />
        <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "#9a9590", cursor: "pointer" }}>
          <input type="checkbox" name="publico" checked={form.publico} onChange={handleChange} />
          Había público
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
          {loading ? "Creando..." : "Crear momento →"}
        </button>
      </form>
    </main>
  );
}