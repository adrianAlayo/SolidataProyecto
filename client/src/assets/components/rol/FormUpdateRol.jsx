import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../Notification";
import './FormUpdateRol.css'

export default function UpdateRol() {

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
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
            <section className="formUpdateRolBox animationFadeIn">
                <form className="formlogin" onSubmit={handleUpdate}>
                    <h2 className="textWelcome">Actualizar Rol</h2>
                    <h5 className="textLogin">Actualiza un rol que ya esta en el sistema</h5>

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
                            type="text"
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                    </div>
                    
                    <input
                        className="inputEmailLog5 inputAnim"
                        type="text"
                        placeholder="Descripcion"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                        {loading ? "Actualizando..." : "Actualizar Rol"}
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
