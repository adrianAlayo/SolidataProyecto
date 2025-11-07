const USER = require('../models/user');
const INSTITUTION = require('../models/institution');
const bcrypt = require('bcrypt');


const HelloURL = (req,res) =>{
    res.status(200).send("La URL /institution funciona todo GOOOOOTI");
}


// Endpoint para Cuenta y Perfil ....
const EditProfile = async (req,res) =>{
    
}
const UpdateNeeds = async (req,res) =>{

}
const ViewApprovalStatus = async (req,res) =>{

}



// Endpoint para Donaciones ....
const ViewDeliveriesHistory = async (req,res) =>{

}
const ConfirmDonationReception = async (req,res) =>{

}



// Endpoint para Comunicacion y Soporte ....
const SendMessageToBAA = async (req,res) =>{

}


module.exports = {
    HelloURL,  // GET
    
    EditProfile, // POST
    UpdateNeeds, // PATCH
    ViewApprovalStatus, //

    ViewDeliveriesHistory, // GET
    ConfirmDonationReception, // PATCH

    SendMessageToBAA, // POST
};