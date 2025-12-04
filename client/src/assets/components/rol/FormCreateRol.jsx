import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification";
import './FormCreateRol.css'
import { createRole } from "../../services/rol.service";


export default function CreateRolF() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

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

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await createRole(
                name,
                description
            )
            showNotification(result.message, "success");
            setTimeout(() => {
                navigate("/admin/home");
            }, 1000);
        } catch (err) {
            console.log(err.message);
            
            const apiMessage = err.response?.data?.message;
            const apiDetails = err.response?.data?.details; // opcional, si lo envías
            const status = err.response?.status;

            let finalMessage = "";

            if (status) finalMessage += `Error ${status}: `;
            if (apiMessage) finalMessage += apiMessage;

            // Si hay detalles, los agregamos
            if (apiDetails) finalMessage += ` — ${apiDetails}`;

            showNotification(finalMessage || "Error inesperado.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="formCreateArticleBox animationFadeIn">
                <form className="formlogin" onSubmit={handleCreate}>
                    <h2 className="textWelcome">Registrar Rol</h2>
                    <h5 className="textLogin">Registra un rol nuevo en el sistema</h5>
                    <input
                        className="inputEmailLog3 inputAnim"
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />


                    <input
                        className="inputEmailLog3 inputAnim"
                        type="Text"
                        placeholder="Descripcion"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
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
                        {loading ? "Creando..." : "Crear Rol"}
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
