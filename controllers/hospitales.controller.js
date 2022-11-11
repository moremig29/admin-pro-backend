const { response } = require('express');
const bcrypt = require('bcryptjs');

const Hospital = require('../models/hospital.model');

const getHospitales = async ( req, res ) => {

  const hospitales = await Hospital.find()
                                  .populate('usuario', 'nombre img');

  res.json({
    ok: true,
    hospitales
  });

}
const crearHospital = async ( req, res ) => {

  const uid = req.uid;
  const hospital = new Hospital({ 
    usuario: uid,
    ...req.body 
  });

  try {

    const hospitalDB = await hospital.save()

    res.json({
      ok: true,
      hospital: hospitalDB
    }); 
    
  } catch (error) {
    console.log( error )
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado'
    });
  }

}
const actualizarHospital = async ( req, res = response ) => {

  const id = req.params.id;
  const uid = req.uid;

  try {

    const hospitalDB = await Hospital.findById( id );

    if ( !hospitalDB ) {
      return res.status(404).json({
      ok: false,
      msg: 'Hospital no encontrado'
    });
    }

    const cambiosHospital = {
      ...req.body,
      usuario: uid
    }

    const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, { new: true } );

    res.json({
      ok: true,
      hospital: hospitalActualizado
    });
  } catch (error) {
    console.log( error )
    res.status(500).json({
      ok: false,
      msg: 'contacte al administrador'
    });
  }

}
const borrarHospital = async ( req, res ) => {

  const id = req.params.id;

  try {

    const hospitalDB = await Hospital.findById( id );

    if ( !hospitalDB ) {
      return res.status(404).json({
      ok: false,
      msg: 'Hospital no encontrado'
    });
    }

    const hospitalEliminado = await Hospital.findByIdAndDelete( id );

    res.json({
      ok: true,
      hmsg: 'Hospital eliminado'
    });
  } catch (error) {
    console.log( error )
    res.status(500).json({
      ok: false,
      msg: 'contacte al administrador'
    });
  }
  
}

module.exports = {

  getHospitales,
  crearHospital,
  actualizarHospital,
  borrarHospital

}