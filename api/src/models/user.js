const sequelize = require('../db/conexion.js');
const {DataTypes} = require('sequelize');

const User = sequelize.define('Users',{
    first_name: {
        type: DataTypes.STRING (50),
        allowNul: false,
    },
    last_name: {
        type: DataTypes.STRING (50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING (32),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING (20),
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
},{
    timestamps: true
});

module.exports = User