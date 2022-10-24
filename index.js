require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConn } = require('./database/config')

//Crear Servidor
const app = express();

//config CORS

app.use(cors());

//base de datos
dbConn();

//rutas
app.get( '/', ( req, res ) => {

  res.json({
    ok: true,
    msg: 'Hola mundo'
  })

});

app.listen( process.env.PORT, () => {
  console.log( 'Servidor en el puerto ' + process.env.PORT );
});
