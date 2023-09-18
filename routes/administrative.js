const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const {
    validateField,
    validateJWT,
    isAdminRoles
} = require('../middlewares');

const { correoExistsValidate, administrativeExistsValidate, adminCargoNewsValidate } = require('../helpers/db-validator');
const { createAdministrative, getAdministrative, getAdministrativeById, putAdministrativeById, deleteAdministrative, deleteLogAdministrative, putAdministrativePassword, activeAdministrative, getNewsByAdminID, getEventsByAdminID, updateEstadoNewsByAdminID, updateEstadoEventByAdminID } = require('../controllers/administrative.controller');

router.post('/', [
    validateJWT,
    isAdminRoles,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(correoExistsValidate),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateField
], createAdministrative);

router.get('/',[
    validateJWT,
    isAdminRoles,
    validateField  
], getAdministrative);

router.get('/:id', [
    check('id').custom(administrativeExistsValidate),
    validateField    
],getAdministrativeById);

router.get('/:id/news', [
    check('id').custom(administrativeExistsValidate),
    validateJWT,
    validateField    
],getNewsByAdminID);

router.get('/:id/events', [
    check('id').custom(administrativeExistsValidate),
    validateJWT,
    validateField    
],getEventsByAdminID);

router.put('/:id', [
    validateJWT,
    isAdminRoles,
    check('id').custom(administrativeExistsValidate),
    check('name', 'El nombre no es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    // check('email').custom(correoExistsValidate),
    validateField
], putAdministrativeById);

router.delete('/:id', [
    validateJWT,
    isAdminRoles,
    check('id').custom(administrativeExistsValidate),
    validateField
], deleteAdministrative);

router.put('/:id/delete-log', [
    validateJWT,
    isAdminRoles,
    check('id').custom(administrativeExistsValidate),
    validateField
], deleteLogAdministrative);

router.put('/:id/active', [
    validateJWT,
    isAdminRoles,
    check('id').custom(administrativeExistsValidate),
    validateField
], activeAdministrative);

router.put('/:id/password', [
    validateJWT,
    isAdminRoles,
    check('id').custom(administrativeExistsValidate),
    check('oldPassword', 'El password actual es obligatorio').not().isEmpty(),
    check('newPassword', 'La nueva password es obligatorio').not().isEmpty(),
    validateField
], putAdministrativePassword);

router.put('/:id/news/:news_id', [
    validateJWT,
    check('id').custom(administrativeExistsValidate),
    check('id', 'news_id').custom((value, { req }) => adminCargoNewsValidate(value, req.params.news_id)),
    validateField
], updateEstadoNewsByAdminID);

router.put('/:id/event/:event_id', [
    validateJWT,
    check('id').custom(administrativeExistsValidate),
    check('id', 'event_id').custom((value, { req }) => adminCargoNewsValidate(value, req.params.event_id)),
    validateField
], updateEstadoEventByAdminID);


module.exports = router;