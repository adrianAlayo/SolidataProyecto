const express = require('express');
const router = express.Router();

// Controladores
const {
    Donations,
    BAAReceived,
    BAADonated,
    Stock,
    UserActivity,
    Inventory,
    } = require('../controllers/Reports.controller');

// Middlewares
const verifyToken = require('../middlewares/VerifyToken.middleware');
const authorize = require('../middlewares/AuthorizationRole.middleware');

// Muestra la informacion completa de una donacion (READ)
router.get(
    '/Donations',
    verifyToken,
    authorize("x", "READ"),
    Donations
); // No Testeado

// Obtener todas las donaciones recibidas por parte de BAA (READ)
router.get(
    '/BAAReceived',
    verifyToken,
    authorize("INVENTORIES", "READ"),
    BAAReceived
); // Testeado

// Obtener todas las donaciones dadas por aprte de BAA (READ)
router.get(
    '/BAADonated',
    verifyToken,
    authorize("INVENTORIES", "READ"),
    BAADonated
); // No Testeado

// hacer un stock general (READ)
router.get(
    '/Stock',
    verifyToken,
    authorize("INVENTORIES", "READ"),
    Stock
); // No Testeado

// Optener la informacion de las actividades de todos los usuarios (READ)
router.get(
    '/UserActivity',
    verifyToken,
    authorize("INVENTORIES", "READ"),
    UserActivity
); // No Testeado

// Obtener la informacion de todos los inventory (READ)
router.get(
    '/Inventory',
    verifyToken,
    authorize("INVENTORIES", "READ"),
    Inventory
); // No Testeado


module.exports = router;
