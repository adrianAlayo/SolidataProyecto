const sequelize = require('../db/conexion.js');

// import de modelos
const Article = require('../models/article.js');
const Donation = require('../models/donation.js');
const DonationItems = require('../models/donationItem.js');
const Institution = require('../models/institution.js');
const InstitutionNeeds = require('../models/institutionneed.js');
const Inventory = require('../models/inventory.js');
const Role = require('../models/role.js');
const User = require('../models/user.js');
const Type = require('../models/type.js');
const Entity = require('../models/entity.js');
const Action = require('../models/action.js');
const Permission = require('../models/permission.js');
const RolePermission = require('../models/rolepermission.js');


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
    // Usuario responsable que registra la donación
    User.hasMany(Donation, { foreignKey: 'responsable_user_id' });
    Donation.belongsTo(User, { as: 'responsable', foreignKey: 'responsable_user_id' });

    // User 1 : N Donation
    User.hasMany(Donation, {
        foreignKey: 'donor_id'
    });

    Donation.belongsTo(User, {
        as: 'donor',          // Alias para consultar
        foreignKey: 'donor_id'
    });
    // Institutions - Donations (1:N)
    // Institución que recibe la donación
    Institution.hasMany(Donation, { foreignKey: 'receiver_institution_id' });
    Donation.belongsTo(Institution, { as: 'receiver_institution', foreignKey: 'receiver_institution_id' });

    // Donations - DonationItems (1:N)
    Donation.hasMany(DonationItems, { foreignKey: 'donation_id' });
    DonationItems.belongsTo(Donation, { foreignKey: 'donation_id' });

    // DonationItems - Articles (N:1)
    Article.hasMany(DonationItems, { foreignKey: 'article_id' });
    DonationItems.belongsTo(Article, { foreignKey: 'article_id' });

    // DonationItems - Inventories (1:N)
    DonationItems.hasMany(Inventory, { foreignKey: 'donation_item_id' });
    Inventory.belongsTo(DonationItems, { foreignKey: 'donation_item_id' });

    // Institutions - InstitutionNeeds (1:N)
    Institution.hasMany(InstitutionNeeds, { foreignKey: 'institution_id' });
    InstitutionNeeds.belongsTo(Institution, { foreignKey: 'institution_id' });

    // Articles - InstitutionNeeds (1:N)
    Article.hasMany(InstitutionNeeds, { foreignKey: 'article_id' });
    InstitutionNeeds.belongsTo(Article, { foreignKey: 'article_id' });

    // ENTITIES (1:N) PERMISSIONS
    Entity.hasMany(Permission, { foreignKey: 'entity_id' });
    Permission.belongsTo(Entity, { foreignKey: 'entity_id' });

    // ACTIONS (1:N) PERMISSIONS
    Action.hasMany(Permission, { foreignKey: 'action_id' });
    Permission.belongsTo(Action, { foreignKey: 'action_id' });

    // ROLES (N:M) PERMISSIONS → role_permissions
    Role.belongsToMany(Permission, {
        through: RolePermission,
        foreignKey: 'role_id'
    });

    Permission.belongsToMany(Role, {
        through: RolePermission,
        foreignKey: 'permission_id'
    });
};

module.exports = syncModels;