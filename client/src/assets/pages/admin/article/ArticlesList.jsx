import { useCallback, useEffect, useMemo, useState } from "react";
import SideMenu from "../../../components/SideMenu.jsx";
import Notification from "../../../components/Notification.jsx";
import TablePager from "../../../components/TablePager.jsx";
import { DeleteArticle, GetArticles, UpdateArticle } from "../../../services/article.service.js";
import "./ArticlesList.css";

const emptyForm = { name: "", category: "", variant: "", unit: "" };

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("name");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [notice, setNotice] = useState({ open: false, message: "", severity: "success" });

  const loadArticles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await GetArticles();
      setArticles(response.data || []);
    } catch (error) {
      if (error.response?.status === 404) setArticles([]);
      else setNotice({ open: true, message: error.response?.data?.message || "No se pudieron cargar los artículos.", severity: "error" });
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { loadArticles(); }, [loadArticles]);

  const categories = useMemo(() => [...new Set(articles.map((item) => item.category).filter(Boolean))].sort(), [articles]);
  const filtered = useMemo(() => articles.filter((item) => {
    const matchesText = `${item.name} ${item.variant} ${item.category} ${item.unit}`.toLowerCase().includes(query.toLowerCase());
    return matchesText && (category === "all" || item.category === category);
  }).sort((a, b) => sort === "category" ? a.category.localeCompare(b.category, "es") || a.name.localeCompare(b.name, "es") : a.name.localeCompare(b.name, "es")), [articles, query, category, sort]);
  const pageRows = filtered.slice(page * pageSize, (page + 1) * pageSize);

  const saveArticle = async (e) => {
    e.preventDefault();
    try {
      const response = await UpdateArticle(editingId, form);
      setNotice({ open: true, message: response.message || "Artículo actualizado.", severity: "success" });
      setEditingId(null);
      await loadArticles();
    } catch (error) {
      setNotice({ open: true, message: error.response?.data?.message || "No se pudo actualizar el artículo.", severity: "error" });
    }
  };

  const removeArticle = async (article) => {
    if (!window.confirm(`¿Eliminar “${article.name} · ${article.variant}”?`)) return;
    try {
      const response = await DeleteArticle(article.id);
      setNotice({ open: true, message: response.message || "Artículo eliminado.", severity: "success" });
      await loadArticles();
    } catch (error) {
      setNotice({ open: true, message: error.response?.data?.message || "No se pudo eliminar. Puede estar asociado a necesidades o donaciones.", severity: "error" });
    }
  };

  return <main className="articlesPage"><SideMenu />
    <header className="articlesHeading"><span aria-hidden="true">▧</span><div><h1>Catálogo de artículos</h1><p>Buscá, editá y administrá los productos del sistema.</p></div></header>
    <section className="articlesPanel">
      <div className="articlesTitle">Artículos <span>{filtered.length} de {articles.length}</span></div>
      <div className="articlesToolbar"><input aria-label="Buscar artículo" placeholder="Buscar por nombre, variante o unidad" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select aria-label="Filtrar por categoría" value={category} onChange={(e) => setCategory(e.target.value)}><option value="all">Todas las categorías</option>{categories.map((item) => <option key={item}>{item}</option>)}</select>
        <select aria-label="Ordenar artículos" value={sort} onChange={(e) => setSort(e.target.value)}><option value="name">Nombre A–Z</option><option value="category">Categoría</option></select>
      </div>
      {loading ? <p className="articlesMessage">Cargando artículos...</p> : filtered.length === 0 ? <p className="articlesMessage">{articles.length ? "No hay resultados para la búsqueda." : "Todavía no hay artículos registrados."}</p> : <>
        <div className="articlesTableWrap"><table className="articlesTable"><thead><tr><th>Artículo</th><th>Categoría</th><th>Variante</th><th>Unidad</th><th>Acciones</th></tr></thead><tbody>
          {pageRows.map((article) => <tr key={article.id}>
            {editingId === article.id ? <>
              <td><input aria-label="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></td>
              <td><select aria-label="Categoría" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{!categories.includes(form.category) && <option>{form.category}</option>}<option>Alimentos</option><option>Bebidas</option><option>Limpieza</option><option>Higiene</option></select></td>
              <td><input aria-label="Variante" value={form.variant} onChange={(e) => setForm({ ...form, variant: e.target.value })} required /></td>
              <td><select aria-label="Unidad" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })}><option value="Kg">Kilogramo</option><option value="Litro">Litro</option><option value="Unidad">Unidad</option></select></td>
              <td className="articleActions"><button onClick={saveArticle}>Guardar</button><button className="quietAction" onClick={() => setEditingId(null)}>Cancelar</button></td>
            </> : <>
              <td>{article.name}</td><td><span className="articlesCategory">{article.category}</span></td><td>{article.variant}</td><td>{article.unit}</td>
              <td className="articleActions"><button onClick={() => { setEditingId(article.id); setForm({ name: article.name, category: article.category, variant: article.variant, unit: article.unit }); }}>Editar</button><button className="deleteAction" onClick={() => removeArticle(article)}>Eliminar</button></td>
            </>}
          </tr>)}
        </tbody></table></div><TablePager count={filtered.length} page={page} pageSize={pageSize} onPageChange={setPage} onPageSizeChange={(size) => { setPageSize(size); setPage(0); }} /></>}
    </section>
    <Notification open={notice.open} message={notice.message} severity={notice.severity} onClose={() => setNotice({ ...notice, open: false })} />
  </main>;
}
