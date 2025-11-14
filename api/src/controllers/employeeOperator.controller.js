const DONATION = require('../models/donation');
const bcrypt = require('bcrypt');

const HelloURL = (req,res) =>{
    res.status(200).send("La URL /employeeOperator funciona todo GOOOOOTI");
}


const CreateDonation = async (req, res) => {
    try {
        const {receiver_institution_id, donorType, donor_id, note, donation_date} = req.body;

        const newDonation = await DONATION.create({
            receiver_institution_id,
            donorType,
            donor_id,
            note,
            donation_date,
            responsable_user_id: req.user_find.id
        });

        res.status(201).json({
            message: "Donación registrada correctamente.",
            data: newDonation
        });

    } catch (err) {
        res.status(500).json({
            message: "Error al crear la donación.",
            error: err.message
        });
    }
}

// Puede actualizar el estado de una donacion solo si esta en estado (pendiente)
const UpdateDonation = async(req,res) =>{

}

// Solo puede ver la informacion de la donacion que sean de tipo (entrada)
const InfoDonation = async(req,res) =>{

}

// Ver los articulos que componen a una donacino
const InfoArticleDonation = async(req,res) =>{

}

// Ver en una lista todos los articulos que hay
const ListArticle = async(req,res) =>{

}
// Ver en una lista todos los 'donor' que hay
const ListDonor = async(req,res) =>{

}

// Crear una carga del inventario 
const CreateInventory = async(req,res) =>{

}


module.exports = {
    HelloURL, // GET
    
    CreateDonation, // POST
    CreateInventory, // POST

    UpdateDonation, // PATCH

    InfoDonation, // GET
    InfoArticleDonation, // GET
    ListArticle, // GET
    ListDonor, // GET
    
}