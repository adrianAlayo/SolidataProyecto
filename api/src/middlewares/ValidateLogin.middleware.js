const USER = require('../models/user');
const INSTITUTION = require('../models/institution');
const ROLE = require('../models/role');
const bcrypt = require('bcrypt');

async function Authentication(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Buscar usuario (personal BAA o admin)
    let user_search = await USER.findOne({
      where: { email },
      include: ROLE,
    });

    // Buscar institución
    let institution_search = await INSTITUTION.findOne({
      where: { email },
    });

    if (!user_search && !institution_search) {
      return res.status(401).json({ message: "Email incorrecto (usuario no existe)" });
    }

    // Si el usuario tiene rol de institucion y trata de entrar con su email personal lo bloqueamos
    if (user_search && user_search.role_id === 2) {
      return res.status(403).json({
        message:
          "No puedes iniciar sesión con tu correo personal. Usa el correo de la institución afiliada.",
      });
    }

    // Verificar que esté activo antes de continuar
    if (user_search && !user_search.is_active) {
      return res.status(403).json({ message: "Usuario inactivo, contacte al administrador." });
    }
    if (institution_search && institution_search.status !== "Activo") {
      return res.status(403).json({
        message: "Institución no activa. Espere la aprobación de BAA.",
      });
    }

    // CUAL fue encontrado
    let foundUser = user_search || institution_search;

    const comparePassword = await bcrypt.compare(password, foundUser.password);
    if (!comparePassword) {
      return res.status(404).json({ message: "Contraseña incorrecta" });
    }

    // rol
    let role;
    if (user_search) {
      if (user_search.role_id === 1) role = "Admin";
      else if (user_search.role_id === 3) role = "Employee";
      else if (user_search.role_id === 2) role = "Institution";
    } else {
      role = "Institution";
    }

    // Guardar datos para el siguiente paso (controller)
    req.userData = {
      user_search: foundUser,
      role,
    };

    next();

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en la autenticación", error });
  }
}

module.exports = Authentication;
