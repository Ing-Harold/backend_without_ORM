const { Router } = require('express');
const {check} = require('express-validator');

const router = Router();

const {
    validateField,
    validateJWT,
    isAdminRoles
} = require('../middlewares');

const {cargoExistsValidate, administrativeExistsValidate} = require('../helpers/db-validator');
const { assignCargoToAdministrative, getCargoByAdministrative_Id, deleteCargoToAdmin } = require('../controllers/admin_cargo.controller');

router.post('/:id', [
    validateJWT,
    isAdminRoles,
    check('id').custom(administrativeExistsValidate),
    check('cargo_id').custom(cargoExistsValidate),
    validateField
],assignCargoToAdministrative);

router.get('/:id',[
    check('id').custom(administrativeExistsValidate)
], getCargoByAdministrative_Id);

router.delete('/:id',[
    validateJWT,
    isAdminRoles,
    check('id').custom(administrativeExistsValidate),
    check('cargo_id').custom(cargoExistsValidate),
    validateField
], deleteCargoToAdmin);

module.exports = router;