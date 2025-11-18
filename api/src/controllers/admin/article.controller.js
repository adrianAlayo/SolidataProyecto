const ARTICLE = require('../../models/article');
const IsString = require('../../utils/isString.util');

const createArticle = async (req, res) => {
    try {
        const { name,category,variant,unit } = req.body;

        // Validaciones
        if(!IsString(name) || !IsString(category) || !IsString(variant) || !IsString(unit)){
            return res.status(404).send({message: "Todos los compos son obligatorios y deben ser texto valido."})
        }

        // Verificar si el rol ya existe
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
            message: "ARTICLE creado correctamente.",
            data: newArticle,
        });
    } catch (err) {
        console.error("Error!!! a la hora de crear el ARTICLE: ->    ", err);
        return res.status(500).send({ message: "Error!!! a la hora de crear el ROL: -> "});
    }
};

module.exports = {createArticle};