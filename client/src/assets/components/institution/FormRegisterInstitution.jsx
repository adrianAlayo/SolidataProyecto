import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterInstitution } from "../../services/auth.service";
import Notification from "../../components/Notification";
import "./FormRegisterInstitution.css";

export default function RegisterInstitutionF() {
  
  // -------------------- Estados del usuario --------------------
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // -------------------- Estados de institución --------------------
  const [name_inst, setInstName] = useState("");
  const [location_inst, setInstLocation] = useState("");
  const [type_inst, setInstType] = useState("");
  const [type, setType] = useState("");

  const [loading, setLoading] = useState(false);

  // -------------------- Notificaciones --------------------
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifMsg, setNotifMsg] = useState("");
  const [notifType, setNotifType] = useState("success");

  const navigate = useNavigate();

  const showNotification = (msg, type = "success") => {
    setNotifMsg(msg);
    setNotifType(type);
    setNotifOpen(true);
  };

  // -------------------- Enviar formulario --------------------
  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      
      const result = await RegisterInstitution(first_name,last_name,email,phone,password,name_inst,location_inst,type_inst,type);

      showNotification(result.message, "success");

      setTimeout(() => navigate("/"), 1200);

    } catch (err) {
      const apiMsg = err.response?.data?.message;
      const status = err.response?.status;

      showNotification(
        (status ? `Error ${status}: ` : "") + (apiMsg || "Error inesperado."),
        "error"
      );

    } finally {
      setLoading(false);
    }
  };

  return (

    <>
      <section className="formRegisterInstitutionBox animationFadeIn" style={{ width: 480 }}>
        <form className="formlogin" onSubmit={handleRegister}>

          <h2 className="textWelcome">Registrar Institución y Usuario</h2>
          <h5 className="textLogin">Todos los campos son obligatorios</h5>

          <div className="gridTwoCols">

            {/* ---- DATOS DEL USUARIO ---- */}
            <input className="inputEmailLog inputAnim" type="text" required placeholder="Nombre del usuario *"
              value={first_name} onChange={(e) => setFirstName(e.target.value)} />

            <input className="inputEmailLog inputAnim" type="text" required placeholder="Apellido del usuario *"
              value={last_name} onChange={(e) => setLastName(e.target.value)} />

            <input className="inputEmailLog inputAnim" type="email" required placeholder="Correo electrónico *"
              value={email} onChange={(e) => setEmail(e.target.value)} />

            <input className="inputEmailLog inputAnim" type="tel" required placeholder="Teléfono *"
              value={phone} onChange={(e) => setPhone(e.target.value)} />

            <input className="inputPasswordLog inputAnim" type="password" required placeholder="Contraseña *"
              value={password} onChange={(e) => setPassword(e.target.value)} />

            {/* ---- DATOS INSTITUCIÓN ---- */}
            <input className="inputEmailLog inputAnim" type="text" required placeholder="Nombre de la institución *"
              value={name_inst} onChange={(e) => setInstName(e.target.value)} />

            <input className="inputEmailLog inputAnim" type="text" required placeholder="Ubicación (calle y altura) *"
              value={location_inst} onChange={(e) => setInstLocation(e.target.value)} />

            <select className="inputEmailLog2 inputAnim" required value={type_inst} onChange={(e) => setInstType(e.target.value)}>
              <option value="">Tipo de institución *</option>
              <option value="Donor">Donante</option>
              <option value="Recipient">Receptor</option>
              <option value="Both">Ambos</option>
            </select>

            <select 
              className="inputEmailLog2 inputAnim"
              required 
              value={type} 
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Seleccione categoría *</option>
              <option value="2">Cooperativa</option>
              <option value="3">Mayorista</option>
              <option value="4">ONG</option>
              <option value="5">Particular</option>
              <option value="6">Supermercado</option>
              <option value="7">Comedor</option>
              <option value="8">Merendero</option>
              <option value="9">Hogar de Ancianos</option>
              <option value="10">Hogar de Niños</option>
            </select>

          </div>

          <div className="linksLogin">
            <a className="linkBackLog" href="/">Volver atrás</a>
          </div>

          <button className="buttonLogin buttonAnim" type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrar Institución"}
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
