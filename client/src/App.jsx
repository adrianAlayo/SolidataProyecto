import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./assets/components/Navbar.jsx";
import Index from "./assets/pages/auth/Index.jsx";
import Login from "./assets/pages/auth/Login.jsx";
import HistoryD from "./assets/pages/admin/donation/historial.jsx";
import UpdateDonations from "./assets/pages/admin/donation/UpdateDonation.jsx";
import UpdateStatusDonations from "./assets/pages/admin/donation/UpdateDonationStatus.jsx";
import DeleteDonations from "./assets/pages/admin/donation/DeleteDonation.jsx";
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
import CreateRoles from "./assets/pages/admin/rol/CreateRol.jsx";
import UpdateRoles from "./assets/pages/admin/rol/UpdateRol.jsx";
import DeleteRoles from "./assets/pages/admin/rol/DeleteRol.jsx";
import CreateDonations from "./assets/pages/admin/donation/CreateDonation.jsx";
import CreateItems from "./assets/pages/admin/item/CreateItem.jsx";
import UpdateItems from "./assets/pages/admin/item/UpdateItem.jsx";
import DeleteItems from "./assets/pages/admin/item/DeleteItem.jsx";
import High_Low from "./assets/pages/admin/High_Low.jsx";
import CreateInventories from "./assets/pages/admin/inventory/CreateInventory.jsx";
import UpdateInventories from "./assets/pages/admin/inventory/UpdateInventory.jsx";
import DeleteInventories from "./assets/pages/admin/inventory/DeleteInventory.jsx";

function App() {
    const { pathname } = useLocation();
    const hideNavbar = pathname === "/login";

    return (
        <>
            {!hideNavbar && <div className="NavContainer"><Navbar /></div>}
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
                <Route path="/admin/donations/create" element={<div className="#"> <CreateDonations/> </div>} />  {/* POST */}
                <Route path="/admin/donations/update" element={<div className="#"> <UpdateDonations/> </div>} />  {/* POST */}
                <Route path="/admin/donations/updateStatus" element={<div className="#"> <UpdateStatusDonations/> </div>} />  {/* POST */}
                <Route path="/admin/donations/delete" element={<div className="#"> <DeleteDonations/> </div>} />  {/* POST */}


                <Route path="/admin/articles/create" element={<div className="#"> <CreateArticles/> </div>} />  {/* POST */}
                <Route path="/admin/articles/" element={<div className="#"> </div>} /> {/* GET*/}
                <Route path="/admin/articles/:id" element={<div className="#"> </div>} /> {/* GET id */}
                <Route path="/admin/articles/update" element={<div className="#"> <UpdateArticles/> </div>} />  {/* PUT */}
                <Route path="/admin/articles/delete" element={<div className="#"> <DeleteArticles/> </div>} />  {/* DELTE */}

                <Route path="/admin/inventories/create" element={<div className="#"> <CreateInventories/> </div>} /> {/* GET*/}
                <Route path="/admin/inventories/update" element={<div className="#"> <UpdateInventories/> </div>} /> {/* GET*/}
                <Route path="/admin/inventories/delete" element={<div className="#"> <DeleteInventories/> </div>} /> {/* GET*/}

                <Route path="/admin/roles/create" element={<div className="#"> <CreateRoles/> </div>} /> {/* GET*/}
                <Route path="/admin/roles/update" element={<div className="#"> <UpdateRoles/> </div>} /> {/* GET*/}
                <Route path="/admin/roles/delete" element={<div className="#"> <DeleteRoles/> </div>} /> {/* GET*/}


                <Route path="/admin/donations/items/create" element={<div className="#"> <CreateItems/> </div>} />  {/* POST */}
                <Route path="/admin/donations/items/update" element={<div className="#"> <UpdateItems/> </div>} /> {/* GET*/}
                <Route path="/admin/donations/items/delete" element={<div className="#"> <DeleteItems/> </div>} /> {/* GET*/}
                <Route path="/admin/items/:id" element={<div className="#"> </div>} /> {/* GET id */}
                <Route path="/admin/items/:id" element={<div className="#"> </div>} />  {/* PUT */}
                <Route path="/admin/items/:id" element={<div className="#"> </div>} />  {/* DELTE */}

                <Route path="/admin/HighLow" element={<div className="#"> <High_Low/> </div>} />  {/* PATCH */}

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
