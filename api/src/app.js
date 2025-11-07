const express = require('express');
const cors = require('cors');
const app = express();

const institutionRouter = require('./router/institution.router.js');
const employeeCoordinatorRouter = require('./router/employeeCoordinator.router.js');
const employeeOperatorRouter = require('./router/employeeOperator.router.js');
const adminRouter = require('./router/admin.router.js');
const login = require('./router/login.router.js');

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
}));

app.use(express.json());

//Montar los Routers
app.use('/auth',login);
app.use('/employeeOperator', employeeOperatorRouter);
app.use('/employeeCoodinator', employeeCoordinatorRouter);
app.use('/institution', institutionRouter);
app.use('/admin', adminRouter);

// Ruta base de prueba
app.get('/', (req, res) => {
    res.send('LA API FUNCIONA LOCO GOOOOOOOD');
});

module.exports = app;