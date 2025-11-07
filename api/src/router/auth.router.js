const express = require('express');
const router = express.Router();

//Inportacion de los controllers
const authController = require('../controllers/auth.controller.js'); //Endpoint

const ValidateLogin = require('../middlewares/ValidateLogin.middleware.js'); //Verifica los campos del login
const ValidateRegistration = require('../middlewares/ValidateRegistration.middleware'); //Valida los registros


router.get('/', authController.HelloURL);

router.post('/login',ValidateLogin, authController.Login);
router.post('/register',ValidateRegistration,authController.RegisterInstitution); //No creado el Codigo

module.exports = router;