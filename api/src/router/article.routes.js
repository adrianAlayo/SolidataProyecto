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
    authorize("ARTICLES", "CREATE"),
    createArticle
); // Testeado

// Actualizar artículo (UPDATE)
router.put(
    '/:id',
    verifyToken,
    authorize("ARTICLES", "UPDATE"),
    putArticle
); // Testeado

// Eliminar artículo (DELETE)
router.delete(
    '/:id',
    verifyToken,
    authorize("ARTICLES", "DELETE"),
    deleteArticle
); // Testeado

module.exports = router;
