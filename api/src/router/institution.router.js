const express = require('express');
const router = express.Router();

//Inportacion de los controllers
const institutionController = require('../controllers/institution.controller.js'); //Endpoint


const AuthorizeRole = require('../middlewares/AuthorizationRole.middleware.js'); //Controla que sea ROl Institution
const Authentication = require('../middlewares/VerifyToken.middleware.js'); //Verifica el TOKEN



//* Llamada de los Endpoints del ROLE institution
router.get('/', institutionController.HelloURL);


router.get('/viewDeliveries',Authentication, AuthorizeRole('Institution'),institutionController.ViewDeliveriesHistory); //No creado el Codigo

router.post('/editProfile',Authentication, institutionController.EditProfile); //Testeado
router.post('/sendMessage',Authentication, AuthorizeRole('Institution'),institutionController.SendMessageToBAA); //No creado el Codigo

router.patch('/updateNeeds',Authentication, AuthorizeRole('Institution'),institutionController.UpdateNeeds); //No creado el Codigo
router.patch('/confirmDelivery',Authentication, AuthorizeRole('Institution'),institutionController.ConfirmDonationReception); //No creado el Codigo

module.exports = router;