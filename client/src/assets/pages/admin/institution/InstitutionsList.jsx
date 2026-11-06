import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SideMenu from "../../../components/SideMenu.jsx";
import Notification from "../../../components/Notification.jsx";
import TablePager from "../../../components/TablePager.jsx";
import { deleteInstitution, getInstitutions, updateInstitution } from "../../../services/institution.service.js";
import { getTypes } from "../../../services/type.service.js";
import "./InstitutionsList.css";

const typeLabel = { Donor: "Donante", Recipient: "Receptora", Both: "Donante y receptora" };
const statusLabel = { Active: "Activa", Inactive: "Inactiva", Pending: "Pendiente" };

export default function InstitutionsList() {
  const [institutions, setInstitutions] = useState([]);
  const [types, setTypes] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("name");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", location: "", institutionType: "Recipient", status: "Pending", type_id: "" });
  const [notice, setNotice] = useState({ open: false, message: "", severity: "success" });

  const loadData = useCallback(async () => {
    setLoading(true);
    const [institutionResult, typeResult] = await Promise.allSettled([getInstitutions(), getTypes()]);
    if (institutionResult.status === "fulfilled") setInstitutions(institutionResult.value.institutions || []);
    else setNotice({ open: true, message: institutionResult.reason.response?.data?.message || "No se pudieron cargar las instituciones.", severity: "error" });
    if (typeResult.status === "fulfilled") setTypes(typeResult.value.data?.data || []);
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const filtered = useMemo(() => institutions.filter((item) => {
    const text = `${item.name} ${item.location} ${item.Type?.name || ""} ${typeLabel[item.institutionType] || ""}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (status === "all" || item.status === status);
  }).sort((a, b) => sort === "location" ? a.location.localeCompare(b.location, "es") : a.name.localeCompare(b.name, "es")), [institutions, query, status, sort]);
  const pageRows = filtered.slice(page * pageSize, (page + 1) * pageSize);

  const save = async () => {
    try {
      const result = await updateInstitution(editingId, { ...form, type_id: Number(form.type_id) });
      setNotice({ open: true, message: result.message || "Institución actualizada.", severity: "success" });
      setEditingId(null);
      await loadData();
    } catch (error) {
      setNotice({ open: true, message: error.response?.data?.message || "No se pudo actualizar la institución.", severity: "error" });
    }
  };

  const remove = async (institution) => {
    if (!window.confirm(`¿Eliminar “${institution.name}”?`)) return;
    try {
      const result = await deleteInstitution(institution.id);
      setNotice({ open: true, message: result.message || "Institución eliminada.", severity: "success" });
      await loadData();
    } catch (error) {
      setNotice({ open: true, message: error.response?.data?.message || "No se pudo eliminar la institución.", severity: "error" });
    }
  };

  return <main className="institutionsPage"><SideMenu />
    <header className="institutionsHeading"><span aria-hidden="true">⌂</span><div><h1>Instituciones</h1><p>Consultá y administrá las instituciones registradas.</p></div><Link to="/register/institution" className="institutionsCreate">+ Registrar institución</Link></header>
    <section className="institutionsPanel">
      <div className="institutionsTitle">Instituciones <span>{filtered.length} de {institutions.length}</span></div>
      <div className="institutionsToolbar"><input aria-label="Buscar institución" placeholder="Buscar nombre, ubicación o categoría" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select aria-label="Filtrar por estado" value={status} onChange={(e) => setStatus(e.target.value)}><option value="all">Todos los estados</option><option value="Active">Activas</option><option value="Pending">Pendientes</option><option value="Inactive">Inactivas</option></select>
        <select aria-label="Ordenar instituciones" value={sort} onChange={(e) => setSort(e.target.value)}><option value="name">Nombre A–Z</option><option value="location">Ubicación</option></select>
      </div>
      {loading ? <p className="institutionsMessage">Cargando instituciones...</p> : filtered.length === 0 ? <p className="institutionsMessage">{institutions.length ? "No hay resultados para la búsqueda." : "Todavía no hay instituciones registradas."}</p> : <>
        <div className="institutionsTableWrap"><table className="institutionsTable"><thead><tr><th>Institución</th><th>Ubicación</th><th>Categoría</th><th>Participación</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>
          {pageRows.map((item) => <tr key={item.id}>{editingId === item.id ? <>
            <td><input aria-label="Nombre de institución" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></td>
            <td><input aria-label="Ubicación" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></td>
            <td><select aria-label="Categoría" value={form.type_id} onChange={(e) => setForm({ ...form, type_id: e.target.value })}>{types.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)}</select></td>
            <td><select aria-label="Participación" value={form.institutionType} onChange={(e) => setForm({ ...form, institutionType: e.target.value })}><option value="Donor">Donante</option><option value="Recipient">Receptora</option><option value="Both">Ambos</option></select></td>
            <td><select aria-label="Estado" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option value="Pending">Pendiente</option><option value="Active">Activa</option><option value="Inactive">Inactiva</option></select></td>
            <td className="institutionActions"><button onClick={save} disabled={!types.length}>Guardar</button><button className="quietAction" onClick={() => setEditingId(null)}>Cancelar</button></td>
          </> : <>
            <td className="institutionName">{item.name}</td><td>{item.location}</td><td>{item.Type?.name || "—"}</td><td>{typeLabel[item.institutionType] || item.institutionType}</td>
            <td><span className={`institutionStatus ${item.status?.toLowerCase()}`}>{statusLabel[item.status] || item.status}</span></td>
            <td className="institutionActions"><button onClick={() => { setEditingId(item.id); setForm({ name: item.name, location: item.location, institutionType: item.institutionType, status: item.status, type_id: String(item.type_id || item.Type?.id || "") }); }}>Editar</button><button className="deleteAction" onClick={() => remove(item)}>Eliminar</button></td>
          </>}</tr>)}
        </tbody></table></div><TablePager count={filtered.length} page={page} pageSize={pageSize} onPageChange={setPage} onPageSizeChange={(size) => { setPageSize(size); setPage(0); }} /></>}
    </section>
    <Notification open={notice.open} message={notice.message} severity={notice.severity} onClose={() => setNotice({ ...notice, open: false })} />
  </main>;
}
