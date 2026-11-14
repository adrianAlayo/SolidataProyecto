import { useEffect, useMemo, useState } from "react";
import { Collapse, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, useMediaQuery } from "@mui/material";
import {
  AccountBalanceRounded, AssessmentRounded, BusinessRounded, ChevronLeftRounded,
  ExpandLessRounded, ExpandMoreRounded, HomeRounded, Inventory2Rounded,
  MenuRounded, PeopleAltRounded, RestaurantRounded, SettingsRounded,
  VolunteerActivismRounded
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { canAccessPath, filterMenuByPermissions, homeForRole } from "../utils/rolePermissions.js";
import menuData from "./SideMenuData.js";
import solidataLogo from "../img/solidata-logo.png";
import "./SideMenu.css";

const iconFor = (label) => {
  const key = label.toLowerCase();
  if (key.includes("inicio")) return <HomeRounded />;
  if (key.includes("usuario")) return <PeopleAltRounded />;
  if (key.includes("artículo")) return <RestaurantRounded />;
  if (key.includes("rol") || key.includes("información")) return <SettingsRounded />;
  if (key.includes("donación")) return <VolunteerActivismRounded />;
  if (key.includes("institución")) return <BusinessRounded />;
  if (key.includes("inventario")) return <Inventory2Rounded />;
  if (key.includes("reporte")) return <AssessmentRounded />;
  return <AccountBalanceRounded />;
};

const sidebarQuickLinks = [
  { label: "Inicio", path: "/admin/home", always: true },
  { label: "Necesidades", path: "/admin/needs" },
  { label: "Donaciones", path: "/admin/donations/history" },
  { label: "Artículos", path: "/admin/articles" },
  { label: "Inventario", path: "/admin/inventory" },
  { label: "Instituciones", path: "/admin/institutions" },
];

const hasCurrentPath = (items, pathname) => items.some((item) => {
  if (item.path && item.path !== "#" && (pathname === item.path || pathname.startsWith(`${item.path}/`))) return true;
  return item.children ? hasCurrentPath(item.children, pathname) : false;
});

const replaceHomePath = (items, homePath) => items.map((item) => {
  if (item.always && item.label === "Inicio") return { ...item, path: homePath };
  return item.children ? { ...item, children: replaceHomePath(item.children, homePath) } : item;
});

export default function SideMenu() {
  const [open, setOpen] = useState(false);
  const [openMap, setOpenMap] = useState({});
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, permissions = [], permissionsLoaded = true, permissionsError } = useAuth();
  const mobile = useMediaQuery("(max-width:760px)");
  const roleId = Number(user?.rol);
  const homePath = homeForRole(roleId);

  const visibleMenu = useMemo(() => {
    if (roleId !== 1 && !permissionsLoaded) return [];
    const allowed = roleId === 1 ? menuData : filterMenuByPermissions(menuData, permissions, roleId);
    return replaceHomePath(allowed, homePath);
  }, [homePath, permissions, permissionsLoaded, roleId]);

  const quickLinks = useMemo(() => {
    if (roleId !== 1 && !permissionsLoaded) return [];
    return sidebarQuickLinks.filter((item) => item.always || roleId === 1 || canAccessPath(permissions, item.path))
      .map((item) => item.always ? { ...item, path: homePath } : item);
  }, [homePath, permissions, permissionsLoaded, roleId]);

  useEffect(() => {
    document.body.style.setProperty("--solidata-sidebar-offset", `${open && !mobile ? 276 : 58}px`);
    return () => document.body.style.removeProperty("--solidata-sidebar-offset");
  }, [open, mobile]);

  useEffect(() => {
    const next = {};
    const collectActiveGroups = (items, parentId = "") => items.forEach((item) => {
      const itemId = parentId ? `${parentId}/${item.label}` : item.label;
      if (item.children) {
        if (hasCurrentPath(item.children, pathname)) next[itemId] = true;
        collectActiveGroups(item.children, itemId);
      }
    });
    collectActiveGroups(visibleMenu);
    setOpenMap(next);
  }, [pathname, visibleMenu]);

  const setDrawerOpen = (value) => setOpen(value);
  const itemPath = (item) => item.path === "#" ? `/en-desarrollo/${encodeURIComponent(item.label)}` : item.path;
  const renderItems = (items, parentId = "", depth = 0) => <List component="div" disablePadding className="sidebarList">
    {items.map((item) => {
      const hasChildren = Array.isArray(item.children);
      const itemId = parentId ? `${parentId}/${item.label}` : item.label;
      const active = !hasChildren && item.path && item.path !== "#" && pathname === item.path;
      return <div key={itemId}>
        <ListItemButton className={`sidebarMenuItem${active ? " selected" : ""}${depth ? " nested" : ""}`} sx={{ pl: depth ? 4 : 2 }} onClick={() => {
          if (hasChildren) setOpenMap((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
          else {
            navigate(itemPath(item));
            setDrawerOpen(false);
          }
        }}>
          {depth === 0 && <ListItemIcon className="sidebarItemIcon">{iconFor(item.label)}</ListItemIcon>}
          <ListItemText primary={item.label} />
          {hasChildren && (openMap[itemId] ? <ExpandLessRounded /> : <ExpandMoreRounded />)}
        </ListItemButton>
        {hasChildren && <Collapse in={!!openMap[itemId]} timeout="auto" unmountOnExit>{renderItems(item.children, itemId, depth + 1)}</Collapse>}
      </div>;
    })}
  </List>;

  return <>
    {!open && <nav className="sidebarRail" aria-label="Accesos rápidos">
      <Tooltip title="Abrir menú" placement="right"><IconButton className="sidebarRailToggle" onClick={() => setDrawerOpen(true)} aria-label="Abrir menú lateral"><MenuRounded /></IconButton></Tooltip>
      {quickLinks.map((item) => <Tooltip key={item.label} title={item.label} placement="right"><IconButton className={`sidebarRailLink${pathname === item.path || pathname.startsWith(`${item.path}/`) ? " selected" : ""}`} onClick={() => navigate(item.path)} aria-label={item.label}>{iconFor(item.label)}</IconButton></Tooltip>)}
    </nav>}
    <Drawer
      anchor="left"
      open={open}
      onClose={() => setDrawerOpen(false)}
      variant={mobile ? "temporary" : "persistent"}
      className="sidebarDrawer"
      ModalProps={{ keepMounted: true }}
    >
      <div className="sidebarHeader">
        <img src={solidataLogo} alt="Logo SOLIDATA" />
        <div><strong>SOLIDATA</strong><span>Gestión de alimentos</span></div>
        <IconButton onClick={() => setDrawerOpen(false)} aria-label="Contraer menú"><ChevronLeftRounded /></IconButton>
      </div>
      <div className="sidebarSectionLabel">MENÚ PRINCIPAL</div>
      <div className="sidebarMenuContent">
        {!permissionsLoaded && roleId !== 1 ? <p className="sidebarPermissionMessage">Cargando accesos permitidos…</p>
          : visibleMenu.length ? renderItems(visibleMenu)
          : <p className="sidebarPermissionMessage">{permissionsError ? "No se pudieron cargar los permisos." : "No tenés operaciones habilitadas."}</p>}
      </div>
      <div className="sidebarFooter"><span className="sidebarOnlineDot" /> Banco de Alimentos Buenos Aires</div>
    </Drawer>
  </>;
}
