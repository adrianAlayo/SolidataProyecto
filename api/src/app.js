    const express = require('express');
    const cors = require('cors');
    const app = express();



    app.use(cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
        allowedHeaders: ['Content-Type', 'Authorization'], 
        credentials: true, 
    }));

    app.use(express.json());

    //Montar los Routers


    // Ruta base de prueba
    app.get('/', (req, res) => {
        res.send('LA API FUNCIONA LOCO GOOOOOOOD');
    });

    module.exports = app;