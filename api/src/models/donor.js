const sequelize = require('../db/conexion.js');
const {DataTypes, Model} = require('sequelize');

const Donor = sequelize.define('Donors',{
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    branch: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    contact_fullname: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    contact_email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true,
        },
    },
    contact_phone: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
});

module.exports = Donor;
