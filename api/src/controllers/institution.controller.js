    const USER = require('../models/user');
    const INSTITUTION = require('../models/institution');
    const bcrypt = require('bcrypt');

    //Registro
    const HelloURL = (req,res) =>{
        res.status(200).send("Funciona todo BIEN LA URL");
    }
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
            console.log(user_create);
            //CREAR INSTITUCION
            const institution_create = await INSTITUTION.create({
                user_id: user_create.id, // clave foránea
                name: name_inst, //
                email: email_inst, //
                phone: phone_inst, //
                password: password_hash_inst, //
                location: location_inst, //
                type: type_inst, //
            });

            console.log(institution_create)
            //*Modificar para luego testear y solo dejar el Message
            res.status(201).json({
                user: user_create,
                institution: institution_create,
                message: "Registro exitoso, pendiente aprobación del admin"
            });
        }catch(e){
            res.status(500).send({message: "Ocurrio un error al intentar guardar los datos en la base de datos" + e})
        }
        
    }

    module.exports = {
    RegisterInstitution,
    HelloURL,
    };