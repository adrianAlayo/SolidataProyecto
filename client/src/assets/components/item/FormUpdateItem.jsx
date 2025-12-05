import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification";
import './FormUpdateItem.css'

export default function UpdateItem() {

    const [id, setId] = useState("");
    const [note, setNote] = useState("");
    const [expiration_date, setExpirationDate] = useState("");
    const [donation_id, setDonation] = useState("")
    const [quantity, setQuantity] = useState("")
    const [article_id, setArticle] = useState("")
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
      alert("Item actualizado con Exito!");
      navigate("/admin/home");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar un item");
    } finally {
      setLoading(false);
    }
  };

    return (
        <>
            <section className="formUpdateItemBox animationFadeIn">
                <form className="formlogin" onSubmit={handleUpdate}>
                    <h2 className="textWelcome">Actualizar Item</h2>
                    <h5 className="textLogin">Actualiza un item en el sistema</h5>

                    
                    <div className="gridTwoCols">

                        
                        <input //aca tendrias que hacer lo mismo que en el update user, osea el buscar el articulo por su id
                            className="inputEmailLog inputAnim"
                            type="number"
                            min={1}
                            step={1}
                            placeholder="ID Item"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            required
                        />

                        <input
                            className="inputEmailLog inputAnim"
                            type="number"
                            min={1}
                            step={1}
                            placeholder="Cantidad"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                        />

                        <input
                            className="inputEmailLog inputAnim"
                            type="date"
                            placeholder="Fecha de Expiración"
                            value={expiration_date}
                            onChange={(e) => setExpirationDate(e.target.value)}
                        />
                        
                        <input
                            className="inputEmailLog inputAnim"
                            type="number"
                            min={1}
                            step={1}
                            placeholder="ID Articulo"
                            value={article_id}
                            onChange={(e) => setArticle(e.target.value)}
                        />

                        <input
                            className="inputEmailLog inputAnim"
                            type="number"
                            min={1}
                            step={1}
                            placeholder="ID Donacion"
                            value={donation_id}
                            onChange={(e) => setDonation(e.target.value)}
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
                        {loading ? "Actualizando..." : "Actualizar Item"}
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
