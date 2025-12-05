import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification";
import './FormUpdateDonation.css'

export default function UpdateDonation() {

    const [id, setId] = useState("");
    const [note, setNote] = useState("");
    const [date, setDate] = useState("");
    const [donor, setDonor] = useState("")
    const [receiver, setReceiver] = useState("")
    const [items, setItems] = useState("")
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
      alert("Donacion actualizada con Exito!");
      navigate("/admin/home");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar una donacion");
    } finally {
      setLoading(false);
    }
  };

    return (
        <>
            <section className="formUpdateDonationBox animationFadeIn">
                <form className="formlogin" onSubmit={handleUpdate}>
                    <h2 className="textWelcome">Actualizar Donacion</h2>
                    <h5 className="textLogin">Actualiza una donacion que ya esta en el sistema</h5>

                    <div className="gridTwoCols">
                        
                        <input //aca tendrias que hacer lo mismo que en el update user, osea el buscar el articulo por su id
                            className="inputEmailLog inputAnim"
                            type="number"
                            min={1}
                            step={1}
                            placeholder="ID" 
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required
                        />

                        <input
                            className="inputEmailLog inputAnim"
                            type="date"
                            placeholder="Fecha"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />

                        <input
                            className="inputEmailLog inputAnim"
                            type="Text"
                            placeholder="Donante"
                            value={donor}
                            onChange={(e) => setDonor(e.target.value)}
                        />
                        
                        <input
                            className="inputEmailLog inputAnim"
                            type="number"
                            min={1}
                            step={1}
                            placeholder="Cantidad de Items"
                            value={items}
                            onChange={(e) => setItems(e.target.value)}
                        />

                        <input
                            className="inputEmailLog inputAnim"
                            type="Text"
                            placeholder="Receptor"
                            value={receiver}
                            onChange={(e) => setReceiver(e.target.value)}
                        />

                    </div>

                    <input
                            className="inputEmailLog5 inputAnim"
                            type="text"
                            placeholder="Nota"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
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
                        {loading ? "Actualizando..." : "Actualizar Donacion"}
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
