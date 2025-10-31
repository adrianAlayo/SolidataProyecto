const express = require('express');
const router = express.Router();

//Inportacion de los controllers
const adminController = require('../controllers/admin.controller.js');//Endpoint

const ValidateRegistration = require('../middlewares/ValidateRegistration.middleware'); //Verifica los campos del registro
const AuthorizeRole = require('../middlewares/AuthorizationRole.middleware.js'); //Controla q sea Admin
const Authentication = require('../middlewares/VerifyToken.middleware.js'); //Verifica el TOKEN




router.post('/registerEmployee', AuthorizeRole('Admin'), ValidateRegistration, adminController.RegisterEmployee); //Testeado
router.post('/CreateRole', Authentication, AuthorizeRole('Admin'), adminController.ManageRolesAndPermissions) // No creado el codigo



router.patch('/acceptInstitucion',Authentication,AuthorizeRole('Admin'), adminController.AcceptInstitution); //No testeado
router.patch('/disableInstitution',Authentication,AuthorizeRole('Admin'), adminController.DisableInstitution); //Testeado
router.patch('/disableUser',Authentication,AuthorizeRole('Admin'), adminController.DisableUser);//Testeado
router('/AssignRole', Authentication, AuthorizeRole('Admin'), adminController.AssignRoles); // No creado el codigo



router.get('/', adminController.HelloURL); //Testeado
router.get('/listInstitution', Authentication,AuthorizeRole('Admin'), adminController.ListInstitutionsActive); //Testeado
router.get('/listUser', Authentication,AuthorizeRole('Admin'), adminController.ListUsers);
router.get('/listInstitutionInactive',Authentication, AuthorizeRole('Admin'), adminController.ListInstitutionsInactive) // //No Testeado
router.get('/GenerateReport',Authentication,AuthorizeRole('Admin'), adminController.GenerateReports); // No Creado el codigo
router.get('/logUser', Authentication, AuthorizeRole('Admin'), adminController.ViewAuditLogs); // No Creado el Codigo
router.get('/GenAlert') // No Creado el Codigo



router.delete('/deleteInstitution',Authentication,AuthorizeRole('Admin'), adminController.DeleteUsers);//Testeado
router.delete('/deleteUser',Authentication,AuthorizeRole('Admin'), adminController.DeleteUsers);//Testeado



module.exports = router;