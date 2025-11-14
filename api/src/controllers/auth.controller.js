const jwt = require('jsonwebtoken');
const USER = require('../models/user');
const INSTITUTION = require('../models/institution');
const bcrypt = require('bcrypt');

const CreateTokenInsti = require('../utils/createTokenInstitution.util');
const CreateTokenUser = require('../utils/createTokenUser.util');


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
        let {first_name,last_name,email,phone,password,name_inst,location_inst,type_inst} = req.body;

        const existUser = await USER.findOne({ where: { email } });
        if (existUser) {
            return res.status(400).json({
                message: "El email ya está registrado, por favor usa otro."
            });
        }

        const password_hash_inCharge = await bcrypt.hash(password, 7);
        
        //Crear una Institucion
        const institution_create = await INSTITUTION.create({
            name: name_inst, 
            location: location_inst, 
            type_id: type_inst, 
        });
        // CREAR USUARIO con is_active = Pendiente
        const user_create = await USER.create({
            first_name: first_name,
            last_name: last_name, 
            email: email,
            password: password_hash_inCharge, 
            phone: phone, 
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

module.exports = { 
    HelloURL,

    Login,
    RegisterInstitution,
};
