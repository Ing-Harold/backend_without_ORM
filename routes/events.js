const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const {
    validateField,
    validateJWT,
    isAdminRoles,
    validate_file
} = require('../middlewares');

const { stateExistsValidate, eventsExistsValidate} = require('../helpers/db-validator');
const { createEvents, getEvents, getEventsById, putEventsById, deleteLogEvents, deleteEvents, activeEvents, getEventsActive, putEventsByCargo } = require('../controllers/events.controller');

router.post('/', [
    validateJWT,
    isAdminRoles,
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('state_id').custom(stateExistsValidate),
    validate_file,
    validateField
], createEvents);

router.get('/', [
    validateJWT,
    isAdminRoles,
    validateField
],getEvents);

router.get('/portal',getEventsActive);

router.get('/:id', [
    check('id').custom(eventsExistsValidate),
    validateField    
],getEventsById);

router.put('/:id', [
    validateJWT,
    isAdminRoles,
    check('id').custom(eventsExistsValidate),
    check('title', 'El title es obligatorio').not().isEmpty(),
    check('state_id').custom(stateExistsValidate),
    validateField
], putEventsById);

router.put('/:id/encargado', [
    validateJWT,
    isAdminRoles,
    check('id').custom(eventsExistsValidate),
    check('title', 'El title es obligatorio').not().isEmpty(),
    check('state_id').custom(stateExistsValidate),
    validateField
], putEventsByCargo);

router.put('/:id/delete-log', [
    validateJWT,
    isAdminRoles,
    check('id').custom(eventsExistsValidate),
    validateField
], deleteLogEvents);

router.put('/:id/active', [
    validateJWT,
    isAdminRoles,
    check('id').custom(eventsExistsValidate),
    validateField
], activeEvents);

router.delete('/:id', [
    validateJWT,
    isAdminRoles,
    check('id').custom(eventsExistsValidate),
    validateField
], deleteEvents);


module.exports = router;