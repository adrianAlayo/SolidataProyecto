import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { login } from "../../services/authService.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import InputCustom from "../../components/InputCustom.jsx";
import ButtonCustom from "../../components/ButtonCustom.jsx";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      loginUser(data.token);

      const payload = jwtDecode(data.token);
      switch (payload.roleName) {
        case "Admin":
          navigate("/admin");
          break;
        case "Institucion":
          navigate("/institution");
          break;
        case "Operador":
          navigate("/employeeOperator");
          break;
        case "Coordinador":
          navigate("/employeeCoordinator");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      alert("Error al iniciar sesión");
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0D1B2A 0%, #1B263B 50%, #0B3C49 100%)",
        padding: 2,
      }}
    >
      <Card
        sx={{
          width: 380,
          borderRadius: 4,
          boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
          backgroundColor: "rgba(255,255,255,0.95)",
        }}
      >
        <CardContent>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Avatar
              sx={{
                bgcolor: "#1B9AAA",
                mx: "auto",
                mb: 1,
                width: 56,
                height: 56,
              }}
            >
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            <Typography
              variant="h5"
              component="h1"
              sx={{ color: "#1B263B", fontWeight: "bold" }}
            >
              Iniciar Sesión
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Accede a tu cuenta de Solidata
            </Typography>
          </Box>

          <form onSubmit={handleLogin}>
            <InputCustom
              label="Correo electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputCustom
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <CardActions>
              <ButtonCustom text="Ingresar" type="submit" color="primary" />
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
