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
        label: "Articulo", 
        children: [
            { label: "Crear", path: "/admin/articles/create" }, 
            { label: "Actualizar", path: "/admin/articles/update" }, 
            { label: "Eliminar", path: "/admin/articles/delete" },
        ] 
    }, 
    { 
        label: "Rol", 
        children: [
            { label: "Crear", path: "#" }, 
            { label: "Actualizar", path: "#" }, 
            { label: "Eliminar", path: "#" },
        ] 
    }, 
    { 
        label: "Donaciones", 
        children: [
            { label: "Crear", path: "#" }, 
            { label: "Actualizar", path: "/admin/donations/update" }, 
            { label: "Actualizar Estado", path: "/admin/donations/updateStatus" }, 
            { label: "Eliminar", path: "/admin/donations/delete" }, 
            { label: "Productos", 
                children: [
                    { label: "Crear Producto", path: "#" }, 
                    { label: "Actualizar Producto", path: "#" }, 
                    { label: "Eliminar Producto", path: "#" },
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
                    { label: "Crear Necesidad", path: "#" }, 
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
            { label: "Crear", path: "#" }, 
            { label: "Actualizar", path: "#" }, 
            { label: "Eliminar", path: "#" },
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
    { label: "Altas/Bajas", 
        children: [
            { label: "Usuario", 
                children: [
                    {label: "Alta", path: "#" }, 
                    { label: "Baja", path: "#" },
                ] 
            }, 
            { label: "Institucion", 
                children: [
                    { label: "Alta", path: "#" }, 
                    { label: "Baja", path: "#" },
                ] 
            }
        ] 
    }, 
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
