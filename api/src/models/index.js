const sequelize = require('../db/conexion.js');

// import de modelos
const Article = require('./article.js');
const Donation = require('./donation.js');
const DonationItems = require('./donationItem.js');
const Institution = require('./institution.js');
const InstitutionNeeds = require('./institutionneed.js');
const Inventory = require('./inventory.js');
const Role = require('./role.js');
const User = require('./user.js');
const Type = require('./type.js');



// Definición de relaciones
const syncModels = () => {

    // Roles - Users (1:N)
    Role.hasMany(User, { foreignKey: 'role_id' });
    User.belongsTo(Role, { foreignKey: 'role_id' });

    // Types - Institutions (1:N)
    Type.hasMany(Institution, { foreignKey: 'type_id' });
    Institution.belongsTo(Type, { foreignKey: 'type_id' });

    // Institution - User (1:1) → la FK está en User
    Institution.hasOne(User, { foreignKey: { name: 'institution_id', allowNull: true } });
    User.belongsTo(Institution, { foreignKey: { name: 'institution_id', allowNull: true } });

    // Users - Donations (1:N)
    User.hasMany(Donation, { foreignKey: 'responsable_user_id' });
    Donation.belongsTo(User, { foreignKey: 'responsable_user_id' });

    // Institutions - Donations (1:N)
    Institution.hasMany(Donation, { foreignKey: 'institution_id' });
    Donation.belongsTo(Institution, { foreignKey: 'institution_id' });

    // Donations - DonationItems (1:N)
    Donation.hasMany(DonationItems, { foreignKey: 'donation_id' });
    DonationItems.belongsTo(Donation, { foreignKey: 'donation_id' });

    // DonationItems - Inventories (1:N)
    DonationItems.hasMany(Inventory, { foreignKey: 'donation_item_id' });
    Inventory.belongsTo(DonationItems, { foreignKey: 'donation_item_id' });

    // Articles - DonationItems (1:N)
    Article.hasMany(DonationItems, { foreignKey: 'article_id' });
    DonationItems.belongsTo(Article, { foreignKey: 'article_id' });
    
    // Institutions - InstitutionNeeds (1:N)
    Institution.hasMany(InstitutionNeeds, { foreignKey: 'institution_id' });
    InstitutionNeeds.belongsTo(Institution, { foreignKey: 'institution_id' });

    // Articles - InstitutionNeeds (1:N)
    Article.hasMany(InstitutionNeeds, { foreignKey: 'article_id' });
    InstitutionNeeds.belongsTo(Article, { foreignKey: 'article_id' });
};

module.exports = syncModels;