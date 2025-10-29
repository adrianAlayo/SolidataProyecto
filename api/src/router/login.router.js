const express = require('express');
const router = express.Router();

//Inportacion de los controllers
const loginController = require('../controllers/login.controller.js'); //Endpoint

const ValidateLogin = require('../middlewares/ValidateLogin.middleware.js'); //Verifica los campos del login


router.post('/login',ValidateLogin, loginController.Login);

module.exports = router;