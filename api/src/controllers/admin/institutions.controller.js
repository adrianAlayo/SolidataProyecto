const { where } = require('sequelize');
const bcrypt = require('bcrypt');
const INSTITUTION = require('../../models/institution');
const USER = require('../../models/user');
const ROLE = require('../../models/role');

const getInstitutionsInactive = async(_req,res) =>{
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
const getInstitutionsActive = async(_req,res) =>{
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
const getInstitutions = async(_req,res) =>{
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
const disableInstitution = async (req,res) =>{
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
const acceptInstitution = async (req, res) => {
  try {
    const { id } = req.body; 

    if (!id) {
      return res.status(400).send({ message: "Falta el ID de la institución" });
    }

    // Buscamos la institución con estado 'Pendiente' o 'Inactivo'
    const institution = await INSTITUTION.findOne({
      where: { id: id, status: ["Pending", "Inactive"] }
    });

    if (!institution) {
      return res.status(404).send({
        message: "La institución no existe o ya está activa"
      });
    }

    // Actualizamos su estado a 'Activo'
    await INSTITUTION.update(
      { status: "Active" },
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
const deleteInstitution = async (req,res)=>{
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

module.exports = {
    getInstitutions,
    getInstitutionsActive,
    getInstitutionsInactive,
    disableInstitution,
    acceptInstitution,
    deleteInstitution
}