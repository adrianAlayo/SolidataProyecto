const sequelize = require('../db/conexion.js');
const {DataTypes, ENUM, INTEGER} = require('sequelize');

const InstitutionsNeeds = sequelize.define('InstitutionsNeeds',{
    available:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: ENUM("Pending", "Resolved"),
        defaultValue: "Pending",
        allowNull: false
    },
});

module.exports = InstitutionsNeeds;