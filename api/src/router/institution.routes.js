const express = require('express');
const router = express.Router();

// Controladores
const {
    createInstitution,
    getInstitution,
    getInstitutions,
    getInstitutionsInactive,
    getInstitutionsActive,
    disableInstitution,
    acceptInstitution,
    deleteInstitution
} = require('../controllers/institution.controller');

// Middlewares
const verifyToken = require('../middlewares/VerifyToken.middleware');
const authorize = require('../middlewares/AuthorizationRole.middleware');

// Crear una institucion (CREATE)
router.post(
    '/',
    verifyToken,
    authorize("INSTITUTIONS", "CREATE"),
    createInstitution
); // Testeado

// Obtener todas las instituciones (READ)
router.get(
    '/',
    verifyToken,
    authorize("INSTITUTIONS", "READ"),
    getInstitutions
); // Testeado

// Obtener la informacion de 1 institucion (READ)
router.get(
    '/:id',
    verifyToken,
    authorize("INSTITUTIONS", "READ"),
    getInstitution
); // Testeado

// Obtener todas las instituciones inactivas (READ)
router.get(
    '/Inactive',
    verifyToken,
    authorize("INSTITUTIONS", "READ"),
    getInstitutionsInactive
); // Testeado

// Obtener todas las instituciones activas (READ)
router.get(
    '/Active',
    verifyToken,
    authorize("INSTITUTIONS", "READ"),
    getInstitutionsActive
); // Testeado

// Desactivas una institucion (CHANGE_STATUS)
router.patch(
    '/:id',
    verifyToken,
    authorize("INSTITUTIONS", "CHANGE_STATUS"),
    disableInstitution
); // Testeado

// Aceptar una institucion (APPROVE)
router.patch(
    '/:id',
    verifyToken,
    authorize("INSTITUTIONS", "APPROVE"),
    acceptInstitution
); // Testeado

// Eliminar una institucion (DELETE)
router.delete(
    '/:id',
    verifyToken,
    authorize("INSTITUTIONS", "DELETE"),
    deleteInstitution
); // Testeado

module.exports = router;
