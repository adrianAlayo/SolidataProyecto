const DONATIONITEM = require('../../models/donationItem');
const DONATION = require('../../models/donation');
const ARTICLE = require('../../models/article');

const { where } = require('sequelize');
const isString = require('../../utils/isString.util');
const IsDate = require('../../utils/isDate.util');

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
    
}
const updateItem = async (req,res) =>{
    
}
const deleteItem = async (req,res) =>{
    
}