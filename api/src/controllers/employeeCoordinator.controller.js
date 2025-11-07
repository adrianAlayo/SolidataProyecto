const USER = require('../models/user');
const bcrypt = require('bcrypt');

const HelloURL = (req,res) =>{
    res.status(200).send("La URL /employeeCoordinator funciona todo GOOOOOTI");
}

// Ver la informacion de la donacion del sistema ya sea entrada o salida
const InfoDonation = async (req,res) =>{}

// Solo poder ver la informacion del inventario
const InfoInventory = async (req,res) =>{}

// Ver la necesidad de una Institucion
const InfoNeedInstitution = async (req,res) =>{}

// Ver las necesidades de todas las instituciones en una lista
const InfoListInstitutionNeeds = async (req,res) =>{}

// Ver la informacion de un usuario
const InfoUser = async (req,res) =>{}

// El admin puede Generar un reporte(Ya que esa informacion no se guarda en la base de datos)
// Y si el Coordinador quiere ver un reporte en realidad tendra que generarlo, entoces seria la misma
// Logica que el endpoint del User
const InfoReportDonationEntry = async (req,res) =>{}
const InfoReportDonationExit = async (req,res) =>{}
const InfoReportStock = async (req,res) =>{}

// Solo puede editar la nota o el estado de una donacion
const UpdateDonation = async (req,res) =>{}

module.exports = {
    HelloURL, // GET
    InfoDonation, // GET
    InfoInventory, // GET
    InfoNeedInstitution, // GET
    InfoListInstitutionNeeds, // GET
    InfoUser, // GET
    
    InfoReportDonationEntry, // POST
    InfoReportDonationExit, // POST
    InfoReportStock, // POST

    UpdateDonation, // PATCH
}