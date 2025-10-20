const jwt= require('jsonwebtoken');

const verifyToken = (req, res, next ) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(401).json({message: 'No introdujo un TOKEN'})
    
    const token = authHeader.split(" ")[1];

    try{
        const CODE_DECRIPTATION = jwt.verify(token,process.env.JWT_SECRET);
        console.log(req.user_find)
        
        //* Guardamos los datos desencriptados en req.user para que otros ENDPOINTS puedan usarlo
        req.user_find = CODE_DECRIPTATION;

        next();
    }catch(error){
        // Si el roken es invalido o ya expiro
        return res.status(403).json({error: 'Token expirado o invalido'})
    } 
}

module.exports = verifyToken;