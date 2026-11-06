const sequelize = require('../db/conexion.js');
const {DataTypes} = require('sequelize');

const Institution = sequelize.define('Institutions', {
    name: {
        type: DataTypes.STRING(120),
        allowNull: false,
        unique: true,
    },
    location: {
        type: DataTypes.STRING(254),
        allowNull: false,
    },
    latitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    longitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    location_checked_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    location_accuracy: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    institutionType:{
        type: DataTypes.ENUM("Donor","Recipient","Both"),
        defaultValue: "Recipient",
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM ('Active','Inactive','Pending'),
        defaultValue: 'Pending',
    },
},{
    timestamps: false,
});

module.exports = Institution
