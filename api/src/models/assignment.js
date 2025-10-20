const sequelize = require('../db/conexion.js');
const {DataType, DataTypes} = require('sequelize');

const Assignment = sequelize.define('Assignments', {
    quantity_assigned: DataTypes.DECIMAL (10,2),
    assignment_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Programado','En camino', 'Entregado','No entregado'),
        defaultValue: 'Programado',
    },
    note: DataTypes.TEXT,
},{
    timestamps: true,
});

module.exports = Assignment