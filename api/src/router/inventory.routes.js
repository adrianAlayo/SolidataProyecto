const express = require('express');
const router = express.Router();

// Controladores
const {
    createInventory,
    getInventory,
    getInventories,
    getInventoryByDonationItem,
    getInventoryOnlyArticle,
    getInventoriesOnlyArticles,
    getInventoriesOnlyArticlesArea,
    getInventoryOnlyArticleArea,
    updateInventory,
    deleteInventory
} = require('../controllers/inventory.controller');

// Middlewares
const verifyToken = require('../middlewares/VerifyToken.middleware');
const authorize = require('../middlewares/AuthorizationRole.middleware');

const denyDonorInstitutionInventory = (req, res, next) => {
    if (Number(req.user_find?.rol) === 4 && String(req.user_find?.institutionType || '').toLowerCase() === 'donor') {
        return res.status(403).json({ message: "El inventario no está habilitado para instituciones donantes." });
    }
    return next();
};

// Crear un inventoario (CREATE)
router.post(
    '/',
    verifyToken,
    denyDonorInstitutionInventory,
    authorize("INVENTORIES", "CREATE"),
    createInventory
); // Testeado

// Obtener todas los inventoris (READ)
router.get(
    '/',
    verifyToken,
    denyDonorInstitutionInventory,
    authorize("INVENTORIES", "READ"),
    getInventories
); // Testeado

// Obtener la informacion de 1 inventori (READ)
router.get(
    '/:id',
    verifyToken,
    denyDonorInstitutionInventory,
    authorize("INVENTORIES", "READ"),
    getInventory
); // Testeado

// Obtener el inventario de los items de una donacion (READ)
router.get(
    '/ByDonationItem/:id',
    verifyToken,
    denyDonorInstitutionInventory,
    authorize("INVENTORIES", "READ"),
    getInventoryByDonationItem
); // Testeado

// Obtener el stock total de un artículo (READ)
router.get(
    '/OnlyArticle/:id',
    verifyToken,
    denyDonorInstitutionInventory,
    authorize("INVENTORIES", "READ"),
    getInventoryOnlyArticle
); // Testeado

// Obtener el stock total de todos los artículos (por artículo) (READ)
router.get(
    '/OnlyArticles',
    verifyToken,
    denyDonorInstitutionInventory,
    authorize("INVENTORIES", "READ"),
    getInventoriesOnlyArticles
); // Testeado

// Obtener el stock por artículo agrupado por area (READ)
router.get(
    '/OnlyArticlesArea',
    verifyToken,
    denyDonorInstitutionInventory,
    authorize("INVENTORIES", "READ"),
    getInventoriesOnlyArticlesArea
); // Testeado

// Obtener el stock de un artículo en una sola area (READ)
router.get(
    '/OnlyArticleArea',
    verifyToken,
    denyDonorInstitutionInventory,
    authorize("INVENTORIES", "READ"),
    getInventoryOnlyArticleArea
); // Testeado

// Actualizar inenvetori (UPDATE)
router.put(
    '/:id',
    verifyToken,
    denyDonorInstitutionInventory,
    authorize("INVENTORIES", "UPDATE"),
    updateInventory
); // Testeado

// Eliminar el inventario (DELETE)
router.delete(
    '/:id',
    verifyToken,
    denyDonorInstitutionInventory,
    authorize("INVENTORIES", "DELETE"),
    deleteInventory
); // Testeado


module.exports = router;
