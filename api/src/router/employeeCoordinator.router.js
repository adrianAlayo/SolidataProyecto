const express = require('express');
const router = express.Router();

//Inportacion de los controllers
const employeeCoordinatorController = require('../controllers/employeeCoordinator.controller.js'); //Endpoint

const AuthorizeRole = require('../middlewares/AuthorizationRole.middleware.js'); // controla que sea rol Institution
const Authentication = require('../middlewares/VerifyToken.middleware.js'); //Verifica el TOKEN


router.get('/',Authentication,AuthorizeRole('Coordinador'), employeeCoordinatorController.HelloURL); //Testeado


router.get('/listDonationRecived',Authentication,AuthorizeRole('Coordinador'), employeeCoordinatorController.ListDonationsReceived); //No Creado el Codigo
router.get('/listDeliRecived',Authentication,AuthorizeRole('Coordinador'), employeeCoordinatorController.ListDeliveryReceived); //No Creado el Codigo
router.get('/viewStock',Authentication,AuthorizeRole('Coordinador'), employeeCoordinatorController.ViewStock); //No Creado el Codigo
router.get('/checkExpiration',Authentication,AuthorizeRole('Coordinador'), employeeCoordinatorController.CheckExpirations); //No Creado el Codigo
router.get('/ReportStock',Authentication,AuthorizeRole('Coordinador'), employeeCoordinatorController.GenerateStockReport); //No Creado el Codigo
router.get('/viewNeedsInstitutions',Authentication,AuthorizeRole('Coordinador'), employeeCoordinatorController.ViewInstitutionRequests); //No Creado el Codigo




router.post('/RegisterDonation',Authentication,AuthorizeRole('Coordinador'), employeeCoordinatorController.RegisterDonationReceived); //No Creado el Codigo
router.post('/RegisterDelivery',Authentication,AuthorizeRole('Coordinador'), employeeCoordinatorController.RegisterDeliverRecived); //No Creado el Codigo


router.patch('/updateStock',Authentication,AuthorizeRole('Coordinador'), employeeCoordinatorController.UpdateStockItem); //No Creado el Codigo

module.exports = router;
