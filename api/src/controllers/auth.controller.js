const jwt = require('jsonwebtoken');
const { fn, col, where } = require('sequelize');
const USER = require('../models/user');
const INSTITUTION = require('../models/institution');
const bcrypt = require('bcrypt');

const CreateTokenInsti = require('../utils/createTokenInstitution.util');
const CreateTokenUser = require('../utils/createTokenUser.util');
const isString = require("../utils/isString.util");
const verificationPassword = require("../utils/verificationPassword.util");
const VerificationEmail = require('../utils/verificationEmail.util');
const geocodeInstitution = require('../utils/geocodeInstitution.util');

const HelloURL = (_req,res) =>{
    res.status(200).send("La URL /auth funciona todo GOOOOOTI");
}



// Endpoints de login .... POST
const Login = async (req, res) => {
    try {
        const {userInfo,userType} = req.userData
        
        let token;
        // Determinar rol seguro
        if (userType === "Institution") {
            token = CreateTokenInsti(userInfo);
        } else if(userType === "User")  {
            token = CreateTokenUser(userInfo);
        }
        else {
            return res.status(700).send({message: "Ocurrio un ERROR inesperado No sabe mos que ocurrio"})
        }

        res.status(200).json({
            message: "Login exitoso",
            token,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error!!! a la hora de Autenticar: -> " + e});
    }
};
const RegisterInstitution = async(req,res) =>{
    try
    {
        let {first_name,last_name,email,phone,password,name_inst,location_inst,type_inst,type} = req.body;

        const existUser = await USER.findOne({ where: { email } });
        if (existUser) {
            return res.status(400).json({message: "El email ya está registrado, por favor usa otro."});
        }

        const password_hash_inCharge = await bcrypt.hash(password, 7);
        const coordinates = await geocodeInstitution(name_inst, location_inst);
        
        const institution_create = await INSTITUTION.create({
            name: name_inst, 
            location: location_inst,
            latitude: coordinates?.latitude ?? null,
            longitude: coordinates?.longitude ?? null,
            location_accuracy: coordinates?.accuracy ?? null,
            location_checked_at: new Date(),
            institutionType: type_inst,
            type_id: type,
        });
        const user_create = await USER.create({
            first_name: first_name, 
            last_name: last_name, 
            email: email,
            password: password_hash_inCharge, 
            phone: phone,  
            institution_id: institution_create.id,
            role_id: 4 // rol por defecto para instituciones 
        });

        res.status(201).json({
            message: "Registro exitoso, ya esta activo para su uso \n ",
            user_create,
            institution_create,
        });
    }catch(err){
        console.error("Error:", err.message);
        return res.status(500).json({message: "Error al intentar crear una institucion."});
    }
}
const RecoverPassword = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body || {};
        if (!isString(email) || !VerificationEmail(email)) {
            return res.status(400).json({ message: "Ingresá un email válido." });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const user = await USER.findOne({
            where: where(fn('LOWER', col('email')), normalizedEmail)
        });

        // Primer paso: registrar la solicitud o informar si ya fue habilitada.
        if (password === undefined && confirmPassword === undefined) {
            if (!user) {
                return res.status(200).json({
                    status: 'PENDING',
                    message: 'Si el email está registrado, la solicitud quedó enviada al administrador.'
                });
            }
            if (user.password_reset_approved) {
                return res.status(200).json({
                    status: 'APPROVED',
                    message: 'El administrador habilitó el cambio. Ya podés elegir una contraseña nueva.'
                });
            }
            if (!user.password_reset_requested) {
                await user.update({ password_reset_requested: true, password_reset_approved: false });
            }
            return res.status(200).json({
                status: 'PENDING',
                message: 'La solicitud quedó enviada al administrador. Volvé a ingresar tu email cuando la habilite.'
            });
        }

        if (!user || !user.password_reset_requested || !user.password_reset_approved) {
            return res.status(403).json({
                message: 'El administrador todavía no habilitó el cambio para este email.'
            });
        }
        if (!VerificationPassword(password) || !VerificationPassword(confirmPassword)) {
            return res.status(400).json({
                message: 'La contraseña debe tener al menos 8 caracteres, mayúscula, minúscula y número.'
            });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Las contraseñas no coinciden.' });
        }

        const passwordHash = await bcrypt.hash(password, 7);
        await user.update({
            password: passwordHash,
            password_reset_requested: false,
            password_reset_approved: false
        });

        return res.status(200).json({ status: 'COMPLETED', message: 'Se actualizó la contraseña correctamente.' });
    } catch (err) {
        console.error('Error al recuperar la contraseña:', err.message);
        return res.status(500).json({ message: 'Error al intentar recuperar la contraseña.' });
    }
};


module.exports = { 
    HelloURL,

    RecoverPassword,
    Login,
    RegisterInstitution,
};
