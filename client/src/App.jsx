import { Routes, Route } from "react-router-dom";
import Navbar from "./assets/components/Navbar.jsx";
import Index from "./assets/pages/auth/Index.jsx";
import Login from "./assets/pages/auth/Login.jsx";
import HistoryD from "./assets/pages/admin/donation/historial.jsx";
import UpdateD from "./assets/pages/admin/donation/update.jsx";
import UpdateStatusD from "./assets/pages/admin/donation/updateStatus.jsx";
import DeleteD from "./assets/pages/admin/donation/delete.jsx";
//import Login from "./assets/components/FormLogin.jsx"; 
import "./App.css"; import HomeAdmin from "./assets/pages/admin/HomeAdmin.jsx";
import HomeEmployeeOp from "./assets/pages/personalBAA/HomeEmployeeOp.jsx";
import "leaflet/dist/leaflet.css";
import RecoverPassword from "./assets/components/FormRecoverPass.jsx";
import RegisterUser from "./assets/components/user/FormRegisterUser.jsx";
import RegisterInstitution from "./assets/components/institution/FormRegisterInstitution.jsx";
import CreateUsers from "./assets/pages/admin/user/CreateUser.jsx";
import DeleteUsers from "./assets/pages/admin/user/DeleteUser.jsx";
import UpdateUsers from "./assets/pages/admin/user/UpdateUser.jsx";
import CreateArticles from "./assets/pages/admin/article/CreateArticle.jsx";
import UpdateArticles from "./assets/pages/admin/article/UpdateArticle.jsx";
import DeleteArticles from "./assets/pages/admin/article/DeleteArticle.jsx";

function App() {
    return (
        <>
            {/* Navbar SIEMPRE visible */}
            <div className="NavContainer"><Navbar /></div>
            {/* Rutas de la aplicación */}
            <Routes>
                {/* PAGINA DE INICIO */}
                <Route path="/" element={<div className="pageContainerIndex"> <Index /> </div>} />
            
                {/* PAGINAS AUTH */}
                <Route path="/login" element={<div className="pageContainerLog"> <Login /></div>} />
                <Route path="register/user" element={<div className="pageContainerLog"> <RegisterUser/> </div>}/>
                <Route path="/register/institution" element={<div className="pageContainerLog"> <RegisterInstitution/> </div>} />
                <Route path="/recoverpass" element={<div className="pageContainerLog"> <RecoverPassword/> </div>} />
                
                {/* PAGINA ROL ADMIN*/}
                <Route path="/admin/home" element={<div className="#"> <HomeAdmin /></div>} />
                <Route path="/admin/" element={<div className="#"> <HomeAdmin /></div>} />
                <Route path="/admin/register/user" element={<div className="#"> </div>} />
                <Route path="/admin/register/institution" element={<div className="#"> </div>} />

                <Route path="/admin/users/create" element={<div className="#"> <CreateUsers/> </div>}/>
                <Route path="/admin/users/delete" element={<div className="#"> <DeleteUsers/> </div>}/>
                <Route path="/admin/users/update" element={<div className="#"> <UpdateUsers/> </div>}/>


                <Route path="/admin/donations/history" element={<div className="#"> <HistoryD/> </div>} />  {/* POST */}
                <Route path="/admin/donations/update" element={<div className="#"> <UpdateD/> </div>} />  {/* POST */}
                <Route path="/admin/donations/updateStatus" element={<div className="#"> <UpdateStatusD/> </div>} />  {/* POST */}
                <Route path="/admin/donations/delete" element={<div className="#"> <DeleteD/> </div>} />  {/* POST */}


                <Route path="/admin/articles/create" element={<div className="#"> <CreateArticles/> </div>} />  {/* POST */}
                <Route path="/admin/articles/" element={<div className="#"> </div>} /> {/* GET*/}
                <Route path="/admin/articles/:id" element={<div className="#"> </div>} /> {/* GET id */}
                <Route path="/admin/articles/update" element={<div className="#"> <UpdateArticles/> </div>} />  {/* PUT */}
                <Route path="/admin/articles/delete" element={<div className="#"> <DeleteArticles/> </div>} />  {/* DELTE */}


                <Route path="/admin/items/" element={<div className="#"> </div>} />  {/* POST */}
                <Route path="/admin/items/" element={<div className="#"> </div>} /> {/* GET*/}
                <Route path="/admin/items/:id" element={<div className="#"> </div>} /> {/* GET id */}
                <Route path="/admin/items/:id" element={<div className="#"> </div>} />  {/* PUT */}
                <Route path="/admin/items/:id" element={<div className="#"> </div>} />  {/* DELTE */}

                {/* PAGINA ROL COORDINADOR*/}
                

                {/* PAGINA ROL OPERADOR*/}
                <Route path="Operator/home" element={<div className="pageContainer"> <HomeEmployeeOp /></div>} />

                {/* PAGINA ROL VOLUNTARIO*/}
                {/* acá después agregás tus otras rutas */}
            </Routes>
        </>
    );
}
export default App;