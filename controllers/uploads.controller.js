const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = ( req, res = response ) => {

  const { tipo, id } = req.params;

  //validar tipo
  const tiposValidos = [ 'hospitales', 'medicos', 'usuarios' ];
  if ( !tiposValidos.includes(tipo) ) {
    return res.status(400).json({
      ok: false,
      msg: 'No es un medico, usuario u hospital (tipo)'
    });
  }

  // validar que la imagen existe en la peticion
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: 'No se seleccionó ningún archivo'
    });
  }

  // procesar la imagen
  const file = req.files.imagen;

  const nombreCortado = file.name.split('.');
  const extensionArchivo = nombreCortado[ nombreCortado.length -1 ];

  //validar extension
  const extensionesValidas = ['png','jpg','jpeg','gif'];
    if ( !extensionesValidas.includes(extensionArchivo) ) {
    return res.status(400).json({
      ok: false,
      msg: 'No es una extension permitida'
    });
  }

  //generar Nombre Archivo
  const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`

  // crear el path para guardar imagen
  const path = `./uploads/${ tipo }/${ nombreArchivo }`;

  // mover la imagen
  file.mv( path, ( err ) => {
    if (err) {
      console.log( err )
      return res.status(500).json({
        ok: false,
        msg: 'No se pudo guardar la imagen'
      });
    }

    //Actualizar base de datos
    actualizarImagen( tipo, id, nombreArchivo );

    res.json({
      ok: true,
      msg: 'Archivo guardado',
      nombreArchivo
    });
  });


}

const retornaImagen = ( req, res = response ) => {

  const { tipo, foto } = req.params;

  const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }`);

  //imagen por defecto
  if ( fs.existsSync( pathImg )) {

    res.sendFile( pathImg );
  } else {
    const pathImg = path.join( __dirname, `../uploads/no_img.jpg`);
    res.sendFile( pathImg );
  }


}

module.exports = {
  fileUpload,
  retornaImagen
}