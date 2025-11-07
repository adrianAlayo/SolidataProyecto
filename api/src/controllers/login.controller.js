const jwt = require('jsonwebtoken');

const HelloURL = (req,res) =>{
    res.status(200).send("La URL /log funciona todo GOOOOOTI");
}

// Endpoints de login .... POST
const Login = async (req, res) => {
    try {
        const {userInfo,userType} = req.userData
        
        let token;
        // Determinar rol seguro
        if (userType === "institution") {
            token = CreateTokenInsti(userInfo);
        } else if(userType === "user")  {
            token = CreateTokenUser(userInfo);
        }
        else {
            return res.status(700).send({message: "Ocurrio un ERROR inesperado No sabe mos que ocurrio"})
        }

        res.status(200).json({
            message: "Login exitoso",
            token,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Error!!! a la hora de Autenticar: -> " + e});
    }
};


// Funciones para la logica de creacion de TOKEN
function CreateTokenInsti(user) {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type,
        userRelation: user.contact_user_id,
        roleName: user.User && user.User.Role ? user.User.Role.name : null, // nombre del rol del contacto
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}
function CreateTokenUser(user) {
    const payload = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        roleName: user.Role ? user.Role.name : null, // nombre del rol del usuario,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

module.exports = { 
    Login,
    HelloURL,
};
