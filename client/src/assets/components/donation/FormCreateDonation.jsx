import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification.jsx";
import { createDonation } from "../../services/donation.service.js";
import { getUsers } from "../../services/user.service.js";
import { getInstitutions } from "../../services/institution.service.js";
import "./FormCreateDonation.css";

export default function CreateDonation() {
  const [date, setDate] = useState("");
  const [donor, setDonor] = useState("");
  const [receiver, setReceiver] = useState("");
  const [note, setNote] = useState("");
  const [donors, setDonors] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([getUsers(), getInstitutions()]).then(([usersResponse, institutionsResponse]) => {
      const users = usersResponse.data || [];
      const allInstitutions = institutionsResponse.institutions || [];
      const donorInstitutions = new Set(allInstitutions.filter((item) => ["Donor", "Both"].includes(item.institutionType)).map((item) => item.id));
      setDonors(users.filter((user) => user.role_id === 5 || (user.role_id === 4 && donorInstitutions.has(user.institution_id))));
      setInstitutions(allInstitutions.filter((item) => ["Recipient", "Both"].includes(item.institutionType)));
    }).catch(() => setNotice({ open: true, message: "No se pudieron cargar donantes e instituciones.", severity: "error" }));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createDonation({ donation_date: date, donor_id: Number(donor), receiver_institution_id: Number(receiver), note });
      setNotice({ open: true, message: "Donación guardada correctamente.", severity: "success" });
      setTimeout(() => navigate("/admin/donations/history"), 500);
    } catch (error) {
      setNotice({ open: true, message: error.response?.data?.message || "No se pudo guardar la donación.", severity: "error" });
    } finally { setLoading(false); }
  };

  return <>
    <section className="formCreateDonationBox animationFadeIn"><form className="formlogin" onSubmit={handleCreate}>
      <h2 className="textWelcome">Crear donación</h2><h5 className="textLogin">Registrá la fecha, el donante y la institución receptora.</h5>
      <div className="gridTwoCols">
        <input className="inputEmailLog inputAnim" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <select className="inputEmailLog inputAnim" value={donor} onChange={(e) => setDonor(e.target.value)} required><option value="">Seleccionar donante</option>{donors.map((user) => <option key={user.id} value={user.id}>{[user.first_name, user.last_name].filter(Boolean).join(" ")}{user.role_id === 5 ? " · Voluntario" : " · Institución"}</option>)}</select>
        <select className="inputEmailLog inputAnim" value={receiver} onChange={(e) => setReceiver(e.target.value)} required><option value="">Seleccionar institución receptora</option>{institutions.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
      </div>
      <input className="inputEmailLog5 inputAnim" type="text" placeholder="Nota (opcional)" value={note} onChange={(e) => setNote(e.target.value)} />
      <div className="linksLogin"><a className="linkBackLog" href="/admin/donations/history">Ver historial</a></div>
      <button className="buttonLogin buttonAnim" type="submit" disabled={loading}>{loading ? "Guardando..." : "Crear donación"}</button>
    </form></section>
    <Notification open={notice.open} message={notice.message} severity={notice.severity} onClose={() => setNotice({ ...notice, open: false })} />
  </>;
}
