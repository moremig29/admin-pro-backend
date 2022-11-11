const { response } = require('express');

const Medico = require('../models/medico.model');

const getMedicos = async ( req, res = response ) => {

  const medicos = await Medico.find()
                              .populate('usuario', 'nombre img')
                              .populate('hospital', 'nombre img');

  res.json({
    ok: true,
    medicos
  });

}
const crearMedico = async ( req, res = response ) => {

  const uid = req.uid;
  const medico = new Medico({ 
    usuario: uid,
    ...req.body 
  });

  try {

    const medicoDB = await medico.save();

    res.json({
      ok: true,
      medico: medicoDB
    });
    
  } catch (error) {
    console.log( error )
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado'
    });
  }


  
}
const actualizarMedico = async ( req, res = response ) => {

  const uid = req.uid;
  const id = req.params.id

  try {

    const medicoDB = await Medico.findById( id );

    if ( !medicoDB ) {
      res.json.status(404)({
        ok: false,
        msg: 'Médico no encontrado'
      });
    }

    const cambiosMedico = {
      ...req.body,
      usuario: uid
    }

    const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, { new: true } );

    
    res.json({
      ok: true,
      msg: 'actualizar medico',
      medico: medicoActualizado
    });

  } catch (error) {
    console.log( error );
    res.json.status(500)({
      ok: false,
      msg: 'Contacte al administrador'
    });
  }
  
}
const borrarMedico = async ( req, res = response ) => {

  const id = req.params.id

  try {

    const medicoDB = await Medico.findById( id );

    if ( !medicoDB ) {
      res.json.status(404)({
        ok: false,
        msg: 'Médico no encontrado'
      });
    }

    const medicoEliminado = await Medico.findByIdAndDelete( id );

    
    res.json({
      ok: true,
      msg: 'Médico eliminado'
    });

  } catch (error) {
    console.log( error );
    res.json.status(500)({
      ok: false,
      msg: 'Contacte al administrador'
    });
  }
  
}

module.exports = {

  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico

}