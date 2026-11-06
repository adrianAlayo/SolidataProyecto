import { MapContainer, TileLayer } from "react-leaflet";
import "./MapView.css";

export default function MapView() {
  return (
    <section className="mapCard">
      <header className="mapCardHeader"><div><span className="mapEyebrow">UBICACIÓN</span><h2>Buenos Aires</h2><p>Explorá el mapa del área de operación.</p></div><a href="https://www.openstreetmap.org/?mlat=-34.6037&mlon=-58.3816#map=12/-34.6037/-58.3816" target="_blank" rel="noreferrer">Abrir mapa completo ↗</a></header>
      <div className="map-wrapper">
        <MapContainer center={[-34.6037, -58.3816]} zoom={11} scrollWheelZoom={false} className="map-container">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
        </MapContainer>
        <div className="mapOverlayLabel"><span /> Área metropolitana de Buenos Aires</div>
      </div>
      <div className="mapCardFooter"><span>Deslizá para explorar · Usá los controles para acercar</span><span>Mapa base © OpenStreetMap</span></div>
    </section>
  );
}
