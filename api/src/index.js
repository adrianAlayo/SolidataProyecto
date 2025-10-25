const app = require('./app.js');
const sequelize = require('./db/conexion.js');

const startServer = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Tablas sincronizadas');
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${process.env.PORT}`));
  } catch (err) {
    console.error('No se pud sincronzar la base de datos:', err);
  }
};

startServer();
