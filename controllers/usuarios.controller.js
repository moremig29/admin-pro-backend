const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');

const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async ( req, res = response ) => {

  const desde = Number( req.query.desde ) || 0;

  const [ usuarios, total ] = await Promise.all([
    Usuario.find({}, 'nombre email role google img')
            .skip( desde )
            .limit( 5 ),
    Usuario.countDocuments()
  ])

  res.json({
    ok: true,
    usuarios,
    total
  });

}

const crearUsuario = async ( req, res = response ) => {

  const { password, email } = req.body;

  try {

    const existeEmail = await Usuario.findOne({ email });

    if ( existeEmail ) {
      return res.status( 400 ).json({
        ok: false,
        msg: 'El correo ya está registrado'
      });
    }

    const usuario = new Usuario( req.body );

    //encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );
    
    //guardar usuario
    await usuario.save();

    //generar token
    const token = await generarJWT( usuario.id );

    res.json({
      ok: true,
      usuario,
      token
    });
    
  } catch (error) {

    console.log( error );
    res.status( 500 ).json({
      ok: false,
      msg: 'Error inesperado'
    });

  }



}

const actualizarUsuario = async ( req, res = response ) => {

    // TODO validar token y validar si es el usuario correcto

  const uid = req.params.id;

  try {

    const usuarioDB = await Usuario.findById( uid );

    if ( !usuarioDB ) {
      
      return res.status(404).json({
      ok: false,
      msg: 'no existe un usuario por ese id'
    });
    }

    // Actualizaciones
    const { password, google, email, ...campos } = req.body;

    if ( usuarioDB.email !== email ) {

      const existeEmail = await Usuario.findOne({ email });
      if ( existeEmail ) {
        return res.status( 400 ).json({
          ok: false,
          msg: 'El correo ya está registrado'
        });
      }
    }

    if ( !usuarioDB.google ) {
      campos.email = email;
    } else if ( usuarioDB.email !== email ) {
      return res.status( 400 ).json({
      ok: false,
      msg: 'Usuario de google no puede modificar su correo'
    });
    }

    const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

    res.json({
      ok: true,
      usuario: usuarioActualizado
    });
    
  } catch (error) {
    console.log( error );
    res.status( 500 ).json({
      ok: false,
      msg: 'Error inesperado'
    });
  }
}

const borrarUsuario = async ( req, res = response ) => {

  const uid = req.params.id;

  try {

    const usuarioDB = await Usuario.findById( uid );

    if ( !usuarioDB ) {
      
      return res.status(404).json({
        ok: false,
        msg: 'no existe un usuario por ese id'
      });

    }

    await Usuario.findByIdAndDelete( uid );
  
    res.json({
      ok: true,
      msg: 'Usuario eliminado'
    })
    
  } catch (error) {
    console.log( error );
    res.status( 500 ).json({
      ok: false,
      msg: 'Error inesperado'
    });
  }


}

module.exports = {

  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario

}