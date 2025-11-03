const sequelize = require('../db/conexion.js');
const {DataTypes, ENUM} = require('sequelize');

const InstitutionsNeeds = sequelize.define('InstitutionsNeeds',{
    status: {
        type: ENUM("Pendiente", "Completa"),
        defaultValue: "Pendiente",
        allowNull: false
    },
});

module.exports = InstitutionsNeeds;