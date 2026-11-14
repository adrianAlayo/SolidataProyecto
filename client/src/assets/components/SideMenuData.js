// menuData.js

const menuData = [
    { label: "Inicio", path: "/admin/home", always: true },
    { 
        label: "Usuarios", 
        children: [
            { label: "Crear", path: "/admin/users/create", requiredPermissions: [{ entity: "USERS", action: "CREATE" }] }, 
            { label: "Actualizar", path: "/admin/users/update", requiredPermissions: [{ entity: "USERS", action: "UPDATE" }] }, 
            { label: "Cambiar Rol", path: "/admin/users/assignRol" }, 
            { label: "Eliminar", path: "/admin/users/delete", requiredPermissions: [{ entity: "USERS", action: "DELETE" }] },
            { label: "Solicitudes de contraseña", path: "/admin/password-reset-requests", adminOnly: true },
        ], 
    }, 
    { 
        label: "Artículos",
        children: [
            { label: "Ver catálogo", path: "/admin/articles", requiredPermissions: [{ entity: "ARTICLES", action: "READ" }] },
            { label: "Crear", path: "/admin/articles/create", requiredPermissions: [{ entity: "ARTICLES", action: "CREATE" }] },
        ] 
    }, 
    { 
        label: "Rol", 
        children: [
            { label: "Crear", path: "/admin/roles/create", requiredPermissions: [{ entity: "ROLES", action: "CREATE" }] }, 
            { label: "Actualizar", path: "/admin/roles/update", requiredPermissions: [{ entity: "ROLES", action: "UPDATE" }] }, 
            { label: "Eliminar", path: "/admin/roles/delete", requiredPermissions: [{ entity: "ROLES", action: "DELETE" }] },
        ] 
    }, 
    { 
        label: "Donaciones", 
        children: [
            { label: "Historial de donaciones", path: "/admin/donations/history", requiredPermissions: [{ entity: "DONATIONS", action: "READ" }] },
            { label: "Entregas", path: "/admin/deliveries", requiredPermissions: [{ entity: "DONATIONS", action: "READ" }] },
            { label: "Crear", path: "/admin/donations/create", requiredPermissions: [{ entity: "DONATIONS", action: "CREATE" }] }, 
            { label: "Items", 
                children: [
                    { label: "Administrar items", path: "/admin/donations/items", requiredPermissions: [{ entity: "DONATIONITEMS", action: "READ" }] },
                    { label: "Crear Item", path: "/admin/donations/items/create", requiredPermissions: [{ entity: "DONATIONITEMS", action: "CREATE" }] }, 
                ] 
            },
        ] 
    }, 
    { 
        label: "Instituciones",
        children: [
            { label: "Ver instituciones", path: "/admin/institutions", requiredPermissions: [{ entity: "INSTITUTIONS", action: "READ" }] },
            { label: "Registrar institución", path: "/admin/register/institution", requiredPermissions: [{ entity: "INSTITUTIONS", action: "CREATE" }] },
            { label: "Necesidades", 
                children: [
                    { label: "Gestión de necesidades", path: "/admin/needs", requiredPermissions: [
                        { entity: "INSTITUTIONNEEDS", action: "READ" },
                        { entity: "INSTITUTIONNEEDS", action: "CREATE" },
                        { entity: "INSTITUTIONNEEDS", action: "UPDATE" },
                        { entity: "INSTITUTIONNEEDS", action: "APPROVE" },
                        { entity: "INSTITUTIONNEEDS", action: "DELETE" },
                    ] },
                ] 
            }, 
            { 
                label: "Tipos", 
                children: [
                    { label: "Crear Tipo", path: "/admin/institutions/types/create", requiredPermissions: [{ entity: "TYPES", action: "CREATE" }] }, 
                    { label: "Actualizar Tipo", path: "/admin/institutions/types/update", requiredPermissions: [{ entity: "TYPES", action: "UPDATE" }] }, 
                    { label: "Eliminar Tipo", path: "/admin/institutions/types/delete", requiredPermissions: [{ entity: "TYPES", action: "DELETE" }] },
                ] 
            }
        ] 
    }, 
    { 
        label: "Inventario", 
        children: [
            { label: "Ver stock", path: "/admin/inventory", requiredPermissions: [{ entity: "INVENTORIES", action: "READ" }] },
            { label: "Crear", path: "/admin/inventories/create", requiredPermissions: [{ entity: "INVENTORIES", action: "CREATE" }] }, 
            { label: "Actualizar", path: "/admin/inventories/update", requiredPermissions: [{ entity: "INVENTORIES", action: "UPDATE" }] }, 
            { label: "Eliminar", path: "/admin/inventories/delete", requiredPermissions: [{ entity: "INVENTORIES", action: "DELETE" }] },
        ] 
    }, 
    { label: "Reportes", path: "/admin/reports", requiredPermissions: [{ entity: "DONATIONS", action: "READ" }, { entity: "INVENTORIES", action: "READ" }, { entity: "USERS", action: "READ" }] },
    { label: "Estado de usuarios", path: "/admin/HighLow", requiredPermissions: [{ entity: "USERS", action: "APPROVE" }] }, 
];

export default menuData;
