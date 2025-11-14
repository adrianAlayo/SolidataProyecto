const TYPE = require('../../models/type');

const createType = async (req, res) => {
    try {
        const { name } = req.body;

        // Validaciones
        if (!name || typeof name !== "string" || name.trim() === "") {
            return res.status(400).send({ message: "El campo 'name' es obligatorio y debe ser un texto válido." });
        }

        // Verificar si el rol ya existe
        const existType = await TYPE.findOne({ where: { name } });
        if (existType) {
            return res.status(400).send({ message: "El type ya existe." });
        }

        const newType = await TYPE.create({
        name,
        });

        return res.status(201).send({
        message: "TYPE creado correctamente.",
        data: newType,
        });
    } catch (err) {
        console.error("Error!!! a la hora de crear el TYPE: ->    ", err);
        return res.status(500).send({ message: "Error!!! a la hora de crear el ROL: -> "});
    }
};

module.exports = {createType};