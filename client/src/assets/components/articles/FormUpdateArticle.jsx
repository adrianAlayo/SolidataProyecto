import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification";
import { GetArticle,UpdateArticle } from "../../services/article.service";
import './FormUpdateArticle.css'

export default function UpdateArticleF() {

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [variant, setVariant] = useState("");
    const [unit, setUnit] = useState("");
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

    const handleSearchArticle = async () => {
        if (!id) {
            return showNotification("Debe ingresar un ID.", "error");
        }

        setLoadingSearch(true);

        try {
            const result = await GetArticle(id);

            const article = result.data;

            setName(article.name || undefined);
            setCategory(article.category || undefined);
            setVariant(article.variant || undefined);
            setUnit(article.unit || undefined);

            showNotification("Articulo encontrado.", "success");

        } catch (err) {
            showNotification(
                err.response?.data?.message || "No se pudo obtener el usuario.",
                "error"
            );

            // limpiar inputs
            setName(undefined);
            setCategory(undefined);
            setVariant(undefined);
            setUnit(undefined);
        } finally {
            setLoadingSearch(false);
        }
    };

    // Actualizar usuario
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const fieldsUpdate = {
                name,
                category,
                variant,
                unit,
            };

            const result = await UpdateArticle(id, fieldsUpdate);

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
            <section className="formCreateArticleBox animationFadeIn">
                <form className="formlogin" onSubmit={handleUpdate}>
                    <h2 className="textWelcome">Actualizar Articulo</h2>
                    <h5 className="textLogin">Actualiza un articulo que ya esta en el sistema</h5>

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
                                onClick={handleSearchArticle}
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

                        <select
                            className="inputEmailLog2 inputAnim"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            
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
                            
                        />

                        <select
                            className="inputEmailLog2 inputAnim"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            
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
                        {loading ? "Actualizando..." : "Actualizar Articulo"}
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
