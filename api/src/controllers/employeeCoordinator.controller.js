const USER = require('../models/user');
const INSTITUCION = require('../models/institution');
const bcrypt = require('bcrypt');

const HelloURL = (req,res) =>{
    res.status(200).send("La URL /employeeCoordinator funciona todo GOOOOOTI");
}


// Ver la necesidad de una Institucion
const getInstitutionNeed = async (req,res) =>{
    try {
        const id = Number(req.params.id);

    } catch (err) {
        return res.status(500).send({message: "Ocurrio un error !!! interno"})
    }

}

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
    getInstitutionNeed, // GET
    InfoListInstitutionNeeds, // GET
    InfoUser, // GET
    
    InfoReportDonationEntry, // POST
    InfoReportDonationExit, // POST
    InfoReportStock, // POST

    UpdateDonation, // PATCH
}