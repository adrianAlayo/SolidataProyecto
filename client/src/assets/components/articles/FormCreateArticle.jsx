import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification";
import './FormCreateArticle.css'
import { CreateArticle } from "../../services/article.service";

export default function CreateArticleF() {

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [variant, setVariant] = useState("");
    const [unit, setUnit] = useState("");
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
            const result = await CreateArticle(
                name,
                category,
                variant,
                unit,
            )
            showNotification(result.message, "success");

            setTimeout(() => {
                navigate("/admin/articles");
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
                    <h2 className="textWelcome">Registrar Articulo</h2>
                    <h5 className="textLogin">Registra un articulo nuevo en el sistema</h5>

                    <div className="gridTwoCols">

                        <input
                            className="inputEmailLog inputAnim"
                            type="text"
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <select
                            className="inputEmailLog2 inputAnim"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Elegir Categoria</option>
                            <option value="Alimentos">Alimentos</option>
                            <option value="Bebidas">Bebidas</option>
                            <option value="Limpieza">Limpieza</option>
                            <option value="Higiene">Higiene</option>
                        </select>



                        <input
                            className="inputEmailLog inputAnim"
                            type="Text"
                            placeholder="Variante"
                            value={variant}
                            onChange={(e) => setVariant(e.target.value)}
                            required
                        />

                        <select
                            className="inputEmailLog2 inputAnim"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            required
                        >
                            <option value="">Elegir Unidad</option>
                            <option value="Kg">Kilogramo</option>
                            <option value="Litro">Litro</option>
                            <option value="Unidad">Unidad</option>
                        </select>

                    </div>

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
                        {loading ? "Creando..." : "Crear Articulo"}
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
