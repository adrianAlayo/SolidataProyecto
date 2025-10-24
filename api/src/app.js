const express = require('express');
const cors = require('cors');
const app = express();

const institutionRouter = require('./router/institution.router.js');
const employeeRouter = require('./router/employee.router.js');
const adminRouter = require('./router/admin.router.js');
const login = require('./router/login.router.js');

app.use(cors({
    origin: 'http://localhost:5173', // quién puede acceder
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // headers permitidos
    credentials: true, // permite cookies o tokens
}));

app.use(express.json());

//Montar los Routers
app.use('/login',login);
app.use('/employee', employeeRouter);
app.use('/institution', institutionRouter);
app.use('/admin', adminRouter);

// Ruta base de prueba
app.get('/', (req, res) => {
    res.send('LA API FUNCIONA LOCO GOOOOOOOD');
});

module.exports = app;