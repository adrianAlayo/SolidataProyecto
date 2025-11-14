const TYPE = require("../models/type");

const VerificationPassword = require('../utils/verificationPassword.util');
const VerificationEmail = require('../utils/verificationEmail.util');
const isValidPhone = require('../utils/isValidPhone.util');


async function ValidateRegistration (req, res, next) {  
    let {first_name,last_name,email,phone,password,name_inst,location_inst,type_inst} = req.body;

    let requiredFields = [first_name,last_name,email,phone,password,name_inst,location_inst,type_inst];

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
    const exist_TypeInst = await TYPE.findOne({
        where:{
            name: type_inst,
        }
    })
    console.log(exist_TypeInst);
    if(!exist_TypeInst){
        return res.status(404).json({ message: "Tiene que selecionar una tipo valido." });
    }
    type_inst = exist_TypeInst.id;
    
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
    };
    next();
}

module.exports = ValidateRegistration;