import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import SideMenu from "../../components/SideMenu.jsx";
import { approvePasswordReset, getPasswordResetRequests } from "../../services/user.service.js";
import "./PasswordResetRequests.css";

export default function PasswordResetRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState(null);
  const [message, setMessage] = useState("");

  const loadRequests = useCallback(async ({ silent = false } = {}) => {
    if (!silent) setLoading(true);
    try {
      const result = await getPasswordResetRequests();
      setRequests(result.data || []);
    } catch (error) {
      if (!silent) setMessage(error.response?.data?.message || "No se pudieron cargar las solicitudes.");
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (Number(user?.rol) !== 1) return undefined;
    loadRequests();
    const refreshTimer = window.setInterval(() => loadRequests({ silent: true }), 5000);
    return () => window.clearInterval(refreshTimer);
  }, [loadRequests, user?.rol]);

  const approve = async (request) => {
    setWorkingId(request.id);
    setMessage("");
    try {
      const result = await approvePasswordReset(request.id);
      setMessage(result.message || "Cambio habilitado.");
      await loadRequests({ silent: true });
    } catch (error) {
      setMessage(error.response?.data?.message || "No se pudo habilitar el cambio.");
    } finally {
      setWorkingId(null);
    }
  };

  return <main className="passwordResetRequestsPage">
    <SideMenu />
    <section className="passwordResetRequestsCard">
      <span className="passwordResetEyebrow">ADMINISTRACIÓN</span>
      <h1>Solicitudes de contraseña</h1>
      <p>Revisá las solicitudes y habilitá al usuario para elegir una contraseña nueva. La lista se actualiza automáticamente.</p>
      {Number(user?.rol) === 1 && <button className="passwordResetRefresh" type="button" onClick={() => loadRequests()} disabled={loading}>Actualizar lista</button>}
      {Number(user?.rol) !== 1
        ? <p className="passwordResetMessage">Solo el administrador puede administrar estas solicitudes.</p>
        : loading ? <p className="passwordResetMessage">Cargando solicitudes…</p>
        : requests.length === 0 ? <p className="passwordResetMessage">No hay solicitudes de cambio de contraseña.</p>
        : <div className="passwordResetTableWrap"><table className="passwordResetTable">
          <thead><tr><th>Usuario</th><th>Email</th><th>Rol</th><th>Estado</th><th>Acción</th></tr></thead>
          <tbody>{requests.map((request) => {
            const approved = Boolean(request.password_reset_approved);
            return <tr key={request.id} className={approved ? "passwordResetRowApproved" : ""}>
              <td>{[request.first_name, request.last_name].filter(Boolean).join(" ")}</td>
              <td>{request.email}</td>
              <td>{request.Role?.name || "—"}</td>
              <td><span className={`passwordResetStatus ${approved ? "approved" : "pending"}`}>{approved ? "Habilitado" : "Pendiente"}</span></td>
              <td>{approved
                ? <span className="passwordResetApprovedAction">Cambio habilitado</span>
                : <button type="button" onClick={() => approve(request)} disabled={workingId === request.id}>{workingId === request.id ? "Habilitando…" : "Habilitar cambio"}</button>}</td>
            </tr>;
          })}</tbody>
        </table></div>}
      {message && <p className="passwordResetMessage" role="status">{message}</p>}
    </section>
  </main>;
}
