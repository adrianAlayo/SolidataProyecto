import { useEffect, useState } from "react";
import SideMenu from "../../../components/SideMenu.jsx";
import TablePager from "../../../components/TablePager.jsx";
import { getInventories } from "../../../services/inventory.service.js";
import "./InventoryList.css";

export default function InventoryList() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("Cargando inventario...");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const pageRows = items.slice(page * pageSize, (page + 1) * pageSize);

  useEffect(() => {
    getInventories().then((response) => {
      const rows = response.data || [];
      setItems(rows);
      setMessage(rows.length ? "" : "Todavía no hay artículos en inventario.");
    }).catch(() => setMessage("No se pudo cargar el inventario."));
  }, []);

  return (
    <main className="inventoryPage">
      <SideMenu />
      <header className="inventoryHeading"><span>▦</span><div><h1>Inventario</h1><p>Consulta el stock disponible por artículo y sector.</p></div></header>
      <section className="inventoryPanel">
        <div className="inventoryPanelTitle">Stock registrado <span>{items.length} registros</span></div>
        {message ? <p className="inventoryMessage">{message}</p> : <><div className="inventoryTableWrap"><table className="inventoryTable">
          <thead><tr><th>Artículo</th><th>Variante</th><th>Sector</th><th>Disponible</th></tr></thead>
          <tbody>{pageRows.map((item) => <tr key={item.id}>
            <td>{item.DonationItem?.Article?.name || `Artículo ${item.DonationItem?.article_id || ""}`}</td>
            <td>{item.DonationItem?.Article?.variant || "—"}</td><td>{item.area}</td><td>{item.available}</td>
          </tr>)}</tbody>
        </table></div><TablePager count={items.length} page={page} pageSize={pageSize} onPageChange={setPage} onPageSizeChange={(size) => { setPageSize(size); setPage(0); }} /></>}
      </section>
    </main>
  );
}
