const { Router } = require('express');
const {check} = require('express-validator');

const router = Router();

const {
    validateField,
    validateJWT,
    isAdminRoles
} = require('../middlewares');

const { assignRoleToAdministrative, 
    getAdministrativeRolesByAdministrative_Id, 
    deleteRoleToAdministrative 
} = require('../controllers/administrative_roles.controller');

const { rolesExistsValidate, 
    administrativeExistsValidate } = require('../helpers/db-validator');

router.post('/:id', [
    validateJWT,
    isAdminRoles,
    check('id').custom(administrativeExistsValidate),
    check('roles_id').custom(rolesExistsValidate),
    validateField
],assignRoleToAdministrative);

router.get('/:id',[
    validateJWT,
    isAdminRoles,
    check('id').custom(administrativeExistsValidate),
    validateField
], getAdministrativeRolesByAdministrative_Id);

router.delete('/:id',[
    validateJWT,
    isAdminRoles,
    check('id').custom(administrativeExistsValidate),
    check('roles_id').custom(rolesExistsValidate),
    validateField
], deleteRoleToAdministrative);

module.exports = router;