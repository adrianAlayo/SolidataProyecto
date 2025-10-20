const USER = require('../models/user');
const bcrypt = require('bcrypt');


const RegisterEmployee = async (req,res) =>{
    const {first_name,last_name,email,phone,password,role_id,} = req.body;

    const password_hash = await bcrypt.hash(password, 7);

    const user_create = await USER.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password_hash,
        phone: phone,
        role_id: role_id,
        is_active: 'Activo',
    });

    //* Luego de testear solo dejar el message
    res.status(201).json({
        user: user_create,
        message: "Registro exitoso"
    });
};

const AcceptInstitution = async (req,res) =>{
    
}

module.exports = {
  RegisterEmployee,
};