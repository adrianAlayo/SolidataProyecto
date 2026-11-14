import { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu.jsx";
import { getUsers, updateUser, deleteUser } from "../../services/user.service.js";
import { getRoles, updateRole, deleteRole } from "../../services/rol.service.js";
import { getInventories, updateInventory, deleteInventory } from "../../services/inventory.service.js";
import "./RecordManagement.css";

const settings = {
    user: {
        singular: "usuario",
        plural: "usuarios",
        load: async () => {
            const [usersResponse, rolesResponse] = await Promise.all([getUsers(), getRoles()]);
            const roles = rolesResponse.data || [];
            return (usersResponse.data || []).map((user) => ({
                ...user,
                roleName: roles.find((role) => Number(role.id) === Number(user.role_id))?.name || "Rol asignado",
            }));
        },
        label: (user) => `${user.first_name || ""} ${user.last_name || ""} · ${user.email || "Sin correo"} · ${user.roleName}`,
        detail: (user) => user.is_active ? "Activo" : "Inactivo",
        update: updateUser,
        remove: deleteUser,
        fields: ["first_name", "last_name", "email", "phone", "password"],
    },
    role: {
        singular: "rol",
        plural: "roles",
        load: async () => {
            const response = await getRoles();
            return response.data || [];
        },
        label: (role) => role.name,
        detail: (role) => role.description || "Sin descripción",
        update: updateRole,
        remove: deleteRole,
        fields: ["name", "description"],
    },
    inventory: {
        singular: "registro de inventario",
        plural: "registros de inventario",
        load: async () => {
            const response = await getInventories();
            return response.data || [];
        },
        label: (item) => {
            const article = item.DonationItem?.Article;
            const name = article?.name || "Artículo";
            const variant = article?.variant ? ` · ${article.variant}` : "";
            return `${name}${variant} · Sección ${item.area} · ${item.available} disponibles`;
        },
        detail: () => "",
        update: updateInventory,
        remove: deleteInventory,
        fields: ["area", "available"],
    },
};

const titles = {
    user: { update: "Actualizar usuario", delete: "Eliminar usuario" },
    role: { update: "Actualizar rol", delete: "Eliminar rol" },
    inventory: { update: "Actualizar inventario", delete: "Eliminar inventario" },
};

export default function RecordManagement({ entity, mode }) {
    const config = settings[entity];
    const [records, setRecords] = useState([]);
    const [recordId, setRecordId] = useState("");
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const selected = records.find((record) => String(record.id) === recordId);

    useEffect(() => {
        let active = true;
        config.load().then((items) => {
            if (active) setRecords(items);
        }).catch((err) => {
            if (active) setError(err.response?.data?.message || `No se pudieron cargar ${config.plural}.`);
        }).finally(() => {
            if (active) setLoading(false);
        });
        return () => { active = false; };
    }, [entity]);

    const handleSelect = (event) => {
        const id = event.target.value;
        const record = records.find((item) => String(item.id) === id);
        setRecordId(id);
        setForm(record ? Object.fromEntries(config.fields.map((field) => [field, record[field] ?? ""])) : {});
        setError("");
        setMessage("");
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
        setError("");
        setMessage("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setMessage("");

        if (!selected) {
            setError(`Seleccioná ${config.singular}.`);
            return;
        }
        if (mode === "delete" && !window.confirm(`¿Eliminar ${config.singular} “${config.label(selected)}”?`)) return;

        const payload = {};
        if (entity === "user") {
            for (const field of ["first_name", "last_name", "email"]) payload[field] = String(form[field] || "").trim();
            if (String(form.phone || "").trim()) payload.phone = String(form.phone).trim();
            if (String(form.password || "").trim()) payload.password = String(form.password).trim();
        } else if (entity === "role") {
            if (String(form.name || "").trim() !== selected.name) payload.name = String(form.name || "").trim();
            if (String(form.description || "").trim() && String(form.description).trim() !== (selected.description || "")) {
                payload.description = String(form.description).trim();
            }
            if (mode === "update" && !Object.keys(payload).length) {
                setError("No hay cambios para guardar.");
                return;
            }
        } else if (entity === "inventory") {
            if (String(form.area) !== String(selected.area)) payload.area = form.area;
            if (Number(form.available) !== Number(selected.available)) payload.available = Number(form.available);
            if (mode === "update" && !Object.keys(payload).length) {
                setError("No hay cambios para guardar.");
                return;
            }
        }

        setSaving(true);
        try {
            const result = mode === "delete"
                ? await config.remove(selected.id)
                : await config.update(selected.id, payload);
            const response = result?.data || result || {};
            setMessage(response.message || `${config.singular} ${mode === "delete" ? "eliminado" : "actualizado"} correctamente.`);

            if (mode === "delete") {
                setRecords((current) => current.filter((item) => String(item.id) !== recordId));
                setRecordId("");
                setForm({});
            } else {
                setRecords((current) => current.map((item) =>
                    String(item.id) === recordId ? { ...item, ...payload } : item
                ));
            }
        } catch (err) {
            setError(err.response?.data?.message || `No se pudo ${mode === "delete" ? "eliminar" : "actualizar"} ${config.singular}.`);
        } finally {
            setSaving(false);
        }
    };

    if (!config) return null;

    return (
        <>
            <SideMenu />
            <main className="recordManagementPage">
                <section className="recordManagementCard">
                    <p className="recordManagementEyebrow">Administración · {config.plural}</p>
                    <h1>{titles[entity][mode]}</h1>
                    <p className="recordManagementDescription">
                        {mode === "delete"
                            ? `Elegí ${config.singular} de la lista. Se pedirá confirmación antes de eliminarlo.`
                            : `Elegí ${config.singular} y actualizá sus datos.`}
                    </p>

                    {loading ? (
                        <div className="recordManagementNotice">Cargando {config.plural}…</div>
                    ) : records.length === 0 ? (
                        <div className="recordManagementNotice">No hay {config.plural} disponibles.</div>
                    ) : (
                        <form className="recordManagementForm" onSubmit={handleSubmit}>
                            <label htmlFor="record-select">{config.singular}</label>
                            <select id="record-select" value={recordId} onChange={handleSelect} required>
                                <option value="">Seleccionar {config.singular}</option>
                                {records.map((record) => (
                                    <option key={record.id} value={record.id}>{config.label(record)}</option>
                                ))}
                            </select>

                            {selected && (
                                <div className={mode === "delete" ? "recordManagementSummary danger" : "recordManagementSummary"}>
                                    <span>{mode === "delete" ? "Se eliminará" : config.detail(selected)}</span>
                                    <strong>{config.label(selected)}</strong>
                                </div>
                            )}

                            {mode === "update" && selected && (
                                <div className="recordManagementFields">
                                    {entity === "user" && <>
                                        <label htmlFor="user-first-name">Nombre</label>
                                        <input id="user-first-name" name="first_name" value={form.first_name || ""} onChange={handleChange} required />
                                        <label htmlFor="user-last-name">Apellido</label>
                                        <input id="user-last-name" name="last_name" value={form.last_name || ""} onChange={handleChange} required />
                                        <label htmlFor="user-email">Correo electrónico</label>
                                        <input id="user-email" name="email" type="email" value={form.email || ""} onChange={handleChange} required />
                                        <label htmlFor="user-phone">Teléfono</label>
                                        <input id="user-phone" name="phone" type="tel" value={form.phone || ""} onChange={handleChange} />
                                        <label htmlFor="user-password">Nueva contraseña <span>(opcional)</span></label>
                                        <input id="user-password" name="password" type="password" value={form.password || ""} onChange={handleChange} autoComplete="new-password" />
                                    </>}
                                    {entity === "role" && <>
                                        <label htmlFor="role-name">Nombre del rol</label>
                                        <input id="role-name" name="name" value={form.name || ""} onChange={handleChange} required />
                                        <label htmlFor="role-description">Descripción</label>
                                        <textarea id="role-description" name="description" rows="3" value={form.description || ""} onChange={handleChange} />
                                    </>}
                                    {entity === "inventory" && <>
                                        <label htmlFor="inventory-area">Sector</label>
                                        <select id="inventory-area" name="area" value={form.area || ""} onChange={handleChange} required>
                                            {[...new Set(["A", "B", "C", form.area].filter(Boolean))].map((area) => (
                                                <option key={area} value={area}>Sección {area}</option>
                                            ))}
                                        </select>
                                        <label htmlFor="inventory-available">Cantidad disponible</label>
                                        <input id="inventory-available" name="available" type="number" min="0" step="1" value={form.available ?? ""} onChange={handleChange} required />
                                    </>}
                                </div>
                            )}

                            {error && <div className="recordManagementAlert error" role="alert">{error}</div>}
                            {message && <div className="recordManagementAlert success" role="status">{message}</div>}

                            <button type="submit" className={mode === "delete" ? "danger" : ""} disabled={saving || !selected}>
                                {saving ? "Procesando…" : mode === "delete" ? "Eliminar" : "Guardar cambios"}
                            </button>
                        </form>
                    )}
                    {error && loading && <div className="recordManagementAlert error" role="alert">{error}</div>}
                </section>
            </main>
        </>
    );
}
