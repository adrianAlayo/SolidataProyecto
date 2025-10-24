const app = require('./app.js');
const sequelize = require('./db/conexion.js');

const PORT = process.env.PORT;

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Tablas sincronizadas');
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  })
  .catch(err => console.error('❌ Error al sincronizar DB:', err));
