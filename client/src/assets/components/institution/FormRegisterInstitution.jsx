import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterInstitution } from "../../services/auth.service";
import { createInstitution } from "../../services/institution.service.js";
import SideMenu from "../SideMenu.jsx";
import Notification from "../../components/Notification";
import "./FormRegisterInstitution.css";

export default function RegisterInstitutionF({ adminMode = false }) {
  
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
      
      const payload = { first_name, last_name, email, phone, password, name_inst, location_inst, type_inst, type: Number(type) };
      const result = adminMode
        ? await createInstitution(payload)
        : await RegisterInstitution(first_name,last_name,email,phone,password,name_inst,location_inst,type_inst,type);

      showNotification(result.message, "success");

      setTimeout(() => navigate(adminMode ? "/admin/institutions" : "/"), 1200);

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
      <section className="registerInstitutionCard animationFadeIn">
        <form className="registerInstitutionForm" onSubmit={handleRegister}>
          <h1 className="registerInstitutionTitle">Sumá tu institución</h1>
          <p className="registerInstitutionSubtitle">Completá los datos para crear la cuenta</p>

          <div className="registerInstitutionGrid">
            <h2 className="registerGroupTitle">Datos de contacto</h2>
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

            <h2 className="registerGroupTitle">Datos de la institución</h2>
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

          <div className="registerInstitutionActions">
            {!adminMode && <Link to="/login" className="registerInstitutionBack">Ya tengo una cuenta</Link>}
            <button className="registerInstitutionSubmit" type="submit" disabled={loading}>
              {loading ? "Registrando..." : adminMode ? "Crear institución activa" : "Registrar institución"}
            </button>
          </div>
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
