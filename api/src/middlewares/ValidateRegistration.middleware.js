const TYPE = require("../models/type");

async function ValidateRegistration (req, res, next) {  
    let {first_name_inCharge,last_name_inCharge,email_inCharge,phone_inCharge,password_inCharge,name_inst,email_inst,location_inst,phone_inst,password_inst,type_inst} = req.body;

    let requiredFields = [first_name_inCharge,last_name_inCharge,email_inCharge,phone_inCharge,password_inCharge,name_inst,email_inst,location_inst,phone_inst,password_inst,type_inst];

    //Verificacion de campos completos
    if( requiredFields.some(field => field == null)){
        res.status(400).json({ message: "Tienes que tener todos los campos completos" });
    }

    //Verificar que la contraseña tenga May,Min,Num y mas de 8 caracteres
    if (!VerificationPass(password_inCharge) || !VerificationPass(password_inst)) {
        return res.status(400).json({ message: "Contraseña/s inválida/s" });
    }

    //Verificar que sea un email
    if (!VerificationEmail(email_inCharge) || !VerificationEmail(email_inst)) {
        return res.status(400).json({ message: "Correo/s electrónico/s inválido/s" });
    }

    //Verificar que sea un numero de telefono
    if (!isValidPhone(phone_inst) || !isValidPhone(phone_inCharge)) {
        return res.status(400).json({ message: "Número/s de teléfono/s inválido/s" });
    }

    //Verificar que exista el Tipo de Institution
    const exist_TypeInst = await TYPE.findOne({
        where:{
            name: type_inst,
        }
    })

    if(!exist_TypeInst){
        return res.status(400).json({ message: "Tiene que selecionar una tipo valido: 'Comedor', 'Merendero', 'Hogar de ancianos y niños' o 'Orfanato' " });
    }
    type_inst = exist_TypeInst.id;
    
    // Reescribimos req.body con todos los datos validados y actualizados
     req.body = {
        first_name_inCharge,
        last_name_inCharge,
        email_inCharge,
        phone_inCharge,
        password_inCharge,
        name_inst,
        email_inst,
        location_inst,
        phone_inst,
        password_inst,
        type_inst,
    };
    
    // FUNCIONES
    function VerificationPass(pass) {
        let hasUppercase = false, hasLowercase = false, hasNumber = false;
        for (let c of pass) {
            if (c >= "A" && c <= "Z") hasUppercase = true;
            else if (c >= "a" && c <= "z") hasLowercase = true;
            else if (c >= "0" && c <= "9") hasNumber = true;
        }
        return hasUppercase && hasLowercase && hasNumber && pass.length >= 8;
    }
    function VerificationEmail(email) {
        if (email.startsWith('.') || email.startsWith('@')) return false;
        const atCount = (email.match(/@/g) || []).length;
        if (atCount !== 1) return false;
        if (email.endsWith('.')) return false;
        const domainPart = email.split('@')[1];
        return domainPart.includes('.');
    }
    function isValidPhone(phone) {
        const phoneStr = String(phone);
        return /^\d{10,11}$/.test(phoneStr);
    }
    console.log("paso el validate")
    // seguimos al controller
    next();
}

module.exports = ValidateRegistration;