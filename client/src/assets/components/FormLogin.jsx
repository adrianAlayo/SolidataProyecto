import { useState } from "react";
import { Visibility } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext.jsx";
import { login } from "../services/auth.service.js";
import Notification from "./Notification.jsx";
import loginHeart from "../img/login-heart.png";
import loginEyeOff from "../img/login-eye.png";
import "./FormLogin.css";

export function FormLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ open: false, message: "", type: "success" });
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const showNotification = (message, type = "success") => {
        setNotification({ open: true, message, type });
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const data = await login(email.trim(), password);
            loginUser(data.token);

            const { rol } = jwtDecode(data.token);
            showNotification("Inicio de sesión exitoso", "success");

            window.setTimeout(() => {
                const destinations = {
                    1: "/admin/home",
                    2: "/operator/home",
                    3: "/admin/home",
                    4: "/institution/home",
                };
            navigate(destinations[rol] || "/", { replace: true });
            }, 600);
        } catch (error) {
            showNotification(
                error.response?.data?.message || "No se pudo iniciar sesión. Revisá el correo y la contraseña.",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="loginCard" aria-labelledby="loginTitle">
                <form className="loginForm" onSubmit={handleLogin}>
                    <h1 className="loginWelcome" id="loginTitle">
                        Bienvenid<img src={loginHeart} alt="" />
                    </h1>
                    <p className="loginSubtitle">Inicia sesión en tu cuenta</p>

                    <label className="visuallyHidden" htmlFor="loginEmail">Correo electrónico</label>
                    <input
                        className="loginInput loginEmail"
                        id="loginEmail"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Ingresa tu gmail"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />

                    <label className="visuallyHidden" htmlFor="loginPassword">Contraseña</label>
                    <div className="loginPasswordField">
                        <input
                            className="loginInput"
                            id="loginPassword"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                        <IconButton
                            className="passwordVisibilityButton"
                            type="button"
                            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            onClick={() => setShowPassword((visible) => !visible)}
                            size="small"
                        >
                            {showPassword ? <Visibility fontSize="small" /> : <img src={loginEyeOff} alt="" />}
                        </IconButton>
                    </div>

                    <div className="loginLinks">
                        <Link to="/" className="loginLink">Volver atrás</Link>
                        <Link to="/recoverpass" className="loginLink">¿Olvidaste tu contraseña?</Link>
                    </div>

                    <button className="loginSubmit" type="submit" disabled={loading}>
                        {loading ? "Ingresando..." : "Iniciar sesión"}
                    </button>
                </form>
            </section>

            <Notification
                open={notification.open}
                message={notification.message}
                severity={notification.type}
                onClose={() => setNotification((current) => ({ ...current, open: false }))}
            />
        </>
    );
}

export default FormLogin;
