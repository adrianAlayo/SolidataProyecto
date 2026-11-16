const express = require('express');
const router = express.Router();

// Controladores
const {
    createArticle,
    deleteArticle,
    putArticle,
    getArticles,
    getArticle
} = require('../controllers/article.controller');

// Middlewares
const verifyToken = require('../middlewares/VerifyToken.middleware');
const authorize = require('../middlewares/AuthorizationRole.middleware');

const denyInstitutionArticleAdmin = (req, res, next) => {
    if (Number(req.user_find?.rol) === 4) {
        return res.status(403).json({ message: "Las instituciones no pueden administrar el catálogo general de artículos." });
    }
    return next();
};



// Obtener todos los artículos (READ)
router.get(
    '/',
    verifyToken,
    authorize("ARTICLES", "READ"),
    getArticles
); // Testeado

// Obtener un artículo por ID (READ)
router.get(
    '/:id',
    verifyToken,
    authorize("ARTICLES", "READ"),
    getArticle
); // Testeado

// Crear un artículo (CREATE)
router.post(
    '/',
    verifyToken,
    denyInstitutionArticleAdmin,
    authorize("ARTICLES", "CREATE"),
    createArticle
); // Testeado

// Actualizar artículo (UPDATE)
router.put(
    '/:id',
    verifyToken,
    denyInstitutionArticleAdmin,
    authorize("ARTICLES", "UPDATE"),
    putArticle
); // Testeado

// Eliminar artículo (DELETE)
router.delete(
    '/:id',
    verifyToken,
    denyInstitutionArticleAdmin,
    authorize("ARTICLES", "DELETE"),
    deleteArticle
); // Testeado

module.exports = router;
