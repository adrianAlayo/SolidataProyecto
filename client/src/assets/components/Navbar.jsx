import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
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
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Solidata
        </Typography>

        {user && (
          <Box>
            <Typography variant="body1" sx={{ display: "inline", mr: 2 }}>
              {user.roleName ? `Rol: ${user.roleName}` : ""}
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              sx={{ fontWeight: "bold" }}
            >
              Cerrar sesión
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
