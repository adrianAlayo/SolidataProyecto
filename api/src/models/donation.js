const sequelize = require('../db/conexion.js');
const {DataTypes} = require('sequelize');

const Donation = sequelize.define('Donations', {
    donation_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM ('Programado','Entregado','No Entregado'),
        defaultValue: 'Programado',
    },
    note: DataTypes.TEXT,
},{
    timestamps: true,
});

module.exports = Donation