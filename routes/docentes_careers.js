const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const {
    validateField,
    validateJWT,
    isAdminRoles
} = require('../middlewares');

const { getDocenteCareers, registerDocentesCareers, deleteRegisterDocentesCareers } = require('../controllers/docentes_careers.controller');
const { docentesExistsValidate } = require('../helpers/db-validator');


router.get('/:id', getDocenteCareers);

router.post('/:id', [
    validateJWT,
    isAdminRoles,
    check('id').custom(docentesExistsValidate),
    validateField
], registerDocentesCareers);

router.delete('/:id', [
    validateJWT,
    isAdminRoles,
    check('id').custom(docentesExistsValidate),
    validateField
], deleteRegisterDocentesCareers);

module.exports = router;