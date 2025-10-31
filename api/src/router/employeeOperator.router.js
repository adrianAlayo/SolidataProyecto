const express = require('express');
const router = express.Router();

//Inportacion de los controllers
const employeeOperatorController = require('../controllers/employeeOperator.controller.js'); //Endpoint

const AuthorizeRole = require('../middlewares/AuthorizationRole.middleware.js'); // controla que sea rol Institution
const Authentication = require('../middlewares/VerifyToken.middleware.js'); //Verifica el TOKEN


router.get('/', employeeOperatorController.HelloURL);


router.get('/listDonationRecived',Authentication,AuthorizeRole('Operador'), employeeOperatorController.ListDonationsReceived); //No Creado el Codigo
router.get('/listDeliveryRecived',Authentication,AuthorizeRole('Operador'), employeeOperatorController.ListDeliveryReceived); //No Creado el Codigo
router.get('/viewCalendar',Authentication,AuthorizeRole('Operador'), employeeOperatorController.ViewCalendar); //No Creado el Codigo



router.patch('/confirmDelivery',Authentication,AuthorizeRole('Operador'), employeeOperatorController.ConfirmDelivery); //No Creado el Codigo
router.patch('/confirmDonation',Authentication,AuthorizeRole('Operador'), employeeOperatorController.ConfirmDonation); //No Creado el Codigo



router.post('/addStock',Authentication,AuthorizeRole('Operador'), employeeOperatorController.AddStockItem); //No Creado el Codigo
router.post('/addEvent',Authentication,AuthorizeRole('Operador'), employeeOperatorController.AddCalendarEvent); //No Creado el Codigo


module.exports = router;
