const jwt = require('jsonwebtoken');

function CreateTokenInsti(user) {
    const payload = {
        userRelation: user.id,
        id: user.Institution.id,
        name: user.Institution.name,
        email: user.Institution.email,
        typeID: user.Institution.type_id,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

module.exports = CreateTokenInsti;