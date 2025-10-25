const express = require('express');
const router = express.Router();

//Inportacion de los controllers
const employeeController = require('../controllers/employee.controller.js'); //Endpoint

const AuthorizeRole = require('../middlewares/AuthorizationRole.middleware.js'); // controla que sea rol Institution
const Authentication = require('../middlewares/VerifyToken.middleware.js'); //Verifica el TOKEN



//* Llamada de los Endpoints del ROLE institution
router.post('/traba', Authentication,AuthorizeRole);


module.exports = router;
