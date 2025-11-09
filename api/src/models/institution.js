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
    institutionType:{
        type: DataTypes.ENUM("Donor","Recipient","Both"),
        defaultValue: "Recipient",
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM ('Active','Inactive','Pending'),
        defaultValue: 'Pending',
    },
});

module.exports = Institution