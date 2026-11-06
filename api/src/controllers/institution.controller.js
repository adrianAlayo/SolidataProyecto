const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const INSTITUTION = require('../models/institution');
const USER = require('../models/user');
const TYPE = require('../models/type');
const geocodeInstitution = require('../utils/geocodeInstitution.util');

const institutionIncludes = [{ model: TYPE, attributes: ['id', 'name'] }];

const createInstitution = async(req,res) =>{
    try{
        let {first_name,last_name,email,phone,password,name_inst,location_inst,type_inst,type} = req.body;

        const existUser = await USER.findOne({ where: { email } });
        if (existUser) {
            return res.status(400).json({message: "El email ya está registrado, por favor usa otro."});
        }

        const password_hash_inCharge = await bcrypt.hash(password, 7);
        const coordinates = await geocodeInstitution(name_inst, location_inst);
        
        const institution_create = await INSTITUTION.create({
            name: name_inst, 
            location: location_inst,
            latitude: coordinates?.latitude ?? null,
            longitude: coordinates?.longitude ?? null,
            location_accuracy: coordinates?.accuracy ?? null,
            location_checked_at: new Date(),
            institutionType: type_inst,
            type_id: type,
        });
        const user_create = await USER.create({
            first_name: first_name, 
            last_name: last_name, 
            email: email,
            password: password_hash_inCharge, 
            phone: phone,  
            institution_id: institution_create.id,
            role_id: 4 // rol por defecto para instituciones 
        });

        res.status(201).json({
            message: "Registro exitoso, ya esta activo para su uso \n ",
            user_create,
            institution_create,
        });
    }catch(err){
        console.error("Error:", err.message);
        return res.status(500).json({message: "Error al intentar crear una institucion."});
    }
}
const geocodeMissingInstitutions = async (_req, res) => {
    try {
        const institutions = await INSTITUTION.findAll({
            where: {
                [Op.or]: [
                    { latitude: null },
                    { longitude: null },
                ],
            },
            order: [['id', 'ASC']],
        });

        let located = 0;
        let notLocated = 0;
        for (const institution of institutions) {
            const coordinates = await geocodeInstitution(institution.name, institution.location);
            await institution.update({
                latitude: coordinates?.latitude ?? null,
                longitude: coordinates?.longitude ?? null,
                location_accuracy: coordinates?.accuracy ?? null,
                location_checked_at: new Date(),
            });
            if (coordinates) located += 1;
            else notLocated += 1;
        }

        return res.status(200).json({
            message: 'Se revisaron las ubicaciones pendientes.',
            checked: institutions.length,
            located,
            notLocated,
        });
    } catch (err) {
        console.error('Error al geocodificar instituciones:', err.message);
        return res.status(500).json({ message: 'No se pudieron revisar las ubicaciones.' });
    }
};
const getInstitutions = async(_req,res) =>{
    try{
        const institutions = await INSTITUTION.findAll({ include: institutionIncludes, order: [['name', 'ASC']] });

        res.status(200).json({
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
       let { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        id = Number(id);

        const institution = await INSTITUTION.findByPk(id, { include: institutionIncludes });

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
const getInstitutionsInactive = async(_req,res) =>{
    try{
        const institutions = await INSTITUTION.findAll({
            where:{
                status: "Inactive",
            },
            include: institutionIncludes,
            order: [['name', 'ASC']]
        })

        res.status(200).json({
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
            include: institutionIncludes,
            order: [['name', 'ASC']]
        })

        res.status(200).json({
            message: "Liista de instituciones activas exitosamente",
            institutions
        });
        
    }catch(err){
        console.error("Error al obtener la lista de las instituciones activas:", err.message);
        return res.status(500).json({message: "Error al intentar obtener la lista de las institciones activas."});
    }
}
const updateInstitution = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: 'ID inválido.' });
        const institution = await INSTITUTION.findByPk(id);
        if (!institution) return res.status(404).json({ message: 'La institución no existe.' });

        const { name, location, institutionType, status, type_id } = req.body;
        const changes = {};
        if (name !== undefined) {
            if (typeof name !== 'string' || !name.trim()) return res.status(400).json({ message: 'El nombre es obligatorio.' });
            changes.name = name.trim();
        }
        if (location !== undefined) {
            if (typeof location !== 'string' || !location.trim()) return res.status(400).json({ message: 'La ubicación es obligatoria.' });
            changes.location = location.trim();
        }
        if (institutionType !== undefined) {
            if (!['Donor', 'Recipient', 'Both'].includes(institutionType)) return res.status(400).json({ message: 'Tipo de institución inválido.' });
            changes.institutionType = institutionType;
        }
        if (status !== undefined) {
            if (!['Active', 'Inactive', 'Pending'].includes(status)) return res.status(400).json({ message: 'Estado inválido.' });
            changes.status = status;
        }
        if (type_id !== undefined) {
            const type = await TYPE.findByPk(Number(type_id));
            if (!type) return res.status(400).json({ message: 'Seleccione una categoría válida.' });
            changes.type_id = type.id;
        }
        if (!Object.keys(changes).length) return res.status(400).json({ message: 'No hay cambios para guardar.' });

        const locationChanged = changes.location && changes.location !== institution.location;
        const nameChanged = changes.name && changes.name !== institution.name;
        if (locationChanged || nameChanged) {
            const coordinates = await geocodeInstitution(changes.name || institution.name, changes.location || institution.location);
            changes.latitude = coordinates?.latitude ?? null;
            changes.longitude = coordinates?.longitude ?? null;
            changes.location_accuracy = coordinates?.accuracy ?? null;
            changes.location_checked_at = new Date();
        }

        if (changes.name) {
            const duplicate = await INSTITUTION.findOne({ where: { name: changes.name, id: { [Op.ne]: id } } });
            if (duplicate) return res.status(409).json({ message: 'Ya existe una institución con ese nombre.' });
        }
        await institution.update(changes);
        await institution.reload({ include: institutionIncludes });
        return res.status(200).json({ message: 'Institución actualizada.', data: institution });
    } catch (err) {
        console.error('Error al actualizar institución:', err.message);
        return res.status(500).json({ message: 'No se pudo actualizar la institución.' });
    }
};
const deleteInstitution = async (req,res)=>{
    try{
       let { id } = req.params;

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
        console.error("Error:", err.message);
        if (err.name === 'SequelizeForeignKeyConstraintError' || err.original?.code === '23503') {
            return res.status(409).json({ message: 'No se puede eliminar porque tiene usuarios, necesidades o donaciones asociadas.' });
        }
        return res.status(500).json({ message: "Error al intentar eliminar la institucion." });
    }
};

module.exports = {
    createInstitution, // body
    getInstitutions, // 
    getInstitutionsActive, // 
    getInstitutionsInactive, // 
    getInstitution, // params
    deleteInstitution, //params
    updateInstitution,
    geocodeMissingInstitutions,
}
