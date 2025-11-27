import { AppBar, Toolbar, Typography, Button, Box, IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    logoutUser();
    handleCloseMenu();
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #0D1B2A, #1B263B)",
        padding: "0 16px",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* LOGO / TÍTULO */}
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Solidata
        </Typography>

        {/* si no está logueado */}
        {!user && (
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
              to="/register"
              sx={{ fontWeight: "bold" }}
            >
              Registrarse
            </Button>
          </Box>
        )}

        {/* si esta logueado */}
        {user && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" sx={{ mr: 2 }}>
              {user.roleName ? `Rol: ${user.roleName}` : ""}
            </Typography>

            <IconButton onClick={handleOpenMenu}>
              <Avatar />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem component={Link} to="/account" onClick={handleCloseMenu}>
                Mi Cuenta
              </MenuItem>

              <MenuItem onClick={handleLogout}>
                Cerrar Sesión
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
