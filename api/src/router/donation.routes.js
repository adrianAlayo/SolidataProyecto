const express = require('express');
const router = express.Router();

// Controladores
const {
    createDonation,
    getDonation,
    getDonations,
    getDonationsByDonor,
    getDonationsByInstitutionDonor,
    getDonationsByReceiver,
    getDonationsByResponsable,
    getDonationsByVolunteerDonor,
    updateDonation,
    updateDonationStatus,
    deleteDonation
} = require('../controllers/donation.controller');

// Middlewares
const verifyToken = require('../middlewares/VerifyToken.middleware');
const authorize = require('../middlewares/AuthorizationRole.middleware');
const ValidateDonation = require('../middlewares/DataValidateDonation.middleware');

// Crear una donacion (CREATE)
router.post(
    '/',
    verifyToken,
    authorize("DONATIONS", "CREATE"),
    ValidateDonation,
    createDonation
); // Testeado

// Obtener una donacion (READ)
router.get(
    '/:id',
    verifyToken,
    authorize("DONATIONS", "READ"),
    getDonation
); // Testeado

// Obtener todos las donaciones (READ)
router.get(
    '/',
    verifyToken,
    authorize("DONATIONS", "READ"),
    getDonations
); // Testeado

// Obtener todos las donaciones de un mismo responsable (READ)
router.get(
    '/ByResponsable/:id',
    verifyToken,
    authorize("DONATIONS", "READ"),
    getDonationsByResponsable
); // Testeado

// Obtener todos las donaciones de un mismo donador (READ)
router.get(
    '/ByDonor/:id',
    verifyToken,
    authorize("DONATIONS", "READ"),
    getDonationsByDonor
); // Testeado

// Obtener todos las donaciones de un mismo voluntario donador(READ)
router.get(
    '/ByVolunteerDonor/:id',
    verifyToken,
    authorize("DONATIONS", "READ"),
    getDonationsByVolunteerDonor
); // Testeado

// Obtener todos las donaciones de un misma institutcion donador(READ)
router.get(
    '/ByInstitutionDonor/:id',
    verifyToken,
    authorize("DONATIONS", "READ"),
    getDonationsByInstitutionDonor
); // Testeado

// Obtener todos las donaciones de una misma institucion receptora (READ)
router.get(
    '/ByReceiver/:id',
    verifyToken,
    authorize("DONATIONS", "READ"),
    getDonationsByReceiver
); // Testeado

// Actualizar una donacion (PUT)
router.put(
    '/:donation_id',
    verifyToken,
    authorize("DONATIONS", "UPDATE"),
    updateDonation
); // Testeado


// actualizar el estado de una donacion (PATCH)
router.patch(
    '/:id',
    verifyToken,
    authorize("DONATIONS", "CHANGE_STATUS"),
    updateDonationStatus
); // Testeado

// Eliminar una donacion (DELETE)
router.delete(
    '/:id',
    verifyToken,
    authorize("DONATIONS", "DELETE"),
    deleteDonation
); // Testeado

module.exports = router;
