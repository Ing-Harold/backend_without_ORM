const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { validateField } = require('../middlewares/validate_fields');
const { correoExistsValidate } = require('../helpers/db-validator');
const { login, tokenVerify } = require('../controllers/auth.controller');
const { validateJWT } = require('../middlewares');

router.post('/login', [
    check('email', 'El correo no es valido').isEmail(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    check('email').not().custom(correoExistsValidate).withMessage('El correo no esta registrado'),
    validateField
],login);

router.get('/',[
    validateJWT,
    validateField
], tokenVerify);



module.exports = router;