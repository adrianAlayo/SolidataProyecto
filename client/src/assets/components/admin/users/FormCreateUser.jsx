import { useState } from "react";
import "./FormCreateUser.css";
import { useNavigate } from "react-router-dom";

export default function RegisterUser() {
  const [rol, setRol] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      alert("Usuario creado con Exito!");
      navigate("/admin/home");
    } catch (err) {
      console.error(err);
      alert("Error al crear un usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="formloginBox animationFadeIn">
      <form className="formlogin" onSubmit={handleRegister}>

        <h2 className="textWelcome">Crear Usuario</h2>
        <h5 className="textLogin">Crea un nuevo usuario en el sistema</h5>

        {/* CONTENEDOR 2 COLUMNAS */}
        <div className="gridTwoCols">

          <select
            className="inputEmailLog2 inputAnim"
            type="text"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="">Elegir Rol</option>
            <option value="Operador">Operador</option>
            <option value="Coordinador">Coordinador</option>
            <option value="Institucion">Institución</option>
            <option value="Voluntario">Voluntario</option>
          </select>  
        

          <input
            className="inputEmailLog inputAnim"
            type="text"
            placeholder="Nombre"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            className="inputEmailLog inputAnim"
            type="text"
            placeholder="Apellido"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
          <a className="linkBackLog" href="/admin/home">Volver Atras</a>
        </div>

        <button className="buttonLogin buttonAnim" type="submit" disabled={loading}>
          {loading ? "Creando..." : "Crear Usuario"}
        </button>

      </form>
    </section>
  );
}
