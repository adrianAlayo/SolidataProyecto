const { where, Model } = require('sequelize');
const USER = require('../../models/user');
const ROLE = require('../../models/role');

const createRole = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Validaciones
        if (!name || typeof name !== "string" || name.trim() === "") {
            return res.status(400).send({ message: "El campo 'name' es obligatorio y debe ser un texto válido." });
        }

        if (description && typeof description !== "string") {
        return res.status(400).send({ message: "El campo 'description' debe ser un texto válido." });
        }

        // Verificar si el rol ya existe
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
        const {id, newRole_id} = req.body;

        if(id === undefined || isNaN(id) && newRole_id === undefined || isNaN(newRole_id)){
            return res.status(400).send({message: "Tiene que completar el campo y tienen que ser numeros"})
        }
        
        const role = await ROLE.findByPk(newRole_id);
        if (!role) return res.status(400).send({ message: "El rol indicado no existe" });
        
        const user_found = await USER.update(
            { role_id: newRole_id }, // ← los cambios
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
        res.status(400).send({message: "Error!!! no se pudo cambiar de rol al usuario: -> " + e});
    }
    
}
const editRole = async (req, res) => {
  try {
    const { name, updateRole, aupdateDescription } = req.body;

    // Verificar que el rol exista
    const role = await ROLE.findOne({ where: { name } });
    if (!role) {
      return res.status(404).send({ message: "No se encontró el rol especificado." });
    }

    // Armar objeto dinámico de actualización
    const fieldsToUpdate = {};

    if (updateRole && typeof updateRole === "string" && updateRole.trim() !== "") {
      // Verificar que el nuevo nombre no exista ya
      const duplicate = await ROLE.findOne({ where: { name: updateRole } });
      if (duplicate) {
        return res.status(400).send({ message: "Ya existe un rol con ese nuevo nombre." });
      }
      fieldsToUpdate.name = updateRole;
    }

    if (aupdateDescription && typeof aupdateDescription === "string" && aupdateDescription.trim() !== "") {
      fieldsToUpdate.description = aupdateDescription;
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).send({
        message: "Debe proporcionar 'updateRole' o 'aupdateDescription' para actualizar.",
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
const getRole = async (_req, res) => {
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
        return res.status(500).send({
            message: "Ocurrio un error !!! interno: -> ",
            error: err.message
        })
    }
}

module.exports = {
    getRole,
    createRole,
    assignRoles,
    editRole,
    deleteRole
}