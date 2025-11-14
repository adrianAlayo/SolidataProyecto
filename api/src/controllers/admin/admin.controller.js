// controllers/admin/admin.controller.js

const UsersController = require('./users.controller');
const InstitutionsController = require('./institutions.controller');
const RolesController = require('./roles.controller');
const TypeController = require('./type.controller');
const ArticleController = require('./article.controller')

const helloURL = (_req,res) =>{
    res.status(200).send("La URL /admin  funciona todo GOOOOOTI");
}

module.exports = {
    helloURL,
    ...ArticleController,
    ...TypeController,
    ...UsersController,
    ...InstitutionsController,
    ...RolesController
};
