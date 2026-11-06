import { useEffect, useMemo, useState } from "react";
import SideMenu from "../../../components/SideMenu.jsx";
import { getNeeds } from "../../../services/institutionNeed.service.js";
import "./NeedsList.css";

export default function NeedsList() {
  const [needs, setNeeds] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");
  const [message, setMessage] = useState("Cargando necesidades...");

  useEffect(() => {
    getNeeds().then((response) => {
      const rows = response.data || [];
      setNeeds(rows);
      setMessage(rows.length ? "" : "Todavía no hay necesidades registradas.");
    }).catch(() => setMessage("No se pudieron cargar las necesidades."));
  }, []);

  const filtered = useMemo(() => needs.filter((need) => {
    const text = `${need.Institution?.name || ""} ${need.Article?.name || ""} ${need.Article?.category || ""}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (status === "all" || need.status === status);
  }).sort((a, b) => {
    const timeA = new Date(a.createdAt || 0).getTime();
    const timeB = new Date(b.createdAt || 0).getTime();
    return sort === "oldest" ? timeA - timeB : timeB - timeA;
  }), [needs, query, status, sort]);

  return (
    <main className="needsPage">
      <SideMenu />
      <header className="needsHeading"><span aria-hidden="true">▤</span><div><h1>Gestión de necesidades</h1><p>Consultá las necesidades registradas por las instituciones.</p></div></header>
      <section className="needsPanel">
        <div className="needsPanelTitle">Necesidades registradas <span>{filtered.length} de {needs.length}</span></div>
        <div className="needsFilters">
          <input aria-label="Buscar necesidad" placeholder="Buscar por institución o artículo" value={query} onChange={(e) => setQuery(e.target.value)} />
          <select aria-label="Filtrar por estado" value={status} onChange={(e) => setStatus(e.target.value)}><option value="all">Todos los estados</option><option value="Pending">Pendiente</option><option value="Resolved">Resuelta</option></select>
          <select aria-label="Ordenar por fecha" value={sort} onChange={(e) => setSort(e.target.value)}><option value="newest">Más recientes</option><option value="oldest">Más antiguas</option></select>
        </div>
        {message && needs.length === 0 ? <p className="needsMessage">{message}</p> : filtered.length === 0 ? <p className="needsMessage">No hay resultados para la búsqueda.</p> : (
          <div className="needsTableWrap"><table className="needsTable"><thead><tr><th>Institución</th><th>Artículo</th><th>Categoría</th><th>Cantidad</th><th>Fecha</th><th>Estado</th></tr></thead>
            <tbody>{filtered.map((need) => <tr key={need.id}>
              <td>{need.Institution?.name || "Institución"}</td><td>{need.Article?.name || "Artículo"}{need.Article?.variant ? ` · ${need.Article.variant}` : ""}</td><td>{need.Article?.category || "—"}</td><td>{need.available} {need.Article?.unit || ""}</td>
              <td>{need.createdAt ? new Date(need.createdAt).toLocaleDateString("es-AR") : "—"}</td>
              <td><span className={`needStatus ${need.status === "Resolved" ? "resolved" : "pending"}`}>{need.status === "Resolved" ? "Resuelta" : "Pendiente"}</span></td>
            </tr>)}</tbody>
          </table></div>
        )}
      </section>
    </main>
  );
}
