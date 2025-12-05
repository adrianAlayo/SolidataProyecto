const { where, Op } = require('sequelize');
const ARTICLE = require('../models/article');
const IsString = require('../utils/isString.util');

const createArticle = async (req, res) => { 
    try {
        const { name,category,variant,unit } = req.body;
        
        if(!IsString(name) || !IsString(category) || !IsString(variant) || !IsString(unit)){
            return res.status(404).send({message: "Todos los compos son obligatorios y deben ser texto valido."})
        }

        const existArticle = await ARTICLE.findOne({ 
            where: { name,category,variant,unit }
         });
        if (existArticle) {
            return res.status(400).send({ message: "El article ya existe." });
        }

        const newArticle = await ARTICLE.create({
            name,
            category,
            variant,
            unit
        });

        return res.status(201).send({
            message: "Articulo creado correctamente.",
            data: newArticle,
        });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ message: "Error al intentar crear un Articulo" });
    }
};
const deleteArticle = async (req, res) => {
    try {
       const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        const ID = Number(id);

        const article = await ARTICLE.findByPk(ID);
        if (!article) {
            return res.status(404).json({ message: "El artículo no existe." });
        }
        
        await article.destroy();

        return res.status(200).json({
            message: "Artículo eliminado correctamente.",
            deleted: article
        });

    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({ message: "Error al intentar eliminar el articulo" });
    }
};
const putArticle = async (req, res) => {
    try {
        let { id } = req.params;
        

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        id = Number(id);

        const article = await ARTICLE.findByPk(id);
        if (!article) {
            return res.status(404).json({ message: "El artículo no existe." });
        }

        const { name, category, variant, unit } = req.body;
        // Construimos solo los campos enviados
        const updateData = {};

        if (name !== undefined) {
            if (!IsString(name)) {
                return res.status(400).json({ message: 'name debe ser un string' });
            }
            updateData.name = name;
        }
        if (category !== undefined) {
            if (!IsString(category)) {
                return res.status(400).json({ message: 'name debe ser un string' });
            }
            updateData.category = category;
        }
        if (variant !== undefined) {
            if (!IsString(variant)) {
                return res.status(400).json({ message: 'name debe ser un string' });
            }
            updateData.variant = variant;
        }
        if (unit !== undefined) {
            if (!IsString(unit)) {
                return res.status(400).json({ message: 'name debe ser un string' });
            }
            updateData.unit = unit;
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: "Debe enviar al menos un campo para actualizar." });
        }

        // Validar si ya existe otro artículo con esos valores
        const existArticle = await ARTICLE.findOne({
            where: {
                ...updateData,
                id: { [Op.ne]: id }   // Excluir el artículo actual
            }
        });

        if (existArticle) {
            return res.status(400).json({
                message: "Ya existe un artículo con estos datos."
            });
        }

        await article.update(updateData);

        return res.status(200).json({
            message: "Artículo actualizado correctamente.",
            updated: article
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ message: "Error al intentar actualizar el artículo." });
    }
};
const getArticles = async (_req, res) => {
    try {
        const articles = await ARTICLE.findAll();

        if (!articles || articles.length === 0) {
            return res.status(404).json({ message: "No hay artículos registrados." });
        }

        return res.status(200).json({
            message: "Listado de artículos.",
            data: articles
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({message: "Error al intentar obtener los artículos."});
    }
};
const getArticle = async (req, res) => {
    try {
       const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        const ID = Number(id);

        const article = await ARTICLE.findByPk(ID);

        if (!article) {
            return res.status(404).json({ message: "No se encontró el artículo." });
        }

        return res.status(200).json({
            message: "Artículo encontrado.",
            data: article
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({message: "Error al intentar obtener el artículo."});
    }
};




module.exports = {
    createArticle, // body
    deleteArticle, // params
    putArticle, // params
    getArticles, //
    getArticle,  // params
};