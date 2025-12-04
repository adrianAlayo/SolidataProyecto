import { useState } from "react";
import "../FormLogin.css";
import { useNavigate } from "react-router-dom";

export default function RegisterInstitution() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [institutionType, setInstitutionType] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("El nombre de la institución es obligatorio.");
      return;
    }

    if (!location.trim()) {
      alert("La ubicación es obligatoria.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: name.trim(),
        location: location.trim(),
        type:
          institutionType === "Donante"
            ? "Donor"
            : institutionType === "Receptor"
            ? "Recipient"
            : institutionType === "Ambos"
            ? "Both"
            : null,
        category: category.trim() || null,
      };

      console.log("Institución enviada (simulado):", payload);

      alert("Institución registrada correctamente.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error al registrar la institución.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="formloginBox animationFadeIn" style={{ width: 420 }}>
      <form className="formlogin" onSubmit={handleSubmit}>

        <h2 className="textWelcome">Registrar Institución</h2>
        <h5 className="textLogin">Ingresa los datos requeridos</h5>

        <div className="gridTwoCols">

          <input
            className="inputEmailLog inputAnim"
            type="text"
            placeholder="Nombre de la institución *"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="inputEmailLog inputAnim"
            type="text"
            placeholder="Ubicación (calle y altura) *"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <select
            className="inputEmailLog2 inputAnim"
            value={institutionType}
            onChange={(e) => setInstitutionType(e.target.value)}
          >
            <option value="">Tipo de institución (opcional)</option>
            <option value="Donante">Donante</option>
            <option value="Receptor">Receptor</option>
            <option value="Ambos">Ambos</option>
          </select>

          <input
            className="inputEmailLog inputAnim"
            type="text"
            placeholder="Categoría (empresa, comedor, ONG...) (opcional)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

        </div>

        <div className="linksLogin">
          <a className="linkBackLog" href="/">Volver atrás</a>
        </div>

        <button
          className="buttonLogin buttonAnim"
          type="submit"
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrar Institución"}
        </button>

      </form>
    </section>
  );
}
