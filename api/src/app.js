const express = require('express');
const cors = require('cors');
const app = express();

//Llamado de los routers
const articleRouter = require('./router/article.routes');
const authRouter = require('./router/auth.routes');
const userRouter = require('./router/user.routes');
const donationRouter = require('./router/donation.routes');
const donationItemRouter = require('./router/donationItem.routes');
const institutionRouter = require('./router/institution.routes');




app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
}));

app.use(express.json());

//Montar los Routers
app.use('/auth',authRouter);

app.use('/articles', articleRouter);
app.use('/user', userRouter);
app.use('/donation', donationRouter);
app.use('/item', donationItemRouter);
app.use('/institution', institutionRouter);

// Ruta base de prueba
app.get('/', (req, res) => {
    res.send('LA API FUNCIONA LOCO GOOOOOOOD');
});

module.exports = app;