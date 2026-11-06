import { Link } from "react-router-dom";
import { AccountCircleRounded, AlternateEmailRounded, BadgeRounded, BusinessRounded, HomeRounded } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext.jsx";
import SideMenu from "../../components/SideMenu.jsx";
import "./Account.css";

const roleNames = { 1: "Administrador", 2: "Operador", 3: "Coordinador", 4: "Institución", 5: "Voluntario" };
const dashboardForRole = (role) => ({ 1: "/admin/home", 2: "/operator/home", 3: "/admin/home", 4: "/en-desarrollo/Inicio de institución", 5: "/en-desarrollo/Inicio de voluntario" }[role] || "/");

export default function Account() {
  const { user } = useAuth();
  const role = Number(user?.rol);
  const isInstitution = Boolean(user?.userRelation);
  const contactName = [user?.first_name, user?.last_name].filter(Boolean).join(" ") || "Responsable";
  const name = isInstitution ? user?.name || "Institución" : contactName;

  return <main className="accountPage"><SideMenu />
    <section className="accountCard">
      <div className="accountCover" />
      <div className="accountAvatar">{name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase()}</div>
      <div className="accountContent">
        <span className="accountEyebrow">PERFIL SOLIDATA</span>
        <h1>{name}</h1>
        <p className="accountRole">{roleNames[role] || "Cuenta SOLIDATA"}</p>
        <div className="accountDetails">
          <div className="accountDetail"><span className="accountDetailIcon"><AlternateEmailRounded /></span><span><small>Correo electrónico</small><strong>{user?.email || "Sin correo disponible"}</strong></span></div>
          <div className="accountDetail"><span className="accountDetailIcon"><BadgeRounded /></span><span><small>Tipo de cuenta</small><strong>{roleNames[role] || "Usuario"}</strong></span></div>
          <div className="accountDetail"><span className="accountDetailIcon">{isInstitution ? <BusinessRounded /> : <AccountCircleRounded />}</span><span><small>{isInstitution ? "Institución" : "Usuario"}</small><strong>{isInstitution ? name : `N.º ${user?.id || "—"}`}</strong></span></div>
          {isInstitution && <div className="accountDetail"><span className="accountDetailIcon"><AccountCircleRounded /></span><span><small>Persona responsable</small><strong>{contactName}</strong></span></div>}
        </div>
        <div className="accountFooter"><span className="accountSession"><i /> Sesión iniciada</span><Link className="accountHomeLink" to={dashboardForRole(role)}><HomeRounded />Volver al inicio</Link></div>
      </div>
    </section>
  </main>;
}
