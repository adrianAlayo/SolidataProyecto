const express = require('express');
const router = express.Router();

// Controladores
const {
    getUsersActive,
    getUsersInactive,
    getUser,
    getUsers,
    disableUser,
    updateUser,
    deleteUsers,
    createUser,
    AcceptUser,
    getPasswordResetRequests,
    approvePasswordReset
} = require('../controllers/user.controller');

// Middlewares
const verifyToken = require('../middlewares/VerifyToken.middleware');
const authorize = require('../middlewares/AuthorizationRole.middleware');


router.get('/password-reset-requests', verifyToken, getPasswordResetRequests);
router.patch('/password-reset-requests/:id/approve', verifyToken, approvePasswordReset);

// Crear un usuario (CREATE)
router.post(
    '/',
    verifyToken,
    authorize("USERS", "CREATE"),
    createUser
);

// Obtener todos los usuarios (READ)
router.get(
    '/',
    verifyToken,
    authorize("USERS", "READ"),
    getUsers
); //Testeado

// Obtener la informacion de 1 usuario (READ)
router.get(
    '/:id',
    verifyToken,
    authorize("USERS", "READ"),
    getUser
);

// Obtener los usuarios activos (READ)
router.get(
    '/active',
    verifyToken,
    authorize("USERS", "READ"),
    getUsersActive
);

// Obtener los usuarios inactivos (READ)
router.get(
    '/inactive',
    verifyToken,
    authorize("USERS", "READ"),
    getUsersInactive
);

// Actualizando usuario (UPDATE)
router.put(
    '/:id',
    verifyToken,
    authorize("USERS", "UPDATE"),
    updateUser
);

// desabilitar un usuario (CHANGE_STATUS)
router.patch(
    '/disable/:id',
    verifyToken,
    authorize("USERS", "APPROVE"),
    disableUser
);
// habilitar un usuario (CHANGE_STATUS)
router.patch(
    '/active/:id',
    verifyToken,
    authorize("USERS", "APPROVE"),
    AcceptUser
);

// Actualizar el estado del usuario (DELETE)
router.delete(
    '/:id',
    verifyToken,
    authorize("USERS", "DELETE"),
    deleteUsers
);
module.exports = router;
