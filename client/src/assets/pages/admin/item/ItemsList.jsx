import { useCallback, useEffect, useMemo, useState } from "react";
import SideMenu from "../../../components/SideMenu.jsx";
import Notification from "../../../components/Notification.jsx";
import TablePager from "../../../components/TablePager.jsx";
import { deleteItem, getItems, updateItem } from "../../../services/donationItem.service.js";
import "./ItemsList.css";

export default function ItemsList() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [message, setMessage] = useState("Cargando artículos...");
  const [editingId, setEditingId] = useState(null);
  const [edit, setEdit] = useState({ quantity: "", expiration_date: "", note: "" });
  const [notice, setNotice] = useState({ open: false, message: "", severity: "success" });

  const loadItems = useCallback(async () => {
    try {
      const response = await getItems();
      setItems(response.data || []);
      setMessage(response.data?.length ? "" : "Todavía no hay artículos registrados en donaciones.");
    } catch { setMessage("No se pudieron cargar los artículos."); }
  }, []);
  useEffect(() => { loadItems(); }, [loadItems]);

  const filtered = useMemo(() => items.filter((item) => `${item.Article?.name || ""} ${item.Donation?.donor?.first_name || ""} ${item.Donation?.receiver_institution?.name || ""} ${item.note || ""}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => {
    const dateA = new Date(a.Donation?.donation_date || a.createdAt || 0).getTime();
    const dateB = new Date(b.Donation?.donation_date || b.createdAt || 0).getTime();
    return sort === "oldest" ? dateA - dateB : dateB - dateA;
  }), [items, query, sort]);
  const pageRows = filtered.slice(page * pageSize, (page + 1) * pageSize);

  const runAction = async (action, message) => {
    try {
      await action(); setNotice({ open: true, message, severity: "success" }); setEditingId(null); await loadItems();
    } catch (error) { setNotice({ open: true, message: error.response?.data?.message || "No se pudo completar la operación.", severity: "error" }); }
  };

  return <main className="itemsPage"><SideMenu />
    <header className="itemsHeading"><span>▦</span><div><h1>Artículos de donaciones</h1><p>Consultá y administrá los productos recibidos.</p></div></header>
    <section className="itemsPanel"><div className="itemsTitle">Artículos <span>{filtered.length} de {items.length} registros</span></div>
      <div className="itemsFilters"><input aria-label="Buscar artículo" placeholder="Buscar artículo o nota" value={query} onChange={(e) => setQuery(e.target.value)} /><select aria-label="Ordenar por fecha" value={sort} onChange={(e) => setSort(e.target.value)}><option value="newest">Donaciones recientes</option><option value="oldest">Donaciones antiguas</option></select></div>
      {message && items.length === 0 ? <p className="itemsMessage">{message}</p> : filtered.length === 0 ? <p className="itemsMessage">No hay resultados para la búsqueda.</p> : <><div className="itemsTableWrap"><table className="itemsTable"><thead><tr><th>Artículo</th><th>Donación</th><th>Cantidad</th><th>Vencimiento</th><th>Nota</th><th>Acciones</th></tr></thead><tbody>{pageRows.map((item) => <tr key={item.id}>
        <td>{item.Article?.name || "Artículo"}{item.Article?.variant ? ` · ${item.Article.variant}` : ""}</td><td>{item.Donation ? `${new Date(item.Donation.donation_date).toLocaleDateString("es-AR")} · ${item.Donation.status === "Delivered" ? "Entregada" : "Programada"}` : "—"}</td>
        <td>{editingId === item.id ? <input type="number" min="1" value={edit.quantity} onChange={(e) => setEdit({ ...edit, quantity: e.target.value })} /> : `${item.quantity} ${item.Article?.unit || ""}`}</td>
        <td>{editingId === item.id ? <input type="date" min={new Date().toISOString().slice(0, 10)} value={edit.expiration_date} onChange={(e) => setEdit({ ...edit, expiration_date: e.target.value })} /> : item.expiration_date ? new Date(item.expiration_date).toLocaleDateString("es-AR") : "—"}</td>
        <td>{editingId === item.id ? <input value={edit.note} onChange={(e) => setEdit({ ...edit, note: e.target.value })} /> : item.note || "—"}</td>
        <td className="itemActions">{editingId === item.id ? <><button onClick={() => runAction(() => updateItem(item.id, { quantity: Number(edit.quantity), expiration_date: edit.expiration_date, note: edit.note }), "Artículo actualizado.")}>Guardar</button><button className="quietAction" onClick={() => setEditingId(null)}>Cancelar</button></> : <button onClick={() => { setEditingId(item.id); setEdit({ quantity: item.quantity, expiration_date: item.expiration_date?.slice(0, 10) || "", note: item.note || "" }); }}>Editar</button>}<button className="deleteAction" onClick={() => window.confirm("¿Eliminar este artículo de la donación?") && runAction(() => deleteItem(item.id), "Artículo eliminado.")}>Eliminar</button></td>
      </tr>)}</tbody></table></div><TablePager count={filtered.length} page={page} pageSize={pageSize} onPageChange={setPage} onPageSizeChange={(size) => { setPageSize(size); setPage(0); }} /></>}
    </section><Notification open={notice.open} message={notice.message} severity={notice.severity} onClose={() => setNotice({ ...notice, open: false })} />
  </main>;
}
