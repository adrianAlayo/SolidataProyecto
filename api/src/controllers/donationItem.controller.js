const DONATIONITEM = require('../models/donationItem');
const ARTICLE = require('../models/article');

const { where } = require('sequelize');
const isString = require('../utils/isString.util');
const IsDate = require('../utils/isDate.util');

const createItem = async (req,res) =>{
    try {
        const {quantity,expiration_date,note,donation_id,article_id} = req.body;

        if(!quantity && !expiration_date && !note && !donation_id && !article_id)

        if(!isString(expiration_date) && !isString(note)){
            return res.status(404).send({message: "Los campos 'expiration_date' y 'note' tienen que ser validos"});
        }
        if(!IsDate(expiration_date)){
            return res.status(400).send({message: "donation_date debe tener formato YYYY-MM-DD."});
        }
        if(isNaN(donation_id) && isNaN(article_id)){
            return res.status(404).send({message: "los campos 'donation_Id' y 'article_id' tiene que ser un numero"});
        }

        const existArticle = await ARTICLE.findByPk(article_id);
        if(!existArticle){
            return res.status(404).send({message: "El ID del articulo que introdujo no existe"});
        }

        const duplicateItem = await DONATIONITEM.findByPk(donation_id,{
            where:{
                article_id:article_id
            }
        });
        if(duplicateItem){
            return res.status(404).send({message: "Ya existe una item que proviene de la misma donacion y tiene el mismo articulo, posiblemnete ya existe lo que queres ingresar"})
        }
        
        const newItem = await DONATIONITEM.create({
            quantity,
            expiration_date,
            note,
            donation_id,
            article_id
        })

        if(!newItem){
            return res.status(404).send({message: "No se pudo crear el item de la donacion"})
        }

        return res.status(200).json({
            message: "Se creo el item de la donacion",
            data:newItem
        })
    } catch (err) {
        console.error("Error al crear el nuevo item:", err.message);
        res.status(500).send({ message: "Error intentar crear un nuevo item." });
    }
}
const getItem = async (req,res) =>{
    try {
        const { id } = req.params.id;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }
        id = Number(id);

        const item = await DONATIONITEM.findByPk(id);

        if(!item){
            return res.status(404).send({message: "No se encontro ninguna dionacion con ese item"})
        }

        return res.status(200).json({
            message:"Se encontro una donacion Item",
            data: item
        })
    } catch (err) {
        console.error("Error al encontrar el item de la donacion:", err.message);
        res.status(500).send({ message: "Error al intentar buscar una donacion que tenga ese item como ID." });
    }
}
const updateItem = async (req,res) =>{
    try {
        const {quantity,expiration_date,note,donation_id,article_id} = req.body;

        const { id } = req.params.id;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }
        id = Number(id);

        const updateFields = {};

        const item = await DONATIONITEM.findByPk(id)
        if(!item){
            return res.status(404).send({message: "No se encontro ningun item con ese ID"});
        }

        if(quantity !== undefined){
            if(!isNaN(quantity)){
                updateFields.quantity = quantity;
            }
            return res.status(404).send({message: "El campo Quantiti tiene que tener un valor valido 'number' "});
        }
        if(expiration_date !== undefined){
            if(IsDate(expiration_date)){
                updateFields.expiration_date = expiration_date;
            }
            return res.status(404).send({message: "donation_date debe ser fecha válida YYYY-MM-DD."});
        }
        if(note !== undefined){
            if(isString(note)){
                updateFields.note = note;
            }
            return res.status(404).send({message: "note tiene que tener un valor valido."})
        }
        if(donation_id !== undefined){
            if(!isNaN(donation_id)){
                updateFields.donation_id = donation_id;
            }
            return res.status(404).send({message: "El campo donation_id tiene que tener un valor valido 'number' "});
        }
        if(article_id !== undefined){
            if(!isNaN(article_id)){
                updateFields.article_id = article_id;
            }
            return res.status(404).send({message: "El campo article_id tiene que tener un valor valido 'number' "});
        }

        // Si no enviaron nada
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).send({
                message: "Debe enviar al menos un campo para actualizar."
            });
        }
        await item.update(updateFields);

        return res.status(200).json({
            message: "Item actualizada correctamente.",
            data: item
        });

    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).send({ message: "Error al intentar actualizar el item." });
    }
}
const deleteItem = async (req,res) =>{
    const { id } = req.params.id;

    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: "ID inválido." });
    }
    id = Number(id);

    const item = await DONATIONITEM.findByPk(id);

    if(!item){
        return res.status(404).send({message: "No se encontro ningun item con ese ID"})
    }

    await item.destroy();

    return res.status(200).json({
        message: "Se elimino el Item correctamente"
    })
}
const getItems = async (_req,res) =>{
    try {
        const items = await DONATIONITEM.findAll();

        if(!items){
            return res.status(404).send({message: "No se entrarion items"});
        }

        return res.status(200).json({
            message:"Se encontraron items",
            data: items
        })    
    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).send({ message: "Error al intentar traer una lista de los items." });    
    }
    
}
const getItemsByDonation = async (req,res) =>{
    try {
        let { donation_id } = req.params;

        if (!donation_id || isNaN(Number(donation_id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        donation_id = Number(donation_id);

        const itemByDonation = await DONATIONITEM.findAll({
            where:{
                donation_id: donation_id
            }
        })

        if(!itemByDonation){
            return res.status(404).send({message: "No se encotraron items que tengan ese ID como donation"})
        }

        return res.status(200).json({
            message: "Se entraron item que tengan ese id como donacion",
            data: itemByDonation
        });
    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).send({ message: "Error intentar buscar items que coincidan con un ID de donacion." });
    }
}

module.exports = {
    createItem, // body
    getItem, // params
    updateItem, // params y body
    deleteItem, // params
    getItems, //
    getItemsByDonation, //params
}