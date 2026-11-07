const jwt = require('jsonwebtoken');
const USER = require('../models/user');
const INSTITUTION = require('../models/institution');

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No introdujo un TOKEN' });

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // Los tokens de institución guardan el ID de la institución en id y el ID
        // de su usuario responsable en userRelation.
        const accountId = Number(payload.userRelation ?? payload.id);
        if (!Number.isInteger(accountId) || accountId <= 0) {
            return res.status(403).json({ message: 'Token inválido.' });
        }

        const account = await USER.findByPk(accountId, {
            attributes: ['id', 'is_active', 'institution_id'],
            include: [{ model: INSTITUTION, attributes: ['id', 'status'] }]
        });
        if (!account || account.is_active !== true) {
            return res.status(403).json({ message: 'La cuenta está inactiva. Contactá al administrador para habilitarla.' });
        }
        if (account.institution_id && account.Institution?.status !== 'Active') {
            return res.status(403).json({ message: 'La institución está pendiente de aprobación o inactiva.' });
        }

        req.user_find = payload;
        return next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(403).json({ error: 'Token expirado o inválido.' });
        }
        console.error('Error al validar la cuenta:', error.message);
        return res.status(500).json({ message: 'No se pudo validar el estado de la cuenta.' });
    }
};

module.exports = verifyToken;
