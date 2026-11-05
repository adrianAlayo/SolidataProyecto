import { useEffect, useState } from "react";
import SideMenu from "../../../components/SideMenu.jsx";
import { getNeeds } from "../../../services/institutionNeed.service.js";
import "./NeedsList.css";

export default function NeedsList() {
  const [needs, setNeeds] = useState([]);
  const [message, setMessage] = useState("Cargando necesidades...");

  useEffect(() => {
    getNeeds()
      .then((response) => {
        const rows = response.data || [];
        setNeeds(rows);
        setMessage(rows.length ? "" : "Todavía no hay necesidades registradas.");
      })
      .catch(() => setMessage("No se pudieron cargar las necesidades."));
  }, []);

  return (
    <main className="needsPage">
      <SideMenu />
      <header className="needsHeading">
        <span aria-hidden="true">▤</span>
        <div><h1>Gestión de necesidades</h1><p>Consultá las necesidades registradas por las instituciones.</p></div>
      </header>
      <section className="needsPanel">
        <div className="needsPanelTitle">Necesidades registradas <span>{needs.length}</span></div>
        {message ? <p className="needsMessage">{message}</p> : (
          <div className="needsTableWrap"><table className="needsTable">
            <thead><tr><th>ID</th><th>Institución</th><th>Artículo</th><th>Cantidad</th><th>Estado</th></tr></thead>
            <tbody>{needs.map((need) => <tr key={need.id}>
              <td>#{need.id}</td><td>{need.institution_id}</td><td>{need.article_id}</td>
              <td>{need.available}</td><td><span className={`needStatus ${need.status === "Resolved" ? "resolved" : "pending"}`}>{need.status === "Resolved" ? "Resuelta" : "Pendiente"}</span></td>
            </tr>)}</tbody>
          </table></div>
        )}
      </section>
    </main>
  );
}
