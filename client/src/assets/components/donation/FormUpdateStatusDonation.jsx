import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification";
import './FormUpdateStatusDonation.css'

export default function UpdateStatusDonation() {

    const [id, setId] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    // Estados para notificación
    const [notifOpen, setNotifOpen] = useState(false);
    const [notifMsg, setNotifMsg] = useState("");
    const [notifType, setNotifType] = useState("success");

    const navigate = useNavigate();

    const handleSearchRol = async (e) => {

    }

    const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      alert("Estado de donacion actualizada con Exito!");
      navigate("/admin/home");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el estado de una donacion");
    } finally {
      setLoading(false);
    }
  };

    return (
        <>
            <section className="formUpdateStatusDonationBox animationFadeIn">
                <form className="formlogin" onSubmit={handleUpdate}>
                    <h2 className="textWelcome">Actualizar Estado de Donacion</h2>
                    <h5 className="textLogin">Actualiza el estado de una donacion que ya esta en el sistema</h5>
                        
                        <input
                            className="inputEmailLog inputAnim"
                            type="number"
                            min={1}
                            step={1}
                            placeholder="ID" 
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required
                        />

                        <select
                            className="inputEmailLog6 inputAnim"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option value="">Elegir Estado</option>
                            <option value="Scheduled">Agendado</option>
                            <option value="Delivered">Entregado</option>
                            <option value="Not Delivered">Sin Entregar</option>
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
                        {loading ? "Actualizando..." : "Actualizar Estado"}
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
