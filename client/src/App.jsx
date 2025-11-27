// App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./assets/components/Navbar.jsx";
import Index from "./assets/pages/auth/Index.jsx";
import Login from "./assets/pages/auth/Login.jsx";
//import Login from "./assets/components/FormLogin.jsx";
import { AuthProvider } from "./assets/context/AuthContext.jsx";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      {/* Navbar SIEMPRE visible */}
      <div className="NavContainer"><Navbar /></div>

      {/* Rutas de la aplicación */}
      <Routes>
          <Route path="/" element={<div className="pageContainerIndex"> <Index /> </div>}/>
          <Route path="/login" element={<div className="pageContainerLog"> <Login /></div>} />
        
        
        {/* acá después agregás tus otras rutas */}
      </Routes>
      
    </AuthProvider>
  );
}

export default App;
