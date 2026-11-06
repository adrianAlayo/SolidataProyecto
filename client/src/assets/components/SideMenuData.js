// menuData.js

const menuData = [
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
        label: "Institucion", 
        children: [
            { label: "Crear", path: "#" },
            { label: "Eliminar", path: "#" }, 
            { label: "Necesidades", 
                children: [
                    { label: "Ver Necesidades", path: "/admin/needs" },
                    { label: "Actualizar Necesidad", path: "#" }, 
                    { label: "Actualizar Estado", path: "#" }, 
                    { label: "Eliminar Necesidad", path: "#" },
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
    { 
        label: "Reportes", 
        children: [
            { label: "Donaciones", path: "#" }, 
            { label: "Donaciones Realizadas", path: "#" }, 
            { label: "Donaciones Hechas", path: "#" }, 
            { label: "Stock", path: "#" }, 
            { label: "Actividad Usuarios", path: "#" },
        ] 
    }, 
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
