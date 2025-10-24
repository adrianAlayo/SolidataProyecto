const express = require('express');
const router = express.Router();

//Inportacion de los controllers
const institutionController = require('../controllers/institution.controller.js'); //Endpoint

const ValidateRegistration = require('../middlewares/ValidateRegistration.middleware'); //Valida los registros
const AuthorizeRole = require('../middlewares/AuthorizationRole.middleware.js'); //Controla que sea ROl Institution
const Authentication = require('../middlewares/VerifyToken.middleware.js'); //Verifica el TOKEN



//* Llamada de los Endpoints del ROLE institution
router.post('/register', Authentication,ValidateRegistration, AuthorizeRole("institution"), institutionController.RegisterInstitution);


module.exports = router;