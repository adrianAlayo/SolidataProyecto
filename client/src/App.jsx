import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./assets/components/Navbar.jsx";
import Index from "./assets/pages/auth/Index.jsx";
import Login from "./assets/pages/auth/Login.jsx";
import HistoryD from "./assets/pages/admin/donation/historial.jsx";
//import Login from "./assets/components/FormLogin.jsx"; 
import "./App.css"; import HomeAdmin from "./assets/pages/admin/HomeAdmin.jsx";
import HomeEmployeeOp from "./assets/pages/personalBAA/HomeEmployeeOp.jsx";
import HomeInstitution from "./assets/pages/institution/HomeInstitution.jsx";
import PasswordResetRequests from "./assets/pages/admin/PasswordResetRequests.jsx";
import "leaflet/dist/leaflet.css";
import RecoverPassword from "./assets/components/FormRecoverPass.jsx";
import RegisterUser from "./assets/components/user/FormRegisterUser.jsx";
import RegisterInstitution from "./assets/components/institution/FormRegisterInstitution.jsx";
import CreateUsers from "./assets/pages/admin/user/CreateUser.jsx";
import DeleteUsers from "./assets/pages/admin/user/DeleteUser.jsx";
import UpdateUsers from "./assets/pages/admin/user/UpdateUser.jsx";
import AssignRole from "./assets/pages/admin/user/AssignRole.jsx";
import TypeManagement from "./assets/pages/admin/institution/TypeManagement.jsx";
import CreateArticles from "./assets/pages/admin/article/CreateArticle.jsx";
import CreateRoles from "./assets/pages/admin/rol/CreateRol.jsx";
import UpdateRoles from "./assets/pages/admin/rol/UpdateRol.jsx";
import DeleteRoles from "./assets/pages/admin/rol/DeleteRol.jsx";
import CreateDonations from "./assets/pages/admin/donation/CreateDonation.jsx";
import CreateItems from "./assets/pages/admin/item/CreateItem.jsx";
import High_Low from "./assets/pages/admin/High_Low.jsx";
import CreateInventories from "./assets/pages/admin/inventory/CreateInventory.jsx";
import UpdateInventories from "./assets/pages/admin/inventory/UpdateInventory.jsx";
import DeleteInventories from "./assets/pages/admin/inventory/DeleteInventory.jsx";
import NeedsList from "./assets/pages/admin/needs/NeedsList.jsx";
import InventoryList from "./assets/pages/admin/inventory/InventoryList.jsx";
import ItemsList from "./assets/pages/admin/item/ItemsList.jsx";
import Account from "./assets/pages/auth/Account.jsx";
import ArticlesList from "./assets/pages/admin/article/ArticlesList.jsx";
import PendingPage from "./assets/pages/PendingPage.jsx";
import InstitutionsList from "./assets/pages/admin/institution/InstitutionsList.jsx";
import ReportsPage from "./assets/pages/admin/ReportsPage.jsx";
import DeliveryBoard from "./assets/pages/admin/DeliveryBoard.jsx";

function App() {
    const { pathname } = useLocation();
    const hideNavbar = pathname === "/login" || pathname === "/recoverpass";

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
                <Route path="/account" element={<Account />} />
                
                {/* PAGINA ROL ADMIN*/}
                <Route path="/admin/home" element={<div className="#"> <HomeAdmin /></div>} />
                <Route path="/admin/" element={<div className="#"> <HomeAdmin /></div>} />
                <Route path="/admin/register/user" element={<PendingPage title="Alta de usuarios" />} />
                <Route path="/admin/register/institution" element={<PendingPage title="Alta de instituciones" />} />

                <Route path="/admin/users/create" element={<div className="#"> <CreateUsers/> </div>}/>
                <Route path="/admin/users/delete" element={<div className="#"> <DeleteUsers/> </div>}/>
                <Route path="/admin/users/update" element={<div className="#"> <UpdateUsers/> </div>}/>
                <Route path="/admin/users/assignRol" element={<AssignRole />} />


                <Route path="/admin/donations/history" element={<div className="#"> <HistoryD/> </div>} />  {/* POST */}
                <Route path="/admin/donations/create" element={<div className="#"> <CreateDonations/> </div>} />  {/* POST */}
                <Route path="/admin/donations/update" element={<HistoryD />} />
                <Route path="/admin/donations/updateStatus" element={<HistoryD />} />
                <Route path="/admin/donations/delete" element={<HistoryD />} />


                <Route path="/admin/articles/create" element={<div className="#"> <CreateArticles/> </div>} />  {/* POST */}
                <Route path="/admin/articles" element={<ArticlesList />} />
                <Route path="/admin/articles/" element={<ArticlesList />} />
                <Route path="/admin/articles/update" element={<ArticlesList />} />
                <Route path="/admin/articles/delete" element={<ArticlesList />} />

                <Route path="/admin/inventories/create" element={<div className="#"> <CreateInventories/> </div>} /> {/* GET*/}
                <Route path="/admin/inventories/update" element={<div className="#"> <UpdateInventories/> </div>} /> {/* GET*/}
                <Route path="/admin/inventories/delete" element={<div className="#"> <DeleteInventories/> </div>} /> {/* GET*/}

                <Route path="/admin/roles/create" element={<div className="#"> <CreateRoles/> </div>} /> {/* GET*/}
                <Route path="/admin/roles/update" element={<div className="#"> <UpdateRoles/> </div>} /> {/* GET*/}
                <Route path="/admin/roles/delete" element={<div className="#"> <DeleteRoles/> </div>} /> {/* GET*/}


                <Route path="/admin/donations/items/create" element={<div className="#"> <CreateItems/> </div>} />  {/* POST */}
                <Route path="/admin/donations/items" element={<ItemsList />} />
                <Route path="/admin/donations/items/update" element={<ItemsList />} />
                <Route path="/admin/donations/items/delete" element={<ItemsList />} />
                <Route path="/admin/items/:id" element={<PendingPage title="Detalle del artículo de donación" />} />

                <Route path="/admin/HighLow" element={<div className="#"> <High_Low/> </div>} />  {/* PATCH */}
                <Route path="/admin/needs" element={<NeedsList />} />
                <Route path="/admin/inventory" element={<InventoryList />} />
                <Route path="/admin/institutions" element={<InstitutionsList />} />
                <Route path="/admin/institutions/types/create" element={<TypeManagement mode="create" />} />
                <Route path="/admin/institutions/types/update" element={<TypeManagement mode="update" />} />
                <Route path="/admin/institutions/types/delete" element={<TypeManagement mode="delete" />} />
                <Route path="/admin/reports" element={<ReportsPage />} />
                <Route path="/admin/deliveries" element={<DeliveryBoard />} />
                <Route path="/en-desarrollo/:section" element={<PendingPage />} />

                {/* PAGINA ROL COORDINADOR*/}
                

                {/* PAGINA ROL OPERADOR*/}
                <Route path="/operator/home" element={<div className="pageContainer"> <HomeEmployeeOp /></div>} />
                <Route path="/institution/home" element={<HomeInstitution />} />
                <Route path="/admin/password-reset-requests" element={<PasswordResetRequests />} />
                <Route path="/Operator/home" element={<div className="pageContainer"> <HomeEmployeeOp /></div>} />

                {/* PAGINA ROL VOLUNTARIO*/}
                {/* acá después agregás tus otras rutas */}
            </Routes>
        </>
    );
}
export default App;
