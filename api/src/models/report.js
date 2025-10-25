const sequelize = require('../db/conexion.js');
const {DataTypes} = require('sequelize');

const Report = sequelize.define('Reports',{
    report_type: DataTypes.STRING(100),
    description: DataTypes.TEXT,
    createAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
});

module.exports = Report