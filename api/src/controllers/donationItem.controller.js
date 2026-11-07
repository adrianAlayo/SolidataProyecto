const DONATIONITEM = require('../models/donationItem');
const DONATION = require('../models/donation');
const ARTICLE = require('../models/article');
const USER = require('../models/user');
const INSTITUTION = require('../models/institution');
const { Op } = require('sequelize');

const isString = require('../utils/isString.util');
const IsDate = require('../utils/isDate.util');

const isInstitutionAccount = (req) => Number(req.user_find?.rol) === 4;
const institutionDonationScope = (req) => isInstitutionAccount(req)
    ? { receiver_institution_id: Number(req.user_find.institution_id ?? req.user_find.id) }
    : {};
const denyInstitutionWrite = (req, res) => isInstitutionAccount(req)
    ? (res.status(403).json({ message: "La cuenta de institución solo puede consultar sus datos." }), true)
    : false;

const itemIncludes = [
    { model: ARTICLE, attributes: ['id', 'name', 'category', 'variant', 'unit'] },
    { model: DONATION, attributes: ['id', 'donation_date', 'status'], include: [
        { model: USER, as: 'donor', attributes: ['first_name', 'last_name'] },
        { model: INSTITUTION, as: 'receiver_institution', attributes: ['name'] }
    ] }
];

