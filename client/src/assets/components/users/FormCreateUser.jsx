import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/user.service";
import Notification from "../../components/Notification";

export default function CreateUser() {

    const [rol, setRol] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // Estados para notificación
    const [notifOpen, setNotifOpen] = useState(false);
    const [notifMsg, setNotifMsg] = useState("");
    const [notifType, setNotifType] = useState("success");

    const navigate = useNavigate();

    const showNotification = (message, type = "success") => {
        setNotifMsg(message);
        setNotifType(type);
        setNotifOpen(true);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await createUser(
                first_name,
                last_name,
                email,
                password,
                phone,
                rol
            );

            showNotification(result.message, "success");

            setTimeout(() => {
                navigate("/admin/home");
            }, 1000);

        } catch (err) {
            console.log(err.message);
            
            const apiMessage = err.response?.data?.message;
            const apiDetails = err.response?.data?.details; // opcional, si lo envías
            const status = err.response?.status;

            let finalMessage = "";

            if (status) finalMessage += `Error ${status}: `;
            if (apiMessage) finalMessage += apiMessage;

            // Si hay detalles, los agregamos
            if (apiDetails) finalMessage += ` — ${apiDetails}`;

            showNotification(finalMessage || "Error inesperado.", "error");

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="formCreateBox animationFadeIn">
                <form className="formlogin" onSubmit={handleCreate}>
                    <h2 className="textWelcome">Crear Usuario</h2>
                    <h5 className="textLogin">Crea un nuevo usuario en el sistema</h5>

                    <div className="gridTwoCols">

                        <select
                            className="inputEmailLog2 inputAnim"
                            value={rol}
                            onChange={(e) => setRol(e.target.value)}
                        >
                            <option value="">Elegir Rol</option>
                            <option value="2">Operador</option>
                            <option value="3">Coordinador</option>
                            <option value="4">Institución</option>
                            <option value="5">Voluntario</option>
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
                        <a className="linkBackLog" href="/admin/home">
                            Volver Atras
                        </a>
                    </div>

                    <button
                        className="buttonLogin buttonAnim"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Creando..." : "Crear Usuario"}
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
