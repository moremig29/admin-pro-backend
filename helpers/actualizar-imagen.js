const fs = require('fs');

const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');

const borrarImagen = ( path ) => {
  if ( fs.existsSync( path ) ) {
    //borrar imagen anterior
    fs.unlinkSync( path );
  }
}

const actualizarImagen = async ( tipo, id, nombreArchivo ) => {

  let pathViejo = ''

  switch ( tipo ) {
    case 'medicos':
        const medicoDB = await Medico.findById(id);
        if( !medicoDB ) {
          console.log('No se encontro el médico');
          return false;
        }

        pathViejo = `./uploads/medicos/${ medicoDB.img }`;
        borrarImagen( pathViejo );

        medicoDB.img = nombreArchivo;
        await medicoDB.save();
        return true;
      break;
    case 'hospitales':
        const hospitalDB = await Hospital.findById(id);
        if( !hospitalDB ) {
          console.log('No se encontro el hospital');
          return false;
        }

        pathViejo = `./uploads/hospitales/${ hospitalDB.img }`;
        borrarImagen( pathViejo );

        hospitalDB.img = nombreArchivo;
        await hospitalDB.save();
        return true;
      break;
    case 'usuarios':
        const usuarioDB = await Usuario.findById(id);
        if( !usuarioDB ) {
          console.log('No se encontro el usuario');
          return false;
        }

        pathViejo = `./uploads/usuarios/${ usuarioDB.img }`;
        borrarImagen( pathViejo );

        usuarioDB.img = nombreArchivo;
        await usuarioDB.save();
        return true;
      break;
  
    default:
      break;
  }

}

module.exports = {
  actualizarImagen
}