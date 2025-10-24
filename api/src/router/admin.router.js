const express = require('express');
const router = express.Router();

//Inportacion de los controllers
const adminController = require('../controllers/admin.controller.js');//Endpoint

const ValidateRegistration = require('../middlewares/ValidateRegistration.middleware'); //Verifica los campos del registro
const AuthorizeRole = require('../middlewares/AuthorizationRole.middleware.js'); //Controla q sea Admin
const Authentication = require('../middlewares/VerifyToken.middleware.js'); //Verifica el TOKEN



router.post('/register', AuthorizeRole('admin'), ValidateRegistration, adminController.RegisterEmployee);

module.exports = router;
