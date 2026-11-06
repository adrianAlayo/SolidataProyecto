import { Link, useLocation, useParams } from "react-router-dom";
import { ConstructionRounded, HomeRounded } from "@mui/icons-material";
import "./PendingPage.css";

export default function PendingPage({ title }) {
  const { section } = useParams();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const heading = title || section?.replaceAll("-", " ") || params.get("section") || "Esta sección";
  return <main className="pendingPage"><section className="pendingCard">
    <div className="pendingIcon"><ConstructionRounded /></div>
    <span className="pendingEyebrow">SOLIDATA · EN DESARROLLO</span>
    <h1>{heading}</h1>
    <p>Esta sección todavía no fue realizada. La agregaremos en una próxima etapa del proyecto.</p>
    <Link className="pendingHome" to="/admin/home"><HomeRounded />Volver al inicio</Link>
  </section></main>;
}
