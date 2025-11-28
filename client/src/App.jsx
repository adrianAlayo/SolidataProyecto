import { Routes, Route } from "react-router-dom";
import Navbar from "./assets/components/Navbar.jsx";
import Index from "./assets/pages/auth/Index.jsx";
import Login from "./assets/pages/auth/Login.jsx";
//import Login from "./assets/components/FormLogin.jsx"; 
import { AuthProvider } from "./assets/context/AuthContext.jsx";
import "./App.css"; import HomeAdmin from "./assets/pages/auth/HomeAdmin.jsx";
import HomeEmployeeOp from "./assets/pages/auth/HomeEmployeeOp.jsx";
import "leaflet/dist/leaflet.css";

function App() {
    return (
        <AuthProvider>
        {/* Navbar SIEMPRE visible */}
        <div className="NavContainer"><Navbar /></div>
        {/* Rutas de la aplicación */}
        <Routes>
            {/* PAGINA DE INICIO */}
            <Route path="/" element={<div className="pageContainerIndex"> <Index /> </div>} />
        
            {/* PAGINAS AUTH */}
            <Route path="/login" element={<div className="pageContainerLog"> <Login /></div>} />
            <Route path="/register/Institution" element={<div className="#"> <RegisterInstitution /></div>} />
            
            {/* PAGINA ROL ADMIN*/}
            <Route path="/admin/home" element={<div className="#"> <HomeAdmin /></div>} />
            <Route path="/admin/register/user" element={<div className="#"> <RegisterUser /></div>} />
            <Route path="/admin/register/institution" element={<div className="#"> <RegisterInstitution /></div>} />

            <Route path="/admin/article/" element={<div className="#"> <RegisterArticle /></div>} />  {/* POST */}
            <Route path="/admin/article/" element={<div className="#"> <GetArticle /></div>} /> {/* GET*/}
            <Route path="/admin/article/:id" element={<div className="#"> <GetArticles /></div>} /> {/* GET id */}
            <Route path="/admin/article/:id" element={<div className="#"> <PutArticle /></div>} />  {/* PUT */}
            <Route path="/admin/article/:id" element={<div className="#"> <DeleteArticle /></div>} />  {/* DELTE */}


            <Route path="/admin/item/" element={<div className="#"> <RegisterItem /></div>} />  {/* POST */}
            <Route path="/admin/item/" element={<div className="#"> <GetItems /></div>} /> {/* GET*/}
            <Route path="/admin/item/:id" element={<div className="#"> <GetItem /></div>} /> {/* GET id */}
            <Route path="/admin/item/:id" element={<div className="#"> <PutArticle /></div>} />  {/* PUT */}
            <Route path="/admin/item/:id" element={<div className="#"> <DeleteArticle /></div>} />  {/* DELTE */}

            {/* PAGINA ROL COORDINADOR*/}
            

            {/* PAGINA ROL OPERADOR*/}
            <Route path="Operator/home" element={<div className="pageContainer"> <HomeEmployeeOp /></div>} />

            {/* PAGINA ROL VOLUNTARIO*/}
            {/* acá después agregás tus otras rutas */}
        </Routes> </AuthProvider>);
}
export default App;