import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import SideMenu from "../../components/SideMenu.jsx";

export default function Account() {
  const { user } = useAuth();
  return <main style={{ minHeight: "calc(100vh - 64px)", padding: "36px 24px", background: "#ecece7", color: "#242a2d" }}>
    <SideMenu />
    <section style={{ maxWidth: 680, margin: "32px auto", padding: 28, borderRadius: 14, background: "#fff", boxShadow: "0 8px 24px #18331a12" }}>
      <h1 style={{ marginTop: 0 }}>Mi cuenta</h1>
      <p><strong>Nombre:</strong> {[user?.first_name, user?.last_name].filter(Boolean).join(" ") || user?.name || "Usuario"}</p>
      <p><strong>Correo:</strong> {user?.email || "—"}</p>
      <Link to={user?.rol === 1 ? "/admin/home" : "/"}>Volver</Link>
    </section>
  </main>;
}
