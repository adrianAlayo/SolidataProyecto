import { useCallback, useEffect, useMemo, useState } from "react";
import { AssessmentRounded, DownloadRounded, Inventory2Rounded, LocalShippingRounded, RefreshRounded, SearchRounded } from "@mui/icons-material";
import SideMenu from "../../components/SideMenu.jsx";
import { getDonations } from "../../services/donation.service.js";
import { getInventories } from "../../services/inventory.service.js";
import { getNeeds } from "../../services/institutionNeed.service.js";
import "./ReportsPage.css";

const tabs = ["Donaciones", "Inventario", "Necesidades"];
const dateLabel = (value) => value && !Number.isNaN(new Date(value).getTime()) ? new Date(value).toLocaleDateString("es-AR") : "—";
const stateLabel = (value) => ({ Scheduled: "Programada", Delivered: "Entregada", "Not Delivered": "No entregada", Pending: "Pendiente", Resolved: "Resuelta" }[value] || value || "—");
const csvValue = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;

export default function ReportsPage() {
  const [data, setData] = useState({ donations: [], inventory: [], needs: [] });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("Donaciones");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");

  const loadReports = useCallback(async () => {
    setLoading(true);
    const results = await Promise.allSettled([getDonations(), getInventories(), getNeeds()]);
    setData({
      donations: results[0].status === "fulfilled" ? results[0].value.data || [] : [],
      inventory: results[1].status === "fulfilled" ? results[1].value.data || [] : [],
      needs: results[2].status === "fulfilled" ? results[2].value.data || [] : [],
    });
    setErrors(results.flatMap((result, index) => result.status === "rejected" ? [tabs[index] === "Donaciones" ? "donaciones" : tabs[index].toLowerCase()] : []));
    setLoading(false);
  }, []);

  useEffect(() => { loadReports(); }, [loadReports]);

  const stockRows = useMemo(() => {
    const grouped = new Map();
    data.inventory.forEach((record) => {
      const item = record.DonationItem || {};
      const article = item.Article || {};
      const key = `${article.name || "Artículo sin nombre"}|${article.variant || ""}|${record.area || "Sin sector"}`;
      const current = grouped.get(key) || { name: article.name || "Artículo sin nombre", variant: article.variant || "—", area: record.area || "Sin sector", available: 0 };
      current.available += Number(record.available || 0);
      grouped.set(key, current);
    });
    return [...grouped.values()].sort((a, b) => a.name.localeCompare(b.name, "es"));
  }, [data.inventory]);

  const rows = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("es");
    if (tab === "Inventario") return stockRows.filter((row) => `${row.name} ${row.variant} ${row.area}`.toLocaleLowerCase("es").includes(needle));
    if (tab === "Necesidades") return data.needs.filter((row) => `${row.Institution?.name || ""} ${row.Article?.name || ""} ${row.Article?.variant || ""}`.toLocaleLowerCase("es").includes(needle) && (status === "all" || row.status === status));
    return data.donations.filter((row) => `${row.receiver_institution?.name || ""} ${row.note || ""}`.toLocaleLowerCase("es").includes(needle) && (status === "all" || row.status === status)).sort((a, b) => {
      const diff = new Date(a.donation_date).getTime() - new Date(b.donation_date).getTime();
      return sort === "oldest" ? diff : -diff;
    });
  }, [data, query, sort, status, stockRows, tab]);

  const totalStock = data.inventory.reduce((sum, item) => sum + Number(item.available || 0), 0);
  const delivered = data.donations.filter((item) => item.status === "Delivered").length;

  const downloadCsv = () => {
    const reportRows = tab === "Donaciones"
      ? [["Institución receptora", "Fecha", "Estado", "Nota"], ...rows.map((row) => [row.receiver_institution?.name, dateLabel(row.donation_date), stateLabel(row.status), row.note])]
      : tab === "Inventario"
        ? [["Artículo", "Variante", "Sector", "Disponible"], ...rows.map((row) => [row.name, row.variant, row.area, row.available])]
        : [["Institución", "Artículo", "Cantidad", "Estado"], ...rows.map((row) => [row.Institution?.name, row.Article?.name, row.available, stateLabel(row.status)])];
    const csv = `\uFEFF${reportRows.map((row) => row.map(csvValue).join(",")).join("\r\n")}`;
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `solidata-reporte-${tab.toLowerCase()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return <main className="reportsPage"><SideMenu />
    <header className="reportsHeading"><span className="reportsHeadingIcon"><AssessmentRounded /></span><div><small>RESUMEN Y CONSULTA</small><h1>Reportes</h1><p>Consultá donaciones, stock y necesidades con información registrada.</p></div><button className="reportsRefresh" onClick={loadReports} disabled={loading}><RefreshRounded /> Actualizar</button></header>
    <section className="reportsMetrics">
      <article><span className="reportMetricIcon donationsMetric"><LocalShippingRounded /></span><div><small>Donaciones registradas</small><strong>{loading ? "…" : data.donations.length}</strong></div></article>
      <article><span className="reportMetricIcon deliveredMetric"><AssessmentRounded /></span><div><small>Entregadas</small><strong>{loading ? "…" : delivered}</strong></div></article>
      <article><span className="reportMetricIcon stockMetric"><Inventory2Rounded /></span><div><small>Unidades disponibles</small><strong>{loading ? "…" : totalStock.toLocaleString("es-AR")}</strong></div></article>
      <article><span className="reportMetricIcon needsMetric"><AssessmentRounded /></span><div><small>Necesidades pendientes</small><strong>{loading ? "…" : data.needs.filter((item) => item.status === "Pending").length}</strong></div></article>
    </section>
    {errors.length > 0 && <p className="reportsNotice" role="status">No se pudieron cargar: {errors.join(", ")}. Podés reintentar con “Actualizar”.</p>}
    <section className="reportsPanel">
      <div className="reportsPanelTop"><div><h2>Detalle de actividad</h2><p>Buscá, filtrá y descargá los datos visibles.</p></div><button className="reportsExport" onClick={downloadCsv} disabled={loading || !rows.length}><DownloadRounded /> Descargar CSV</button></div>
      <div className="reportsTabs" role="tablist" aria-label="Tipo de reporte">{tabs.map((name) => <button role="tab" aria-selected={tab === name} className={tab === name ? "selected" : ""} key={name} onClick={() => { setTab(name); setStatus("all"); }}>{name}</button>)}</div>
      <div className="reportsFilters"><label><SearchRounded /><input aria-label="Buscar en el reporte" placeholder={tab === "Donaciones" ? "Buscar institución o nota" : tab === "Inventario" ? "Buscar artículo o sector" : "Buscar institución o artículo"} value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        {tab !== "Inventario" && <select aria-label="Filtrar por estado" value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">Todos los estados</option>{(tab === "Donaciones" ? [["Scheduled", "Programada"], ["Delivered", "Entregada"], ["Not Delivered", "No entregada"]] : [["Pending", "Pendiente"], ["Resolved", "Resuelta"]]).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>}
        {tab === "Donaciones" && <select aria-label="Ordenar por fecha" value={sort} onChange={(event) => setSort(event.target.value)}><option value="newest">Más recientes</option><option value="oldest">Más antiguas</option></select>}
      </div>
      <div className="reportsCount">{loading ? "Cargando información…" : `${rows.length} de ${tab === "Donaciones" ? data.donations.length : tab === "Inventario" ? stockRows.length : data.needs.length} registros`}</div>
      {loading ? <p className="reportsEmpty">Cargando reporte…</p> : !rows.length ? <p className="reportsEmpty">No hay registros para mostrar con estos filtros.</p> : <div className="reportsTableWrap"><table className="reportsTable"><thead><tr>{tab === "Donaciones" ? <><th>Institución receptora</th><th>Fecha</th><th>Estado</th><th>Nota</th></> : tab === "Inventario" ? <><th>Artículo</th><th>Variante</th><th>Sector</th><th>Disponible</th></> : <><th>Institución</th><th>Artículo</th><th>Cantidad</th><th>Estado</th></>}</tr></thead>
        <tbody>{rows.map((row, index) => tab === "Donaciones" ? <tr key={row.id}><td>{row.receiver_institution?.name || "—"}</td><td>{dateLabel(row.donation_date)}</td><td><span className={`reportStatus ${row.status === "Delivered" ? "done" : row.status === "Not Delivered" ? "cancelled" : "pending"}`}>{stateLabel(row.status)}</span></td><td>{row.note || "—"}</td></tr> : tab === "Inventario" ? <tr key={`${row.name}-${row.area}-${index}`}><td>{row.name}</td><td>{row.variant}</td><td>{row.area}</td><td>{row.available.toLocaleString("es-AR")}</td></tr> : <tr key={row.id}><td>{row.Institution?.name || "—"}</td><td>{row.Article?.name || "—"}</td><td>{Number(row.available || 0).toLocaleString("es-AR")}</td><td><span className={`reportStatus ${row.status === "Resolved" ? "done" : "pending"}`}>{stateLabel(row.status)}</span></td></tr>)}</tbody>
      </table></div>}
    </section>
    <footer className="reportsFooter">SOLIDATA · Datos consultados en la base del sistema.</footer>
  </main>;
}
