const USER = require('../models/user');
const bcrypt = require('bcrypt');

const HelloURL = (req,res) =>{
    res.status(200).send("La URL /employeeOperator funciona todo GOOOOOTI");
}

// Endpoint para Donaciones .... 
const ConfirmDelivery = async (req,res) =>{
    //Cambiar el estado de la donacion que hace BAA
}
const ConfirmDonation = async (req,res) =>{
    //Cambiar el estado de la donacion que recibe BAA
}
const ListDonationsReceived = async (req,res) =>{
    //Hacer una lista de las donaciones recibidas
}
const ListDeliveryReceived = async (req,res) =>{
    //Hacer una lista de las donaciones entregadas
}

// Endpoint para Stock ....
const AddStockItem = async (req,res) =>{
    //Añadir un Stock a la tabla
}



// Endpoint para Agenda ....
const ViewCalendar = async (req,res) =>{
    //Generar una tabla con assigment (tabla que dice damos donaciones) y donations
}
const AddCalendarEvent = async (req,res) =>{
    //añadir un evento al calendario ya sea cuando se reciba o se haga una donacion
}



module.exports = {
    HelloURL, // GET
    
    ConfirmDelivery, // PATCH
    ConfirmDonation, // PATCH
    ListDonationsReceived, // GET
    ListDeliveryReceived, // GET
    
    AddStockItem, // POST

    ViewCalendar, // GET
    AddCalendarEvent, // POST
}