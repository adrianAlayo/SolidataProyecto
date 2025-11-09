const app = require('./app.js');
const sequelize = require('./db/conexion.js');
const syncModels = require('./models/index.js');


// Primero definimos las relaciones
syncModels();

// Luego sincronizamos la base de datos
sequelize.sync({ force: false })
  .then(() => {
    console.log('Tablas y relaciones sincronizadas');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  })
  .catch(err => console.error('Error al sincronizar DB:', err)); 
