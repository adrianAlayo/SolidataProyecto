const USER = require('../models/user');
const bcrypt = require('bcrypt');

const HelloURL = (req,res) =>{
    res.status(200).send("La URL /employeeOperator funciona todo GOOOOOTI");
}

// Puede Crear una donacion (entrada o salida)
const CreateDonation = async(req,res) =>{

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