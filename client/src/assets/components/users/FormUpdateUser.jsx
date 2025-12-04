import { useState } from "react";
import "./FormUpdateUser.css";
import { useNavigate } from "react-router-dom";
import { updateUser, getUser } from "../../services/user.service";
import Notification from "../Notification";

export default function UpdateUser() {

    const [id, setId] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);

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

    // Buscar usuario por ID y autocompletar
    const handleSearchUser = async () => {
        if (!id) {
            return showNotification("Debe ingresar un ID.", "error");
        }

        setLoadingSearch(true);

        try {
            const result = await getUser(id);

            const user = result.data;

            setFirstName(user.first_name || undefined);
            setLastName(user.last_name || undefined);
            setEmail(user.email || undefined);
            setPhone(user.phone || undefined);
            setPassword(undefined); // nunca mostramos password real

            showNotification("Usuario encontrado.", "success");

        } catch (err) {
            showNotification(
                err.response?.data?.message || "No se pudo obtener el usuario.",
                "error"
            );

            // limpiar inputs
            setFirstName(undefined);
            setLastName(undefined);
            setEmail(undefined);
            setPhone(undefined);
            setPassword(undefined);

        } finally {
            setLoadingSearch(false);
        }
    };

    // Actualizar usuario
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const fieldsUpdate = {
                first_name,
                last_name,
                email,
                phone,
                password
            };

            const result = await updateUser(id, fieldsUpdate);

            showNotification(result.message, "success");

            setTimeout(() => {
                navigate("/admin/home");
            }, 1000);

        } catch (err) {
            const apiMessage = err.response?.data?.message;
            const status = err.response?.status;

            showNotification(
                `Error ${status || ""}: ${apiMessage || "Error inesperado."}`,
                "error"
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="formUpdateBox animationFadeIn">
                <form className="formlogin" onSubmit={handleUpdate}>
                    <h2 className="textWelcome">Actualizar Usuario</h2>
                    <h5 className="textLogin">Actualiza un usuario del sistema</h5>

                    <div className="gridTwoCols">

                        {/* INPUT DEL ID + BOTÓN BUSCAR */}
                        <div style={{ display: "flex", gap: "10px" }}>
                            <input
                                className="inputEmailLog inputAnim"
                                type="number"
                                min={1}
                                step={1}
                                placeholder="ID"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />

                            <button
                                type="button"
                                className="buttonLogin"
                                onClick={handleSearchUser}
                                disabled={loadingSearch}
                            >
                                {loadingSearch ? "Buscando..." : "Buscar"}
                            </button>
                        </div>

                        <input
                            className="inputEmailLog inputAnim"
                            type="text"
                            placeholder="Nombre"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        <input
                            className="inputEmailLog inputAnim"
                            type="text"
                            placeholder="Apellido"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                        />

                        <input
                            className="inputEmailLog inputAnim"
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            className="inputEmailLog inputAnim"
                            type="tel"
                            placeholder="Teléfono"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        <input
                            className="inputPasswordLog inputAnim"
                            type="password"
                            placeholder="Nueva contraseña (opcional)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                        {loading ? "Actualizando..." : "Actualizar Usuario"}
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
