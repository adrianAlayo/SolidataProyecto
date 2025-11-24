const jwt = require('jsonwebtoken');

function CreateTokenUser(user) {
    const payload = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        rol: user.Role ? user.Role.id : null, 
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

module.exports = CreateTokenUser;