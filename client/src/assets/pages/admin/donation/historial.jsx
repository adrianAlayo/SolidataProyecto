import { useEffect, useState } from "react";
import SideMenu from "../../../components/SideMenu.jsx";
import { getDonations } from "../../../services/donation.service.js";
import "./DonationHistory.css";

export default function DonationHistory() {
  const [donations, setDonations] = useState([]);
  const [message, setMessage] = useState("Cargando donaciones...");

  useEffect(() => {
    getDonations().then((response) => {
      const rows = response.data || [];
      setDonations(rows);
      setMessage(rows.length ? "" : "Todavía no hay donaciones registradas.");
    }).catch(() => setMessage("No se pudieron cargar las donaciones."));
  }, []);

  return (
    <main className="donationHistoryPage">
      <SideMenu />
      <header className="donationHistoryHeading"><span>♡</span><div><h1>Historial de donaciones</h1><p>Consultá las donaciones registradas en SOLIDATA.</p></div></header>
      <section className="donationHistoryPanel">
        <div className="donationHistoryTitle">Donaciones <span>{donations.length} registros</span></div>
        {message ? <p className="donationHistoryMessage">{message}</p> : <div className="donationHistoryTableWrap"><table className="donationHistoryTable">
          <thead><tr><th>ID</th><th>Donante</th><th>Institución receptora</th><th>Fecha</th><th>Estado</th></tr></thead>
          <tbody>{donations.map((donation) => (
            <tr key={donation.id}>
              <td>#{donation.id}</td>
              <td>{[donation.donor?.first_name, donation.donor?.last_name].filter(Boolean).join(" ") || "—"}</td>
              <td>{donation.receiver_institution?.name || "—"}</td>
              <td>{donation.donation_date ? new Date(donation.donation_date).toLocaleDateString("es-AR") : "—"}</td>
              <td><span className={`donationHistoryStatus ${donation.status === "Delivered" ? "delivered" : "scheduled"}`}>{donation.status === "Delivered" ? "Entregada" : donation.status === "Not Delivered" ? "No entregada" : "Programada"}</span></td>
            </tr>
          ))}</tbody>
        </table></div>}
      </section>
    </main>
  );
}
