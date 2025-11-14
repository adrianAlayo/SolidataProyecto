const jwt = require('jsonwebtoken');

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

module.exports = CreateTokenUser;