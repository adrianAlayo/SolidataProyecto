const sequelize = require('../db/db.js');
const {DataTypes} = require('sequelize');

const Delivery = sequelize.define('Deliveries', {
    scheduled_date: DataTypes.DATE,
    actual_date: DataTypes.DATE,
    confirmed_by: DataTypes.STRING (100),
    status: {
        type: DataTypes.ENUM ('Programado','En camino','Entregado','No recibido'),
        defaultValue: 'Programado',
    },
}, {
    timestamps: true,
});

module.exports = Delivery