/* Ruta: api/medicos */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getMedicos, crearMedico, actualizarMedico, borrarMedico, getMedicosById } = require('../controllers/medicos.controller')

const router = Router();

router.get( '/', validarJWT, getMedicos );

router.post( '/', [
  validarJWT,
  check('nombre', 'el nombre del medico es necesario').not().isEmpty(),
  check('hospital', 'el hospital id debe ser valido').isMongoId(),
  validarCampos
], crearMedico );

router.put( '/:id', [
  validarJWT,
  check('nombre', 'el nombre del medico es necesario').not().isEmpty(),
  check('hospital', 'el hospital id debe ser valido').isMongoId(),
  validarCampos
], actualizarMedico );

router.delete( '/:id', 
  validarJWT, 
  borrarMedico );

router.get( '/:id', 
  validarJWT, 
  getMedicosById );

module.exports = router;