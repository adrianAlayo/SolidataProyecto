const USER = require('../models/user');
const bcrypt = require('bcrypt');

const HelloURL = (req,res) =>{
    res.status(200).send("La URL /employeeCoordinator funciona todo GOOOOOTI");
}


// Endpoint para Donaciones recibidas ....
const RegisterDonationReceived = async (req,res) =>{

}
const ListDonationsReceived = async (req,res) =>{

}



// Endpoint para Donaciones entregadas ....
const RegisterDonationDeliver = async (req,res) =>{

}
const ListDonationsDelivered = async (req,res) =>{

}



// Endpoint para Stock y vencimientos ....
const viewStock = async (req,res) =>{

}
const UpdateStockItem = async (req,res) =>{

}
const CheckExpirations = async (req,res) =>{

}



// Endpoint para Gestion de INSTITUCIONES ....
const ViewInstitutionRequests = async (req,res) =>{
    
}



// Endpoint para Agenda y logistica ....
const ViewCalendar = async (req,res) =>{

}
const AddCalendarEvent = async (req,res) =>{

}



// Endpoint para Mapas y zonas ....
const ViewMap = async (req,res) =>{

}



// Endpoint para Reportes ....
const GenerateReportByPeriod = async (req,res) =>{

}


module.exports = {
    HelloURL,

    RegisterDonationReceived,
    ListDonationsReceived,

    RegisterDonationDeliver,
    ListDonationsDelivered,

    viewStock,
    UpdateStockItem,
    CheckExpirations,

    ViewInstitutionRequests,

    ViewCalendar,
    AddCalendarEvent,

    ViewMap,

    GenerateReportByPeriod,
}