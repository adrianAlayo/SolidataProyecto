import { useState } from "react";
import "./FormLogin.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { login } from "../services/auth.service.js";
import { jwtDecode } from "jwt-decode";
import Notification from "./Notification.jsx";

export function FormLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loginUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Notificaciones
    const [notifOpen, setNotifOpen] = useState(false);
    const [notifMsg, setNotifMsg] = useState("");
    const [notifType, setNotifType] = useState("success");

    const showNotification = (message, type = "success") => {
        setNotifMsg(message);
        setNotifType(type);
        setNotifOpen(true);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await login(email, password);
            loginUser(data.token);

            const payload = jwtDecode(data.token);

            // Notificación exitosa
            showNotification("Inicio de sesión exitoso ✔", "success");

            setTimeout(() => {
                switch (payload.rol) {
                    case 1:
                        navigate("/admin/home");
                        break;
                    case 2:
                        navigate("/operator/home");
                        break;
                    case 3:
                        navigate("/coordinator/home");
                        break;
                    case 4:
                        navigate("/institution/home");
                        break;
                    default:
                        navigate("/");
                }
            }, 800);

        } catch (err) {
            console.error(err);

            const apiMessage = err.response?.data?.message;
            const status = err.response?.status;

            let finalMessage = "Error al iniciar sesión.";

            if (status) finalMessage = `Error ${status}: `;
            if (apiMessage) finalMessage += apiMessage;

            showNotification(finalMessage, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
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
                        <a className="linkRecoverLog" href="/recoverpass">¿Olvidaste tu contraseña?</a>
                    </div>

                    <button className="buttonLogin buttonAnim" type="submit" disabled={loading}>
                        {loading ? "Ingresando..." : "Iniciar Sesión"}
                    </button>
                </form>
            </section>

            {/* Componente de notificaciones */}
            <Notification
                open={notifOpen}
                message={notifMsg}
                severity={notifType}
                onClose={() => setNotifOpen(false)}
            />
        </>
    );
}

export default FormLogin;
