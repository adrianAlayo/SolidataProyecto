// controllers/admin/admin.controller.js

const UsersController = require('./user.controller');
const InstitutionsController = require('./institution.controller');
const RolesController = require('./role.controller');
const TypeController = require('./type.controller');
const ArticleController = require('./article.controller')

const helloURL = (_req,res) =>{
    res.status(200).send("La URL /admin  funciona todo GOOOOOTI");
}

//* TIENE TOODOS LOS PERMISOS

module.exports = {
    helloURL,
    ...ArticleController,
    ...TypeController,
    ...UsersController,
    ...InstitutionsController,
    ...RolesController
};
