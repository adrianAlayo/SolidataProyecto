// middleware/authorize.js
const ENTITY = require("../models/entity");
const ACTION = require("../models/action");
const PERMISSION = require("../models/permission");
const ROLEPERMISSION = require("../models/rolepermission");


function authorize(entityName, actionName) {
    return async (req, res, next) => {
        try {
            // 1. Usuario autenticado
            const user = req.user_find;
            if (!user) {
                return res.status(401).json({ message: "No autenticado" });
            }

            const roleId = Number(user.rol);
            if (!roleId) {
                return res.status(403).json({ message: "No tiene rol asignado" });
            }

            // El administrador (rol 1) tiene acceso completo al panel.
            if (roleId === 1) {
                return next();
            }

            // 2. Buscar entidad
            const entity = await ENTITY.findOne({ where: { name: entityName } });
            if (!entity) {
                return res.status(500).json({ message: `Entidad '${entityName}' no existe` });
            }

            // 3. Buscar acción
            const action = await ACTION.findOne({
                where: { name: actionName}
            });

            if (!action) {
                return res.status(500).json({ message: `Acción '${actionName}' no existe ` });
            }

            // 4. Buscar permiso asociado a esa acción
            const permission = await PERMISSION.findOne({
                where: { action_id: action.id, entity_id: entity.id }
            });

            if (!permission) {
                return res.status(403).json({ message: `No existe un permiso asociado a esta accion: '${actionName}' hacia esta identidad: '${entityName}'. ` });
            }

            // 5. Validar si el rol del usuario tiene ese permiso
            const rolePermission = await ROLEPERMISSION.findOne({
                where: {
                    role_id: roleId,
                    permission_id: permission.id
                }
            });

            if (!rolePermission) {
                return res.status(403).json({
                    message: "No tiene permisos para realizar esta acción"
                });
            }

            // Pasa la autorización
            next();

        } catch (error) {
            console.error("Error en authorize:", error);
            res.status(500).json({ message: "Error al verificar permisos" });
        }
    };
}

module.exports = authorize;
