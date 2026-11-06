import { useState } from "react";
import { AppBar, Avatar, Box, Button, Menu, MenuItem, Toolbar } from "@mui/material";
import { AccountCircleRounded, LogoutRounded } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import solidataLogo from "../img/solidata-logo.png";
import "./Navbar.css";

const dashboardForRole = (role) => ({ 1: "/admin/home", 2: "/operator/home", 3: "/admin/home", 4: "/en-desarrollo/Inicio de institución" }[role] || "/");

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const guestRoutes = ["/", "/login", "/register/user", "/register/institution", "/recoverpass"];
  const isGuestPage = guestRoutes.includes(pathname);
  const displayName = [user?.first_name, user?.last_name].filter(Boolean).join(" ") || user?.name || "Usuario";
  const initials = displayName.split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase();
  const dashboard = dashboardForRole(Number(user?.rol));

  const handleLogout = () => {
    setAnchorEl(null);
    logoutUser();
    navigate("/login", { replace: true });
  };

  return <AppBar position="sticky" elevation={0} className="solidataNavbar">
    <Toolbar className="solidataNavbarToolbar">
      <Link className="solidataBrand" to={user ? dashboard : "/"} aria-label="SOLIDATA, ir al inicio">
        <span className="solidataBrandMark"><img src={solidataLogo} alt="" /></span>
        <span><strong>SOLIDATA</strong><small>Banco de Alimentos</small></span>
      </Link>

      {isGuestPage ? <Box className="solidataGuestActions">
        {pathname !== "/login" && <Button component={Link} to="/login" className="solidataLoginButton">Iniciar sesión</Button>}
        {pathname !== "/register/institution" && <Button component={Link} to="/register/institution" variant="contained" className="solidataRegisterButton">Registrarse</Button>}
      </Box> : user && <>
        <Button className="solidataProfileButton" onClick={(event) => setAnchorEl(event.currentTarget)} aria-haspopup="true" aria-expanded={open}>
          <Avatar className="solidataAvatar">{initials || "U"}</Avatar>
          <span className="solidataProfileText"><strong>{displayName}</strong><small>Mi cuenta</small></span>
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)} className="solidataProfileMenu" MenuListProps={{ dense: true }}>
          <MenuItem component={Link} to="/account" onClick={() => setAnchorEl(null)}><AccountCircleRounded />Mi cuenta</MenuItem>
          <MenuItem onClick={handleLogout}><LogoutRounded />Cerrar sesión</MenuItem>
        </Menu>
      </>}
    </Toolbar>
  </AppBar>;
}
