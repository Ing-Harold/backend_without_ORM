const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { createDocentes,
    getDocentes,
    getDocentesFilter,
    getDocentesById,
    putDocentesById,
    deleteDocentes, 
    deleteLogDocentes,
    activeDocentes} = require('../controllers/docentes.controller');

const {
    validateField,
    validateJWT,
    isAdminRoles
} = require('../middlewares');

const { correoExistsValidate, docentesExistsValidate } = require('../helpers/db-validator');


router.get('/portal', getDocentesFilter);

router.post('/', [
    validateJWT,
    isAdminRoles,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(correoExistsValidate),
    validateField
], createDocentes);

router.get('/',[
    validateJWT,
    isAdminRoles,
    validateField  
], getDocentes);

router.get('/:id', [
    check('id').custom(docentesExistsValidate),
    validateField    
],getDocentesById);

router.put('/:id', [
    validateJWT,
    isAdminRoles,
    check('id').custom(docentesExistsValidate),
    check('name', 'El nombre no es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(correoExistsValidate),
    validateField
], putDocentesById);

router.delete('/:id', [
    validateJWT,
    isAdminRoles,
    check('id').custom(docentesExistsValidate),
    validateField
], deleteDocentes);

router.put('/:id/delete-log', [
    validateJWT,
    isAdminRoles,
    check('id').custom(docentesExistsValidate),
    validateField
], deleteLogDocentes);

router.put('/:id/active', [
    validateJWT,
    isAdminRoles,
    check('id').custom(docentesExistsValidate),
    validateField
], activeDocentes);


module.exports = router;