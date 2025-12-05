import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification";
import { DeleteArticle } from "../../services/article.service";
import './FormDeleteArticle.css'

export default function DeleteArticleF() {

    const [id, setId] = useState("");
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

    const handleDelete = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await DeleteArticle(id);

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
            <section className="formDeleteArticleBox animationFadeIn">
                <form className="formlogin" onSubmit={handleDelete}>
                    <h2 className="textWelcome">Eliminar Articulo</h2>
                    <h5 className="textLogin">Elimina un articulo del sistema</h5>


                    <input
                        className="inputEmailLog inputAnim"
                        type="number"
                        min={1}
                        step={1}
                        placeholder="ID Articulo"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
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
                        {loading ? "Eliminando..." : "Eliminar Articulo"}
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
