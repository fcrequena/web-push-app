require('dotenv').config();
const express = require('express');
const morgan = require('morgan')
const app = express();

const path = require('path')
//Middlewares
app.use(morgan('dev'))
// le decimos al servidor que entienda los datos
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
app.use(require('./routes/index'));

// Static Content
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);
console.log('Servidor iniciado');