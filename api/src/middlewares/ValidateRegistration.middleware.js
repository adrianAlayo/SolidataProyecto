function ValidateRegistration(req, res, next) {  
    const {first_name_inCharge,last_name_inCharge,email_inCharge,phone_inCharge,password,name_inst,email_inst,location_inst,phone_inst,type_inst} = req.body;

    const requiredFields = [
    first_name_inCharge,
    last_name_inCharge,
    email_inCharge,
    phone_inCharge,
    password,
    //  Info Institution
    name_inst,
    email_inst,
    location_inst,
    phone_inst,
    type_inst
    ];

    //Verificacion de campos completos
    if( requiredFields.some(field => field == null)){
        res.status(400).json({ message: "Tienes que tener todos los campos completos" });
    }

    //Verificar que la contraseña tenga May,Min,Num y mas de 8 caracteres
    if (!VerificationPass(password)) {
        return res.status(400).json({ message: "Contraseña inválida" });
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
    if(type_inst !== "Comedor" || type_inst !== "Merendero" || type_inst !== "Hogar de ancianos y niños"){
        return res.status(400).json({ message: "Tiene que selecionar una tipo valido: 'Comedor', 'Merendero' o 'Hogar de ancianos y niños' " });
    }
    
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

    // seguimos al controller
    next();
}

module.exports = ValidateRegistration;