"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix icon default problem
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type MapProps = {
  position: [number, number] | null;
  onSelectMoment?: () => void;
};

export default function Map({ position, onSelectMoment }: MapProps) {
  return (
    <MapContainer
      center={[4.711, -74.0721]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {position && (
        <Marker 
          position={position}
          eventHandlers={{
            click: () => {
              onSelectMoment?.();
            }
          }}
          >
          <Popup>Nuevo momento descubierto</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
