const express = require('express');
const router = express.Router();

//Inportacion de los controllers
const adminController = require('../controllers/admin.controller.js');//Endpoint

const ValidateRegistration = require('../middlewares/ValidateRegistration.middleware'); //Verifica los campos del registro
const AuthorizeRole = require('../middlewares/AuthorizationRole.middleware.js'); //Controla q sea Admin
const Authentication = require('../middlewares/VerifyToken.middleware.js'); //Verifica el TOKEN



router.post('/registerEmployee', AuthorizeRole('Admin'), ValidateRegistration, adminController.RegisterEmployee);

router.patch('/aceptarInstitucion',Authentication,AuthorizeRole('Admin'), adminController.AcceptInstitution);
router.patch('/bajarInstitucion',Authentication,AuthorizeRole('Admin'), adminController.DisableInstitution);
router.patch('/bajarUsuario',Authentication,AuthorizeRole('Admin'), adminController.DisableUser);

router.get('/listInstitutiones', Authentication,AuthorizeRole('Admin'), adminController.ListInstitutions);
router.get('/listUsuarios', Authentication,AuthorizeRole('Admin'), adminController.ListUsers);

router.delete('/deleteInstitucion',Authentication,AuthorizeRole('Admin'), adminController.DeleteUsers);
router.delete('/deleteUsuario',Authentication,AuthorizeRole('Admin'), adminController.DeleteUsers);

module.exports = router;