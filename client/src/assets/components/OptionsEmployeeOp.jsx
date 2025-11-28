import "./OptionsEmployee.css";
import { useNavigate } from "react-router-dom";

export function OptionsEmployeeOp() {
  const navigate = useNavigate();

  const goToRegisterDonation = () => navigate("/registerdonation");
  const goToRegisterDonor = () => navigate("/registerdonor");

  return (
    <div className="employeeOptions">
      <section className="Options" onClick={goToRegisterDonation}>
        <h1>Registrar Donaciones</h1>
      </section>

      <section className="Options" onClick={goToRegisterDonor}>
        <h1>Registrar Donantes</h1>
      </section>
    </div>
  );
}

export default OptionsEmployeeOp;
