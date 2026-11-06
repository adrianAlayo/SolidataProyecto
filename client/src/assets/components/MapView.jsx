import { useEffect, useMemo } from "react";
import L from "leaflet";
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import { DISTANCE_RANGES, distanceCategory, distanceInKm, ORIGIN } from "../utils/mapDistance.js";
import "./MapView.css";

const categoryDetails = {
  near: { label: "Cercana", color: "#25945c" },
  medium: { label: "Distancia media", color: "#e5a927" },
  far: { label: "Lejana", color: "#d74f4f" },
};
const hasCoordinates = (institution) => institution.latitude !== null && institution.latitude !== undefined && institution.latitude !== ""
  && institution.longitude !== null && institution.longitude !== undefined && institution.longitude !== ""
  && Number.isFinite(Number(institution.latitude)) && Number.isFinite(Number(institution.longitude))
  && Math.abs(Number(institution.latitude)) <= 90 && Math.abs(Number(institution.longitude)) <= 180;

function FitMap({ points }) {
  const map = useMap();
  useEffect(() => {
    if (points.length > 1) map.fitBounds(L.latLngBounds(points).pad(0.16), { maxZoom: 13 });
    else map.setView([ORIGIN.latitude, ORIGIN.longitude], 12);
  }, [map, points]);
  return null;
}

export default function MapView({ institutions, showInstitutionLayer = true, showDistanceStats = true, loading = false, onLocateMissing, locating = false, locateMessage = "" }) {
  const institutionRows = useMemo(() => Array.isArray(institutions) ? institutions : [], [institutions]);
  const institutionDataAvailable = Array.isArray(institutions);
  const located = useMemo(() => institutionRows.flatMap((institution) => {
    if (!hasCoordinates(institution)) return [];
    const latitude = Number(institution.latitude);
    const longitude = Number(institution.longitude);
    const distance = distanceInKm(ORIGIN, { latitude, longitude });
    const category = distanceCategory(distance);
    return [{ institution, latitude, longitude, distance, category }];
  }), [institutionRows]);
  const points = useMemo(() => [[ORIGIN.latitude, ORIGIN.longitude], ...located.map((item) => [item.latitude, item.longitude])], [located]);
  const unlocatedCount = institutionRows.filter((institution) => !hasCoordinates(institution)).length;
  const pendingGeocodeCount = institutionRows.filter((institution) => !institution.location_checked_at).length;
  const approximateCount = located.filter((item) => item.institution.location_accuracy === "locality").length;
  const counts = located.reduce((total, item) => ({ ...total, [item.category]: total[item.category] + 1 }), { near: 0, medium: 0, far: 0 });

  return <section className="mapCard">
    <header className="mapCardHeader"><div><span className="mapEyebrow">DISTRIBUCIÓN GEOGRÁFICA</span><h2>{showInstitutionLayer ? "Instituciones y distancias" : "Mapa de referencia"}</h2><p>{showInstitutionLayer ? "Distancia en línea recta desde Jujuy 255 · Colegio Confederación Suiza." : "Punto de referencia: Jujuy 255 · Colegio Confederación Suiza."}</p></div>
      <div className="mapHeaderActions">{showInstitutionLayer && onLocateMissing && pendingGeocodeCount > 0 && <button type="button" onClick={onLocateMissing} disabled={locating}>{locating ? "Buscando ubicaciones…" : `Revisar ${pendingGeocodeCount} direcciones`}</button>}<a href={`https://www.openstreetmap.org/?mlat=${ORIGIN.latitude}&mlon=${ORIGIN.longitude}#map=12/${ORIGIN.latitude}/${ORIGIN.longitude}`} target="_blank" rel="noreferrer">Abrir mapa completo ↗</a></div>
    </header>
    {locateMessage && <p className="mapLocateMessage" role="status">{locateMessage}</p>}
    <div className="map-wrapper">
      <MapContainer center={[ORIGIN.latitude, ORIGIN.longitude]} zoom={12} scrollWheelZoom className="map-container">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
        <FitMap points={points} />
        <CircleMarker center={[ORIGIN.latitude, ORIGIN.longitude]} radius={10} pathOptions={{ color: "#fff", weight: 3, fillColor: "#245da8", fillOpacity: 1 }}>
          <Popup><div className="mapPopup"><strong>Punto de origen</strong><span>Jujuy 255 · Colegio Confederación Suiza</span></div></Popup>
        </CircleMarker>
        {located.map(({ institution, latitude, longitude, distance, category }) => <CircleMarker key={institution.id} center={[latitude, longitude]} radius={8} pathOptions={{ color: "#fff", weight: 2, fillColor: categoryDetails[category].color, fillOpacity: 1 }}>
          <Popup><div className="mapPopup"><strong>{institution.name}</strong><span>{institution.location}</span><b>{distance.toFixed(1)} km · {categoryDetails[category].label}</b>{institution.location_accuracy === "locality" && <small>Ubicación aproximada al centro de la localidad</small>}</div></Popup>
        </CircleMarker>)}
      </MapContainer>
      <div className="mapOverlayLabel"><span />{!showInstitutionLayer ? "Punto de referencia" : loading ? "Cargando instituciones…" : institutionDataAvailable ? `${located.length} de ${institutionRows.length} ubicadas` : "Ubicaciones no disponibles"}</div>
    </div>
    {showInstitutionLayer && <div className="mapLegend" aria-label="Referencias del mapa">
      <span><i className="originLegend" /> Origen</span>
      <span><i className="nearLegend" /> Cercanas · 0–{DISTANCE_RANGES.nearMaxKm} km</span>
      <span><i className="mediumLegend" /> Intermedias · más de {DISTANCE_RANGES.nearMaxKm}–{DISTANCE_RANGES.mediumMaxKm} km</span>
      <span><i className="farLegend" /> Lejanas · más de {DISTANCE_RANGES.mediumMaxKm} km</span>
      <small>Los rangos son distancias geográficas aproximadas, no rutas viales. {approximateCount ? `${approximateCount} marcadores representan el centro de su localidad.` : ""}</small>
    </div>}
    {showDistanceStats && <div className="mapDistanceStats">
      <article className="distanceStat nearDistance"><strong>{loading ? "…" : institutionDataAvailable ? counts.near : "—"}</strong><span>Instituciones cercanas</span><small>Hasta {DISTANCE_RANGES.nearMaxKm} km</small></article>
      <article className="distanceStat mediumDistance"><strong>{loading ? "…" : institutionDataAvailable ? counts.medium : "—"}</strong><span>Distancia media</span><small>Hasta {DISTANCE_RANGES.mediumMaxKm} km</small></article>
      <article className="distanceStat farDistance"><strong>{loading ? "…" : institutionDataAvailable ? counts.far : "—"}</strong><span>Instituciones lejanas</span><small>Más de {DISTANCE_RANGES.mediumMaxKm} km</small></article>
    </div>}
    <div className="mapCardFooter"><span>{!showInstitutionLayer ? "Origen tomado del mapa oficial del GCBA" : loading ? "Cargando ubicaciones de instituciones…" : institutionDataAvailable ? `${unlocatedCount} sin coordenadas verificadas${approximateCount ? ` · ${approximateCount} ubicadas al centro de su localidad` : ""}` : "No se pudo cargar la lista de instituciones."}</span><span>Mapa base © OpenStreetMap</span></div>
  </section>;
}
