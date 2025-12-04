import { useState } from "react";
import "./FormLogin.css";
import { useNavigate } from "react-router-dom";
import { recoverPassword } from "../services/auth.service";
import Notification from "./Notification";

export default function RecoverPassword() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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

    const handleRecover = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await recoverPassword(
                email,
                password,
                confirmPassword
            );

            showNotification("Contraseña actualizada correctamente ✔", "success");

            setTimeout(() => {
                navigate("/login");
            }, 1200);

        } catch (err) {
            console.error(err);

            const apiMessage = err.response?.data?.message;
            const status = err.response?.status;

            let finalMessage = "Error al intentar recuperar la contraseña.";

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
                <form className="formlogin" onSubmit={handleRecover}>

                    <h2 className="textWelcome">¿Olvidaste tu contraseña?</h2>
                    <h5 className="textLogin">Completá los campos para cambiarla</h5>

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
                        placeholder="Nueva contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <input
                        className="inputPasswordLog inputAnim"
                        type="password"
                        placeholder="Confirmar contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <div className="linksLogin">
                        <a className="linkBackLog" href="/login">
                            Volver al login
                        </a>
                    </div>

                    <button
                        className="buttonLogin buttonAnim"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Actualizando..." : "Actualizar contraseña"}
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
