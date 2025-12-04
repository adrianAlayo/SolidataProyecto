import { useState } from "react";
import "./FormDeleteUser.css";
import { useNavigate } from "react-router-dom";

export default function FormDeleteUser() {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRecover = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      alert("Usuario Eliminado con Exito");
      navigate("/admin/home");
    } catch (err) {
      alert("Hubo un error al intentar eliminar el usuario");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="formloginBox animationFadeIn">
      <form className="formlogin" onSubmit={handleRecover}>
        
        <h2 className="textWelcome">Eliminar Usuario</h2>
        <h5 className="textLogin">Ingresá el ID del usuario que desea eliminar</h5>

        <input
          className="inputEmailLog inputAnim"
          type="id"
          placeholder="ID del usuario"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />

        <div className="linksLogin">
          <a className="linkBackLog" href="/admin/home">Volver atrás</a>
        </div>

        <button className="buttonLogin buttonAnim" type="submit" disabled={loading}>
          {loading ? "Eliminando..." : "Eliminar"}
        </button>
      </form>
    </section>
  );
}
