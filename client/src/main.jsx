import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './assets/context/AuthContext.jsx';
import App from './App.jsx'
import './index.css'
import './assets/components/FormTheme.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter> {/* Permite la navegación */}
            <AuthProvider> {/* Hace que toda la app tenga acceso al usuario logueado */}
                <App /> {/* Carga las rutas */}
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
)

