const express = require('express');
const router = express.Router();

//Inportacion de los controllers
const employeeOperatorController = require('../controllers/employeeOperator.controller.js'); //Endpoint
const reportsController = require('../controllers/Reports.controller.js') //Endpoints

const AuthorizeRole = require('../middlewares/AuthorizationRole.middleware.js'); // controla que sea rol Institution
const Authentication = require('../middlewares/VerifyToken.middleware.js'); //Verifica el TOKEN


// HELLO
router.get('/', employeeOperatorController.HelloURL);

// Reports
router.get('/reports/donations',Authentication,AuthorizeRole('Operador'), reportsController.Donations); //No Testeado



// List
router.get('/List/article',Authentication,AuthorizeRole('Operador'), employeeOperatorController.ListArticle); //No Creado el Codigo
router.get('/List/donor',Authentication,AuthorizeRole('Operador'), employeeOperatorController.ListDonor); //No Creado el Codigo



// Update
router.patch('/update/donation',Authentication,AuthorizeRole('Operador'), employeeOperatorController.UpdateDonation); //No Creado el Codigo



// Create
router.post('/donation',Authentication,AuthorizeRole('Operador'), employeeOperatorController.CreateDonation); //No Creado el Codigo
router.post('/create/inventory',Authentication,AuthorizeRole('Operador'), employeeOperatorController.CreateInventory); //No Creado el Codigo


// Information
router.get('/information/donation/article',Authentication,AuthorizeRole('Operador'), employeeOperatorController.InfoArticleDonation); //No Creado el Codigo

module.exports = router;
