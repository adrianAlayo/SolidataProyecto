const { where } = require('sequelize');
const bcrypt = require('bcrypt');
const INSTITUTION = require('../models/institution');
const USER = require('../models/user');
const ROLE = require('../models/role');



const HelloURL = (req,res) =>{
    res.status(200).send("La URL /admin funciona todo GOOOOOTI");
}

// Solicitudes HTTP ... GET
const ListUsers = async (req,res) =>{
    try{
        const users = await USER.findAll({
            where:{
                is_active: true,
            },
            attributes:{
                exclude: "password,createdAt,updatedAt"
            }
        })
        if(!users || users.length === 0){
            res.status(404).send({message: "No hay usuarios activos por el momento"});
        }

        res.status(201).json({
            message: "Liista de usuario exitosamente",
            users
        })
        
    }catch(e){
        res.status(500).send({message: "Error!!! a la hora de hacer el listado de los usuarios: -> " + e})
    }
}
const ListInstitutionsInactive = async(req,res) =>{
    try{
        const institutions = await INSTITUTION.findAll({
            where:{
                status: "Inactivo",
            },
            attributes:{
                exclude: "password,createdAt,updatedAt"
            }
        })
        if(!institutions || institutions.length === 0){
            res.status(404).send({message: "No hay instituciones Inactivas por el momento"});
        }

        res.status(201).json({
            message: "Liista de instituciones Inactiva exitosamente",
            institutions
        });
    }catch(e){
        res.status(500).send({message: "Error!!! a la hora de hacer el listado de las instituciones Inactivas: -> " + e});
    }
}
const ListInstitutionsActive = async(req,res) =>{
    try{
        const institutions = await INSTITUTION.findAll({
            where:{
                status: "Activo",
            },
            attributes:{
                exclude: "password,createdAt,updatedAt"
            }
        })
        if(!institutions || institutions.length === 0){
            res.status(404).send({message: "No hay instituciones Activas por el momento"});
        }

        res.status(201).json({
            message: "Liista de instituciones exitosamente",
            institutions
        });
        
    }catch(e){
        res.status(500).send({message: "Error!!! a la hora de hacer el listado de las instituciones: -> " + e});
    }
}
const ListInstitutions = async(req,res) =>{
    try{
        const institutions = await INSTITUTION.findAll({
            attributes:{
                exclude: "password,createdAt,updatedAt"
            }
        })
        if(!institutions || institutions.length === 0){
            res.status(404).send({message: "No hay instituciones por el momento"});
        }

        res.status(201).json({
            message: "Liista de instituciones exitosamente",
            institutions
        });
        
    }catch(e){
        res.status(500).send({message: "Error!!! a la hora de hacer el listado de las instituciones: -> " + e});
    }
}


