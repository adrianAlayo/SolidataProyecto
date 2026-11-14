import { useEffect, useState } from "react";
import SideMenu from "../../../components/SideMenu.jsx";
import { getUsers } from "../../../services/user.service.js";
import { assignRole, getRoles } from "../../../services/rol.service.js";
import "./AssignRole.css";

export function AssignRole() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [userId, setUserId] = useState("");
    const [roleId, setRoleId] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const selectedUser = users.find((user) => String(user.id) === userId);

    useEffect(() => {
        const loadOptions = async () => {
            try {
                const [usersResult, rolesResult] = await Promise.all([getUsers(), getRoles()]);
                const activeUsers = (usersResult.data || []).filter((user) => user.is_active);
                setUsers(activeUsers);
                setRoles(rolesResult.data || []);
            } catch (err) {
                setError(err.response?.data?.message || "No se pudieron cargar usuarios y roles.");
            } finally {
                setLoading(false);
            }
        };

        loadOptions();
    }, []);

    const handleUserChange = (event) => {
        const nextUserId = event.target.value;
        const user = users.find((item) => String(item.id) === nextUserId);
        setUserId(nextUserId);
        setRoleId(user?.role_id ? String(user.role_id) : "");
        setError("");
        setMessage("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setMessage("");

        if (!userId || !roleId) {
            setError("Seleccioná un usuario y el nuevo rol.");
            return;
        }

        if (String(selectedUser?.role_id) === roleId) {
            setError("Ese usuario ya tiene asignado ese rol.");
            return;
        }

        setSaving(true);
        try {
            const result = await assignRole(Number(userId), Number(roleId));
            const role = roles.find((item) => String(item.id) === roleId);
            setUsers((currentUsers) => currentUsers.map((user) =>
                String(user.id) === userId
                    ? { ...user, role_id: Number(roleId), Role: role || user.Role }
                    : user
            ));
            setMessage(result.message || "El rol se actualizó correctamente.");
        } catch (err) {
            setError(err.response?.data?.message || "No se pudo actualizar el rol.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <SideMenu />
            <main className="assignRolePage">
                <section className="assignRoleCard">
                    <p className="assignRoleEyebrow">Administración de usuarios</p>
                    <h1>Cambiar rol</h1>
                    <p className="assignRoleIntro">
                        Elegí un usuario activo y asignale el rol que corresponda.
                    </p>

                    {loading ? (
                        <div className="assignRoleNotice">Cargando usuarios y roles…</div>
                    ) : (
                        <form className="assignRoleForm" onSubmit={handleSubmit}>
                            <label htmlFor="assign-role-user">Usuario</label>
                            <select id="assign-role-user" value={userId} onChange={handleUserChange} required>
                                <option value="">Seleccionar usuario</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.first_name} {user.last_name} · {user.email}
                                    </option>
                                ))}
                            </select>

                            {selectedUser && (
                                <div className="assignRoleCurrent">
                                    <span>Rol actual</span>
                                    <strong>{selectedUser.Role?.name || "Sin rol asignado"}</strong>
                                </div>
                            )}

                            <label htmlFor="assign-role-choice">Nuevo rol</label>
                            <select
                                id="assign-role-choice"
                                value={roleId}
                                onChange={(event) => {
                                    setRoleId(event.target.value);
                                    setError("");
                                    setMessage("");
                                }}
                                required
                            >
                                <option value="">Seleccionar rol</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                ))}
                            </select>

                            {error && <div className="assignRoleAlert error" role="alert">{error}</div>}
                            {message && <div className="assignRoleAlert success" role="status">{message}</div>}

                            <button type="submit" disabled={saving || users.length === 0 || roles.length === 0}>
                                {saving ? "Guardando…" : "Guardar cambio"}
                            </button>
                        </form>
                    )}

                    {!loading && users.length === 0 && (
                        <div className="assignRoleNotice">No hay usuarios activos para mostrar.</div>
                    )}
                    {!loading && roles.length === 0 && (
                        <div className="assignRoleNotice">No se encontraron roles disponibles.</div>
                    )}
                </section>
            </main>
        </>
    );
}

export default AssignRole;
