const jwt = require('jsonwebtoken');
const PRIMARY_KEY = require('../config/keys');

module.exports = (req,res,next) =>{
    if(!req.user_find) return res.status(401).json({message: 'No autorizado'});
    
    if(req.user_find.Permiso_Rol != 'admin') return res.status(403).json({message: 'Requieres del rol de "admin" CRACK'});
    
    next();
}
