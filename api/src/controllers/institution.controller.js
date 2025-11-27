const { where, Op } = require('sequelize');
const INSTITUTION = require('../models/institution');

const createInstitution = async(req,res) =>{
    try{
        let {first_name,last_name,email,phone,password,name_inst,location_inst,type_inst,type} = req.body;

        const existUser = await USER.findOne({ where: { email } });
        if (existUser) {
            return res.status(400).json({message: "El email ya está registrado, por favor usa otro."});
        }

        const password_hash_inCharge = await bcrypt.hash(password, 7);
        
        const institution_create = await INSTITUTION.create({
            name: name_inst, 
            location: location_inst,
            institutionType: type_inst,
            status: "Active", 
            type_id: type, 
        });
        const user_create = await USER.create({
            first_name: first_name, 
            last_name: last_name, 
            email: email,
            password: password_hash_inCharge, 
            phone: phone, 
            is_active: true, 
            institution_id: institution_create.id,
            role_id: 4 // rol por defecto para instituciones 
        });

        res.status(201).json({
            message: "Registro exitoso, ya esta activo para su uso \n ",
            user_create,
            institution_create,
        });
    }catch(err){
        console.error("Error al crear una institucion:", err);
        return res.status(500).json({message: "Error al intentar crear una institucion."});
    }
}
const getInstitutionsInactive = async(_req,res) =>{
    try{
        const institutions = await INSTITUTION.findAll({
            where:{
                status: "Inactive",
            },
            attributes:{
                exclude: "password"
            }
        })
        if(!institutions || institutions.length === 0){
            res.status(404).send({message: "No hay instituciones Inactivas por el momento"});
        }

        res.status(201).json({
            message: "Liista de instituciones Inactiva exitosamente",
            institutions
        });
    }catch(err){
        console.error("Error al obtener la lista de las instituciones inactivas:", err.message);
        return res.status(500).json({message: "Error al intentar obtener la lista de las instituciones inactivas."});
    }
}
const getInstitutionsActive = async(_req,res) =>{
    try{
        const institutions = await INSTITUTION.findAll({
            where:{
                status: "Active",
            },
            attributes:{
                exclude: "password"
            }
        })
        if(!institutions || institutions.length === 0){
            res.status(404).send({message: "No hay instituciones Activas por el momento"});
        }

        res.status(201).json({
            message: "Liista de instituciones activas exitosamente",
            institutions
        });
        
    }catch(err){
        console.error("Error al obtener la lista de las instituciones activas:", err.message);
        return res.status(500).json({message: "Error al intentar obtener la lista de las institciones activas."});
    }
}
const getInstitutions = async(_req,res) =>{
    try{
        const institutions = await INSTITUTION.findAll({
            attributes:{
                exclude: "password"
            }
        })
        if(!institutions || institutions.length === 0){
            res.status(404).send({message: "No hay instituciones por el momento"});
        }

        res.status(201).json({
            message: "Liista de instituciones exitosamente",
            institutions
        });
        
    }catch(err){
        console.error("Error al obtener la lista de las instituciones:", err.message);
        return res.status(500).json({message: "Error al intentar obtener la lista de las institciones."});
    }
}
const getInstitution = async(req,res) =>{
    try {
       const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        id = Number(id);

        const institution = await INSTITUTION.findByPk(id);

        if (!institution) {
            return res.status(404).json({ message: "No se encontro la institucion." });
        }

        return res.status(200).json({
            message: "Artículo encontrado.",
            data: institution
        });

    } catch (err) {
        console.error("Error al obtener una institucion:", err);
        return res.status(500).json({message: "Error al intentar obtener una institucion."});
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
            { status: "Inactive" }, // el cambio
            {
                where: {
                    name: name, 
                    email: email,
                    [Op.or]: [{status:"Active"},{status:"Pending"}],
                }
            }
        )

        if(!institution_found){
            return res.status(404).send({message: "La institucion no existe o ya esta 'Inactiva'. "})
        }

        res.status(201).json({message: "Se dios de baja (Parcial) exitosamente a la Institucion"})
    }catch(err){
        console.error("Error al desactivar la institucion:", err.message);
        return res.status(500).json({message: "Error al intentar al desactivar la institucion."});    
    }
}
const acceptInstitution = async (req, res) => {
    try {
       const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        id = Number(id);

        const institution_found = await INSTITUTION.update(
            { status: "Active" }, // el cambio
            {
                where: {
                    id:id,
                    [Op.or]: [{status:"Inactive"},{status:"Pending"}],
                }
            }
        )

        if (!institution_found) {
            return res.status(404).send({message: "La institución no existe o ya está activa"});
        }

        res.status(200).json({message: "La institución fue aceptada correctamente",});
    } catch (err) {
        console.error("Error al aceptar a la institucion: ", err.message);
        return res.status(500).json({ message: "Error al intentar aceptar a la institucion." });
    }
};
const deleteInstitution = async (req,res)=>{
    try{
       const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        id = Number(id);

         const institution = await INSTITUTION.findByPk(id);
        if (!institution) {
            return res.status(404).json({ message: "La institucion no existe." });
        }

        await institution.destroy();

        res.status(200).send({ message: "La Institucion eliminado correctamente" });
    }catch(err){
        console.error("Error al eliminar la institucion:", err.message);
        return res.status(500).json({ message: "Error al intentar eliminar la institucion." });
    }
};

module.exports = {
    createInstitution, // body
    getInstitutions, // 
    getInstitutionsActive, // 
    getInstitutionsInactive, // 
    getInstitution, // params
    disableInstitution, //body
    acceptInstitution, //params
    deleteInstitution //params
}