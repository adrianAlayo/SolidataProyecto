const express = require('express');
const router = express.Router();

//Inportacion de los controllers
const institutionController = require('../controllers/institution.controller.js'); //Endpoint

const ValidateRegistration = require('../middlewares/ValidateRegistration.middleware'); //Valida los registros
const AuthorizeRole = require('../middlewares/AuthorizationRole.middleware.js'); //Controla que sea ROl Institution
const Authentication = require('../middlewares/VerifyToken.middleware.js'); //Verifica el TOKEN



//* Llamada de los Endpoints del ROLE institution
router.get('/', institutionController.HelloURL);


router.get('/viewDeliveries',ValidateRegistration, AuthorizeRole('Institution'),institutionController.ViewDeliveriesHistory); //No creado el Codigo


router.post('/register',ValidateRegistration, institutionController.RegisterInstitution); //Testeado
router.post('/editProfile',ValidateRegistration, AuthorizeRole('Institution'),institutionController.RegisterInstitution); //No creado el Codigo
router.post('/sendMessage',ValidateRegistration, AuthorizeRole('Institution'),institutionController.SendMessageToBAA); //No creado el Codigo

router.patch('/updateNeeds',ValidateRegistration, AuthorizeRole('Institution'),institutionController.UpdateNeeds); //No creado el Codigo
router.patch('/confirmDelivery',ValidateRegistration, AuthorizeRole('Institution'),institutionController.ConfirmDonationReception); //No creado el Codigo

module.exports = router;