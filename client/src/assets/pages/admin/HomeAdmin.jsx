import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowForwardRounded, BusinessRounded, Inventory2Rounded, LocalShippingRounded, PeopleAltRounded, PlaylistAddRounded, RestaurantRounded, VolunteerActivismRounded } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext.jsx";
import { hasAnyPermission, hasPermission } from "../../utils/rolePermissions.js";
import { getNeeds } from "../../services/institutionNeed.service.js";
import { getDonations } from "../../services/donation.service.js";
import { getInstitutions, geocodeMissingInstitutions } from "../../services/institution.service.js";
import { getInventoriesOnlyArticles } from "../../services/inventory.service.js";
import SideMenu from "../../components/SideMenu.jsx";
import MapView from "../../components/MapView.jsx";
import "../../components/MapView.css";
import "./HomeAdmin.css";

const quickLinks = [
  { label: "Registrar necesidad", description: "Cargá un pedido institucional", to: "/admin/needs", icon: <PlaylistAddRounded />, requiredPermissions: [{ entity: "INSTITUTIONNEEDS", action: "CREATE" }] },
  { label: "Nueva donación", description: "Ingresá una donación", to: "/admin/donations/create", icon: <VolunteerActivismRounded />, requiredPermissions: [{ entity: "DONATIONS", action: "CREATE" }] },
  { label: "Instituciones", description: "Consultá entidades registradas", to: "/admin/institutions", icon: <BusinessRounded />, requiredPermissions: [{ entity: "INSTITUTIONS", action: "READ" }] },
  { label: "Inventario", description: "Revisá el stock actual", to: "/admin/inventory", icon: <Inventory2Rounded />, requiredPermissions: [{ entity: "INVENTORIES", action: "READ" }] },
  { label: "Artículos", description: "Administrá el catálogo", to: "/admin/articles", icon: <RestaurantRounded />, requiredPermissions: [{ entity: "ARTICLES", action: "READ" }] },
  { label: "Historial", description: "Buscá donaciones anteriores", to: "/admin/donations/history", icon: <LocalShippingRounded />, requiredPermissions: [{ entity: "DONATIONS", action: "READ" }] },
  { label: "Solicitudes de contraseña", description: "Habilitá cambios de contraseña", to: "/admin/password-reset-requests", icon: <PeopleAltRounded />, requiredPermissions: [] },
];

