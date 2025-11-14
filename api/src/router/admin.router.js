const express = require('express');
const router = express.Router();

//Inportacion de los controllers
const adminController = require('../controllers/admin/admin.controller.js');//Endpoints
const reportsController = require('../controllers/Reports.controller.js'); //Endpoints


//Middlewares
const ValidateRegistration = require('../middlewares/ValidateRegistration.middleware'); //Verifica los campos del registro
const AuthorizeRole = require('../middlewares/AuthorizationRole.middleware.js'); //Controla q sea Admin
const Authentication = require('../middlewares/VerifyToken.middleware.js'); //Verifica el TOKEN

// HELLO
router.get('/', adminController.helloURL); //Testeado


// ========== REPORTS ==========
router.get('/reports/donations', Authentication, AuthorizeRole('admin'), reportsController.Donations) //No testeado
router.get('/reports/baa/received', Authentication, AuthorizeRole('admin'), reportsController.BAAReceived) //No testeado
router.get('/reports/baa/donated', Authentication, AuthorizeRole('admin'), reportsController.BAADonated) //No testeado
router.get('/reports/stock/:article_id', Authentication, AuthorizeRole('admin'), reportsController.Stock) //No testeado
router.get('/reports/stock/activity', Authentication, AuthorizeRole('admin'), reportsController.UserActivity) //No testeado



// ========== INSTITUTIONS ==========
router.get('/institutions', Authentication,AuthorizeRole('Admin'), adminController.getInstitutions); //No testeado
router.get('/institution/active', Authentication,AuthorizeRole('Admin'), adminController.getInstitutionsActive); //Testeado
router.get('/institution/inactive',Authentication, AuthorizeRole('Admin'), adminController.getInstitutionsInactive) // No Testeado
router.patch('/institution/accept',Authentication,AuthorizeRole('Admin'), adminController.acceptInstitution); //No testeado
router.patch('/disable/institution',Authentication,AuthorizeRole('Admin'), adminController.disableInstitution); //Testeado
router.delete('/institution',Authentication,AuthorizeRole('Admin'), adminController.deleteInstitution);//Testeado



// ========== USERS ==========
router.post('/user',Authentication,AuthorizeRole('Admin'), adminController.createUser); //Testeado
router.delete('/user',Authentication,AuthorizeRole('Admin'), adminController.deleteUsers);//Testeado
router.get('/user', Authentication,AuthorizeRole('Admin'), adminController.getUsers);
router.patch('/user',Authentication,AuthorizeRole('Admin'), adminController.disableUser);//Testeado



// ========== TYPES ==========
router.post('/type',Authentication,AuthorizeRole('Admin'), adminController.createType);// Testado

// ========== ARTICLE ==========
router.post('/articles',Authentication,AuthorizeRole('Admin'), adminController.createArticle);// Testado



// ========== ROLES ==========
router.delete('/roles',Authentication,AuthorizeRole('Admin'), adminController.deleteRole);// No Testado
router.post('/roles', Authentication,AuthorizeRole('Admin'), adminController.createRole); // Testado
router.patch('/roles/assign', Authentication, AuthorizeRole('Admin'), adminController.assignRoles); // No Testeado
router.patch('/roles/edit', Authentication, AuthorizeRole('Admin'), adminController.editRole); // No Testeado


module.exports = router;