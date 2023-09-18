const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const {
    validateField,
    validateJWT,
    isAdminRoles
} = require('../middlewares');

const { createCargo, getCargo, deleteCargo } = require('../controllers/cargo.controller');


router.get('/', [
    validateJWT,
    validateField
],getCargo);

router.post('/', [
    validateJWT,
    isAdminRoles,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('entity_type', 'El tipo de entidad es obligatorio').not().isEmpty(),
    check('roles_id', 'El rol es obligatorio').not().isEmpty(),
    check('entity_id', 'El entidad_id es obligatorio').not().isEmpty(),
    validateField
], createCargo);

router.delete('/:id', [
    validateJWT,
    isAdminRoles,
    validateField
], deleteCargo);

module.exports = router;