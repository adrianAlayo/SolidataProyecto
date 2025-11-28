const express = require('express');
const router = express.Router();

// Controladores
const {
    createRole,
    assignRoles,
    editRole,
    deleteRole,
    getRoles,
    getRole,
    } = require('../controllers/role.controller');

// Middlewares
const verifyToken = require('../middlewares/VerifyToken.middleware');
const authorize = require('../middlewares/AuthorizationRole.middleware');

// Crear un nuevo ROl (CREATE)
router.post(
    '/',
    verifyToken,
    authorize("ROLES", "CREATE"),
    createRole
); // No Testeado

// Obtener todas las donaciones recibidas por parte de BAA (ASSIGN)
router.patch(
    '/:id',
    verifyToken,
    authorize("ROLES", "ASSIGN"),
    assignRoles
); // Testeado

// Actualizar/Editar un rol (UPDATE)
router.put(
    '/:id',
    verifyToken,
    authorize("ROLES", "UPDATE"),
    editRole
); // No Testeado

// Eliminar un rol (DELETE)
router.delete(
    '/:id',
    verifyToken,
    authorize("ROLES", "DELETE"),
    deleteRole
); // No Testeado

// Obtener todos los roles (READ)
router.get(
    '/',
    verifyToken,
    authorize("ROLES", "READ"),
    getRoles
); // No Testeado

// Obtener la informaion de 1 rol (READ)
router.get(
    '/:id',
    verifyToken,
    authorize("ROLES", "READ"),
    getRole
); // No Testeado


module.exports = router;
