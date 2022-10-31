const { response } = require('express');
const bcrypt = require('bcryptjs');

const Medico = require('../models/medico.model');

const getMedicos = async ( req, res ) => {

  const medicos = await Medico.find()
                              .populate('usuario', 'nombre img')
                              .populate('hospital', 'nombre img');

  res.json({
    ok: true,
    medicos
  });

}
const crearMedico = async ( req, res ) => {

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
const actualizarMedico = ( req, res ) => {

    res.json({
    ok: true,
    msg: 'actualizar medico'
  });
  
}
const borrarMedico = ( req, res ) => {

    res.json({
    ok: true,
    msg: 'borrar medico'
  });
  
}

module.exports = {

  getMedicos,
  crearMedico,
  actualizarMedico,
  borrarMedico

}