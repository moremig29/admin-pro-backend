
/***** Ruta: /api/login *******/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { login, googleSignIn } = require('../controllers/auth.controller');

const router = Router();

router.post( '/', [
    check('email', 'el email es obligatorio').isEmail(),
    check('password', 'el email es obligatorio').not().isEmpty(),
    validarCampos
  ],
  login
)

router.post( '/google', [
    check('token', 'el token de google es obligatorio').not().isEmpty(),
    validarCampos
  ],
  googleSignIn
)


module.exports = router;