"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useSyncExternalStore, useState } from "react";
import { getDiscovery } from "@/services/discoveries.service";
import { getPlayerMoments } from "@/services/progress.service";
import MomentPlayer from "@/components/MomentPlayer";
import MomentDiscoveryPanel from "@/components/MomentDiscoveryPanel";
import { PlayerProgress } from "@/types/progress";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

type Moment = {
  moment_id: string;
  title: string;
  location?: { lat: number; lng: number };
  expires_in: number;
};

function subscribeToPlayerId(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getPlayerIdSnapshot() {
  return typeof window === "undefined" ? null : localStorage.getItem("player_id");
}

export default function DashboardPage() {
  const playerId = useSyncExternalStore(
    subscribeToPlayerId,
    getPlayerIdSnapshot,
    () => null
  );
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [currentMoment, setCurrentMoment] = useState<Moment | null>(null);
  const [activeMomentId, setActiveMomentId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [history, setHistory] = useState<PlayerProgress[]>([]);

  const loadHistory = useCallback(async (pid: string) => {
    try {
      const res = await getPlayerMoments(pid, 1, 5);
      setHistory(res.data);
    } catch (error) {
      console.error("Error loading history:", error);
    }
  }, []);

  const loadMoment = useCallback(async () => {
    if (!playerId) return;
    try {
      const discovery = await getDiscovery(playerId);
      if (!discovery) return;
      if ("data" in discovery && discovery.data === null) return;
      const moment = discovery as Moment;
      setCurrentMoment(moment);
      if (moment.location) setPosition([moment.location.lat, moment.location.lng]);
    } catch (error) {
      console.error("Error loading moment:", error);
    }
  }, [playerId]);

  const handleAccepted = useCallback(() => {
    if (!currentMoment) return;
    setActiveMomentId(currentMoment.moment_id);
    setCurrentMoment(null);
    setIsPlaying(true);
  }, [currentMoment]);

  const handleExpired = useCallback(() => {
    setCurrentMoment(null);
    void loadMoment();
  }, [loadMoment]);

  const handleFinish = useCallback(() => {
    setIsPlaying(false);
    setActiveMomentId(null);
    if (playerId) void loadHistory(playerId);
  }, [playerId, loadHistory]);

  useEffect(() => {
    if (!playerId || isPlaying) return;
    void loadMoment();
    void loadHistory(playerId);
    const interval = setInterval(() => void loadMoment(), 300_000);
    return () => clearInterval(interval);
  }, [playerId, isPlaying, loadMoment, loadHistory]);

  if (!playerId) return null;

  if (isPlaying && activeMomentId) {
    return (
      <main style={{ minHeight: "100vh", background: "#0a0a0f" }}>
        <MomentPlayer
          playerId={playerId}
          momentId={activeMomentId}
          onFinish={handleFinish}
        />
      </main>
    );
  }

  const completedCount = history.filter((h) => h.status === "completed").length;

  return (
    <main style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "#f0ede8",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      fontWeight: 300,
    }}>
      {/* Grid principal */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 320px",
        height: "calc(100vh - 57px)",
      }}>

        {/* ── Columna mapa ── */}
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid rgba(201,168,76,0.1)",
          overflow: "hidden",
          background: "#06060a",
        }}>
          {/* Grid decorativo de fondo */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }} />

          {/* Etiqueta del mapa */}
          <p style={{
            position: "absolute",
            top: 16,
            left: 20,
            zIndex: 10,
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(201,168,76,0.55)",
            margin: 0,
          }}>
            Mapa de momentos históricos
          </p>

          {/* Mapa Leaflet */}
          <div style={{ flex: 1, overflow: "hidden", minHeight: 0, height: "100%" }}>
          {/* <div style={{ flex: 1, overflow: "hidden", minHeight: 0 }}> */}
            <Map
              position={position}
              momentTitle={currentMoment?.title}
              onSelectMoment={handleAccepted}
            />
          </div>

          {/* Stats strip */}
          <div style={{
            display: "flex",
            borderTop: "1px solid rgba(201,168,76,0.1)",
            background: "rgba(10,10,15,0.9)",
            flexShrink: 0,
            position: "relative",
            zIndex: 10,
          }}>
            {[
              { num: "12", desc: "Momentos" },
              { num: "6", desc: "Países" },
              { num: "1492–2020", desc: "Años cubiertos" },
              { num: String(completedCount), desc: "Completados" },
            ].map((s, i, arr) => (
              <div key={s.desc} style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                padding: "12px 20px",
                borderRight: i < arr.length - 1
                  ? "1px solid rgba(201,168,76,0.08)"
                  : "none",
              }}>
                <span style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 20,
                  color: "#c9a84c",
                  lineHeight: 1.2,
                }}>
                  {s.num}
                </span>
                <span style={{
                  fontSize: 9,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#9a9590",
                  marginTop: 2,
                }}>
                  {s.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderLeft: "1px solid rgba(201,168,76,0.1)",
        }}>

          {/* Panel de descubrimiento */}
          {currentMoment ? (
            <MomentDiscoveryPanel
              momentId={currentMoment.moment_id}
              title={currentMoment.title}
              expiresIn={currentMoment.expires_in}
              onAccepted={handleAccepted}
              onExpired={handleExpired}
            />
          ) : (
            <div style={{
              padding: 24,
              borderBottom: "1px solid rgba(201,168,76,0.1)",
              flexShrink: 0,
            }}>
              <p style={{
                fontSize: 12,
                color: "#9a9590",
                letterSpacing: "0.04em",
                margin: 0,
              }}>
                Buscando tu próximo momento...
              </p>
            </div>
          )}

          {/* Historial */}
          <div style={{
            padding: 24,
            flex: 1,
            overflowY: "auto",
          }}>
            <p style={{
              fontSize: 9,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#9a9590",
              marginBottom: 16,
              marginTop: 0,
            }}>
              Tu recorrido
            </p>

            {history.length === 0 ? (
              <p style={{ fontSize: 12, color: "#9a9590", margin: 0 }}>
                Aún no has jugado ningún momento.
              </p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {history.map((item, i) => (
                  <li key={item.moment_id} style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "10px 0",
                    borderBottom: i < history.length - 1
                      ? "1px solid rgba(240,237,232,0.05)"
                      : "none",
                  }}>
                    <span style={{
                      fontSize: 10,
                      color: "#c9a84c",
                      letterSpacing: "0.08em",
                      minWidth: 36,
                      marginTop: 3,
                      flexShrink: 0,
                    }}>
                      {item.year ?? "—"}
                    </span>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: 13,
                        color: "#f0ede8",
                        lineHeight: 1.3,
                        marginBottom: 2,
                        marginTop: 0,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                        {item.title ?? item.moment_id}
                      </p>
                      <p style={{
                        fontSize: 10,
                        color: "#9a9590",
                        letterSpacing: "0.05em",
                        margin: 0,
                      }}>
                        {item.country ?? ""}
                        {item.country && " · "}
                        {item.status === "completed" ? "Completado" : "En progreso"}
                      </p>
                    </div>

                    <span style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: item.status === "completed"
                        ? "#c9a84c"
                        : "rgba(201,168,76,0.25)",
                      border: item.status === "completed"
                        ? "1px solid #c9a84c"
                        : "1px solid rgba(201,168,76,0.4)",
                      flexShrink: 0,
                      marginTop: 4,
                      display: "inline-block",
                    }} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}