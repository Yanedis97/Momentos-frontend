"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: string })._getIconUrl;

// Ícono SVG con anillo pulsante
function createPulseIcon() {
  return L.divIcon({
    className: "",
    html: `
      <div style="position:relative;width:40px;height:40px;display:flex;align-items:center;justify-content:center;">
        <div style="
          position:absolute;
          width:40px;height:40px;
          border-radius:50%;
          background:rgba(251,191,36,0.25);
          animation:pulse-ring 1.8s ease-out infinite;
        "></div>
        <div style="
          width:18px;height:18px;
          border-radius:50%;
          background:#F59E0B;
          border:3px solid #fff;
          box-shadow:0 0 0 2px #F59E0B;
          position:relative;z-index:1;
        "></div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -22],
  });
}

// Auto-fly al marcador cuando cambia la posición
function FlyToPosition({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 5, { duration: 1.4 });
  }, [position, map]);
  return null;
}

type MapProps = {
  position: [number, number] | null;
  momentTitle?: string | null;
  onSelectMoment?: () => void;
};

export default function Map({ position, momentTitle, onSelectMoment }: MapProps) {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {position && (
        <>
          <FlyToPosition position={position} />
          <Marker
            position={position}
            icon={createPulseIcon()}
            eventHandlers={{ click: () => onSelectMoment?.() }}
          >
            <Popup>
              <div style={{ fontFamily: "sans-serif", fontSize: 13, minWidth: 140 }}>
                <p style={{ margin: "0 0 6px", fontWeight: 600, color: "#1a1a1a" }}>
                  {momentTitle ?? "Momento descubierto"}
                </p>
                <button
                  onClick={onSelectMoment}
                  style={{
                    background: "#F59E0B",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "5px 12px",
                    cursor: "pointer",
                    width: "100%",
                    fontWeight: 600,
                  }}
                >
                  Jugar →
                </button>
              </div>
            </Popup>
          </Marker>
        </>
      )}
    </MapContainer>
  );
}
