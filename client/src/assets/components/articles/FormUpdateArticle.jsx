import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification";
import './FormUpdateArticle.css'

export default function CreateArticle() {

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [variant, setVariant] = useState("");
    const [unit, setUnit] = useState("");
    const [loading, setLoading] = useState(false);

    // Estados para notificación
    const [notifOpen, setNotifOpen] = useState(false);
    const [notifMsg, setNotifMsg] = useState("");
    const [notifType, setNotifType] = useState("success");

    const navigate = useNavigate();

    const handleSearchArticle = async (e) => {

    }

    const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      alert("Articulo creado con Exito!");
      navigate("/admin/home");
    } catch (err) {
      console.error(err);
      alert("Error al registrar un articulo");
    } finally {
      setLoading(false);
    }
  };

    return (
        <>
            <section className="formCreateArticleBox animationFadeIn">
                <form className="formlogin" onSubmit={handleCreate}>
                    <h2 className="textWelcome">Actualizar Articulo</h2>
                    <h5 className="textLogin">Actualiza un articulo que ya esta en el sistema</h5>

                    <div className="gridTwoCols">
                        
                        <input //aca tendrias que hacer lo mismo que en el update user, osea el buscar el articulo por su id
                            className="inputEmailLog inputAnim"
                            type="number"
                            min={1}
                            step={1}
                            placeholder="ID Articulo" 
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required
                        />

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
