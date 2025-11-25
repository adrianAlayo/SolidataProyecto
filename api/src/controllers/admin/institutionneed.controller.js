const INSTITUTION = require('../../models/institution');
const INSTITUTIONNEED = require('../../models/institutionneed');

const { where } = require('sequelize');

// UTILS
const isString = require('../../utils/isString.util');
const IsDate = require('../../utils/isDate.util');


const createNeeds = async (req, res) => {
    try {
        const { available, institution_id, article_id } = req.body;

        // Campos obligatorios
        if (available === undefined || institution_id === undefined || article_id === undefined) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        // Deben ser numéricos
        if (isNaN(Number(available)) || isNaN(Number(institution_id)) || isNaN(Number(article_id))) {
            return res.status(400).json({ message: "Todos los campos deben ser números." });
        }

        // Evitar duplicados
        const existNeed = await INSTITUTIONNEED.findOne({
            where: { institution_id, article_id }
        });

        if (existNeed) {
            return res.status(400).json({
                message: "La necesidad que quiere agregar ya existe."
            });
        }

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
        console.error("Error al crear la necesidad:", err.message);
        res.status(500).send({ message: "Error interno al crear la necesidad." });
    }
};
const getNeed = async (req, res) => {
    try {
        let { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        id = Number(id);

        const need = await INSTITUTIONNEED.findByPk(id);

        if (!need) {
            return res.status(404).json({ message: "La necesidad no existe." });
        }

        return res.status(200).json({ data: need });

    } catch (err) {
        res.status(500).json({ message: "Error al obtener la necesidad." });
    }
};
const getNeeds = async (_req, res) => {
    try {
        const needs = await INSTITUTIONNEED.findAll();

        return res.status(200).json({ data: needs });

    } catch (err) {
        res.status(500).json({ message: "Error al obtener las necesidades." });
    }
};
const getNeedByInstitution = async (req, res) => {
    try {
        const { institution_id } = req.params;

        if (!institution_id || isNaN(Number(institution_id))) {
            return res.status(400).json({ message: "Institution ID inválido." });
        }

        const existInstitution = await INSTITUTION.findByPk(institution_id);
        if(!existInstitution){
            return res.status(404).send({message: "El ID de la institucion que introdujo no existe"})
        }

        const needs = await INSTITUTIONNEED.findAll({
            where: { institution_id }
        });

        if (needs.length === 0) {
            return res.status(404).json({
                message: "Esta institución no tiene necesidades registradas."
            });
        }

        return res.status(200).json({ data: needs });

    } catch (err) {
        res.status(500).json({ message: "Error al obtener necesidades de la institución." });
    }
};
const updateNeed = async (req, res) => {
    try {
        const { id } = req.params;
        const { available } = req.body;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        if (available === undefined || isNaN(Number(available))) {
            return res.status(400).json({ message: "El campo 'available' es obligatorio y debe ser número." });
        }

        const need = await INSTITUTIONNEED.findByPk(id);

        if (!need) {
            return res.status(404).json({ message: "La necesidad no existe." });
        }

        await need.update({ available });

        return res.status(200).json({
            message: "Necesidad actualizada correctamente",
            data: need
        });

    } catch (err) {
        res.status(500).json({ message: "Error al actualizar la necesidad." });
    }
};
const deleteNeed = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        const deleted = await INSTITUTIONNEED.destroy({
            where: { id }
        });

        if (!deleted) {
            return res.status(404).json({ message: "La necesidad no existe o ya fue eliminada." });
        }

        return res.status(200).json({ message: "Necesidad eliminada correctamente." });

    } catch (err) {
        res.status(500).json({ message: "Error al eliminar la necesidad." });
    }
};
const updateStatusNeed = async (req,res) =>{

}

module.exports = {
    createNeeds,          // POST (body)
    getNeed,              // GET /needs/:id
    getNeeds,             // GET /needs
    getNeedByInstitution, // GET /needs/institution/:institution_id
    updateNeed,           // PUT /needs/:id
    deleteNeed            // DELETE /needs/:id
};
