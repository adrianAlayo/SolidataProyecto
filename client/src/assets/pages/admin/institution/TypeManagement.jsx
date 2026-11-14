import { useEffect, useState } from "react";
import SideMenu from "../../../components/SideMenu.jsx";
import { createType, deleteType, getTypes, updateType } from "../../../services/type.service.js";
import "./TypeManagement.css";

const copy = {
    create: {
        eyebrow: "Instituciones · Tipos",
        title: "Crear tipo de institución",
        description: "Agregá una categoría para identificar a las instituciones registradas.",
        button: "Crear tipo",
    },
    update: {
        eyebrow: "Instituciones · Tipos",
        title: "Actualizar tipo",
        description: "Seleccioná un tipo y modificá el nombre con el que se muestra.",
        button: "Guardar cambios",
    },
    delete: {
        eyebrow: "Instituciones · Tipos",
        title: "Eliminar tipo",
        description: "Seleccioná el tipo que querés quitar del catálogo.",
        button: "Eliminar tipo",
    },
};

export default function TypeManagement({ mode = "create" }) {
    const page = copy[mode] || copy.create;
    const [types, setTypes] = useState([]);
    const [typeId, setTypeId] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(mode !== "create");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const selectedType = types.find((type) => String(type.id) === typeId);

    const loadTypes = async () => {
        try {
            const result = await getTypes();
            setTypes(result.data.data || []);
        } catch (err) {
            setError(err.response?.data?.message || "No se pudo cargar la lista de tipos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (mode !== "create") loadTypes();
    }, [mode]);

    const handleTypeChange = (event) => {
        const id = event.target.value;
        const type = types.find((item) => String(item.id) === id);
        setTypeId(id);
        setName(type?.name || "");
        setError("");
        setMessage("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setMessage("");

        if (mode !== "delete" && !name.trim()) {
            setError("Ingresá un nombre para el tipo.");
            return;
        }
        if (mode !== "create" && !typeId) {
            setError("Seleccioná un tipo.");
            return;
        }
        if (mode === "update" && name.trim() === selectedType?.name) {
            setError("El nombre no cambió.");
            return;
        }
        if (mode === "delete" && !window.confirm(`¿Eliminar el tipo "${selectedType?.name}"?`)) {
            return;
        }

        setSaving(true);
        try {
            let result;
            if (mode === "create") {
                result = await createType(name.trim());
                setName("");
            } else if (mode === "update") {
                result = await updateType(typeId, name.trim());
            } else {
                result = await deleteType(typeId);
            }

            const response = result.data || {};
            setMessage(response.message || "Operación completada correctamente.");
            if (mode === "delete") {
                setTypes((current) => current.filter((type) => String(type.id) !== typeId));
                setTypeId("");
                setName("");
            } else if (mode === "update") {
                setTypes((current) => current.map((type) =>
                    String(type.id) === typeId ? { ...type, name: name.trim() } : type
                ));
            }
        } catch (err) {
            setError(err.response?.data?.message || "No se pudo completar la operación.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <SideMenu />
            <main className="typeManagementPage">
                <section className="typeManagementCard">
                    <p className="typeManagementEyebrow">{page.eyebrow}</p>
                    <h1>{page.title}</h1>
                    <p className="typeManagementDescription">{page.description}</p>

                    {loading ? (
                        <div className="typeManagementNotice">Cargando tipos…</div>
                    ) : (
                        <form className="typeManagementForm" onSubmit={handleSubmit}>
                            {mode !== "create" && (
                                <>
                                    <label htmlFor="institution-type-select">Tipo de institución</label>
                                    <select id="institution-type-select" value={typeId} onChange={handleTypeChange} required>
                                        <option value="">Seleccionar tipo</option>
                                        {types.map((type) => (
                                            <option key={type.id} value={type.id}>{type.name}</option>
                                        ))}
                                    </select>
                                </>
                            )}

                            {mode !== "delete" && (
                                <>
                                    <label htmlFor="institution-type-name">Nombre</label>
                                    <input
                                        id="institution-type-name"
                                        type="text"
                                        maxLength={120}
                                        placeholder="Ej.: Comedor comunitario"
                                        value={name}
                                        onChange={(event) => {
                                            setName(event.target.value);
                                            setError("");
                                            setMessage("");
                                        }}
                                        required
                                    />
                                </>
                            )}

                            {mode === "delete" && selectedType && (
                                <div className="typeManagementSelected">
                                    <span>Se eliminará</span>
                                    <strong>{selectedType.name}</strong>
                                </div>
                            )}

                            {error && <div className="typeManagementAlert error" role="alert">{error}</div>}
                            {message && <div className="typeManagementAlert success" role="status">{message}</div>}

                            <button
                                className={mode === "delete" ? "danger" : ""}
                                type="submit"
                                disabled={saving || (mode !== "create" && types.length === 0)}
                            >
                                {saving ? "Procesando…" : page.button}
                            </button>
                        </form>
                    )}

                    {!loading && mode !== "create" && types.length === 0 && (
                        <div className="typeManagementNotice">Todavía no hay tipos de institución registrados.</div>
                    )}
                </section>
            </main>
        </>
    );
}