const createItem = async (req,res) =>{
    try {
        if (denyInstitutionWrite(req, res)) return;
        const {quantity,expiration_date,note,donation_id,article_id} = req.body;

        if(quantity === undefined || quantity === null || quantity === '' || !Number.isInteger(Number(quantity)) || Number(quantity) <= 0){
            return res.status(400).send({message: "quantity debe ser un entero mayor que cero."});
        }
        if(!IsDate(expiration_date)){
            return res.status(400).send({message: "expiration_date debe tener formato YYYY-MM-DD."});
        }
        if (new Date(expiration_date) < new Date(new Date().toDateString())) {
            return res.status(400).send({ message: "La fecha de vencimiento no puede estar en el pasado." });
        }
        if(!donation_id || !article_id || !Number.isInteger(Number(donation_id)) || !Number.isInteger(Number(article_id)) || Number(donation_id) <= 0 || Number(article_id) <= 0){
            return res.status(400).send({message: "Seleccione una donación y un artículo válidos."});
        }
        if(note !== undefined && !isString(note)){
            return res.status(400).send({message: "note debe ser texto."});
        }

        const existDonation = await DONATION.findByPk(Number(donation_id));
        if(!existDonation){
            return res.status(404).send({message: "El ID de la donacion que introdujo no existe"});
        }
        const existArticle = await ARTICLE.findByPk(Number(article_id));
        if(!existArticle){
            return res.status(404).send({message: "El ID del articulo que introdujo no existe"});
        }

        const duplicateItem = await DONATIONITEM.findOne({
            where:{
                donation_id: Number(donation_id),
                article_id: Number(article_id)
            }
        });
        if(duplicateItem){
            return res.status(409).send({message: "Ya existe ese artículo en la donación seleccionada."})
        }
        
        const newItem = await DONATIONITEM.create({
            quantity: Number(quantity),
            expiration_date,
            note,
            donation_id: Number(donation_id),
            article_id: Number(article_id)
        })

        if(!newItem){
            return res.status(404).send({message: "No se pudo crear el item de la donacion"})
        }

        return res.status(201).json({
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
        let { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }
        id = Number(id);

        const item = await DONATIONITEM.findByPk(id, { include: itemIncludes });

        if(!item){
            return res.status(404).send({message: "No se encontro ninguna dionacion con ese item"})
        }
        if (isInstitutionAccount(req)) {
            const donation = await DONATION.findOne({ where: { id: item.donation_id, ...institutionDonationScope(req) } });
            if (!donation) return res.status(404).json({ message: "El ítem no pertenece a una donación de esta institución." });
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
const getItems = async (req,res) =>{
    try {
        let donationIds;
        if (isInstitutionAccount(req)) {
            const donations = await DONATION.findAll({ where: institutionDonationScope(req), attributes: ['id'] });
            donationIds = donations.map((donation) => donation.id);
        }
        const items = await DONATIONITEM.findAll({
            where: donationIds ? { donation_id: { [Op.in]: donationIds } } : {},
            include: itemIncludes,
            order: [['createdAt', 'DESC']]
        });

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
        
        const existDonation = await DONATION.findOne({ where: { id: donation_id, ...institutionDonationScope(req) } });
        if(!existDonation){
            return res.status(404).send({message: "No existe ese ID de la donacion"})
        }

        const itemByDonation = await DONATIONITEM.findAll({
            where:{
                donation_id: donation_id
            }, include: itemIncludes
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
const updateItem = async (req, res) => {
    try {
        if (denyInstitutionWrite(req, res)) return;
        let { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }
        id = Number(id);

        const item = await DONATIONITEM.findByPk(id);
        if (!item) {
            return res.status(404).send({ message: "No se encontro ningun item con ese ID" });
        }

        const { quantity, expiration_date, note, donation_id, article_id } = req.body;
        const updateFields = {};

        // VALIDAR quantity
        if (quantity !== undefined) {
            if (quantity !== '' && Number.isInteger(Number(quantity)) && Number(quantity) > 0) {
                updateFields.quantity = Number(quantity);
            } else {
                return res.status(400).send({ message: "quantity debe ser un número válido." });
            }
        }

        // VALIDAR expiration_date
        if (expiration_date !== undefined) {
            if (IsDate(expiration_date) && new Date(expiration_date) >= new Date(new Date().toDateString())) {
                updateFields.expiration_date = expiration_date;
            } else {
                return res.status(400).send({ message: "expiration_date debe ser fecha válida YYYY-MM-DD." });
            }
        }

        // VALIDAR note
        if (note !== undefined) {
            if (isString(note)) {
                updateFields.note = note;
            } else {
                return res.status(400).send({ message: "note debe ser un texto válido." });
            }
        }

        // VALIDAR donation_id
        if (donation_id !== undefined) {
            if (Number.isInteger(Number(donation_id)) && Number(donation_id) > 0) {
                updateFields.donation_id = Number(donation_id);
            } else {
                return res.status(400).send({ message: "donation_id debe ser un número válido." });
            }
        }

        // VALIDAR article_id
        if (article_id !== undefined) {
            if (Number.isInteger(Number(article_id)) && Number(article_id) > 0) {
                updateFields.article_id = Number(article_id);
            } else {
                return res.status(400).send({ message: "article_id debe ser un número válido." });
            }
        }

        const finalDonationId = updateFields.donation_id ?? item.donation_id;
        const finalArticleId = updateFields.article_id ?? item.article_id;
        if ((updateFields.donation_id || updateFields.article_id) && !await DONATION.findByPk(finalDonationId)) return res.status(404).send({ message: "La donación no existe." });
        if ((updateFields.donation_id || updateFields.article_id) && !await ARTICLE.findByPk(finalArticleId)) return res.status(404).send({ message: "El artículo no existe." });
        const isDuplicate = await DONATIONITEM.findOne({ where: { donation_id: finalDonationId, article_id: finalArticleId, id: { [Op.ne]: id } } });
        if(isDuplicate){
            return res.status(409).send({message: "Ya existe ese artículo en la donación seleccionada."})
        }

        // Si no enviaron nada
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).send({
                message: "Debe enviar al menos un campo para actualizar."
            });
        }

        await item.update(updateFields);

        return res.status(200).json({
            message: "Item actualizado correctamente.",
            data: item
        });

    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).send({ message: "Error al intentar actualizar el item." });
    }
};
const deleteItem = async (req,res) =>{
  try {
    if (denyInstitutionWrite(req, res)) return;
    let { id } = req.params;

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
  } catch (err) {
    console.error('Error al eliminar ítem:', err.message);
    return res.status(500).json({ message: 'No se pudo eliminar el ítem.' });
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
