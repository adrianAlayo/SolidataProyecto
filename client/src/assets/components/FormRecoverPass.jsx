import { useState } from "react";
import "./FormLogin.css";
import { useNavigate } from "react-router-dom";

export default function RecoverPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRecover = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ACÁ después llamás a tu servicio real
      // await recoverPassword(email);

      alert("Si el correo existe, te enviamos un email para recuperar la contraseña.");
      navigate("/login");
    } catch (err) {
      alert("Hubo un error al intentar enviar el correo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="formloginBox animationFadeIn">
      <form className="formlogin" onSubmit={handleRecover}>
        
        <h2 className="textWelcome">¿Olvidaste tu contraseña?</h2>
        <h5 className="textLogin">Ingresá tu email para recuperarla</h5>

        <input
          className="inputEmailLog inputAnim"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="linksLogin">
          <a className="linkBackLog" href="/login">Volver al login</a>
        </div>

        <button className="buttonLogin buttonAnim" type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </section>
  );
}
