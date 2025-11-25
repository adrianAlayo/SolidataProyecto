const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");
const authorize = require("../middlewares/authorize");

const articleController = require("../controllers/article.controller");


// Crear un artículo
router.post(
    "/",
    verifyToken,
    authorize("ARTICLE", "CREATE"),
    articleController.createArticle
);

// Obtener todos los artículos
router.get(
    "/",
    verifyToken,
    authorize("ARTICLE", "READ"),
    articleController.getArticles
);

// Obtener un artículo por ID
router.get(
    "/:id",
    verifyToken,
    authorize("ARTICLE", "READ"),
    articleController.getArticle
);

// Actualizar un artículo
router.put(
    "/:id",
    verifyToken,
    authorize("ARTICLE", "UPDATE"),
    articleController.putArticle
);

// Eliminar un artículo
router.delete(
    "/:id",
    verifyToken,
    authorize("ARTICLE", "DELETE"),
    articleController.deleteArticle
);

module.exports = router;
