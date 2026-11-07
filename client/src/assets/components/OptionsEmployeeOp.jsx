import "./OptionsEmployee.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { hasPermission } from "../utils/rolePermissions.js";

const actions = [
  { title: "Registrar donación", path: "/admin/donations/create", entity: "DONATIONS", action: "CREATE" },
  { title: "Historial de donaciones", path: "/admin/donations/history", entity: "DONATIONS", action: "READ" },
  { title: "Gestionar necesidades", path: "/admin/needs", entity: "INSTITUTIONNEEDS", action: "READ" },
];

export function OptionsEmployeeOp() {
  const navigate = useNavigate();
  const { user, permissions = [] } = useAuth();
  const isAdmin = Number(user?.rol) === 1;
  const visibleActions = actions.filter((item) => isAdmin || hasPermission(permissions, item.entity, item.action));

  return <div className="employeeOptions">
    {visibleActions.map((item) => <section className="Options" key={item.path} role="button" tabIndex={0}
      onClick={() => navigate(item.path)}
      onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") navigate(item.path); }}>
      <h1>{item.title}</h1>
    </section>)}
    {!visibleActions.length && <p>No tenés operaciones habilitadas por el momento.</p>}
  </div>;
}

export default OptionsEmployeeOp;
