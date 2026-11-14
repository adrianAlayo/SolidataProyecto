import { useEffect, useMemo, useState } from "react";
import TablePager from "../TablePager.jsx";
import { getUsers, activeUser, disableUser } from "../../services/user.service.js";
import "./tableUsersHL.css";

export default function UsersTable() {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(8);
    const [loading, setLoading] = useState(true);
    const [workingId, setWorkingId] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        getUsers()
            .then((usersResponse) => {
                setUsers((usersResponse.data || []).map((user) => ({
                    ...user,
                    roleName: user.Role?.name || "—",
                })));
            })
            .catch((err) => setError(err.response?.data?.message || "No se pudieron cargar los usuarios."))
            .finally(() => setLoading(false));
    }, []);

    const filtered = useMemo(() => users.filter((user) => {
        const text = `${user.first_name || ""} ${user.last_name || ""} ${user.email || ""} ${user.phone || ""} ${user.roleName || ""}`.toLocaleLowerCase("es");
        return text.includes(query.trim().toLocaleLowerCase("es"))
            && (statusFilter === "all" || String(user.is_active) === statusFilter);
    }), [users, query, statusFilter]);
    const pageUsers = filtered.slice(page * pageSize, (page + 1) * pageSize);

    const toggleStatus = async (user) => {
        setWorkingId(user.id);
        setError("");
        setMessage("");
        try {
            const result = user.is_active ? await disableUser(user.id) : await activeUser(user.id);
            const response = result?.data || result || {};
            setUsers((current) => current.map((item) =>
                item.id === user.id ? { ...item, is_active: !user.is_active } : item
            ));
            setMessage(response.message || `${user.first_name} ${user.last_name} ${user.is_active ? "desactivado" : "activado"} correctamente.`);
        } catch (err) {
            setError(err.response?.data?.message || "No se pudo cambiar el estado del usuario.");
        } finally {
            setWorkingId(null);
        }
    };

    return (
        <main className="userStatePage">
            <header className="userStateHeading">
                <span aria-hidden="true">◉</span>
                <div>
                    <small>ADMINISTRACIÓN</small>
                    <h1>Activar o desactivar usuarios</h1>
                    <p>Buscá una cuenta y cambiá su acceso al sistema.</p>
                </div>
            </header>

            <section className="userStatePanel">
                <div className="userStatePanelTitle">
                    <strong>Usuarios registrados</strong>
                    <span>{filtered.length} resultados</span>
                </div>
                <div className="userStateFilters">
                    <input
                        aria-label="Buscar usuario"
                        placeholder="Buscar por nombre, email, teléfono o rol"
                        value={query}
                        onChange={(event) => { setQuery(event.target.value); setPage(0); }}
                    />
                    <select aria-label="Filtrar por estado" value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPage(0); }}>
                        <option value="all">Todos los estados</option>
                        <option value="true">Activos</option>
                        <option value="false">Inactivos</option>
                    </select>
                </div>

                {error && <p className="userStateFeedback error" role="alert">{error}</p>}
                {message && <p className="userStateFeedback success" role="status">{message}</p>}
                {loading ? <p className="userStateEmpty">Cargando usuarios…</p> : filtered.length === 0 ? <p className="userStateEmpty">No hay usuarios que coincidan con la búsqueda.</p> : (
                    <>
                        <div className="userStateTableWrap">
                            <table className="userStateTable">
                                <thead><tr><th>Usuario</th><th>Correo</th><th>Teléfono</th><th>Rol</th><th>Estado</th><th>Acción</th></tr></thead>
                                <tbody>{pageUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td><strong>{user.first_name} {user.last_name}</strong></td>
                                        <td>{user.email}</td>
                                        <td>{user.phone || "—"}</td>
                                        <td>{user.roleName}</td>
                                        <td><span className={`userStateBadge ${user.is_active ? "active" : "inactive"}`}>{user.is_active ? "Activo" : "Inactivo"}</span></td>
                                        <td>
                                            <button
                                                className={user.is_active ? "userStateAction deactivate" : "userStateAction"}
                                                onClick={() => toggleStatus(user)}
                                                disabled={workingId === user.id}
                                            >
                                                {workingId === user.id ? "Guardando…" : user.is_active ? "Desactivar" : "Activar"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}</tbody>
                            </table>
                        </div>
                        <TablePager count={filtered.length} page={page} pageSize={pageSize} onPageChange={setPage} onPageSizeChange={(size) => { setPageSize(size); setPage(0); }} />
                    </>
                )}
            </section>
        </main>
    );
}
