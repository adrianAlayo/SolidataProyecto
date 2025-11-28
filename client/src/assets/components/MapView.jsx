import { MapContainer, TileLayer } from "react-leaflet";
import "./MapView.css";

export default function MapView() {
  return (
    <div className="map-wrapper">
      <MapContainer
        center={[-34.6037, -58.3816]} // coordenadas de ejemplo (Buenos Aires)
        zoom={13}
        scrollWheelZoom={true}
        className="map-container"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
      </MapContainer>
    </div>
  );
}
