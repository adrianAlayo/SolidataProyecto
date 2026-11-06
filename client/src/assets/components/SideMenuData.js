// menuData.js

const menuData = [
    { label: "Inicio", path: "/admin/home" },
    { 
        label: "Usuarios", 
        children: [
            { label: "Crear", path: "/admin/users/create" }, 
            { label: "Actualizar", path: "/admin/users/update" }, 
            { label: "Cambiar Rol", path: "/admin/users/assignRol" }, 
            { label: "Eliminar", path: "/admin/users/delete" },
        ], 
    }, 
    { 
        label: "Artículos",
        children: [
            { label: "Ver catálogo", path: "/admin/articles" },
            { label: "Crear", path: "/admin/articles/create" }, 
            { label: "Editar o eliminar", path: "/admin/articles" },
        ] 
    }, 
    { 
        label: "Rol", 
        children: [
            { label: "Crear", path: "/admin/roles/create" }, 
            { label: "Actualizar", path: "/admin/roles/update" }, 
            { label: "Eliminar", path: "/admin/roles/delete" },
        ] 
    }, 
    { 
        label: "Donaciones", 
        children: [
            { label: "Historial de donaciones", path: "/admin/donations/history" },
            { label: "Crear", path: "/admin/donations/create" }, 
            { label: "Items", 
                children: [
                    { label: "Administrar items", path: "/admin/donations/items" },
                    { label: "Crear Item", path: "/admin/donations/items/create" }, 
                ] 
            },
        ] 
    }, 
    { 
        label: "Instituciones",
        children: [
            { label: "Ver instituciones", path: "/admin/institutions" },
            { label: "Registrar institución", path: "/register/institution" },
            { label: "Necesidades", 
                children: [
                    { label: "Ver Necesidades", path: "/admin/needs" },
                    { label: "Administrar necesidades", path: "/admin/needs" },
                ] 
            }, 
            { 
                label: "Tipos", 
                children: [
                    { label: "Crear Tipo", path: "#" }, 
                    { label: "Actualizar Tipo", path: "#" }, 
                    { label: "Eliminar Tipo", path: "#" },
                ] 
            }
        ] 
    }, 
    { 
        label: "Inventario", 
        children: [
            { label: "Ver stock", path: "/admin/inventory" },
            { label: "Crear", path: "/admin/inventories/create" }, 
            { label: "Actualizar", path: "/admin/inventories/update" }, 
            { label: "Eliminar", path: "/admin/inventories/delete" },
        ] 
    }, 
    { label: "Reportes", path: "/admin/reports" },
    { label: "Altas/Bajas", path:"/admin/HighLow"}, 
    { 
        label: "Informacion", 
        children: [
            { label: "Articulo/s", path: "#" }, 
            { label: "Donacion/es", path: "#" }, 
            { label: "Donacion/es Item/s", path: "#" }, 
            { label: "Institucion/es", path: "#" }, 
            { label: "Institucion/es Necesidad/es", path: "#" }, 
            { label: "Inventario/s", path: "#" }, 
            { label: "Rol/es", path: "#" }, 
            { label: "Tipo/s", path: "#" }, 
            { label: "Usuario/s", path: "#" },
        ] 
    },
];

export default menuData;
