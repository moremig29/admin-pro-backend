require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConn } = require('./database/config')

//Crear Servidor
const app = express();

//config CORS
app.use(cors());

// lectura y parseo del body
app.use( express.json() );

//base de datos
dbConn();

//rutas
app.use( '/api/usuarios', require('./routes/usuariosRoutes') );
app.use( '/api/login', require('./routes/authRoutes') );

app.listen( process.env.PORT, () => {
  console.log( 'Servidor en el puerto ' + process.env.PORT );
});
