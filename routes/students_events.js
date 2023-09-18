const { Router } = require('express');
const {check} = require('express-validator');

const router = Router();

const {
    validateField,
    validateJWT,
    isAdminRoles
} = require('../middlewares');

const {eventsExistsValidate} = require('../helpers/db-validator');
const {registerStudentsEvents, getRegisterStudentByEventId } = require('../controllers/students_events.controller');

router.post('/:events_id', [
    check('events_id', 'El evento es obligatorio').not().isEmpty(),
    check('students_id', 'El estudiante es obligatorio').not().isEmpty(),
    validateField
],registerStudentsEvents);

router.get('/:events_id',[
    validateJWT,
    isAdminRoles,
    check('events_id').custom(eventsExistsValidate),
    validateField
],getRegisterStudentByEventId);


module.exports = router;