import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification";
import './FormCreateDonation.css'

export default function CreateDonation() {

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

    const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      alert("Donacion creada con Exito!");
      navigate("/admin/home");
    } catch (err) {
      console.error(err);
      alert("Error al crear una donacion");
    } finally {
      setLoading(false);
    }
  };

    return (
        <>
            <section className="formCreateDonationBox animationFadeIn">
                <form className="formlogin" onSubmit={handleCreate}>
                    <h2 className="textWelcome">Crear Donacion</h2>
                    <h5 className="textLogin">Registra una nueva donacion en el sistema</h5>

                    
                    <div className="gridTwoCols">

                        
                        <input
                            className="inputEmailLog inputAnim"
                            type="date"
                            placeholder="Fecha"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />

                        <input
                            className="inputEmailLog inputAnim"
                            type="Text"
                            placeholder="Donante"
                            value={donor}
                            onChange={(e) => setDonor(e.target.value)}
                            required
                        />
                        
                        <input //yo digo que podes hacer una funcion aca como para llamar al componente del form de item
                        //pero si no esa funcion tambien la podes mejor en la pagina de create donation donde se llaman los componentes
                        //ya que lo mas probable es que si lo haces aca dentro del form vas a crear muchos forms de items dentro de este form
                        //y no dentro de la pagina y ahi explotara todo xd
                            className="inputEmailLog inputAnim"
                            type="number"
                            min={1}
                            step={1}
                            placeholder="Cantidad de Items"
                            value={items}
                            onChange={(e) => setItems(e.target.value)}
                            required
                        />

                        <input
                            className="inputEmailLog inputAnim"
                            type="Text"
                            placeholder="Receptor"
                            value={receiver}
                            onChange={(e) => setReceiver(e.target.value)}
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
                        {loading ? "Creando..." : "Crear Donacion"}
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
