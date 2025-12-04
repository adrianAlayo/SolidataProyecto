import { useState } from "react";
import "./FormDeleteUser.css";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../../services/user.service";
import Notification from "../../../components/Notification";

export default function DeleteUser() {
    const [id, setId] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Estados para notificación
    const [notifOpen, setNotifOpen] = useState(false);
    const [notifMsg, setNotifMsg] = useState("");
    const [notifType, setNotifType] = useState("success");

    const showNotification = (message, type = "success") => {
        setNotifMsg(message);
        setNotifType(type);
        setNotifOpen(true);
    };
    const handleDelete = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await deleteUser(id);
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
            <section className="formDeleteBox animationFadeIn">
                <form className="formlogin" onSubmit={handleDelete}>
                    <h2 className="textWelcome">Eliminar Usuario</h2>
                    <h5 className="textLogin">
                        Ingresá el ID del usuario que desea eliminar
                    </h5>

                    <input
                        className="inputEmailLog inputAnim"
                        type="id"
                        placeholder="ID del usuario"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />

                    <div className="linksLogin">
                        <a className="linkBackLog" href="/admin/home">
                            Volver atrás
                        </a>
                    </div>

                    <button
                        className="buttonDelete buttonAnim"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Eliminando..." : "Eliminar"}
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
