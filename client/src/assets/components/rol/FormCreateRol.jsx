import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification";
import './FormCreateRol.css'

export default function CreateRol() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
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
      alert("Rol creado con Exito!");
      navigate("/admin/home");
    } catch (err) {
      console.error(err);
      alert("Error al registrar un rol");
    } finally {
      setLoading(false);
    }
  };

    return (
        <>
            <section className="formCreateArticleBox animationFadeIn">
                <form className="formlogin" onSubmit={handleCreate}>
                    <h2 className="textWelcome">Registrar Rol</h2>
                    <h5 className="textLogin">Registra un rol nuevo en el sistema</h5>

                    
                        
                        <input
                            className="inputEmailLog3 inputAnim"
                            type="text"
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                

                        <input
                            className="inputEmailLog3 inputAnim"
                            type="Text"
                            placeholder="Descripcion"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                        {loading ? "Creando..." : "Crear Rol"}
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
