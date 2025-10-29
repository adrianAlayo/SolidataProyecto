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
            include: ROLE,
        });

        // Buscar institución (solo si no hay usuario)
        let institution_search = null;
        if (!user_search) {
            institution_search = await INSTITUTION.findOne({
                where: { email },
                include: {
                    model: USER,
                    attributes: ['id', 'email', 'is_active'],
                    include: {
                        model: ROLE,
                        attributes: ['id', 'name'],
                    },
                },
            });
        }

        // Si no se encontró ni usuario ni institución
        if (!user_search && !institution_search) {
            return res.status(401).json({ message: "Email no existe" });
        }

        // Si es usuario
        if (user_search) {
            if (!user_search.is_active) {
                return res.status(403).json({ message: "El usuario no está activo, contacte al administrador" });
            }

            if (user_search.role_id === 3) {
                return res.status(403).json({message: "No puedes iniciar sesión con tu correo personal. Usa el correo de la institución afiliada."});
            }

            const comparePassword = await bcrypt.compare(password, user_search.password);
            if (!comparePassword) {
                return res.status(404).json({ message: "Contraseña incorrecta" });
            }

            req.userData = {
                userInfo: user_search,
                userType: "user",
            };
            console.log(user_search.id)
            console.log(user_search.Role.name)
        }

        // Si es institución
        if (institution_search) {
            if (institution_search.status !== "Activo") {
                return res.status(403).json({ message: "La institución está inactiva o pendiente, contacte al administrador" });
            }

            const comparePassword = await bcrypt.compare(password, institution_search.password);
            if (!comparePassword) {
                return res.status(404).json({ message: "Contraseña incorrecta" });
            }

            req.userData = {
                userInfo: institution_search,
                userType: "institution",
            };
        }
        next();

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error!!! a la hora de la autenticación: -> " + e.message });
    }
}

module.exports = ValidateLogin;