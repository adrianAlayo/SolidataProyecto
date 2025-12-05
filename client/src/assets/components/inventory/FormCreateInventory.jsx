import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification";
import './FormCreateInventory.css'

export default function CreateItem() {

    const [area, setArea] = useState("");
    const [donation_item_id, setDonationItem] = useState("");
    const [loading, setLoading] = useState(false);

    // Estados para notificación
    const [notifOpen, setNotifOpen] = useState(false);
    const [notifMsg, setNotifMsg] = useState("");
    const [notifType, setNotifType] = useState("success");

    const navigate = useNavigate();

    const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      alert("Inventario creado con Exito!");
      navigate("/admin/home");
    } catch (err) {
      console.error(err);
      alert("Error al crear un inventario");
    } finally {
      setLoading(false);
    }
  };

    return (
        <>
            <section className="formCreateInventoryBox animationFadeIn">
                <form className="formlogin" onSubmit={handleCreate}>
                    <h2 className="textWelcome">Crear Inventario</h2>
                    <h5 className="textLogin">Registra un nuevo inventario en el sistema</h5>

                        
                        <select
                            className="inputEmailLog2 inputAnim"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            required
                        >
                            <option value="">Elegir Area</option>
                            <option value="A">Seccion A</option>
                            <option value="B">Seccion B</option>
                            <option value="C">Seccion C</option>
                        </select>

                        <input
                            className="inputEmailLog6 inputAnim"
                            type="number"
                            min={1}
                            step={1}
                            placeholder="ID Item"
                            value={donation_item_id}
                            onChange={(e) => setDonationItem(e.target.value)}
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
                        {loading ? "Creando..." : "Crear Inventario"}
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
