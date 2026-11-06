const INSTITUTION = require('../models/institution');
const ARTICLE = require('../models/article');
const INSTITUTIONNEED = require('../models/institutionneed');

const { where } = require('sequelize');
const IsString = require('../utils/isString.util');

const needIncludes = [
    { model: INSTITUTION, attributes: ['id', 'name'] },
    { model: ARTICLE, attributes: ['id', 'name', 'category', 'variant', 'unit'] }
];

const createNeeds = async (req, res) => {
    try {
        const responsable_user = req.user_find;

        let available, institution_id, article_id;

        // SI NO es rol 4 (admin) → debe enviar institution_id
        if (responsable_user.rol !== 4) {
            ({ available, institution_id, article_id } = req.body);

            // Validación campos obligatorios para admin
            if (
                available === undefined ||
                institution_id === undefined ||
                article_id === undefined
            ) {
                return res.status(400).json({ message: "Todos los campos son obligatorios." });
            }

        } else {
            // SI es rol 4 (institución) → NO envía institution_id
            ({ available, article_id } = req.body);

            if (available === undefined || article_id === undefined) {
                return res.status(400).json({ message: "Debe enviar available y article_id." });
            }

            // En el token institucional, id corresponde a la institución.
            institution_id = responsable_user.id;
        }

        // VALIDAR tipos
        if (
            !Number.isInteger(Number(available)) || Number(available) <= 0 ||
            isNaN(Number(institution_id)) ||
            isNaN(Number(article_id))
        ) {
            return res.status(400).json({ message: "La cantidad debe ser un entero mayor a cero y los identificadores deben ser números." });
        }

        // Validar existencia de institución
        const existInstitution = await INSTITUTION.findByPk(institution_id);
        if (existInstitution) {
            if (
                existInstitution.institutionType !== "Recipient" &&
                existInstitution.institutionType !== "Both"
            ) {
                return res.status(404).send({
                    message:
                        "La institución debe ser Recipient o Both para poder tener necesidades."
                });
            }
        } else {
            return res.status(404).send({
                message: "El ID de la institución no existe."
            });
        }

        // Validar artículo
        const existArticle = await ARTICLE.findByPk(article_id);
        if (!existArticle) {
            return res.status(404).send({
                message: "El ID del artículo no existe."
            });
        }

        // Verificar duplicados
        const existNeed = await INSTITUTIONNEED.findOne({
            where: { institution_id, article_id }
        });

        if (existNeed) {
            return res.status(400).json({
                message: "La necesidad que quiere agregar ya existe."
            });
        }

        // Crear necesidad
        const need = await INSTITUTIONNEED.create({
            available,
            institution_id,
            article_id
        });

        return res.status(200).json({
            message: "Se agregó la necesidad correctamente",
            data: need
        });

    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({ message: "Error al intentar crear una necesidad." });
    }
};
const getNeed = async (req, res) => {
    try {

        const responsable_user = req.user_find;
        let { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        id = Number(id);

        const need = await INSTITUTIONNEED.findByPk(id, { include: needIncludes });

        if (!need) {
            return res.status(404).json({ message: "La necesidad no existe." });
        }

        // SI ES INSTITUCIÓN, SOLO PUEDE VER LAS SUYAS
        if (responsable_user.rol === 4) {
            if (need.institution_id !== (responsable_user.institution_id ?? responsable_user.id)) {
                return res.status(403).json({ message: "No tiene permiso para ver esta necesidad." });
            }
        }

        return res.status(200).json({ data: need });

    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({message: "Error al intentar obtener una necesidad."});
    }
};
const getNeeds = async (req, res) => {
    try {
        const responsable_user = req.user_find;

        let needs;

        if (responsable_user.rol === 4) {
            // Solo las suyas
            needs = await INSTITUTIONNEED.findAll({
                where: { institution_id: responsable_user.institution_id ?? responsable_user.id },
                include: needIncludes,
                order: [['createdAt', 'DESC']]
            });
        } else {
            // Admin ve todas
            needs = await INSTITUTIONNEED.findAll({ include: needIncludes, order: [['createdAt', 'DESC']] });
        }

        return res.status(200).json({ 
            message: "Se listo las necesidades correctamente",
            data: needs 
        });

    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({message: "Error al intentar obtener todas las necesidades."});
    }
};
const getNeedByInstitution = async (req, res) => {
    try {
        const responsable_user = req.user_find;
        let { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        id = Number(id);

        // Si ES institución → solo puede consultar SUS NECESIDADES
        if (responsable_user.rol === 4 && (responsable_user.institution_id ?? responsable_user.id) !== id) {
            return res.status(403).json({ message: "No tiene permiso para ver necesidades de otra institución." });
        }

        const existInstitution = await INSTITUTION.findByPk(id);
        if(!existInstitution){
            return res.status(404).send({message: "El ID de la institucion no existe"});
        }

        const needs = await INSTITUTIONNEED.findAll({ where: { institution_id:id }, include: needIncludes, order: [['createdAt', 'DESC']] });

        return res.status(200).json({ 
            message: "Se listaron las necesidades correctamente",
            data: needs });

    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({message: "Error al intentar obtener necesidades de la institución."});
    }
};
const updateNeed = async (req, res) => {
    try {
        const responsable_user = req.user_find;

        let { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        id = Number(id);

        const need = await INSTITUTIONNEED.findByPk(id);

        if (!need) {
            return res.status(404).json({ message: "La necesidad no existe." });
        }

        // SI ES INSTITUCIÓN → solo puede editar necesidades suyas
        if (responsable_user.rol === 4) {
            if (need.institution_id !== (responsable_user.institution_id ?? responsable_user.id)) {
                return res.status(403).json({ message: "No tiene permiso para modificar esta necesidad." });
            }
        }

        const { available, article_id } = req.body;
        const updateFields = {};

        if (available !== undefined) {
            if (Number.isInteger(Number(available)) && Number(available) > 0) {
                updateFields.available = Number(available);
            } else {
                return res.status(400).json({ message: "available debe ser un entero mayor a cero." });
            }
        }

        if (article_id !== undefined) {
            if (!isNaN(Number(article_id))) {

                // EVITAR DUPLICADO
                const duplicateNeed = await INSTITUTIONNEED.findOne({
                    where: {
                        institution_id: need.institution_id,
                        article_id: Number(article_id)
                    }
                });

                if (duplicateNeed && duplicateNeed.id !== need.id) {
                    return res.status(400).json({
                        message: "Ya existe una necesidad con ese artículo para esta institución."
                    });
                }

                // Verificar que exista el artículo
                const existArticle = await ARTICLE.findByPk(article_id);
                if (!existArticle) {
                    return res.status(404).json({ message: "El ID del artículo no existe." });
                }

                updateFields.article_id = Number(article_id);

            } else {
                return res.status(400).json({ message: "article_id debe ser un número válido." });
            }
        }

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "Debe enviar al menos un campo para actualizar." });
        }

        await need.update(updateFields);

        return res.status(200).json({
            message: "Necesidad actualizada correctamente",
            data: need
        });

    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({ message: "Error al intentar actualizar la necesidad." });
    }
};
const updateStatusNeed = async (req,res) =>{
    try {
        const responsable_user = req.user_find;
        let { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        id = Number(id);

        const need = await INSTITUTIONNEED.findByPk(id);
        if(!need){
            return res.status(404).send({message: "El ID que puso no existe"})
        }

        if (responsable_user.rol === 4 && need.institution_id !== (responsable_user.institution_id ?? responsable_user.id)) {
            return res.status(403).json({ message: "No tiene permiso para cambiar esta necesidad." });
        }

        const {status} = req.body;

        if(!IsString(status) || !status){
            return res.status(400).send({message: "El campo es obligatorio y tiene que introducir un valor valido"})
        }

        if(status !== "Pending" && status !== "Resolved"){
            return res.status(400).send({message: "Tiene que elegir un estado valido, ya sea 'Pending' o 'Resolved'. "})
        }

        await need.update({ status });

        return res.status(200).json({
            message: "Se actualizo correctamente",
            data: need
        })
    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({message: "Error al intentar actualizar el estado de una necesidad."});
    }
}
const deleteNeed = async (req, res) => {
    try {
        const responsable_user = req.user_find;

        let { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        id = Number(id);

        const need = await INSTITUTIONNEED.findByPk(id);
        if(!need){
            return res.status(404).send({message: "La necesidad no existe o ya fue eliminada"});
        }

        // Si ES institución → solo puede borrar las suyas
        if (responsable_user.rol === 4) {
            if (need.institution_id !== (responsable_user.institution_id ?? responsable_user.id)) {
                return res.status(403).json({ message: "No tiene permiso para eliminar esta necesidad." });
            }
        }

        await need.destroy();

        return res.status(200).json({ message: "Necesidad eliminada correctamente." });

    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({message: "Error al intentar eliminar la necesidad."});
    }
};


module.exports = {
    createNeeds,          // POST (body)
    getNeed,              // GET /needs/:id
    getNeeds,             // GET /needs
    getNeedByInstitution, // GET /needs/institution/:institution_id
    updateNeed,           // PUT /needs/:id
    deleteNeed,            // DELETE /needs/:id
    updateStatusNeed
};
