const { Router } = require('express');
const {check} = require('express-validator');

const router = Router();

const {
    validateField,
    validateJWT,
    isAdminRoles
} = require('../middlewares');
const { createState, getState, updateStateById, getStateById, deleteStateById } = require('../controllers/state.controller');
const { stateExistsValidate } = require('../helpers/db-validator');

router.post('/', [
    validateJWT,
    isAdminRoles,
    check('name', 'El nombre no es obligatorio').not().isEmpty(),
    validateField
],createState);

router.get('/', getState);

router.put('/:id', [
    validateJWT,
    isAdminRoles,
    check('id').custom(stateExistsValidate),
    validateField
], updateStateById);

router.get('/:id',[
    check('id').custom(stateExistsValidate),
    validateField
], getStateById);

router.delete('/:id', [
    validateJWT,
    isAdminRoles,
    check('id').custom(stateExistsValidate),
    validateField
],deleteStateById); 

module.exports = router;