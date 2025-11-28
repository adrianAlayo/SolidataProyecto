import { useState } from "react";
import "./FormLogin.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { login } from "../services/authService.js";
import { jwtDecode } from "jwt-decode";
import InputCustom from "./InputCustom.jsx";

export function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await login(email, password);
      loginUser(data.token);

      const payload = jwtDecode(data.token);
      console.log(payload);
      
      switch (payload.rol) {
        case 1:
          navigate("/admin/");
          break;
        case "Institucion":
          navigate("/institution");
          break;
        case 2:
          navigate("/homeemployeeOp");
          break;
        case "Coordinador":
          navigate("/employeeCoordinator");
          break;
        default:
          navigate("/");
      }

    } catch (err) {
      alert("Error al iniciar sesión");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="formloginBox animationFadeIn">
      <form className="formlogin" onSubmit={handleLogin}>
        
        <h2 className="textWelcome">Bienvenid❤️</h2>
        <h5 className="textLogin">Inicia sesión en tu cuenta</h5>

        <input
          className="inputEmailLog inputAnim"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <div className="linksLogin">
          <a className="linkBackLog" href="/">Volver atrás</a>
          <a className="linkRecoverLog" href="/#">¿Olvidaste tu contraseña?</a>
        </div>

        <button className="buttonLogin buttonAnim" type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Iniciar Sesión"}
        </button>
      </form>
    </section>
  );
}

export default FormLogin;
