import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { hasAnyPermission } from "../../utils/rolePermissions.js";
import SideMenu from "../../components/SideMenu.jsx";
import "./HomeInstitution.css";

const needsPermissions = [
  { entity: "INSTITUTIONNEEDS", action: "READ" },
  { entity: "INSTITUTIONNEEDS", action: "CREATE" },
  { entity: "INSTITUTIONNEEDS", action: "UPDATE" },
  { entity: "INSTITUTIONNEEDS", action: "DELETE" }
];

export default function HomeInstitution() {
  const { user, permissions = [] } = useAuth();
  const canManageNeeds = hasAnyPermission(permissions, needsPermissions);
  const displayName = user?.name || user?.first_name || "Institución";

  return <main className="institutionPortal">
    <SideMenu />
    <section className="institutionPortalCard">
      <span className="institutionPortalEyebrow">PORTAL DE INSTITUCIÓN</span>
      <h1>Hola, {displayName}</h1>
      <p>Desde este espacio podés acceder a las operaciones habilitadas para tu cuenta.</p>
      {canManageNeeds
        ? <Link className="institutionPortalAction" to="/admin/needs">Gestionar mis necesidades</Link>
        : <p className="institutionPortalEmpty">Todavía no tenés operaciones habilitadas. Consultá con el Banco de Alimentos.</p>}
    </section>
  </main>;
}
