import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification.jsx";
import { createItem } from "../../services/donationItem.service.js";
import { getDonations } from "../../services/donation.service.js";
import { GetArticles } from "../../services/article.service.js";
import "./FormCreateItem.css";

export default function CreateItem() {
  const [form, setForm] = useState({ quantity: "", expiration_date: "", donation_id: "", article_id: "", note: "" });
  const [donations, setDonations] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([getDonations(), GetArticles()]).then(([donationResponse, articleResponse]) => {
      setDonations(donationResponse.data || []);
      setArticles(articleResponse.data || []);
    }).catch(() => setNotice({ open: true, message: "No se pudieron cargar donaciones y artículos.", severity: "error" }));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createItem({ ...form, quantity: Number(form.quantity), donation_id: Number(form.donation_id), article_id: Number(form.article_id) });
      setNotice({ open: true, message: "Ítem guardado correctamente.", severity: "success" });
      setTimeout(() => navigate("/admin/donations/items"), 500);
    } catch (error) {
      setNotice({ open: true, message: error.response?.data?.message || "No se pudo guardar el ítem.", severity: "error" });
    } finally { setLoading(false); }
  };

  const setField = (name, value) => setForm((current) => ({ ...current, [name]: value }));
  return <>
    <section className="formCreateItemBox animationFadeIn"><form className="formlogin" onSubmit={handleCreate}>
      <h2 className="textWelcome">Agregar artículo a una donación</h2><h5 className="textLogin">Elegí registros existentes y completá cantidad y vencimiento.</h5>
      <div className="gridTwoCols">
        <input className="inputEmailLog inputAnim" type="number" min="1" step="1" placeholder="Cantidad" value={form.quantity} onChange={(e) => setField("quantity", e.target.value)} required />
        <input className="inputEmailLog inputAnim" type="date" min={new Date().toISOString().slice(0, 10)} value={form.expiration_date} onChange={(e) => setField("expiration_date", e.target.value)} required />
        <select className="inputEmailLog inputAnim" value={form.article_id} onChange={(e) => setField("article_id", e.target.value)} required><option value="">Seleccionar artículo</option>{articles.map((article) => <option key={article.id} value={article.id}>{article.name} · {article.variant}</option>)}</select>
        <select className="inputEmailLog inputAnim" value={form.donation_id} onChange={(e) => setField("donation_id", e.target.value)} required><option value="">Seleccionar donación</option>{donations.map((donation) => <option key={donation.id} value={donation.id}>{new Date(donation.donation_date).toLocaleDateString("es-AR")} · {[donation.donor?.first_name, donation.donor?.last_name].filter(Boolean).join(" ")} → {donation.receiver_institution?.name || "Institución"}</option>)}</select>
      </div>
      <input className="inputEmailLog5 inputAnim" type="text" placeholder="Nota (opcional)" value={form.note} onChange={(e) => setField("note", e.target.value)} />
      <div className="linksLogin"><a className="linkBackLog" href="/admin/donations/items">Ver artículos de donaciones</a></div>
      <button className="buttonLogin buttonAnim" type="submit" disabled={loading}>{loading ? "Guardando..." : "Agregar artículo"}</button>
    </form></section>
    <Notification open={notice.open} message={notice.message} severity={notice.severity} onClose={() => setNotice({ ...notice, open: false })} />
  </>;
}
