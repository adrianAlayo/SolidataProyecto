import { useState } from "react";
import "./FormRegisterUser.css";
import { useNavigate } from "react-router-dom";

export default function RegisterUser() {
  const [institucion, setInstitucion] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      alert("Registro exitoso. Ahora inicia sesión.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="formloginBox animationFadeIn">
      <form className="formlogin" onSubmit={handleRegister}>

        <h2 className="textWelcome">Crear Usuario</h2>
        <h5 className="textLogin">Registrate para continuar</h5>

        {/* CONTENEDOR 2 COLUMNAS */}
        <div className="gridTwoCols">

          <input
            className="inputEmailLog inputAnim"
            type="text"
            placeholder="Institución (opcional)"
            value={institucion}
            onChange={(e) => setInstitucion(e.target.value)}
          />

          <input
            className="inputEmailLog inputAnim"
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <input
            className="inputEmailLog inputAnim"
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />

          <input
            className="inputEmailLog inputAnim"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="inputEmailLog inputAnim"
            type="tel"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />

          <input
            className="inputPasswordLog inputAnim"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

        </div>

        <div className="linksLogin">
          <a className="linkBackLog" href="/login">Volver al login</a>
          <a className="linkBackLog" href="/register/institution">Registrar Institución</a>
        </div>

        <button className="buttonLogin buttonAnim" type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarme"}
        </button>

      </form>
    </section>
  );
}
