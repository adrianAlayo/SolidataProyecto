import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification";
import './FormDeleteArticle.css'

export default function DeleteArticle() {

    const [id, setId] = useState("");
    const [loading, setLoading] = useState(false);

    // Estados para notificación
    const [notifOpen, setNotifOpen] = useState(false);
    const [notifMsg, setNotifMsg] = useState("");
    const [notifType, setNotifType] = useState("success");

    const navigate = useNavigate();

    const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      alert("Articulo eliminado con Exito!");
      navigate("/admin/home");
    } catch (err) {
      console.error(err);
      alert("Error al eliminar un articulo");
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
