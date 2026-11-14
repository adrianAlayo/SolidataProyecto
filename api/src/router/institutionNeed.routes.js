const express = require('express');
const router = express.Router();

// Controladores
const {
    createNeeds,
    getNeed,
    getNeeds,
    getNeedByInstitution,
    updateNeed,
    deleteNeed,
    updateStatusNeed,
} = require('../controllers/institutionneed.controller');

// Middlewares
const verifyToken = require('../middlewares/VerifyToken.middleware');
const authorize = require('../middlewares/AuthorizationRole.middleware');

// Crear una necesidad (CREATE)
router.post(
    '/',
    verifyToken,
    authorize("INSTITUTIONNEEDS", "CREATE"),
    createNeeds
); // Testeado

// Obtener todas las necesidades (READ)
router.get(
    '/',
    verifyToken,
    authorize("INSTITUTIONNEEDS", "READ"),
    getNeeds
); // Testeado

// Obtener la informacion de 1 necesidad (READ)
router.get(
    '/:id',
    verifyToken,
    authorize("INSTITUTIONNEEDS", "READ"),
    getNeed
); // Testeado

// Obtener todas las necesidades de una institucion (READ)
router.get(
    '/ByInstitution/:id',
    verifyToken,
    authorize("INSTITUTIONNEEDS", "READ"),
    getNeedByInstitution
); // Testeado

// Actualizar las necesidades (UPDATE)
router.put(
    '/:id',
    verifyToken,
    authorize("INSTITUTIONNEEDS", "UPDATE"),
    updateNeed
); // Testeado

// Actualizar el estado de una necesidad (CHANGE_STATUS)
router.patch(
    '/:id',
    verifyToken,
    authorize("INSTITUTIONNEEDS", "APPROVE"),
    updateStatusNeed
); // Testeado

// Eliminar una necesidad (DELETE)
router.delete(
    '/:id',
    verifyToken,
    authorize("INSTITUTIONNEEDS", "DELETE"),
    deleteNeed
); // Testeado

module.exports = router;
