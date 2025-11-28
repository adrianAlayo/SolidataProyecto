const express = require('express');
const router = express.Router();

// Controladores
const {
    createItem,
    getItem,
    getItems,
    getItemsByDonation,
    updateItem,
    deleteItem
} = require('../controllers/donationItem.controller');

// Middlewares
const verifyToken = require('../middlewares/VerifyToken.middleware');
const authorize = require('../middlewares/AuthorizationRole.middleware');

// Crear un item de donacion (CREATE)
router.post(
    '/',
    verifyToken,
    authorize("DONATIONITEMS", "CREATE"),
    createItem
); // Testeado

// Obtener todos los items (READ)
router.get(
    '/',
    verifyToken,
    authorize("DONATIONITEMS", "READ"),
    getItems
); // Testeado

// Obtener la informacion de 1 item (READ)
router.get(
    '/:id',
    verifyToken,
    authorize("DONATIONITEMS", "READ"),
    getItem
); // Testeado

// Obtener la informacion de los ITEMS de un mismo donante (READ)
router.get(
    '/ByDonation/:donation_id',
    verifyToken,
    authorize("DONATIONITEMS", "READ"),
    getItemsByDonation
); // Testeado

// Actualizar un item (PUT)
router.put(
    '/:id',
    verifyToken,
    authorize("DONATIONITEMS", "UPDATE"),
    updateItem
); // Testeado

// Obtener todos las donaciones de un mismo voluntario donador(DELETE)
router.delete(
    '/:id',
    verifyToken,
    authorize("DONATIONS", "DELETE"),
    deleteItem
); // Testeado

module.exports = router;
