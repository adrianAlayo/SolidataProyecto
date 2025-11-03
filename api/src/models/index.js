// models/index.js
const sequelize = require('../db/conexion.js');

// Importación de modelos
const Role = require('./role.js');
const User = require('./user.js');
const Institution = require('./institution.js');
const Article = require('./article.js');
const Donation = require('./donation.js');

// Definición de relaciones
//! MIRAR LAS RELACIONES
const syncModels = () => {
  Role.hasMany(User, { foreignKey: 'role_id' });
  User.belongsTo(Role, { foreignKey: 'role_id' });

  User.hasMany(Institution, { foreignKey: 'contact_user_id' });
  Institution.belongsTo(User, { foreignKey: 'contact_user_id' });

}

module.exports = syncModels;