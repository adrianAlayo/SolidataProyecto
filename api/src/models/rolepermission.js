const sequelize = require('../db/conexion.js');
const {DataTypes} = require('sequelize');

const RolePermission = sequelize.define('RolePermission',{
},{
    timestamps: false,
})

module.exports = RolePermission