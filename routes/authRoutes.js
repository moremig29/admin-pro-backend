
/***** Ruta: /api/login *******/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { login } = require('../controllers/auth.controller');

const router = Router();

router.post( '/', [
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el email es obligatorio').not().isEmpty(),
    validarCampos
  ],
  login
)


module.exports = router;