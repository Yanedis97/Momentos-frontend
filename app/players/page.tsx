"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getPlayers } from "@/services/players.service";

type Player = {
  _id: string;
  username: string;
  email: string;
  status: string;
  profile?: { experience_level?: string };
};

export default function JugadoresPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlayers()
      .then(setPlayers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const thStyle: React.CSSProperties = {
    fontSize: 9,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "#9a9590",
    padding: "10px 16px",
    borderBottom: "1px solid rgba(201,168,76,0.1)",
    textAlign: "left",
    fontWeight: 400,
  };

  const tdStyle: React.CSSProperties = {
    fontSize: 13,
    color: "#f0ede8",
    padding: "13px 16px",
    borderBottom: "1px solid rgba(240,237,232,0.04)",
  };

  return (
    <main style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "#f0ede8",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      fontWeight: 300,
      padding: "40px 32px",
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 26,
              color: "#f0ede8",
              fontWeight: 400,
              margin: "0 0 4px",
            }}>
              Jugadores
            </h1>
            <p style={{ fontSize: 11, color: "#9a9590", letterSpacing: "0.06em", margin: 0 }}>
              Administra los jugadores registrados
            </p>
          </div>
          <Link href="/players/create" style={{
            padding: "9px 20px",
            background: "transparent",
            border: "1px solid rgba(201,168,76,0.35)",
            color: "#c9a84c",
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textDecoration: "none",
            display: "inline-block",
          }}>
            + Nuevo jugador
          </Link>
        </div>

        {/* Tabla */}
        <div style={{ border: "1px solid rgba(201,168,76,0.1)", overflow: "hidden" }}>
          {loading ? (
            <div style={{ padding: 32, textAlign: "center", fontSize: 12, color: "#9a9590" }}>
              Cargando jugadores...
            </div>
          ) : players.length === 0 ? (
            <div style={{ padding: 32, textAlign: "center", fontSize: 12, color: "#9a9590" }}>
              No hay jugadores registrados.
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={thStyle}>Usuario</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Nivel</th>
                  <th style={thStyle}>Estado</th>
                  <th style={thStyle}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {players.map((p, i) => (
                  <tr key={p._id} style={{ background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                    <td style={tdStyle}>{p.username}</td>
                    <td style={{ ...tdStyle, color: "#9a9590" }}>{p.email}</td>
                    <td style={{ ...tdStyle, color: "#9a9590" }}>
                      {p.profile?.experience_level ?? "—"}
                    </td>
                    <td style={tdStyle}>
                      <span style={{
                        fontSize: 10,
                        letterSpacing: "0.08em",
                        color: p.status === "active" ? "#c9a84c" : "#9a9590",
                      }}>
                        {p.status === "active" ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <Link href={`/players/${p._id}`} style={{
                        padding: "4px 14px",
                        background: "transparent",
                        border: "1px solid rgba(201,168,76,0.2)",
                        color: "#c9a84c",
                        fontSize: 10,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        display: "inline-block",
                      }}>
                        Ver
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}