// Solicitudes HTTP ... POST
const CreateRole = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Validaciones
        if (!name || typeof name !== "string" || name.trim() === "") {
        return res
            .status(400)
            .send({ message: "El campo 'name' es obligatorio y debe ser un texto válido." });
        }

        if (description && typeof description !== "string") {
        return res
            .status(400)
            .send({ message: "El campo 'description' debe ser un texto válido." });
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


// Solicitudes HTTP ... PATCH
const DisableUser = async (req,res) =>{
    try{
        const {email} = req.body;
        
        if(!email || typeof email !== "string"){
            return res.status(404).send({message: "Todos los campos tienen que ser 'String' y estar Completos"})
        }

        if(!VerificationEmail(email)){
            return res.status(404).send({message: "Tienes que introducir un EMAIL"})
        }
        
        const institution_found = await USER.update(
            {is_active: false},
            {
                where: {
                    email,
                    is_active: true,
                }
            }
        )

        if(!institution_found){
            return res.status(404).send({message: "El usuario no existe o esta 'Inactivo o Pendiente' "})
        }

        res.status(201).json({message: "Se dios de baja (Parcial) exitosamente al usuario"})
    }catch(e){
        res.status(500).send({message: "Error!!! a la hora de dar de Baja al usuario: -> " + e})
    }
}
const DisableInstitution = async (req,res) =>{
    try{
        const {name,email} = req.body;
        
        if(!VerifyCamp(name,email)){
            return res.status(404).send({message: "Todos los campos tienen que ser 'String' y estar Completos"})
        }

        if(!VerificationEmail(email)){
            return res.status(404).send({message: "Tienes que introducir un EMAIL"})
        }
        
        const institution_found = await INSTITUTION.update(
            { status: "Inactivo" }, // ← los cambios
            {
                where: {
                    name: name, 
                    email: email,
                    status: "Activo",
                }
            }
        )

        if(!institution_found){
            return res.status(404).send({message: "La institucion no existe o ya esta 'Inactiva o Pendiente' "})
        }

        res.status(201).json({message: "Se dios de baja (Parcial) exitosamente a la Institucion"})
    }catch(e){
        res.status(500).send({message: "Error!!! a la hora de dar de Baja a la Institucion: -> " + e})
    }
}
const AcceptInstitution = async (req, res) => {
  try {
    const { id } = req.body; 

    if (!id) {
      return res.status(400).send({ message: "Falta el ID de la institución" });
    }

    // Buscamos la institución con estado 'Pendiente' o 'Inactivo'
    const institution = await INSTITUTION.findOne({
      where: { id: id, status: ["Pendiente", "Inactivo"] }
    });

    if (!institution) {
      return res.status(404).send({
        message: "La institución no existe o ya está activa"
      });
    }

    // Actualizamos su estado a 'Activo'
    await INSTITUTION.update(
      { status: "Activo" },
      { where: { id: id } }
    );

    res.status(200).json({
      message: "La institución fue aceptada correctamente",
      id: id
    });

  } catch (e) {
    res.status(500).send({
      message: "Error al aceptar la institución: " + e.message
    });
  }
};
const AssignRoles = async (req,res) =>{
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
const EditRole = async (req, res) => {
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

// Solicitudes HTTP ... DELETE
const DeleteUsers = async (req, res) => {
    try {
        let { id } = req.body;

        // Convertir el ID a número
        id = parseInt(id);

        if (isNaN(id)) {
            return res.status(400).send({ message: "El ID debe ser un número válido" });
        }

        const user_found = await USER.destroy({
            where: { id: id }
        });

        if (!user_found) {
            return res.status(404).send({ message: "El Usuario no existe" });
        }

        res.status(200).send({ message: "Usuario eliminado correctamente" });

    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Error al eliminar al Usuario -> " + e.message });
    }
};
const DeleteInstitution = async (req,res)=>{
    try{
        const {id} = req.body;

        // Convertir el ID a número
        id = parseInt(id);

        if (isNaN(id)) {
            return res.status(400).send({ message: "El ID debe ser un número válido" });
        }

        const user_found = await INSTITUTION.destroy({
            where: {
                id: id,
            }
        })

        if(!user_found){
            return res.status(404).send({message: "La Institucion no existe"});
        }
        res.status(200).send({ message: "La Institucion eliminado correctamente" });
    }catch(e){
        res.status(500).send({message: "Error!!! a la hora de eliminar la Institucion: -> " + e});
    }
};
const DeleteRole = async (req, res) => {
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




//Logica verificacion
function VerifyCamp(name,email){
    // Verifica que ambos campos existan y sean cadenas no vacías
    if (!name || !email) return false;  // si alguno es undefined, null o string vacío

    if (typeof name !== "string" || typeof email !== "string") return false;

    return true;
}
function VerificationEmail(email) {
    if (email.startsWith('.') || email.startsWith('@')) return false;
    const atCount = (email.match(/@/g) || []).length;
    if (atCount !== 1) return false;
    if (email.endsWith('.')) return false;
    const domainPart = email.split('@')[1];
    return domainPart.includes('.');
}

module.exports = {
    HelloURL,

    ListUsers, // GET
    ListInstitutions, // GET
    ListInstitutionsInactive, // GET
    ListInstitutionsActive, // GET

    DeleteUsers, // DELETE
    DeleteInstitution, // DELETE
    DeleteRole, // DELETE

    DisableUser, // PATH
    AcceptInstitution, // PATCH
    DisableInstitution, // PATCH
    AssignRoles, // PATCH
    EditRole, // PATCH

    CreateRole, // POST  
};