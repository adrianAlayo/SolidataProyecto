const { where } = require('sequelize');
const bcrypt = require('bcrypt');
const INSTITUTION = require('../models/institution');
const USER = require('../models/user');
const ROLE = require('../models/role');
const Donation

const ReportsDonations = async (req,res) =>{
    //! Genera reportes sobre las donaciones recibidas
    const donations_found = await     
}
const ReportDonationsReceived = async (req,res) =>{
    //! Genera reportes sobre las donaciones recibidas
}
const ReportDonationsMade = async (req,res) =>{
    //! Genera reportes personalizados sobre donaciones realizadas 
}
const ReportStock = async (req,res) =>{
    //! Genera reportes sobre stock disponible
}
const ReportUserActivities = async (req,res) =>{
    //! Genera reportes sobre la actividad de usuarios 
}