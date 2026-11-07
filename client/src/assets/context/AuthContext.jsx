import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getMyPermissions } from "../services/rol.service.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [permissionsLoaded, setPermissionsLoaded] = useState(false);
  const [permissionsError, setPermissionsError] = useState(false);

  const loadPermissions = async (roleId) => {
    if (Number(roleId) === 1) {
      setPermissions([]);
      setPermissionsLoaded(true);
      setPermissionsError(false);
      return;
    }
    setPermissionsLoaded(false);
    setPermissionsError(false);
    try {
      const result = await getMyPermissions();
      setPermissions(Array.isArray(result.data) ? result.data : []);
    } catch (_error) {
      setPermissions([]);
      setPermissionsError(true);
    } finally {
      setPermissionsLoaded(true);
    }
  };

  // Cuando la app se monta, revisamos si ya hay un token guardado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
      loadPermissions(decoded.rol);
    }
  }, []);

  // Guardar token + usuario cuando se loguea
  const loginUser = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser(decoded);
    loadPermissions(decoded.rol);
  };

  // Eliminar token y cerrar sesión
  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
    setPermissions([]);
    setPermissionsLoaded(false);
    setPermissionsError(false);
  };

  return (
    <AuthContext.Provider value={{ user, permissions, permissionsLoaded, permissionsError, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);