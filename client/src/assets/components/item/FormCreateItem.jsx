import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification";
import './FormCreateItem.css'

export default function CreateItem() {

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

    const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      alert("Item creado con Exito!");
      navigate("/admin/home");
    } catch (err) {
      console.error(err);
      alert("Error al crear un item");
    } finally {
      setLoading(false);
    }
  };

    return (
        <>
            <section className="formCreateItemBox animationFadeIn">
                <form className="formlogin" onSubmit={handleCreate}>
                    <h2 className="textWelcome">Crear Item</h2>
                    <h5 className="textLogin">Registra un nuevo item en el sistema</h5>

                    
                    <div className="gridTwoCols">

                        
                        <input
                            className="inputEmailLog inputAnim"
                            type="number"
                            min={1}
                            step={1}
                            placeholder="Cantidad"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />

                        <input
                            className="inputEmailLog inputAnim"
                            type="date"
                            placeholder="Fecha de Expiración"
                            value={expiration_date}
                            onChange={(e) => setExpirationDate(e.target.value)}
                            required
                        />
                        
                        <input
                            className="inputEmailLog inputAnim"
                            type="number"
                            min={1}
                            step={1}
                            placeholder="ID Articulo"
                            value={article_id}
                            onChange={(e) => setArticle(e.target.value)}
                            required
                        />

                        <input
                            className="inputEmailLog inputAnim"
                            type="number"
                            min={1}
                            step={1}
                            placeholder="ID Donacion"
                            value={donation_id}
                            onChange={(e) => setDonation(e.target.value)}
                            required
                        />

                    </div>
                    
                    <input
                            className="inputEmailLog5 inputAnim"
                            type="text"
                            placeholder="Nota"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
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
                        {loading ? "Creando..." : "Crear Item"}
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