export default function HomeAdmin() {
  const { user, permissions = [] } = useAuth();
  const [data, setData] = useState({ needs: null, donations: null, institutions: null, inventory: null });
  const [loading, setLoading] = useState(true);
  const [institutionsLoading, setInstitutionsLoading] = useState(true);
  const [locating, setLocating] = useState(false);
  const [locateMessage, setLocateMessage] = useState("");

  useEffect(() => {
    Promise.allSettled([getNeeds(), getDonations(), getInstitutions(), getInventoriesOnlyArticles()]).then(([needs, donations, institutions, inventory]) => {
      setData({
        needs: needs.status === "fulfilled" ? needs.value.data || [] : null,
        donations: donations.status === "fulfilled" ? donations.value.data || [] : null,
        institutions: institutions.status === "fulfilled" ? institutions.value.institutions || [] : null,
        inventory: inventory.status === "fulfilled" ? inventory.value.data || [] : null,
      });
      setInstitutionsLoading(false);
      setLoading(false);
    });
  }, []);

  const locateMissing = async () => {
    setLocating(true);
    setLocateMessage("Estamos revisando las direcciones una por una. Puede tardar unos segundos por institución.");
    try {
      const result = await geocodeMissingInstitutions();
      const updatedInstitutions = await getInstitutions();
      setData((current) => ({ ...current, institutions: updatedInstitutions.institutions || [] }));
      setLocateMessage(`Revisión lista: ${result.located} ubicadas y ${result.notLocated} sin coincidencia precisa.`);
    } catch (error) {
      setLocateMessage(error.response?.data?.message || "No se pudieron revisar las direcciones.");
    } finally {
      setLocating(false);
    }
  };

  const pendingNeeds = data.needs?.filter((need) => need.status === "Pending").length;
  const activeInstitutions = data.institutions?.filter((institution) => institution.status === "Active").length;
  const totalStock = data.inventory?.reduce((total, item) => total + Number(item.total_stock || 0), 0);
  const recentNeeds = useMemo(() => (data.needs || []).slice(0, 4), [data.needs]);
  const donationStatuses = [
    { label: "Programadas", value: data.donations?.filter((donation) => donation.status === "Scheduled").length ?? null, color: "#e7ad3d" },
    { label: "Entregadas", value: data.donations?.filter((donation) => donation.status === "Delivered").length ?? null, color: "#45a56b" },
    { label: "No entregadas", value: data.donations?.filter((donation) => donation.status === "Not Delivered").length ?? null, color: "#d77669" },
  ];
  const maxDonationCount = Math.max(1, ...donationStatuses.map((item) => item.value || 0));
  const firstName = user?.first_name || user?.name?.split(" ")[0] || "equipo";
  const isAdmin = Number(user?.rol) === 1;
  const can = (entity, action) => isAdmin || hasPermission(permissions, entity, action);
  const visibleQuickLinks = isAdmin ? quickLinks : quickLinks.filter((item) => hasAnyPermission(permissions, item.requiredPermissions));

  return <main className="adminDashboard"><SideMenu />
    <section className="dashboardWelcome">
      <div><span className="dashboardEyebrow">PANEL DE GESTIÓN</span><h1>Hola, {firstName}</h1><p>Todo lo importante del Banco de Alimentos, en un solo lugar.</p></div>
      {can("DONATIONS", "CREATE") && <Link to="/admin/donations/create" className="dashboardMainAction"><VolunteerActivismRounded /> Nueva donación</Link>}
    </section>

    <section className="dashboardStats" aria-label="Resumen">
      {can("INSTITUTIONNEEDS", "READ") && <article className="dashboardStat needsStat"><span className="dashboardStatIcon"><PlaylistAddRounded /></span><div><small>Necesidades pendientes</small><strong>{loading ? "…" : pendingNeeds ?? "—"}</strong><span>Solicitudes por revisar</span></div><Link to="/admin/needs" aria-label="Ver necesidades"><ArrowForwardRounded /></Link></article>}
      {can("DONATIONS", "READ") && <article className="dashboardStat donationsStat"><span className="dashboardStatIcon"><VolunteerActivismRounded /></span><div><small>Donaciones registradas</small><strong>{loading ? "…" : data.donations?.length ?? "—"}</strong><span>En el historial</span></div><Link to="/admin/donations/history" aria-label="Ver donaciones"><ArrowForwardRounded /></Link></article>}
      {can("INSTITUTIONS", "READ") && <article className="dashboardStat institutionsStat"><span className="dashboardStatIcon"><BusinessRounded /></span><div><small>Instituciones activas</small><strong>{loading ? "…" : activeInstitutions ?? "—"}</strong><span>Con estado activo</span></div><Link to="/admin/institutions" aria-label="Ver instituciones"><ArrowForwardRounded /></Link></article>}
      {can("INVENTORIES", "READ") && <article className="dashboardStat stockStat"><span className="dashboardStatIcon"><Inventory2Rounded /></span><div><small>Unidades en inventario</small><strong>{loading ? "…" : totalStock == null ? "—" : totalStock.toLocaleString("es-AR")}</strong><span>Stock disponible agrupado</span></div><Link to="/admin/inventory" aria-label="Ver inventario"><ArrowForwardRounded /></Link></article>}
    </section>

    {visibleQuickLinks.length > 0 && <section className="dashboardQuickSection"><div className="dashboardSectionHeading"><div><h2>Accesos rápidos</h2><p>Atajos para las tareas más usadas.</p></div></div>
      <div className="dashboardQuickGrid">{visibleQuickLinks.map((item) => <Link className="dashboardQuickLink" to={item.to} key={item.label}><span className="dashboardQuickIcon">{item.icon}</span><span className="dashboardQuickText"><strong>{item.label}</strong><small>{item.description}</small></span><ArrowForwardRounded className="dashboardQuickArrow" /></Link>)}</div>
    </section>}

    <section className="dashboardLowerGrid">
      <div className="dashboardCard dashboardRecentCard"><div className="dashboardSectionHeading"><div><h2>Necesidades recientes</h2><p>Últimas solicitudes registradas.</p></div>{can("INSTITUTIONNEEDS", "READ") && <Link to="/admin/needs">Ver todas <ArrowForwardRounded /></Link>}</div>
        {loading ? <p className="dashboardEmpty">Cargando solicitudes…</p> : recentNeeds.length ? <div className="dashboardRecentList">{recentNeeds.map((need) => <div className="dashboardRecentRow" key={need.id}><span className="dashboardRecentIcon"><RestaurantRounded /></span><span className="dashboardRecentInfo"><strong>{need.Article?.name || "Artículo"}</strong><small>{need.Institution?.name || "Institución"}</small></span><span className="dashboardRecentAmount">{need.available} {need.Article?.unit || ""}</span></div>)}</div> : <p className="dashboardEmpty">No hay necesidades para mostrar.</p>}
      </div>
      <div className="dashboardCard dashboardChartCard"><div className="dashboardSectionHeading"><div><h2>Estado de donaciones</h2><p>Distribución según el estado actual.</p></div></div>
        <div className="dashboardChart">{donationStatuses.map((item) => <div className="dashboardChartRow" key={item.label}><div className="dashboardChartLabel"><span>{item.label}</span><strong>{loading ? "…" : item.value ?? "—"}</strong></div><div className="dashboardChartTrack"><span style={{ width: `${item.value == null ? 0 : Math.max(4, item.value / maxDonationCount * 100)}%`, background: item.color }} /></div></div>)}</div>
        <Link className="dashboardChartLink" to="/admin/donations/history">Abrir historial <ArrowForwardRounded /></Link>
      </div>
    </section>

    <section className="dashboardMapSection"><MapView institutions={data.institutions} loading={institutionsLoading} onLocateMissing={locateMissing} locating={locating} locateMessage={locateMessage} /></section>
    <footer className="dashboardFooter">SOLIDATA · Gestión solidaria del Banco de Alimentos Buenos Aires</footer>
  </main>;
}
