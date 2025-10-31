const USER = require('../models/user');
const INSTITUTION = require('../models/institution');
const bcrypt = require('bcrypt');


const HelloURL = (req,res) =>{
    res.status(200).send("La URL /institution funciona todo GOOOOOTI");
}


// Endpoint para Cuenta y Perfil ....
const RegisterInstitution = async(req,res) =>{
    try{
        const {first_name_inCharge,last_name_inCharge,email_inCharge,phone_inCharge,password_inCharge,name_inst,email_inst,location_inst,phone_inst,password_inst,type_inst} = req.body;

        const password_hash_inCharge = await bcrypt.hash(password_inCharge, 7);
        const password_hash_inst = await bcrypt.hash(password_inst, 7);

        // CREAR USUARIO con is_active = Pendiente
        const user_create = await USER.create({
            first_name: first_name_inCharge, //
            last_name: last_name_inCharge, //
            email: email_inCharge, //
            password: password_hash_inCharge, //
            phone: phone_inCharge, //
            role_id: 3 // rol por defecto para instituciones 
        });
        //CREAR INSTITUCION
        const institution_create = await INSTITUTION.create({
            contact_user_id: user_create.id, // clave foránea
            name: name_inst, //
            email: email_inst, //
            phone: phone_inst, //
            password: password_hash_inst, //
            location: location_inst, //
            type: type_inst, //
        });

        //*Modificar para luego testear y solo dejar el Message
        res.status(201).json({
            message: "Registro exitoso, pendiente aprobación del admin \n "
        });
    }catch(e){
        res.status(500).send({
            message: "Ocurrio un error al intentar guardar los datos en la base de datos" + e})
    }
    
}

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
    
    RegisterInstitution, // POST
    EditProfile, // POST
    UpdateNeeds, // PATCH
    ViewApprovalStatus, //

    ViewDeliveriesHistory, // GET
    ConfirmDonationReception, // PATCH

    SendMessageToBAA, // POST
};