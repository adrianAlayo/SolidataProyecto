const jwt = require('jsonwebtoken');
const USER = require('../models/user');
const INSTITUTION = require('../models/institution');
const bcrypt = require('bcrypt');

const HelloURL = (req,res) =>{
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
        } else if(userType === "user")  {
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
    try{
        let {first_name_inCharge,last_name_inCharge,email_inCharge,phone_inCharge,password_inCharge,name_inst,email_inst,location_inst,phone_inst,password_inst,type_inst} = req.body;
        
        console.log("1 " + first_name_inCharge)

        const password_hash_inCharge = await bcrypt.hash(password_inCharge, 7);
        const password_hash_inst = await bcrypt.hash(password_inst, 7);

        
        //Crear una Institucion
        const institution_create = await INSTITUTION.create({
            name: name_inst, 
            email: email_inst, 
            password: password_hash_inst, 
            location: location_inst, 
            phone: phone_inst, 
            type_id: type_inst, 
        });
        console.log("1")
        console.log(institution_create);
        // CREAR USUARIO con is_active = Pendiente
        const user_create = await USER.create({
            first_name: first_name_inCharge, //
            last_name: last_name_inCharge, //
            email: email_inCharge, //
            password: password_hash_inCharge, //
            phone: phone_inCharge, //
            is_active: false,
            institution_id: institution_create.id,
            role_id: 4 // rol por defecto para instituciones 
        });

        //*Modificar para luego testear y solo dejar el Message
        res.status(201).json({
            message: "Registro exitoso, pendiente aprobación del admin \n ",
            user_create,
            institution_create,
        });
    }catch(e){
        res.status(500).send({
            message: "Ocurrio un error al intentar guardar los datos en la base de datosssss: ->" + e})
    }
    
}


// Funciones para la logica de creacion de TOKEN
function CreateTokenInsti(user) {
    const payload = {
        userRelation: user.id,
        id: user.Institution.id,
        name: user.Institution.name,
        email: user.Institution.email,
        typeID: user.Institution.type_id,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}
function CreateTokenUser(user) {
    const payload = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        roleName: user.Role ? user.Role.name : null, // nombre del rol del usuario,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

module.exports = { 
    HelloURL,

    Login,
    RegisterInstitution,
};
