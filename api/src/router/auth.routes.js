const express = require('express');
const router = express.Router();

const { HelloURL, Login, RegisterInstitution } = require("../controllers/auth.controller");

// Middlewares
const validateLoginData = require("../middlewares/ValidateLogin.middleware");
const validateRegInstitution = require("../middlewares/ValidateRegistration.middleware");


// Test
router.get("/", HelloURL);


// Login — este endpoint lo maneja tu middleware previo que mete req.userData
router.post('/login', validateLoginData, Login);

// Registro de instituciones
router.post('/register/institution',validateRegInstitution ,RegisterInstitution);

module.exports = router;