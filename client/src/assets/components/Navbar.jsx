import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    logoutUser();
    handleCloseMenu();
    navigate("/login");
  };


  const guestRoutes = ["/", "/login", "/register/user", "/register/institution", "/recoverpass"];


  const isGuestPage = guestRoutes.includes(location.pathname);

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #0D1B2A, #1B263B)",
        padding: "0 16px",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", cursor: "pointer" }}
          onClick={() => navigate("#")}
        >
          Solidata
        </Typography>

        {isGuestPage && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{ fontWeight: "bold" }}
            >
              Iniciar Sesión
            </Button>

            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/register/user"
              sx={{ fontWeight: "bold" }}
            >
              Registrarse
            </Button>
          </Box>
        )}

        {!isGuestPage && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handleOpenMenu}>
              <Avatar sx={{ bgcolor: "#1976d2", color: "white" }}>
                {user?.name?.[0] ?? "U"}
              </Avatar>
            </IconButton>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
              <MenuItem component={Link} to="/account" onClick={handleCloseMenu}>
                Mi Cuenta
              </MenuItem>
              <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
