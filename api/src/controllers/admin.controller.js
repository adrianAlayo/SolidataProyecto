const { where } = require('sequelize');
const INSTITUTION = require('../models/institution');
const USER = require('../models/user');
const bcrypt = require('bcrypt');


const HelloURL = (req,res) =>{
    res.status(200).send("La URL /admin funciona todo GOOOOOTI");
}



// Endpoint para Gestion de USUARIOS .... 
const RegisterEmployee = async (req,res) =>{
    try{
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

        res.status(201).json({
            user: user_create,
            message: "Registro exitoso"
        });
    }catch(e){
        res.status(500).send({message: "Error!!! a la hora de hacer el Registro: -> " + e})
    }
    
};
const ListUsers = async (req,res) =>{
    try{
        const users = await USER.findAll({
            where:{
                is_active: true,
            },
            attributes:{
                exclude: "password,createdAt,updatedAt"
            }
        })
        if(!users){
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
const DeleteUsers = async (req, res) => {
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
const DisableUser = async (req,res) =>{
    try{
        const {email} = req.body;
        
        if(email === undefined && typeof email === "string"){
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



// Endpoint para Gestion de INSTITUCIONES .... 
const AcceptInstitution = async (req,res) =>{
    try {
        const institution_inActive = await INSTITUTION.findAll({
            where: {
                status: 'Pendiente',
            },
        })
    } catch (e) {
        res.status(500).send({message: "Error!!! a la hora de Aceptar a la Institucion: -> " + e})
    }
}
const ListInstitutions = async(req,res) =>{
    try{
        const institutions = await INSTITUTION.findAll({
            where:{
                status: "Activo",
            },
            attributes:{
                exclude: "password,createdAt,updatedAt"
            }
        })
        if(!institutions){
            res.status(404).send({message: "No hay instituciones Activas por el momento"});
        }

        res.status(201).json({
            message: "Liista de instituciones exitosamente",
            institutions
        });
        
    }catch(e){
        res.status(500).send({message: "Error!!! a la hora de hacer el listado de las instituciones: -> " + e});
    }
}
const DisableInstitution = async (req,res) =>{
    try{
        const {name,email} = req.body;
        
        if(!VerifyCamp(name,email)){
            return res.status(404).send({message: "Todos los campos tienen que ser 'String' y estar Completos"})
        }

        if(!VerificationEmail(email)){
            return res.status(404).send({message: "Tienes que introducir un EMAIL"})
        }
        
        const institution_found = await INSTITUTION.update(
            { status: "Inactivo" }, // ← los cambios
            {
                where: {
                    name: name, 
                    email: email,
                    status: "Activo",
                }
            }
        )

        if(!institution_found){
            return res.status(404).send({message: "La institucion no existe o ya esta 'Inactiva o Pendiente' "})
        }

        res.status(201).json({message: "Se dios de baja (Parcial) exitosamente a la Institucion"})
    }catch(e){
        res.status(500).send({message: "Error!!! a la hora de dar de Baja a la Institucion: -> " + e})
    }
}
const DeleteInstitution = async (req,res)=>{
    try{
        const {id} = req.body;

        // Convertir el ID a número
        id = parseInt(id);

        if (isNaN(id)) {
            return res.status(400).send({ message: "El ID debe ser un número válido" });
        }

        const user_found = await INSTITUTION.destroy({
            where: {
                id: id,
            }
        })

        if(!user_found){
            return res.status(404).send({message: "La Institucion no existe"});
        }
        res.status(200).send({ message: "La Institucion eliminado correctamente" });
    }catch(e){
        res.status(500).send({message: "Error!!! a la hora de eliminar la Institucion: -> "});
    }
}



// Endpoint para Gestion GENERAL ....
const GenerateReports = async (req,res) =>{
    // Hara reportes de stock, entregas y actividad general.
}
const AssignRoles = async (req,res) =>{
    // Hara cambios de rol de usuarios dentro del sistema (por ejemplo, operador a coordinador).
}


// Endpoint para AUDITORIAS Y TRAZABILIDAD ....
const ViewLogs = async (req,res) =>{

}



// Endpoint para Configuracion del Sitema ....
const UpdateSystemInfo = async(req,res) =>{
    
}




//Logica verificacion
function VerifyCamp(name,email){
    // Verifica que ambos campos existan y sean cadenas no vacías
    if (!name || !email) return false;  // si alguno es undefined, null o string vacío

    if (typeof name !== "string" || typeof email !== "string") return false;

    return true;
}
function VerificationEmail(email) {
    if (email.startsWith('.') || email.startsWith('@')) return false;
    const atCount = (email.match(/@/g) || []).length;
    if (atCount !== 1) return false;
    if (email.endsWith('.')) return false;
    const domainPart = email.split('@')[1];
    return domainPart.includes('.');
}

module.exports = {
    HelloURL,

    RegisterEmployee,
    
    AcceptInstitution,
    
    ListInstitutions,
    ListUsers,
    
    DeleteUsers,
    DeleteInstitution,
    
    DisableInstitution,
    DisableUser,
};