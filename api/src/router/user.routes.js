const express = require('express');
const router = express.Router();

// Controladores
const {
    getUsersActive,
    getUsersInactive,
    getUser,
    disableUser,
    deleteUsers,
    createUser
} = require('../controllers/user.controller');

// Middlewares
const verifyToken = require('../middlewares/VerifyToken.middleware');
const authorize = require('../middlewares/AuthorizationRole.middleware');



// Obtener todos los usuarios (READ)
router.get(
    '/',
    verifyToken,
    authorize("USERS", "READ"),
    getUser
); //Testeado

// Obtener todos los usuarios inactivos (READ)
router.get(
    '/:id',
    verifyToken,
    authorize("USERS", "READ"),
    getUsersInactive
);

// Desabilitar un usuario (PATCH)
router.patch(
    '/:id',
    verifyToken,
    authorize("USERS", "CHANGE_STATUS"),
    disableUser
);

// Crear un usuario (CREATE)
router.post(
    '/',
    verifyToken,
    authorize("USERS", "CREATE"),
    createUser
);

// eliminar un usuario (DELETE)
router.delete(
    '/:id',
    verifyToken,
    authorize("ARTICLE", "UPDATE"),
    deleteUsers
);

module.exports = router;
