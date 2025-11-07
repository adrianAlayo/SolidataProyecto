// App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./assets/components/Navbar.jsx";
import Login from "./assets/pages/auth/Login.jsx";
import { AuthProvider } from "./assets/context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      {/* Navbar SIEMPRE visible */}
      <Navbar />

      {/* Rutas de la aplicación */}
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* acá después agregás tus otras rutas */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
