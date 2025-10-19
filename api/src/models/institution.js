const sequelize = require('../db/db.js');
const {DataTypes} = require('sequelize');

const Institution = sequelize.define('Institutions', {
    name: {
        type: DataTypes.STRING (120),
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING (120),
        allowNull: false,
        unique: true,
    },
    location: {
        type: DataTypes.STRING (254),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING (20),
        allowNull: false,
    },
    type: DataTypes.ENUM ('Comedor','Merendero','Hogar de ancianos y niños'),
    status: {
        type: DataTypes.ENUM ('Activo','Inactivo','Pendiente'),
        defaultValue: 'Pendiente',
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    timestamps: true,
});

module.exports = Institution