const express = require('express');
const router = express.Router();

//Inportacion de los controllers
const employeeOperatorController = require('../controllers/employeeOperator.controller.js'); //Endpoint

const AuthorizeRole = require('../middlewares/AuthorizationRole.middleware.js'); // controla que sea rol Institution
const Authentication = require('../middlewares/VerifyToken.middleware.js'); //Verifica el TOKEN


router.get('/', employeeOperatorController.HelloURL);


router.get('/infoDonation',Authentication,AuthorizeRole('Operador'), employeeOperatorController.InfoDonation); //No Creado el Codigo
router.get('/infoArticleDonation',Authentication,AuthorizeRole('Operador'), employeeOperatorController.InfoArticleDonation); //No Creado el Codigo
router.get('/ListArticle',Authentication,AuthorizeRole('Operador'), employeeOperatorController.ListArticle); //No Creado el Codigo
router.get('/ListDonor',Authentication,AuthorizeRole('Operador'), employeeOperatorController.ListDonor); //No Creado el Codigo


router.patch('/updateDonation',Authentication,AuthorizeRole('Operador'), employeeOperatorController.UpdateDonation); //No Creado el Codigo


router.post('/createDonation',Authentication,AuthorizeRole('Operador'), employeeOperatorController.CreateDonation); //No Creado el Codigo
router.post('/CreateInventory',Authentication,AuthorizeRole('Operador'), employeeOperatorController.CreateInventory); //No Creado el Codigo


module.exports = router;
