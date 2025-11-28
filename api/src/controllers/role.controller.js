const { where, Model } = require('sequelize');
const USER = require('../models/user');
const ROLE = require('../models/role');
const IsString = require ('../utils/isString.util');
const isString = require('../utils/isString.util');

const createRole = async (req, res) => {
    try {
        const { name, description } = req.body;

        if(!isString(name) && !isString(description)){
            return res.status(404).send({message:"Los campos son obligatorios y tienen que tener un valor valido"})
        }

        
        const existingRole = await ROLE.findOne({ where: { name } });
        if (existingRole) {
            return res.status(400).send({ message: "El rol ya existe." });
        }

        const newRole = await ROLE.create({
            name,
            description: description || null,
        });

        return res.status(201).send({
            message: "Rol creado correctamente.",
            data: newRole,
        });
    } catch (error) {
        console.error("Error!!! a la hora de crear el ROL: ->    ", error);
        return res.status(500).send({ message: "Error!!! a la hora de crear el ROL: -> "});
    }
};
const assignRoles = async (req,res) =>{
    // Hara cambios de rol de usuarios dentro del sistema (por ejemplo, operador a coordinador).
    try{
        let { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        id = Number(id);

        const {newRole_id} = req.body;

        if(!newRole_id || isNaN(newRole_id)){
            return res.status(400).send({message: "Tiene que completar el campo y tienen que ser numeros"})
        }
        
        const role = await ROLE.findByPk(newRole_id);
        if (!role) return res.status(400).send({ message: "El rol indicado no existe" });
        
        const user_found = await USER.update(
            { role_id: newRole_id }, // el cambio
            {
                where: {
                    id: id,
                    is_active: true,
                }
            }
        )
        if(!user_found){
            return res.status(404).send({message:"No se encontro un usuario que este activo con ese ID"});
        }

        res.status(201).json({message: "Se cambio de rol con exito"})
    }catch(err){
        console.error("Error asignar el rol:", err.message);
        return res.status(500).json({ message: "Error al intentar asignar un rol." });
    } 
}
const editRole = async (req, res) => {
    try {
        const { name, updateRole, updateDescription } = req.body;

        // Verificar que el rol exista
        const role = await ROLE.findOne({ where: { name } });
        if (!role) {
        return res.status(404).send({ message: "No se encontró el rol especificado." });
        }

        // Armar objeto dinámico de actualización
        const fieldsToUpdate = {};

        if (isString(updateRole)) {
        // Verificar que el nuevo nombre no exista ya
        const duplicate = await ROLE.findOne({ where: { name: updateRole } });
        if (duplicate) {
            return res.status(400).send({ message: "Ya existe un rol con ese nuevo nombre." });
        }
        fieldsToUpdate.name = updateRole;
        }

        if (isString(updateDescription)) {
        fieldsToUpdate.description = updateDescription;
        }

        if (Object.keys(fieldsToUpdate).length === 0) {
        return res.status(400).send({
            message: "Debe proporcionar 'updateRole' o 'updateDescription' para actualizar.",
        });
        }

        // Actualizar el rol
        await ROLE.update(fieldsToUpdate, { where: { name } });

        return res.status(200).send({
            message: "Rol actualizado correctamente.",
            updatedFields: fieldsToUpdate,
        });
    } catch (error) {
        console.error("Error al editar rol:", error);
        return res.status(500).send({ message: "Error!!! A la hora de editar el ROL" });
    }
};
const deleteRole = async (req, res) => {
  try {
    const { name } = req.body;

    const role = await ROLE.findOne({ where: { name } });
    if (!role) {
      return res.status(404).send({ message: "No se encontró el rol." });
    }

    // Eliminar el rol
    await ROLE.destroy({ where: { name } });

    return res.status(200).send({ message: "Rol eliminado correctamente." });
  } catch (error) {
    console.error("Error al eliminar rol:", error);
    return res.status(500).send({ message: "Error!!! a la hora de eliminar el ROL" });
  }
};
const getRoles = async (_req, res) => {
    try {
        const roles_found = await ROLE.findAll();

        if(!roles_found) {
            return res.satatus(404).send({message: "No se encontraron roles"})
        }

        return res.status(200).json({
            message: "Se encontraron roles",
            data: roles_found
        })
    } catch (err) {
        console.error("Error al intentar listar los roles:", err.message);
        return res.status(500).json({ message: "Error intentar obtener una lista de los roles" });
    }
}
const getRole = async (req,res) =>{
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        id = Number(id);

        const role = await ROLE.findByPk(id);

        if (!role) {
            return res.status(404).json({ message: "No se encontro al usuario." });
        }

        return res.status(200).json({
            message: "Role encontrado.",
            data: role
        });

    } catch (err) {
        console.error("Error al obtener la info del rol:", err.message);
        return res.status(500).json({message: "Error al intentar obtener la informacion del rol."});
    }
}

module.exports = {
    getRoles, // 
    getRole, //params
    createRole, // body
    assignRoles, //body y params
    editRole, // body
    deleteRole //body
}