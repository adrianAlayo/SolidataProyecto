import { useState } from "react";
import "./FormUpdateUser.css";
import { useNavigate } from "react-router-dom";

export default function RegisterUser() {
  const [id, setId] = useState("");
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

        <h2 className="textWelcome">Actualizar Usuario</h2>
        <h5 className="textLogin">Actualiza un usuario del sistema</h5>


        {/*Alayo fijate de tal vez hacer una funcion de que al momento de ingresar el id, se cargen los datos
        de ese usuario en los inputs del form, y de ahi que el admin los edite, no se si es posible pero fijate
        igual eso te digo que tendrias que hacer una funcion y mezclarlo con un estado en el input del id*/}



        {/* CONTENEDOR 2 COLUMNAS */}
        <div className="gridTwoCols">

          <input
            className="inputEmailLog inputAnim"
            type="text"
            placeholder="ID Usuario"
            value={id}
            onChange={(e) => setId(e.target.value)}
          /> 
        

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
          {loading ? "Actualizando..." : "Actualizar Usuario"}
        </button>

      </form>
    </section>
  );
}
