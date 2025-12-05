import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification";
import { getRole,updateRole } from "../../services/rol.service";
import './FormUpdateRol.css'

export default function UpdateRol() {

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);

    // Notificaciones
    const [notifOpen, setNotifOpen] = useState(false);
    const [notifMsg, setNotifMsg] = useState("");
    const [notifType, setNotifType] = useState("success");

    const showNotification = (message, type = "success") => {
        setNotifMsg(message);
        setNotifType(type);
        setNotifOpen(true);
    };

    const navigate = useNavigate();

    const handleSearchRole = async () => {
            if (!id) {
                return showNotification("Debe ingresar un ID.", "error");
            }
    
            setLoadingSearch(true);
    
            try {
                const result = await getRole(id);
    
                const rol = result.data;
    
                setName(rol.name || undefined);
                setDescription(rol.description || undefined);
    
                showNotification("Rol encontrado.", "success");
    
            } catch (err) {
                showNotification(
                    err.response?.data?.message || "No se pudo obtener el usuario.",
                    "error"
                );
    
                // limpiar inputs
                setName(undefined);
                setDescription(undefined);
            } finally {
                setLoadingSearch(false);
            }
        };

        const handleUpdate = async (e) => {
            e.preventDefault();
            setLoading(true);
    
            try {
                const fieldsUpdate = {
                    name,
                    description
                };
    
                const result = await updateRole(id, fieldsUpdate);
    
                showNotification(result.message, "success");
    
                setTimeout(() => {
                    navigate("/admin/home");
                }, 1000);
    
            } catch (err) {
                const apiMessage = err.response?.data?.message;
                const status = err.response?.status;
    
                showNotification(
                    `Error ${status || ""}: ${apiMessage || "Error inesperado."}`,
                    "error"
                );
    
            } finally {
                setLoading(false);
            }
        };

    return (
        <>
            <section className="formUpdateRolBox animationFadeIn">
                <form className="formlogin" onSubmit={handleUpdate}>
                    <h2 className="textWelcome">Actualizar Rol</h2>
                    <h5 className="textLogin">Actualiza un rol que ya esta en el sistema</h5>

                    <div className="gridTwoCols">
                        
                        {/* INPUT DEL ID + BOTÓN BUSCAR */}
                        <div style={{ display: "flex", gap: "10px" }}>
                            <input
                                className="inputEmailLog inputAnim"
                                type="number"
                                min={1}
                                step={1}
                                placeholder="ID"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />

                            <button
                                type="button"
                                className="buttonLogin"
                                onClick={handleSearchRole}
                                disabled={loadingSearch}
                            >
                                {loadingSearch ? "Buscando..." : "Buscar"}
                            </button>
                        </div>

                        <input
                            className="inputEmailLog inputAnim"
                            type="text"
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                    </div>
                    
                    <input
                        className="inputEmailLog5 inputAnim"
                        type="text"
                        placeholder="Descripcion"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    /> 

                    <div className="linksLogin">
                        <a className="linkBackLog" href="/admin/home">
                            Volver Atrás
                        </a>
                    </div>

                    <button
                        className="buttonLogin buttonAnim"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Actualizando..." : "Actualizar Rol"}
                    </button>
                </form>
            </section>

            <Notification
                open={notifOpen}
                message={notifMsg}
                severity={notifType}
                onClose={() => setNotifOpen(false)}
            />
        </>
    );
}
