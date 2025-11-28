const TYPE = require("../models/type");

const VerificationPassword = require('../utils/verificationPassword.util');
const VerificationEmail = require('../utils/verificationEmail.util');
const isValidPhone = require('../utils/isValidPhone.util');


async function ValidateRegistrationInstitution (req, res, next) {  
    let {first_name,last_name,email,phone,password,name_inst,location_inst,type_inst,type} = req.body;

    let requiredFields = [first_name,last_name,email,phone,password,name_inst,location_inst,type_inst,type];

    //Verificacion de campos completos
    if( requiredFields.some(field => field == null)){
        res.status(400).json({ message: "Tienes que tener todos los campos completos" });
    }

    //Verificar que la contraseña tenga May,Min,Num y mas de 8 caracteres
    if (!VerificationPassword(password)) {
        return res.status(400).json({ message: "Contraseña/s inválida/s" });
    }

    //Verificar que sea un email
    if (!VerificationEmail(email)) {
        return res.status(400).json({ message: "Correo/s electrónico/s inválido/s" });
    }

    //Verificar que sea un numero de telefono
    if (!isValidPhone(phone)) {
        return res.status(400).json({ message: "Número/s de teléfono/s inválido/s" });
    }

    //Verificar que exista el Tipo de Institution
    const exist_Type = await TYPE.findOne({
        where:{
            name: type,
        }
    })
    if(!exist_Type){
        return res.status(404).json({ message: "Tiene que selecionar una tipo valido." });
    }

    if(type_inst !== "Both" && type_inst !== "Recipient" && type_inst !== "Donor"){
        return res.status(404).send({message: "Tine que introducir un valor valido 'Both', 'Recipient' o 'Donor'. "})
    }
    
    // Reescribimos req.body con todos los datos validados y actualizados
     req.body = {
        first_name,
        last_name,
        email,
        phone,
        password,
        name_inst,
        location_inst,
        type_inst,
        type,
    };
    next();
}

module.exports = ValidateRegistrationInstitution;