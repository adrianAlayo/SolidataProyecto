const { where, Op } = require('sequelize');
const bcrypt = require('bcrypt');
const USER = require('../models/user');
const ROLE = require('../models/role');
const INSTITUTION = require('../models/institution');

const IsString = require('../utils/isString.util');
const VerificationPassword = require('../utils/verificationPassword.util');
const VerificationEmail = require('../utils/verificationEmail.util');
const VerificationPhone = require ('../utils/isValidPhone.util');


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

        res.status(201).json({
            message: "Registro exitoso, pendiente aprobación del admin \n ",
            data:user_create,
        });
    }catch(err){
        console.error("Error al crear al usario:", err.message);
        return res.status(500).json({ message: "Error al intentar crear un usuario." });
    }
    
}
const getUser = async (req,res) =>{
    try {
        let { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        id = Number(id);

        const user = await USER.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "No se encontro al usuario." });
        }

        return res.status(200).json({
            message: "Usuario encontrado.",
            data: user
        });

    } catch (err) {
        console.error("Error al obtener la info del usuario:", err.message);
        return res.status(500).json({message: "Error al intentar obtener la informacion del usuario."});
    }
}
const getUsers = async (req,res) =>{
    try {
        const user = await USER.findAll({
            attributes: { exclude: ['password'] },
            include: [{ model: INSTITUTION, attributes: ['id', 'name', 'institutionType'] }]
        });

        if (!user) {
            return res.status(404).json({ message: "No se encontraron usuarios." });
        }

        return res.status(200).json({
            message: "Usuario encontrado.",
            data: user
        });

    } catch (err) {
        console.error("Error al obtener la info del usuario:", err.message);
        return res.status(500).json({message: "Error al intentar obtener la informacion del usuario."});
    }
}
const getUsersActive = async (_req,res) =>{
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
            data:users
        })
        
    }catch(e){
        console.error("Error al obtener la lista de los usuarios Activos:", err);
        return res.status(500).json({message: "Error al intentar obtener la lista de los usuarios Activos."});    
    }
}
const getUsersInactive = async (_req,res) =>{
    try{
        const users = await USER.findAll({
            where:{
                is_active: false,
            },
            attributes:{
                exclude: "password,createdAt,updatedAt"
            }
        })
        if(!users || users.length === 0){
            res.status(404).send({message: "No hay usuarios inactivos por el momento"});
        }

        res.status(201).json({
            message: "Liista de usuario exitosamente",
            data:users
        })
        
    }catch(e){
        console.error("Error al obtener la lista de los usuarios Inactivos:", err);
        return res.status(500).json({message: "Error al intentar obtener la lista de los usuarios Inactivos."});    
    }
}
const disableUser = async (req,res) =>{
    try{
        let { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        id = Number(id);

        const existUser = await USER.findOne({
            where:{
                id:id
            }
        })
        if(!existUser){
            return res.status(404).send({message: "El ID del usuario que introdujo no existe"})
        }

        await existUser.update({is_active: false});
        
        if(existUser.role_id === 4 && existUser.institution_id){
            const institution_found = await INSTITUTION.update(
                {status: "Inactive"},
                {
                    where: {
                        id: existUser.institution_id,
                        [Op.or]: [{status:"Active"},{status:"Pending"}],
                    }
                }
            )

            if(!institution_found){
                return res.status(404).send({message: "La institucion no existe o esta 'Inactivo o Pendiente' "})
            }
        }   


        res.status(201).json({message: "Se dios de baja (Parcial) exitosamente al usuario"})
    }catch(err){
        console.error("Error al desactivar al usuario:", err.message);
        return res.status(500).json({message: "Error al intentar desactivar al usuario."});
    }
}
const deleteUsers = async (req, res) => {
    try {
        let { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        id = Number(id);

        const user = await USER.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "El usuario no existe." });
        }

        await user.destroy();

        res.status(200).send({ message: "Usuario eliminado correctamente" });

    } catch (err) {
        console.error("Error al eliminar el usuario:", err.message);
        return res.status(500).json({ message: "Error al intentar eliminar al usario." });
    }
};
const updateUser = async (req, res) => {
    try {
        let { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        id = Number(id);

        const user = await USER.findByPk(id);
        if (!user) {
            return res.status(404).send({ message: "El usuario no existe." });
        }

        const { first_name, last_name, email, password, phone } = req.body;

        const updateFields = {};

        if (first_name !== undefined) {
            if (IsString(first_name)) {
                updateFields.first_name = first_name;
            } else {
                return res.status(400).send({ message: "first_name debe ser texto válido." });
            }
        }

        if (last_name !== undefined) {
            if (IsString(last_name)) {
                updateFields.last_name = last_name;
            } else {
                return res.status(400).send({ message: "last_name debe ser texto válido." });
            }
        }

        if (email !== undefined) {
            if (IsString(email) && VerificationEmail(email)) {
                const existEmail = await USER.findOne({
                    where: { email }
                });

                if (existEmail && existEmail.id !== id) {
                    return res.status(400).send({
                        message: "El email ya está siendo usado por otro usuario."
                    });
                }

                updateFields.email = email;
            } else {
                return res.status(400).send({ message: "email inválido." });
            }
        }

        if (password !== undefined) {
            if (IsString(password) && VerificationPassword(password)) {
                updateFields.password = password;
            } else {
                return res.status(400).send({ message: "password inválido." });
            }
        }

        if (phone !== undefined) {
            if (IsString(phone) && VerificationPhone(phone)) {
                updateFields.phone = phone;
            } else {
                return res.status(400).send({ message: "phone inválido." });
            }
        }

        // Si no enviaron campos
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).send({
                message: "Debe enviar al menos un campo para actualizar."
            });
        }

        await user.update(updateFields);

        return res.status(200).json({
            message: "Usuario actualizado correctamente.",
            data: user
        });

    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).send({ message: "Error al actualizar el usuario." });
    }
};
const AcceptUser = async (req, res) => {
    try {
       let { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: "ID inválido." });
        }

        id = Number(id);

        const existUser = await USER.findOne({
            where:{
                id:id
            }
        })
        if(!existUser){
            return res.status(404).send({message: "El ID del usuario que introdujo no existe"})
        }

        await existUser.update({is_active: true});

        if(existUser.role_id === 4 && existUser.institution_id){
            const institution_found = await INSTITUTION.update(
                { status: "Active" }, // el cambio
                {
                    where: {
                        id:existUser.institution_id,
                    }
                }
            )

            if (!institution_found) {
                return res.status(404).send({message: "La institución no existe o ya está activa"});
            }
        }
        
        res.status(200).json({message: "El Usuario fue ACEPTADO correctamente",});
    } catch (err) {
        console.error("Error: ", err.message);
        return res.status(500).json({ message: "Error al intentar aceptar a al Uuario." });
    }
};



