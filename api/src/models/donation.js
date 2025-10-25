const sequelize = require('../db/conexion.js');
const {DataTypes} = require('sequelize');

const Donation = sequelize.define('Donations', {
    quantity: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    donation_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    expiration_date: DataTypes.DATE,
    donor: DataTypes.STRING(120),
    note: DataTypes.TEXT,
    status: {
        type: DataTypes.ENUM ('Programado','Entregado','No Entregado'),
        defaultValue: 'Programado',
    },
},{
    timestamps: true,
});

module.exports = Donation