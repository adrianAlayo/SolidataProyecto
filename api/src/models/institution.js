const sequelize = require('../db/conexion.js');
const {DataTypes} = require('sequelize');

const Institution = sequelize.define('Institutions', {
    name: {
        type: DataTypes.STRING(120),
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(120),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING(254),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('Comedor','Merendero','Hogar de ancianos y niños'),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM ('Activo','Inactivo','Pendiente'),
        defaultValue: 'Pendiente',
    },
});

module.exports = Institution