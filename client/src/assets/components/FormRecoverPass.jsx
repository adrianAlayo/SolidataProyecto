import { useState } from "react";
import { Link } from "react-router-dom";
import lockImage from "../img/recover-lock.png";
import { recoverPassword } from "../services/auth.service.js";
import "./FormRecoverPass.css";

export default function RecoverPassword() {
    const [email, setEmail] = useState("");
    const [approved, setApproved] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const checkRequest = async (event) => {
        event.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);
        try {
            const result = await recoverPassword(email);
            setApproved(result.status === "APPROVED");
            setMessage(result.message || "Solicitud revisada.");
        } catch (requestError) {
            setError(requestError.response?.data?.message || "No se pudo consultar la solicitud.");
        } finally {
            setLoading(false);
        }
    };

    const savePassword = async (event) => {
        event.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);
        try {
            const result = await recoverPassword(email, password, confirmPassword);
            setMessage(result.message || "Contraseña actualizada.");
            setApproved(false);
            setPassword("");
            setConfirmPassword("");
        } catch (requestError) {
            setError(requestError.response?.data?.message || "No se pudo cambiar la contraseña.");
        } finally {
            setLoading(false);
        }
    };

    return <section className="recoverCard" aria-labelledby="recoverTitle">
        <div className="recoverLockBadge" aria-hidden="true"><img src={lockImage} alt="" /></div>
        <h1 className="recoverTitle" id="recoverTitle">Restablecer contraseña</h1>
        <p className="recoverSubtitle">{approved ? "Elegí una contraseña nueva" : "Ingresá tu email registrado"}</p>
        <p className="recoverDescription">{message || "Primero el administrador debe habilitar el cambio de contraseña."}</p>
        {error && <p className="recoverError" role="alert">{error}</p>}

        {!approved ? <form className="recoverForm" onSubmit={checkRequest}>
            <input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Ingresá tu email" aria-label="Email" required />
            <button className="recoverButton" type="submit" disabled={loading}>{loading ? "Consultando..." : "Consultar solicitud"}</button>
        </form> : <form className="recoverForm" onSubmit={savePassword}>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" aria-label="Email" required />
            <input type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Nueva contraseña" aria-label="Nueva contraseña" required />
            <input type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirmar contraseña" aria-label="Confirmar contraseña" required />
            <button className="recoverButton" type="submit" disabled={loading}>{loading ? "Guardando..." : "Cambiar contraseña"}</button>
        </form>}
        <Link className="recoverBackLink" to="/login">Volver al inicio de sesión</Link>
    </section>;
}
