import { useCallback, useEffect, useMemo, useState } from "react";
import SideMenu from "../../../components/SideMenu.jsx";
import Notification from "../../../components/Notification.jsx";
import { deleteDonation, getDonations, updateDonation, updateDonationStatus } from "../../../services/donation.service.js";
import "./DonationHistory.css";

const personName = (person) => [person?.first_name, person?.last_name].filter(Boolean).join(" ") || "—";

export default function DonationHistory() {
  const [donations, setDonations] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");
  const [message, setMessage] = useState("Cargando donaciones...");
  const [notice, setNotice] = useState({ open: false, message: "", severity: "success" });
  const [editingId, setEditingId] = useState(null);
  const [edit, setEdit] = useState({ donation_date: "", note: "" });

  const loadDonations = useCallback(async () => {
    try {
      const response = await getDonations();
      const rows = response.data || [];
      setDonations(rows);
      setMessage(rows.length ? "" : "Todavía no hay donaciones registradas.");
    } catch {
      setMessage("No se pudieron cargar las donaciones.");
    }
  }, []);

  useEffect(() => { loadDonations(); }, [loadDonations]);

  const filtered = useMemo(() => donations.filter((donation) => {
    const text = `${personName(donation.donor)} ${donation.receiver_institution?.name || ""} ${donation.note || ""}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (status === "all" || donation.status === status);
  }).sort((a, b) => {
    const dateA = new Date(a.donation_date).getTime();
    const dateB = new Date(b.donation_date).getTime();
    return sort === "oldest" ? dateA - dateB : dateB - dateA;
  }), [donations, query, status, sort]);

  const runAction = async (action, success) => {
    try {
      await action();
      setNotice({ open: true, message: success, severity: "success" });
      setEditingId(null);
      await loadDonations();
    } catch (error) {
      setNotice({ open: true, message: error.response?.data?.message || "No se pudo completar la operación.", severity: "error" });
    }
  };

  const beginEdit = (donation) => {
    setEditingId(donation.id);
    setEdit({ donation_date: donation.donation_date?.slice(0, 10) || "", note: donation.note || "" });
  };

  return (
    <main className="donationHistoryPage">
      <SideMenu />
      <header className="donationHistoryHeading"><span>♡</span><div><h1>Historial de donaciones</h1><p>Buscá y administrá las donaciones registradas.</p></div></header>
      <section className="donationHistoryPanel">
        <div className="donationHistoryTitle">Donaciones <span>{filtered.length} de {donations.length} registros</span></div>
        <div className="donationHistoryFilters">
          <input aria-label="Buscar donación" placeholder="Buscar por donante, institución o nota" value={query} onChange={(e) => setQuery(e.target.value)} />
          <select aria-label="Filtrar por estado" value={status} onChange={(e) => setStatus(e.target.value)}><option value="all">Todos los estados</option><option value="Scheduled">Programada</option><option value="Delivered">Entregada</option><option value="Not Delivered">No entregada</option></select>
          <select aria-label="Ordenar por fecha" value={sort} onChange={(e) => setSort(e.target.value)}><option value="newest">Más recientes</option><option value="oldest">Más antiguas</option></select>
        </div>
        {message && donations.length === 0 ? <p className="donationHistoryMessage">{message}</p> : filtered.length === 0 ? <p className="donationHistoryMessage">No hay resultados para la búsqueda.</p> : (
          <div className="donationHistoryTableWrap"><table className="donationHistoryTable"><thead><tr><th>Donante</th><th>Institución receptora</th><th>Fecha</th><th>Nota</th><th>Estado</th><th>Acciones</th></tr></thead>
            <tbody>{filtered.map((donation) => <tr key={donation.id}>
              <td>{personName(donation.donor)}</td><td>{donation.receiver_institution?.name || "—"}</td>
              <td>{editingId === donation.id ? <input type="date" value={edit.donation_date} onChange={(e) => setEdit({ ...edit, donation_date: e.target.value })} /> : new Date(donation.donation_date).toLocaleDateString("es-AR")}</td>
              <td>{editingId === donation.id ? <input value={edit.note} onChange={(e) => setEdit({ ...edit, note: e.target.value })} placeholder="Nota opcional" /> : donation.note || "—"}</td>
              <td><span className={`donationHistoryStatus ${donation.status === "Delivered" ? "delivered" : "scheduled"}`}>{donation.status === "Delivered" ? "Entregada" : donation.status === "Not Delivered" ? "No entregada" : "Programada"}</span><select aria-label={`Estado de donación ${donation.id}`} value={donation.status} onChange={(e) => runAction(() => updateDonationStatus(donation.id, e.target.value), "Estado actualizado.")}><option value="Scheduled">Programada</option><option value="Delivered">Entregada</option><option value="Not Delivered">No entregada</option></select></td>
        <td className="donationActions">{editingId === donation.id ? <><button onClick={() => runAction(() => updateDonation(donation.id, edit), "Donación actualizada.")}>Guardar</button><button className="quietAction" onClick={() => setEditingId(null)}>Cancelar</button></> : <button onClick={() => beginEdit(donation)}>Editar</button>}<button className="deleteAction" onClick={() => window.confirm("¿Eliminar esta donación y sus artículos asociados?") && runAction(() => deleteDonation(donation.id), "Donación eliminada.")}>Eliminar</button></td>
            </tr>)}</tbody>
          </table></div>
        )}
      </section>
      <Notification open={notice.open} message={notice.message} severity={notice.severity} onClose={() => setNotice({ ...notice, open: false })} />
    </main>
  );
}
