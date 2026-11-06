import { Link } from "react-router-dom";
import lockImage from "../img/recover-lock.png";
import "./FormRecoverPass.css";

export default function RecoverPassword() {
    return (
        <section className="recoverCard" aria-labelledby="recoverTitle">
            <div className="recoverLockBadge" aria-hidden="true">
                <img src={lockImage} alt="" />
            </div>

            <h1 className="recoverTitle" id="recoverTitle">Restablecer contraseña</h1>
            <p className="recoverSubtitle">Recuperá tu contraseña</p>
            <p className="recoverDescription">
                Para restablecerla, solicitá ayuda a un administrador de SOLIDATA.
            </p>

            <Link className="recoverButton" to="/login">
                Volver al inicio de sesión
            </Link>
        </section>
    );
}
