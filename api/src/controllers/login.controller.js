const jwt = require('jsonwebtoken');

const Login = async (req, res) => {
  const { user_search, role } = req.userData;

  let token;
  if (role === "Institution") {
    token = CreateTokenInsti(user_search);
  } else{
    token = CreateTokenUser(user_search);
  }

  res.status(200).json({
    message: "Login exitoso",
    role,
    token,
  });
};

function CreateTokenInsti(user) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

function CreateTokenUser(user) {
  const payload = {
    id: user.id,
    name: user.name,
    username: user.username,
    surname: user.surname,
    email: user.email,
    role_id: user.role_id,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

module.exports = { Login };
