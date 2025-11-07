const express = require('express');
const router = express.Router();

//Inportacion de los controllers
const employeeCoordinatorController = require('../controllers/employeeCoordinator.controller.js'); //Endpoint

const AuthorizeRole = require('../middlewares/AuthorizationRole.middleware.js'); // controla que sea rol Institution
const Authentication = require('../middlewares/VerifyToken.middleware.js'); //Verifica el TOKEN


router.get('/',Authentication,AuthorizeRole('Coordinador'), employeeCoordinatorController.HelloURL); //Testeado


router.get('/infoDonation',Authentication,AuthorizeRole('Coordinador'), employeeCoordinatorController.InfoDonation); //No Creado el Codigo
router.get('/infoInventory',Authentication,AuthorizeRole('Coordinador'), employeeCoordinatorController.InfoInventory); //No Creado el Codigo
router.get('/infoInstitutionNeed',Authentication,AuthorizeRole('Coordinador'), employeeCoordinatorController.InfoNeedInstitution); //No Creado el Codigo
router.get('/infoInstitutionNeeds',Authentication,AuthorizeRole('Coordinador'), employeeCoordinatorController.InfoListInstitutionNeeds); //No Creado el Codigo
router.get('/infoUser',Authentication,AuthorizeRole('Coordinador'), employeeCoordinatorController.InfoUser); //No Creado el Codigo





router.post('/infoReportDonationEntry',Authentication,AuthorizeRole('Coordinador'), employeeCoordinatorController.InfoReportDonationEntry); //No Creado el Codigo
router.post('/infoReportDonationExit',Authentication,AuthorizeRole('Coordinador'), employeeCoordinatorController.InfoReportDonationExit); //No Creado el Codigo
router.post('/infoReportStock',Authentication,AuthorizeRole('Coordinador'), employeeCoordinatorController.InfoReportStock); //No Creado el Codigo



router.patch('/updateStatusDonation',Authentication,AuthorizeRole('Coordinador'), employeeCoordinatorController.UpdateDonation); //No Creado el Codigo

module.exports = router;
