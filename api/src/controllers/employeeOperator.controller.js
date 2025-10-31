const USER = require('../models/user');
const bcrypt = require('bcrypt');

const HelloURL = (req,res) =>{
    res.status(200).send("La URL /employeeOperator funciona todo GOOOOOTI");
}

// Endpoint para Donaciones ....
const CreateDonationEntry = async (req,res) =>{

}
const ConfirmDonationDelivery = async (req,res) =>{

}



// Endpoint para Stock ....
const AddStockItem = async (req,res) =>{

}
const EditStockItem = async (req,res) =>{

}



// Endpoint para Agenda ....
const MarkDeliveryDone = async (req,res) =>{

}



// Endpoint para Consultas ....
const ViewInstitutionProfile = async (req,res) =>{

}



// Endpoint para Reportes Rapidos ....
const QuickStats = async (req,res) =>{

}


module.exports = {
    HelloURL,
    
    CreateDonationEntry,
    ConfirmDonationDelivery,

    AddStockItem,
    EditStockItem,

    MarkDeliveryDone,

    ViewInstitutionProfile,

    QuickStats,
}