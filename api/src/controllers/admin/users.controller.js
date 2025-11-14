const { where } = require('sequelize');
const bcrypt = require('bcrypt');
const USER = require('../../models/user');
const ROLE = require('../../models/role');

const IsString = require('../../utils/isString.util');
const VerificationPassword = require('../../utils/verificationPassword.util');
const VerificationEmail = require('../../utils/verificationEmail.util');
const VerificationPhone = require ('../../utils/isValidPhone.util');

const getUsers = async (req,res) =>{
    try{
        const users = await USER.findAll({
            where:{
                is_active: true,
            },
            attributes:{
                exclude: "password,createdAt,updatedAt"
            }
        })
        if(!users || users.length === 0){
            res.status(404).send({message: "No hay usuarios activos por el momento"});
        }

        res.status(201).json({
            message: "Liista de usuario exitosamente",
            users
        })
        
    }catch(e){
        res.status(500).send({message: "Error!!! a la hora de hacer el listado de los usuarios: -> " + e})
    }
}
const disableUser = async (req,res) =>{
    try{
        const {email} = req.body;
        
        if(!email || typeof email !== "string"){
            return res.status(404).send({message: "Todos los campos tienen que ser 'String' y estar Completos"})
        }

        if(!VerificationEmail(email)){
            return res.status(404).send({message: "Tienes que introducir un EMAIL"})
        }
        
        const institution_found = await USER.update(
            {is_active: false},
            {
                where: {
                    email,
                    is_active: true,
                }
            }
        )

        if(!institution_found){
            return res.status(404).send({message: "El usuario no existe o esta 'Inactivo o Pendiente' "})
        }

        res.status(201).json({message: "Se dios de baja (Parcial) exitosamente al usuario"})
    }catch(e){
        res.status(500).send({message: "Error!!! a la hora de dar de Baja al usuario: -> " + e})
    }
}
const deleteUsers = async (req, res) => {
    try {
        let { id } = req.body;

        // Convertir el ID a número
        id = parseInt(id);

        if (isNaN(id)) {
            return res.status(400).send({ message: "El ID debe ser un número válido" });
        }

        const user_found = await USER.destroy({
            where: { id: id }
        });

        if (!user_found) {
            return res.status(404).send({ message: "El Usuario no existe" });
        }

        res.status(200).send({ message: "Usuario eliminado correctamente" });

    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Error al eliminar al Usuario -> " + e.message });
    }
};
const createUser = async(req,res) =>{
    try{
        let {first_name,last_name,email,password,phone,role_id} = req.body;

        if(!IsString(first_name) || !IsString(last_name) || !IsString(email) || !IsString(password)){
            return res.status(404).send({message: "Todos los campos son obligatorio y tiene que tener un texto valido."})
        }
        if(!VerificationPhone(phone)){
            return res.status(404).send({message: "Introduzca un numero valido."})
        }
        if(!VerificationEmail(email)){
            return res.status(404).send({message: "Tiene que introducir un email valido."});
        }
        if(!VerificationPassword(password)){
            return res.status(404).send({message: "NO cumple las condicoines para que sea una contraseña, tiene que tener al menos 1 mayuscula,minuscula y un numero, ademas de tener 8 mas caracteres."})
        }
        const password_hash = await bcrypt.hash(password, 7);
        
        const existRole = await ROLE.findOne({
            where: {
                id: role_id
            }
        });

        if(!existRole){
            return res.status(404).send({message: "El nombe del rol que introdujo no existe"});
        }
        
        const user_create = await USER.create({
            first_name: first_name, 
            last_name: last_name, 
            email: email, 
            password: password_hash, 
            phone: phone, 
            is_active: true,
            role_id: role_id 
        });

        //*Modificar para luego testear y solo dejar el Message
        res.status(201).json({
            message: "Registro exitoso, pendiente aprobación del admin \n ",
            user_create,
        });
    }catch(e){
        res.status(500).send({
            message: "Ocurrio un error al intentar guardar los datos en la base de datosssss: ->" + e})
    }
    
}
module.exports = {
    getUsers,
    disableUser,
    deleteUsers,
    createUser,
}