const USER = require('../models/user');
const bcrypt = require('bcrypt');

const HelloURL = (req,res) =>{
    res.status(200).send("La URL /employeeCoordinator funciona todo GOOOOOTI");
}


// Endpoint para Donaciones recibidas ....
const RegisterDonationReceived = async (req,res) =>{
    //Registrar las donaciones recibidas (En la tabla)
}
const ListDonationsReceived = async (req,res) =>{
    //Hacer una lista de las donaciones recibidas
}



// Endpoint para Donaciones entregadas ....
const RegisterDeliverRecived = async (req,res) =>{
    //Registrar las donaciones que damos (En la tabla) 
}
const ListDeliveryReceived = async (req,res) =>{
    //Hacer una lista de las donaciones entregadas
}



// Endpoint para Stock y vencimientos ....
const ViewStock = async (req,res) =>{
    // Generar un reporte del stock de un producto en particular
}
const UpdateStockItem = async (req,res) =>{
    //Actualizar el Stock
}
const CheckExpirations = async (req,res) =>{
    // Generar un reporte de cuanto le falta a los productos para vencer
}
const GenerateStockReport = async (req,res)  =>{
    //Generar un reporte del stock de todos los producto
}




// Endpoint para Gestion de INSTITUCIONES ....
const ViewInstitutionRequests = async (req,res) =>{
    // Ver en una lista las necesidades criticas si es que lo tiene una institucion
}




module.exports = {
    HelloURL, // GET

    RegisterDonationReceived, // POST
    ListDonationsReceived, // GET

    RegisterDeliverRecived, // POST
    ListDeliveryReceived, // GET

    ViewStock, // GET
    UpdateStockItem, // PATCH
    CheckExpirations, // GET
    GenerateStockReport, // GET

    ViewInstitutionRequests, // GET

}