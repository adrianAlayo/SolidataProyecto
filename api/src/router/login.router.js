const express = require('express');
const router = express.Router();

//Inportacion de los controllers
const loginController = require('../controllers/login.controller.js'); //Endpoint

const Authentication = require('../middlewares/VerifyToken.middleware.js'); //Verifica el TOKEN
const ValidateLogin = require('../middlewares/ValidateLogin.middleware.js'); //Verifica los campos del login



router.post('/login',ValidateLogin, Authentication, loginController.Login);

module.exports = router;