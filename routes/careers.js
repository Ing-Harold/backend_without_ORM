const { Router } = require('express');
const {check} = require('express-validator');
const router = Router();

const {
    validateField,
    validateJWT,
    isAdminRoles
} = require('../middlewares');

const { getCareers, getCareersById, updateCareers, createCareers, deleteLogCareers, activeCareers, assignDirector } = require('../controllers/careers.controller');
const { careersExistsValidate } = require('../helpers/db-validator');

router.post('/', [
    validateJWT,
    isAdminRoles,
    check('code', 'El codigo es obligatorio').not().isEmpty(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateField
],createCareers);

router.get('/', getCareers);

router.get('/:id', [
    check('id').custom(careersExistsValidate),
    validateField
], getCareersById);

router.put('/:id', [
    validateJWT,
    isAdminRoles,
    check('id').custom(careersExistsValidate),
    validateField
],updateCareers);

router.put('/:id/delete-log', [
    validateJWT,
    isAdminRoles,
    check('id').custom(careersExistsValidate),
    validateField
], deleteLogCareers);

router.put('/:id/active', [
    validateJWT,
    isAdminRoles,
    check('id').custom(careersExistsValidate),
    validateField
], activeCareers);

router.put('/:id/director', [
    validateJWT,
    isAdminRoles,
    check('id').custom(careersExistsValidate),
    validateField
], assignDirector);

module.exports = router;