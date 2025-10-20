module.exports = (roleRequired) => {
  return (req, res, next) => {
    if (!req.user_find)
      return res.status(401).json({ message: 'No autorizado (falta autenticación)' });

    if (req.user_find.Permiso_Rol !== roleRequired)
      return res.status(403).json({ message: `Se requiere el rol de "${roleRequired}"` });

    next();
  };
};
