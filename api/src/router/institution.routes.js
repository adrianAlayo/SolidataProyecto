const express = require('express');
const router = express.Router();

// Controladores
const {
    createInstitution,
    getInstitution,
    getInstitutions,
    getInstitutionsInactive,
    getInstitutionsActive,
    updateInstitution,
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

// Obtener todas las instituciones inactivas (READ)
router.get(
    '/Inactive',
    verifyToken,
    authorize("INSTITUTIONS", "READ"),
    getInstitutionsInactive
); // Testeado

// Obtener la informacion de 1 institucion (READ)
router.get(
    '/:id',
    verifyToken,
    authorize("INSTITUTIONS", "READ"),
    getInstitution
); // Testeado

// Obtener todas las instituciones activas (READ)
router.get(
    '/Active',
    verifyToken,
    authorize("INSTITUTIONS", "READ"),
    getInstitutionsActive
); // Testeado

router.put(
    '/:id',
    verifyToken,
    authorize("INSTITUTIONS", "UPDATE"),
    updateInstitution
);

// Eliminar una institucion (DELETE)
router.delete(
    '/:id',
    verifyToken,
    authorize("INSTITUTIONS", "DELETE"),
    deleteInstitution
); // Testeado

module.exports = router;
