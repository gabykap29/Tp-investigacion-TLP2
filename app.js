const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { sequelize } = require('./db');

const app = express();

require('ejs');
app.set('view engine',"ejs");

app.use(express.static('public'));
app.use(fileUpload({
    useTempFiles:true,
    limits:{fileSize: 50 * 2024 * 1024}
}));

//midlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// app.use(cors());
//variables de entorno
dotenv.config({path:'.env'})

app.use(require('./routes/router'));


sequelize.authenticate()
    .then(()=> console.log('Conexión a la base de datos exitosa'))
    .catch((error)=>console.log('Error al conectar a la base de datos'))

const port = process.env.PORT;
const host = 'localhost';

app.listen(port,host,() =>{
    console.log(`Servidor corriento en http://${host}:${port}/index` );
})