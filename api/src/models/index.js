// models/index.js
const sequelize = require('../db/conexion.js');

// Importación de modelos
const Role = require('./role.js');
const User = require('./user.js');
const Institution = require('./institution.js');
const Article = require('./article.js');
const Variant = require('./variant.js');
const Donation = require('./donation.js');
const Stock = require('./stock.js');
const Assignment = require('./assignment.js');
const Delivery = require('./delivery.js');
const Report = require('./report.js');

// Definición de relaciones
const syncModels = () => {
  Role.hasMany(User, { foreignKey: 'role_id' });
  User.belongsTo(Role, { foreignKey: 'role_id' });

  User.hasMany(Institution, { foreignKey: 'contact_user_id' });
  Institution.belongsTo(User, { foreignKey: 'contact_user_id' });

  Article.hasMany(Variant, { foreignKey: 'article_id' });
  Variant.belongsTo(Article, { foreignKey: 'article_id' });

  Variant.hasMany(Donation, { foreignKey: 'variant_id' });
  Donation.belongsTo(Variant, { foreignKey: 'variant_id' });

  User.hasMany(Donation, { foreignKey: 'registered_by' });
  Donation.belongsTo(User, { foreignKey: 'registered_by' });

  Variant.hasOne(Stock, { foreignKey: 'variant_id' });
  Stock.belongsTo(Variant, { foreignKey: 'variant_id' });

  Donation.hasMany(Assignment, { foreignKey: 'donation_id' });
  Assignment.belongsTo(Donation, { foreignKey: 'donation_id' });

  Institution.hasMany(Assignment, { foreignKey: 'institution_id' });
  Assignment.belongsTo(Institution, { foreignKey: 'institution_id' });

  Assignment.hasMany(Delivery, { foreignKey: 'assignment_id' });
  Delivery.belongsTo(Assignment, { foreignKey: 'assignment_id' });

  User.hasMany(Delivery, { foreignKey: 'responsible_user_id' });
  Delivery.belongsTo(User, { foreignKey: 'responsible_user_id' });

  User.hasMany(Report, { foreignKey: 'user_id' });
  Report.belongsTo(User, { foreignKey: 'user_id' });
}

module.exports = syncModels;