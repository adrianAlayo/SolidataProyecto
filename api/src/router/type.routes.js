const express = require('express');
const router = express.Router();

// Controladores
const {
    createType,
    getTypes,
    getType,
    updateType,
    deleteType

} = require('../controllers/type.controller');

// Middlewares
const verifyToken = require('../middlewares/VerifyToken.middleware');
const authorize = require('../middlewares/AuthorizationRole.middleware');

// Crear un tipo (CREATE)
router.post(
    '/',
    verifyToken,
    authorize("TYPES", "CREATE"),
    createType
); // Testeado

// Obtener todas los Tipos (READ)
router.get(
    '/',
    verifyToken,
    authorize("TYPES", "READ"),
    getTypes
); // Testeado

// Obtener la informacion de 1 tipo (READ)
router.get(
    '/:id',
    verifyToken,
    authorize("TYPES", "READ"),
    getType
); // Testeado

// Actualizar el tipo (UPDATE)
router.put(
    '/:id',
    verifyToken,
    authorize("TYPES", "UPDATE"),
    updateType
); // Testeado

// Eliminar un tipo (DELETE)
router.delete(
    '/:id',
    verifyToken,
    authorize("TYPES", "DELETE"),
    deleteType
); // Testeado

module.exports = router;