const getPasswordResetRequests = async (req, res) => {
    if (Number(req.user_find?.rol) !== 1) {
        return res.status(403).json({ message: 'Solo el administrador puede ver estas solicitudes.' });
    }
    try {
        const requests = await USER.findAll({
            where: { password_reset_requested: true },
            attributes: ['id', 'first_name', 'last_name', 'email', 'updatedAt', 'password_reset_approved'],
            include: [{ model: ROLE, attributes: ['name'] }],
            order: [['updatedAt', 'ASC']]
        });
        return res.status(200).json({ data: requests });
    } catch (error) {
        console.error('Error al listar solicitudes de cambio:', error.message);
        return res.status(500).json({ message: 'No se pudieron cargar las solicitudes.' });
    }
};

const approvePasswordReset = async (req, res) => {
    if (Number(req.user_find?.rol) !== 1) {
        return res.status(403).json({ message: 'Solo el administrador puede habilitar el cambio.' });
    }
    try {
        const user = await USER.findByPk(Number(req.params.id));
        if (!user || !user.password_reset_requested) {
            return res.status(404).json({ message: 'La solicitud ya no está pendiente.' });
        }
        await user.update({ password_reset_approved: true });
        return res.status(200).json({ message: 'Cambio de contraseña habilitado.' });
    } catch (error) {
        console.error('Error al habilitar cambio de contraseña:', error.message);
        return res.status(500).json({ message: 'No se pudo habilitar el cambio.' });
    }
};

module.exports = {
    AcceptUser,
    getUsersActive, //
    getUsersInactive, //
    getUser, // params
    getUsers,
    disableUser, // body
    deleteUsers, // params
    createUser, //body
    updateUser,
    getPasswordResetRequests,
    approvePasswordReset,
}
