const USER = require("../models/user");
const INSTITUTION = require("../models/institution");
const ROLE = require("../models/role");
const bcrypt = require("bcrypt");

async function ValidateLogin(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        // Buscar usuario (personal BAA o admin)
        const user_search = await USER.findOne({
            where: { email },
            include: [
                { model: ROLE },
                { model: INSTITUTION }, 
            ],
        });
        
        if(!user_search){
            return res.status(404).res({message: "No se enconttro el usuario"})
        }
        if(user_search.institution_id){
            const comparePassword = await bcrypt.compare(password, user_search.password);
            if (!comparePassword) {
                return res.status(404).json({ message: "Contraseña incorrecta" });
            }
            req.userData = {
                userInfo: user_search,
                userType: "Institution",
            };   
        }
        else{
            const comparePassword = await bcrypt.compare(password, user_search.password);
            if (!comparePassword) {
                return res.status(404).json({ message: "Contraseña incorrecta" });
            }
            req.userData = {
                userInfo: user_search,
                userType: "User",
            };
            console.log(user_search.id)
            console.log(user_search.Role.name + "gigiga")
        }

        next();

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error!!! a la hora de la autenticación: -> " + e.message });
    }
}

module.exports = ValidateLogin;