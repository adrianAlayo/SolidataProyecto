import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification";
import './FormUpdateInventory.css'

export default function UpdateItem() {

    const [id, setId] = useState("");
    const [area, setArea] = useState("");
    const [available, setAvailable] = useState("");
    const [loading, setLoading] = useState(false);

    // Estados para notificación
    const [notifOpen, setNotifOpen] = useState(false);
    const [notifMsg, setNotifMsg] = useState("");
    const [notifType, setNotifType] = useState("success");

    const navigate = useNavigate();

    const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      alert("Inventario actualizado con Exito!");
      navigate("/admin/home");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar un inventario");
    } finally {
      setLoading(false);
    }
  };

    return (
        <>
            <section className="formUpdateInventoryBox animationFadeIn">
                <form className="formlogin" onSubmit={handleUpdate}>
                    <h2 className="textWelcome">Actualizar Inventario</h2>
                    <h5 className="textLogin">Actualiza un inventario en el sistema</h5>

                    
                    <div className="gridTwoCols">

                        
                        <input //aca tendrias que hacer lo mismo que en el update user, osea el buscar el articulo por su id
                            className="inputEmailLog inputAnim"
                            type="number"
                            min={1}
                            step={1}
                            placeholder="ID Inventario"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required
                        />

                        <input
                            className="inputEmailLog inputAnim"
                            type="number"
                            min={1}
                            step={1}
                            placeholder="Disponible"
                            value={available}
                            onChange={(e) => setAvailable(e.target.value)}
                        />

                    </div>
                    
                    <select
                            className="inputEmailLog5 inputAnim"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                    >
                        <option value="">Elegir area</option>
                        <option value="A">Seccion A</option>
                        <option value="B">Seccion B</option>
                        <option value="C">Seccion C</option>
                    </select>

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
                        {loading ? "Actualizando..." : "Actualizar Inventario"}
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
