import { useCallback, useEffect, useMemo, useState } from "react";
import { CheckCircleRounded, LocalShippingRounded, RefreshRounded, SearchRounded, ScheduleRounded } from "@mui/icons-material";
import SideMenu from "../../components/SideMenu.jsx";
import Notification from "../../components/Notification.jsx";
import { getDonations, updateDonationStatus } from "../../services/donation.service.js";
import { getItems } from "../../services/donationItem.service.js";
import "./DeliveryBoard.css";

const labels = { Scheduled: "Pendiente", Delivered: "Entregada", "Not Delivered": "No entregada" };
const dateLabel = (value) => value && !Number.isNaN(new Date(value).getTime()) ? new Date(value).toLocaleDateString("es-AR") : "—";

export default function DeliveryBoard() {
  const [donations, setDonations] = useState([]);
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Scheduled");
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [notice, setNotice] = useState({ open: false, message: "", severity: "success" });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [donationsResponse, itemsResponse] = await Promise.all([getDonations(), getItems()]);
      setDonations(donationsResponse.data || []);
      setItems(itemsResponse.data || []);
    } catch (error) {
      setNotice({ open: true, message: error.response?.data?.message || "No se pudieron cargar las entregas.", severity: "error" });
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);
  const itemsByDonation = useMemo(() => items.reduce((grouped, item) => {
    const id = item.donation_id ?? item.Donation?.id;
    if (id != null) { grouped[id] ||= []; grouped[id].push(item); }
    return grouped;
  }, {}), [items]);
  const filtered = useMemo(() => donations.filter((donation) => {
    const products = (itemsByDonation[donation.id] || []).map((item) => item.Article?.name || "").join(" ");
    const text = `${donation.receiver_institution?.name || ""} ${products} ${donation.note || ""}`.toLocaleLowerCase("es");
    return (status === "all" || donation.status === status) && text.includes(query.trim().toLocaleLowerCase("es"));
  }), [donations, itemsByDonation, query, status]);
  const counts = donations.reduce((result, donation) => {
    if (donation.status === "Scheduled") result.pending++;
    else if (donation.status === "Delivered") result.delivered++;
    else if (donation.status === "Not Delivered") result.failed++;
    return result;
  }, { pending: 0, delivered: 0, failed: 0 });
  const changeStatus = async (donation, nextStatus) => {
    setSavingId(donation.id);
    try {
      await updateDonationStatus(donation.id, nextStatus);
      setNotice({ open: true, message: `Estado actualizado: ${labels[nextStatus]}.`, severity: "success" });
      await load();
    } catch (error) {
      setNotice({ open: true, message: error.response?.data?.message || "No se pudo actualizar el estado.", severity: "error" });
    } finally { setSavingId(null); }
  };

  return <main className="deliveryPage"><SideMenu />
    <header className="deliveryHeading"><span className="deliveryHeadingIcon"><LocalShippingRounded /></span><div><small>PREPARACIÓN Y SEGUIMIENTO</small><h1>Entregas</h1><p>Revisá las donaciones programadas y registrá su resultado.</p></div><button className="deliveryRefresh" onClick={load} disabled={loading}><RefreshRounded /> Actualizar</button></header>
    <section className="deliveryMetrics">
      <article><span className="deliveryMetricIcon pendingIcon"><ScheduleRounded /></span><div><small>Pendientes</small><strong>{loading ? "…" : counts.pending}</strong></div></article>
      <article><span className="deliveryMetricIcon completedIcon"><CheckCircleRounded /></span><div><small>Entregadas</small><strong>{loading ? "…" : counts.delivered}</strong></div></article>
      <article><span className="deliveryMetricIcon issueIcon"><LocalShippingRounded /></span><div><small>No entregadas</small><strong>{loading ? "…" : counts.failed}</strong></div></article>
    </section>
    <section className="deliveryPanel"><div className="deliveryPanelHeading"><h2>Seguimiento de donaciones</h2><p>El cambio de estado queda guardado en el sistema.</p></div>
      <div className="deliveryFilters"><label><SearchRounded /><input aria-label="Buscar entrega" placeholder="Buscar institución, artículo o nota" value={query} onChange={(event) => setQuery(event.target.value)} /></label><select aria-label="Filtrar entregas por estado" value={status} onChange={(event) => setStatus(event.target.value)}><option value="Scheduled">Pendientes</option><option value="Delivered">Entregadas</option><option value="Not Delivered">No entregadas</option><option value="all">Todos los estados</option></select></div>
      <div className="deliveryCount">{loading ? "Cargando entregas…" : `${filtered.length} de ${donations.length} donaciones`}</div>
      {loading ? <p className="deliveryEmpty">Cargando información…</p> : !filtered.length ? <p className="deliveryEmpty">No hay donaciones para mostrar con este filtro.</p> : <div className="deliveryTableWrap"><table className="deliveryTable"><thead><tr><th>Institución</th><th>Productos</th><th>Fecha</th><th>Estado</th><th>Acción</th></tr></thead><tbody>
        {filtered.map((donation) => {
          const products = itemsByDonation[donation.id] || [];
          const stateClass = donation.status === "Delivered" ? "done" : donation.status === "Not Delivered" ? "failed" : "waiting";
          return <tr key={donation.id}><td><strong>{donation.receiver_institution?.name || "Institución sin asignar"}</strong><small>Donación #{donation.id}</small></td><td>{products.length ? products.map((item) => <span className="deliveryProduct" key={item.id}>{item.Article?.name || "Artículo"} · {item.quantity} {item.Article?.unit || "unid."}</span>) : <span className="deliveryNoItems">Sin artículos cargados</span>}</td><td>{dateLabel(donation.donation_date)}</td><td><span className={`deliveryStatus ${stateClass}`}>{labels[donation.status] || donation.status}</span></td><td className="deliveryActions">{donation.status === "Delivered" ? <span className="deliveryConfirmed"><CheckCircleRounded /> Registrada</span> : donation.status === "Not Delivered" ? <button disabled={savingId === donation.id} onClick={() => changeStatus(donation, "Scheduled")}>Reprogramar</button> : <><button disabled={savingId === donation.id} onClick={() => changeStatus(donation, "Delivered")}>{savingId === donation.id ? "Guardando…" : "Registrar entrega"}</button><button className="deliveryFailAction" disabled={savingId === donation.id} onClick={() => changeStatus(donation, "Not Delivered")}>No entregada</button></>}</td></tr>;
        })}
      </tbody></table></div>}
      <p className="deliveryFootnote">Esta vista registra el estado de entrega. La asignación de cantidades desde necesidades y la reserva automática de stock todavía no están conectadas.</p>
    </section>
    <Notification open={notice.open} message={notice.message} severity={notice.severity} onClose={() => setNotice({ ...notice, open: false })} />
  </main>;
}
