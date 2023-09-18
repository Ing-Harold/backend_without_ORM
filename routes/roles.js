const { Router } = require('express');
const {check} = require('express-validator');

const router = Router();

const {
    validateField,
    validateJWT,
    isAdminRoles
} = require('../middlewares');

const { getRoles, getRolesById,updateRolesById, createRoles, deleteRolesById } = require('../controllers/roles.controller');
const { rolesExistsValidate } = require('../helpers/db-validator');

router.post('/', [
    validateJWT,
    isAdminRoles,
    check('name', 'El nombre no es obligatorio').not().isEmpty(),
    validateField
],createRoles);

router.get('/',[
    validateJWT,
    validateField
], getRoles);

router.put('/:id', [
    validateJWT,
    isAdminRoles,
    check('id').custom(rolesExistsValidate),
    validateField
], updateRolesById);

router.get('/:id',[
    check('id').custom(rolesExistsValidate),
    validateField
],  getRolesById);

router.delete('/:id', [
    validateJWT,
    isAdminRoles,
    check('id').custom(rolesExistsValidate),
    validateField
],deleteRolesById); 

module.exports = router;