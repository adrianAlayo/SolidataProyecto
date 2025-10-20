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


// Roles → Users (1:N)
Role.hasMany(User, { foreignKey: 'role_id' });
User.belongsTo(Role, { foreignKey: 'role_id' });

// Users → Institutions (1:N)
User.hasMany(Institution, { foreignKey: 'contact_user_id' });
Institution.belongsTo(User, { foreignKey: 'contact_user_id' });

// Articles → Variants (1:N)
Article.hasMany(Variant, { foreignKey: 'article_id' });
Variant.belongsTo(Article, { foreignKey: 'article_id' });

// Variants → Donations (1:N)
Variant.hasMany(Donation, { foreignKey: 'variant_id' });
Donation.belongsTo(Variant, { foreignKey: 'variant_id' });

// Users → Donations (1:N)
User.hasMany(Donation, { foreignKey: 'registered_by' });
Donation.belongsTo(User, { foreignKey: 'registered_by' });

// Variants → Stock (1:1)
Variant.hasOne(Stock, { foreignKey: 'variant_id' });
Stock.belongsTo(Variant, { foreignKey: 'variant_id' });

// Donations → Assignments (1:N)
Donation.hasMany(Assignment, { foreignKey: 'donation_id' });
Assignment.belongsTo(Donation, { foreignKey: 'donation_id' });

// Institutions → Assignments (1:N)
Institution.hasMany(Assignment, { foreignKey: 'institution_id' });
Assignment.belongsTo(Institution, { foreignKey: 'institution_id' });

// Assignments → Deliveries (1:N o 1:1 según lógica)
Assignment.hasMany(Delivery, { foreignKey: 'assignment_id' });
Delivery.belongsTo(Assignment, { foreignKey: 'assignment_id' });

// Users → Deliveries (1:N)
User.hasMany(Delivery, { foreignKey: 'responsible_user_id' });
Delivery.belongsTo(User, { foreignKey: 'responsible_user_id' });

// Users → Reports (1:N)
User.hasMany(Report, { foreignKey: 'user_id' });
Report.belongsTo(User, { foreignKey: 'user_id' });


module.exports = {
  sequelize,
  Role,
  User,
  Institution,
  Article,
  Variant,
  Donation,
  Stock,
  Assignment,
  Delivery,
  Report,
};
