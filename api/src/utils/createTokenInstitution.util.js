const jwt = require('jsonwebtoken');

function CreateTokenInsti(user) {
    const payload = {
        userRelation: user.id,
        id: user.Institution.id,
        name: user.Institution.name,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        typeID: user.Institution.type_id,
        rol: user.Role ? user.Role.id : null, 
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

module.exports = CreateTokenInsti;
