import { useCallback, useEffect, useMemo, useState } from "react";
import SideMenu from "../../../components/SideMenu.jsx";
import Notification from "../../../components/Notification.jsx";
import TablePager from "../../../components/TablePager.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import { hasPermission } from "../../../utils/rolePermissions.js";
import { GetArticles } from "../../../services/article.service.js";
import { getInstitutions } from "../../../services/institution.service.js";
import { createNeed, deleteNeed, getNeeds, updateNeed, updateNeedStatus } from "../../../services/institutionNeed.service.js";
import "./NeedsList.css";

const emptyForm = { institution_id: "", article_id: "", available: "" };

export default function NeedsList() {
  const { user, permissions = [] } = useAuth();
  const isAdmin = Number(user?.rol) === 1;
  const isInstitution = Number(user?.rol) === 4;
  const canReadNeed = isAdmin || hasPermission(permissions, "INSTITUTIONNEEDS", "READ");
  const canCreateNeed = isAdmin || hasPermission(permissions, "INSTITUTIONNEEDS", "CREATE");
  const canUpdateNeed = isAdmin || hasPermission(permissions, "INSTITUTIONNEEDS", "UPDATE");
  const canApproveNeed = isAdmin || hasPermission(permissions, "INSTITUTIONNEEDS", "APPROVE");
  const canDeleteNeed = isAdmin || hasPermission(permissions, "INSTITUTIONNEEDS", "DELETE");
  const [needs, setNeeds] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [notice, setNotice] = useState({ open: false, message: "", severity: "success" });

  const loadData = useCallback(async () => {
    if (!canReadNeed) { setNeeds([]); setLoading(false); return; }
    setLoading(true);
    try {
      const response = await getNeeds();
      setNeeds(response.data || []);
    } catch (error) {
      setNotice({ open: true, message: error.response?.data?.message || "No se pudieron cargar las necesidades.", severity: "error" });
    } finally {
      setLoading(false);
    }
  }, [canReadNeed]);

  useEffect(() => {
    loadData();
    Promise.allSettled([GetArticles(), isInstitution ? Promise.resolve(null) : getInstitutions()]).then(([articleResult, institutionResult]) => {
      if (articleResult.status === "fulfilled") setArticles(articleResult.value.data || []);
      if (institutionResult?.status === "fulfilled" && institutionResult.value) setInstitutions(institutionResult.value.institutions || []);
    });
  }, [loadData, isInstitution, canCreateNeed, canUpdateNeed]);

  const filtered = useMemo(() => needs.filter((need) => {
    const text = `${need.Institution?.name || ""} ${need.Article?.name || ""} ${need.Article?.category || ""} ${need.Article?.variant || ""}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (status === "all" || need.status === status);
  }).sort((a, b) => {
    const timeA = new Date(a.createdAt || 0).getTime();
    const timeB = new Date(b.createdAt || 0).getTime();
    return sort === "oldest" ? timeA - timeB : timeB - timeA;
  }), [needs, query, status, sort]);
  const pageRows = filtered.slice(page * pageSize, (page + 1) * pageSize);

  const save = async (event) => {
    event.preventDefault();
    if (editingId ? !canUpdateNeed : !canCreateNeed) {
      setNotice({ open: true, message: "No tenés permiso para realizar esta operación.", severity: "error" });
      return;
    }
    if (!Number.isInteger(Number(form.available)) || Number(form.available) <= 0 || !form.article_id || (!isInstitution && !form.institution_id)) {
      setNotice({ open: true, message: "Elegí una institución y un artículo, e ingresá una cantidad mayor a cero.", severity: "warning" });
      return;
    }
    setSaving(true);
    try {
      const payload = { article_id: Number(form.article_id), available: Number(form.available) };
      const result = editingId
        ? await updateNeed(editingId, payload)
        : await createNeed(isInstitution ? payload : { ...payload, institution_id: Number(form.institution_id) });
      setNotice({ open: true, message: result.message || "Necesidad guardada.", severity: "success" });
      setForm(emptyForm);
      setEditingId(null);
      await loadData();
    } catch (error) {
      setNotice({ open: true, message: error.response?.data?.message || "No se pudo guardar la necesidad.", severity: "error" });
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (need) => {
    setEditingId(need.id);
    setForm({ institution_id: String(need.institution_id), article_id: String(need.article_id), available: String(need.available) });
  };

  const remove = async (need) => {
    if (!window.confirm(`¿Eliminar la necesidad de ${need.Institution?.name || "la institución"} para ${need.Article?.name || "este artículo"}?`)) return;
    try {
      const result = await deleteNeed(need.id);
      setNotice({ open: true, message: result.message || "Necesidad eliminada.", severity: "success" });
      await loadData();
    } catch (error) {
      setNotice({ open: true, message: error.response?.data?.message || "No se pudo eliminar la necesidad.", severity: "error" });
    }
  };

  const changeStatus = async (need) => {
    const nextStatus = need.status === "Resolved" ? "Pending" : "Resolved";
    try {
      const result = await updateNeedStatus(need.id, nextStatus);
      setNotice({ open: true, message: result.message || "Estado actualizado.", severity: "success" });
      await loadData();
    } catch (error) {
      setNotice({ open: true, message: error.response?.data?.message || "No se pudo cambiar el estado.", severity: "error" });
    }
  };

  return <main className="needsPage"><SideMenu />
    <header className="needsHeading"><span aria-hidden="true">▤</span><div><h1>Gestión de necesidades</h1><p>Registrá y consultá los productos que solicitan las instituciones.</p></div></header>
    <section className="needsPanel">
      <div className="needsPanelTitle">Necesidades registradas <span>{filtered.length} de {needs.length}</span></div>
      {(canCreateNeed || (canUpdateNeed && editingId)) && <form className="needsForm" onSubmit={save}>
        {!isInstitution && <select aria-label="Institución" value={form.institution_id} onChange={(e) => setForm({ ...form, institution_id: e.target.value })} required disabled={Boolean(editingId)}><option value="">Seleccionar institución</option>{institutions.filter((item) => item.institutionType === "Recipient" || item.institutionType === "Both").map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>}
        <select aria-label="Artículo" value={form.article_id} onChange={(e) => setForm({ ...form, article_id: e.target.value })} required><option value="">Seleccionar artículo</option>{articles.map((article) => <option key={article.id} value={article.id}>{article.name}{article.variant ? ` · ${article.variant}` : ""}</option>)}</select>
        <input aria-label="Cantidad solicitada" type="number" min="1" step="1" placeholder="Cantidad" value={form.available} onChange={(e) => setForm({ ...form, available: e.target.value })} required />
        <button className="needsPrimaryAction" type="submit" disabled={saving}>{saving ? "Guardando..." : editingId ? "Guardar cambios" : "Registrar necesidad"}</button>
        {editingId && <button className="needsCancelAction" type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }}>Cancelar</button>}
      </form>}
      {canReadNeed && <div className="needsFilters">
        <input aria-label="Buscar necesidad" placeholder="Buscar por institución o artículo" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select aria-label="Filtrar por estado" value={status} onChange={(e) => setStatus(e.target.value)}><option value="all">Todos los estados</option><option value="Pending">Pendientes</option><option value="Resolved">Resueltas</option></select>
        <select aria-label="Ordenar por fecha" value={sort} onChange={(e) => setSort(e.target.value)}><option value="newest">Más recientes</option><option value="oldest">Más antiguas</option></select>
      </div>}
      {!canReadNeed ? <p className="needsMessage">No tenés permiso para consultar las necesidades.</p> : loading ? <p className="needsMessage">Cargando necesidades...</p> : filtered.length === 0 ? <p className="needsMessage">{needs.length ? "No hay resultados para la búsqueda." : "Todavía no hay necesidades registradas."}</p> : <>
        <div className="needsTableWrap"><table className="needsTable"><thead><tr><th>Institución</th><th>Artículo</th><th>Categoría</th><th>Cantidad</th><th>Fecha</th><th>Estado</th>{(canUpdateNeed || canApproveNeed || canDeleteNeed) && <th>Acciones</th>}</tr></thead><tbody>
          {pageRows.map((need) => <tr key={need.id}>
            <td>{need.Institution?.name || "Institución"}</td><td>{need.Article?.name || "Artículo"}{need.Article?.variant ? ` · ${need.Article.variant}` : ""}</td><td>{need.Article?.category || "—"}</td><td>{need.available} {need.Article?.unit || ""}</td>
            <td>{need.createdAt ? new Date(need.createdAt).toLocaleDateString("es-AR") : "—"}</td>
            <td><span className={`needStatus ${need.status === "Resolved" ? "resolved" : "pending"}`}>{need.status === "Resolved" ? "Resuelta" : "Pendiente"}</span></td>
            {(canUpdateNeed || canApproveNeed || canDeleteNeed) && <td className="needsActions">{canUpdateNeed && <button type="button" onClick={() => startEdit(need)}>Editar</button>}{canApproveNeed && !isInstitution && <button type="button" onClick={() => changeStatus(need)}>{need.status === "Resolved" ? "Reabrir" : "Resolver"}</button>}{canDeleteNeed && <button className="needsDeleteAction" type="button" onClick={() => remove(need)}>Eliminar</button>}</td>}
          </tr>)}
        </tbody></table></div><TablePager count={filtered.length} page={page} pageSize={pageSize} onPageChange={setPage} onPageSizeChange={(size) => { setPageSize(size); setPage(0); }} /></>}
    </section>
    <Notification open={notice.open} message={notice.message} severity={notice.severity} onClose={() => setNotice({ ...notice, open: false })} />
  </main>;
}
