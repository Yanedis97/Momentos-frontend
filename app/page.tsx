import Link from "next/link";

export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "#f0ede8",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      fontWeight: 300,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 24,
      textAlign: "center",
      padding: "0 24px",
    }}>
      {/* Línea decorativa superior */}
      <div style={{
        width: 1,
        height: 48,
        background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent)",
      }} />

      {/* Título */}
      <div>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(36px, 8vw, 64px)",
          fontWeight: 700,
          letterSpacing: "0.02em",
          lineHeight: 1.2,
          color: "#f0ede8",
          margin: 0,
        }}>
          Momen<span style={{ color: "#c9a84c" }}>tos</span>
        </h1>
      </div>

      {/* Subtítulo */}
      <p style={{
        fontSize: 13,
        color: "#9a9590",
        maxWidth: 340,
        lineHeight: 1.8,
        letterSpacing: "0.03em",
        margin: 0,
      }}>
        Vive cada momento. Guarda tu progreso. Construye tu historia.
      </p>

      {/* Botones */}
      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
        <Link href="/login" style={{
          padding: "12px 32px",
          background: "transparent",
          border: "1px solid rgba(201,168,76,0.5)",
          color: "#c9a84c",
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          textDecoration: "none",
          transition: "all 0.3s",
          display: "inline-block",
        }}>
          Iniciar sesión
        </Link>

        <Link href="/players/create" style={{
          padding: "12px 32px",
          background: "transparent",
          border: "1px solid rgba(240,237,232,0.15)",
          color: "#9a9590",
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          textDecoration: "none",
          transition: "all 0.3s",
          display: "inline-block",
        }}>
          Registrarse
        </Link>
      </div>

      {/* Línea decorativa inferior */}
      <div style={{
        width: 1,
        height: 48,
        background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent)",
      }} />
    </main>
  );
}