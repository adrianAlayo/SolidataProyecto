const express = require('express');
const router = express.Router();

//Inportacion de los controllers
const employeeCoordinatorController = require('../controllers/employeeCoordinator.controller.js'); //Endpoint

const AuthorizeRole = require('../middlewares/AuthorizationRole.middleware.js'); // controla que sea rol Institution
const Authentication = require('../middlewares/VerifyToken.middleware.js'); //Verifica el TOKEN


router.get('/', employeeCoordinatorController.HelloURL);


module.exports = router;
