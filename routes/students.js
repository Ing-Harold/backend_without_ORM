const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const {
    validateField,
    validateJWT,
    isAdminRoles
} = require('../middlewares');

const { createStudents, getStudents, getStudentsByRegistro, deleteStudents, deleteLogStudents, putStudentsByRegistro, activeStudents } = require('../controllers/students.controller');

const { studentsExistsValidate } = require('../helpers/db-validator');

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    validateField
], createStudents);

router.get('/',[
    validateJWT,
    isAdminRoles,
    validateField  
], getStudents);

router.get('/:registro', [
    check('registro').custom(studentsExistsValidate),
    validateField    
],getStudentsByRegistro);

router.put('/:registro', [
    check('registro').custom(studentsExistsValidate),
    check('name', 'El nombre no es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    validateField
], putStudentsByRegistro);

router.delete('/:registro', [
    check('registro').custom(studentsExistsValidate),
    validateField
], deleteStudents);

router.put('/:registro/delete-log', [
    validateJWT,
    isAdminRoles,
    check('registro').custom(studentsExistsValidate),
    validateField
], deleteLogStudents);

router.put('/:registro/active', [
    validateJWT,
    isAdminRoles,
    check('registro').custom(studentsExistsValidate),
    validateField
], activeStudents);

module.exports = router;