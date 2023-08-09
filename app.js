const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

const app = express();

require('ejs');
app.set('view engine',"ejs");

app.use(express.static('public'));

//midlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// app.use(cors());
//variables de entorno
dotenv.config({path:'./env/.env'})

app.use(require('./routes/router'));

const port = process.env.PORT;
const host = 'localhost';

app.listen(port,host,() =>{
    console.log(`Servidor corriento en http://${host}:${port}/` );
})