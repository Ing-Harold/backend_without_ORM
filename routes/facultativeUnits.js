const { Router } = require('express');
const {check} = require('express-validator');
const router = Router();

const {
    validateField,
    validateJWT,
    isAdminRoles
} = require('../middlewares');

const { createFacultativeUnits, getFacultativeUnits, getFacultativeUnitsById, updateFacultativeUnits, deleteLogFacultUnits, activeFaculUnits } = require('../controllers/facultativeUnits.controller');
const { facultUnitsExistsValidate } = require('../helpers/db-validator');

router.post('/', [
    validateJWT,
    isAdminRoles,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateField
], createFacultativeUnits);

router.get('/', getFacultativeUnits);

router.get('/:id', [
    check('id').custom(facultUnitsExistsValidate),
    validateField
], getFacultativeUnitsById);

router.put('/:id', [
    validateJWT,
    isAdminRoles,
    check('id').custom(facultUnitsExistsValidate),
    validateField
], updateFacultativeUnits);

router.put('/:id/delete-log', [
    validateJWT,
    isAdminRoles,
    check('id').custom(facultUnitsExistsValidate),
    validateField
], deleteLogFacultUnits);

router.put('/:id/active', [
    validateJWT,
    isAdminRoles,
    check('id').custom(facultUnitsExistsValidate),
    validateField
], activeFaculUnits);

module.exports = router;