const express = require('express');
const router = express.Router();

//Inportacion de los controllers
const employeeCoordinatorController = require('../controllers/employeeCoordinator.controller.js'); //Endpoint
const reportsControlller = require('../controllers/Reports.controller.js'); // Endpoints

const AuthorizeRole = require('../middlewares/AuthorizationRole.middleware.js'); // controla que sea rol Institution
const Authentication = require('../middlewares/VerifyToken.middleware.js'); //Verifica el TOKEN

// HELLO
router.get('/', employeeCoordinatorController.HelloURL); //Testeado

// info 
router.get('/information/inventory',Authentication,AuthorizeRole('coordinador'), employeeCoordinatorController.InfoInventory); //No Creado el Codigo
router.get('/information/institution/need',Authentication,AuthorizeRole('coordinador'), employeeCoordinatorController.InfoNeedInstitution); //No Creado el Codigo
router.get('/information/institution/needs',Authentication,AuthorizeRole('coordinador'), employeeCoordinatorController.InfoListInstitutionNeeds); //No Creado el Codigo
router.get('/information/user',Authentication,AuthorizeRole('coordinador'), employeeCoordinatorController.InfoUser); //No Creado el Codigo



// Reports
router.get('/reports/stock/:article_id',Authentication,AuthorizeRole('coordinador'), reportsControlller.Stock); //No Testeado
router.get('/reports/donations',Authentication,AuthorizeRole('coordinador'), reportsControlller.Donations); //No Testeado
router.get('/reports/baa/donated',Authentication,AuthorizeRole('coordinador'), reportsControlller.BAADonated); //No Testeado
router.get('/reports/baa/received',Authentication,AuthorizeRole('coordinador'), reportsControlller.BAAReceived); //No Testeado



// Update
router.patch('/update/status/donation',Authentication,AuthorizeRole('coordinador'), employeeCoordinatorController.UpdateDonation); //No Creado el Codigo

module.exports = router;
