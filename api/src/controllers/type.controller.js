const TYPE = require('../models/type');
const IsString = require('../utils/isString.util');
const { where } = require('sequelize');

const createType = async (req, res) => {
    try {
        const { name } = req.body;

        // Validaciones
        if (!IsString(name)) {
            return res.status(400).send({ message: "El campo 'name' es obligatorio y debe ser un texto válido." });
        }

        // Validar si ya existe
        const existType = await TYPE.findOne({
            where:{
                name: name
            }
        });
        if (existType) {
            return res.status(400).send({ message: "El type ya existe." });
        }

        const newType = await TYPE.create({ name });

        if(!newType){
            return res.status(404).send({message: "Ocurrio un error inesperado al intentar crear el nuevo tipo de institucion"})
        }
        return res.status(201).json({
            message: "TYPE creado correctamente.",
            data: newType,
        });
    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).send({ message: "Error!!! a la hora de crear el TYPE: -> "});
    }
};
const getTypes = async (req, res) => {
    try {
        const types = await TYPE.findAll();

        return res.status(200).send({
            message: "Lista de Types obtenida correctamente.",
            data: types,
        });
    } catch (err) {
        console.error("Error al obtener los Types: ", err);
        return res.status(500).send({ message: "Error al obtener los Types." });
    }
};
const getType = async (req, res) => {
    try {
        const { id } = req.params;

        const type = await TYPE.findByPk(id);

        if (!type) {
            return res.status(404).send({ message: "Type no encontrado." });
        }

        return res.status(200).send({
            message: "Type encontrado.",
            data: type,
        });
    } catch (err) {
        console.error("Error al obtener el Type: ", err);
        return res.status(500).send({ message: "Error al obtener el Type." });
    }
};
const updateType = async (req, res) => {
    try {
        let { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        id = Number(id);
        const { name } = req.body;

        // Validación
        if (!IsString(name)) {
            return res.status(400).send({ message: "El campo 'name' es obligatorio y debe ser válido." });
        }

        // Buscar el type
        const type = await TYPE.findByPk(id);
        if (!type) {
            return res.status(404).send({ message: "Type no encontrado." });
        }

        // Verificar si existe otro type con el mismo nombre
        const nameExists = await TYPE.findOne({ where: { name } });
        if (nameExists) {
            return res.status(400).send({ message: "Ya existe un Type con ese nombre." });
        }

        await type.update({ name });

        return res.status(200).send({
            message: "Type actualizado correctamente.",
            data: type,
        });
    } catch (err) {
        console.error("Error al actualizar el Type: ", err);
        return res.status(500).send({ message: "Error al actualizar el Type." });
    }
};
const deleteType = async (req, res) => {
    try {
        const { id } = req.params;

        const type = await TYPE.findByPk(id);

        if (!type) {
            return res.status(404).send({ message: "Type no encontrado." });
        }

        await type.destroy();

        return res.status(200).send({
            message: "Type eliminado correctamente."
        });
    } catch (err) {
        console.error("Error al eliminar el Type: ", err);
        return res.status(500).send({ message: "Error al eliminar el Type." });
    }
};

module.exports = {
    createType,
    getTypes,
    getType,
    updateType,
    deleteType
};