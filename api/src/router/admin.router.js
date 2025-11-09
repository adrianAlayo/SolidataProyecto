const express = require('express');
const router = express.Router();

//Inportacion de los controllers
const adminController = require('../controllers/admin.controller.js');//Endpoints
const reportsController = require('../controllers/Reports.controller.js'); //Endpoints

const ValidateRegistration = require('../middlewares/ValidateRegistration.middleware'); //Verifica los campos del registro
const AuthorizeRole = require('../middlewares/AuthorizationRole.middleware.js'); //Controla q sea Admin
const Authentication = require('../middlewares/VerifyToken.middleware.js'); //Verifica el TOKEN

// HELLO
router.get('/', adminController.HelloURL); //Testeado

// Reportes
router.get('/reports/donations', Authentication, AuthorizeRole('admin'), reportsController.Donations) //No testeado
router.get('/reports/baa/received', Authentication, AuthorizeRole('admin'), reportsController.BAAReceived) //No testeado
router.get('/reports/baa/donated', Authentication, AuthorizeRole('admin'), reportsController.BAADonated) //No testeado
router.get('/reports/stock/:article_id', Authentication, AuthorizeRole('admin'), reportsController.Stock) //No testeado
router.get('/reports/stock/users/activity', Authentication, AuthorizeRole('admin'), reportsController.UserActivity) //No testeado



// Delete
router.delete('/delete/institution',Authentication,AuthorizeRole('Admin'), adminController.DeleteUsers);//Testeado
router.delete('/delete/user',Authentication,AuthorizeRole('Admin'), adminController.DeleteUsers);//Testeado
router.delete('/delete/rol',Authentication,AuthorizeRole('Admin'), adminController.DeleteRole);// No Testado



// Create
router.post('/create/role', AuthorizeRole('Admin'), ValidateRegistration, adminController.CreateRole); // No Testado



// List
router.get('/list/institution', Authentication,AuthorizeRole('Admin'), adminController.ListInstitutions); //No testeado
router.get('/list/institution/active', Authentication,AuthorizeRole('Admin'), adminController.ListInstitutionsActive); //Testeado
router.get('/list/institution/inactive',Authentication, AuthorizeRole('Admin'), adminController.ListInstitutionsInactive) // No Testeado
router.get('/list/user', Authentication,AuthorizeRole('Admin'), adminController.ListUsers);



// Accept
router.patch('/acceptInstitucion',Authentication,AuthorizeRole('Admin'), adminController.AcceptInstitution); //No testeado



// Disable
router.patch('/disable/institution',Authentication,AuthorizeRole('Admin'), adminController.DisableInstitution); //Testeado
router.patch('/disable/user',Authentication,AuthorizeRole('Admin'), adminController.DisableUser);//Testeado



// Assign
router.patch('/assignRole', Authentication, AuthorizeRole('Admin'), adminController.AssignRoles); // No Testeado


// Edit
router.patch('/editRole', Authentication, AuthorizeRole('Admin'), adminController.EditRole); // No Testeado


module.exports = router;