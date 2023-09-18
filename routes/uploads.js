const { Router } = require('express');
const { check } = require('express-validator');

const {
    validateField,
    validateJWT,
    isAdminRoles,
    validate_file
} = require('../middlewares');

const { uploadFile, updateImageProfile, getImageProfile, updateImageCareers, updateMallaCareers, updateImageProfileAdmin, updateImageFaculUnits, updateImageEvents, updateImageNews } = require('../controllers/uploads.controller');

const { usersExistsValidate, careersExistsValidate, docentesExistsValidate, administrativeExistsValidate, facultUnitsExistsValidate, eventsExistsValidate, newsExistsValidate } = require('../helpers/db-validator');
const { updateFacultativeUnits } = require('../controllers/facultativeUnits.controller');

const router = Router();

router.put('/docentes/:id', [
    validateJWT,
    isAdminRoles,
    validate_file,
    check('id').custom(docentesExistsValidate),
    validateField
], updateImageProfile );

router.get('/docentes/:id', [
    validateJWT,
    isAdminRoles,
    check('id').custom(docentesExistsValidate),
    validateField
], getImageProfile );

router.put('/careers/:id', [
    validateJWT,
    isAdminRoles,
    validate_file,
    check('id').custom(careersExistsValidate),
    validateField
], updateImageCareers );

router.put('/careers_malla/:id', [
    validateJWT,
    isAdminRoles,
    validate_file,
    check('id').custom(careersExistsValidate),
    validateField
], updateMallaCareers);

router.put('/administrative/:id', [
    validateJWT,
    isAdminRoles,
    validate_file,
    check('id').custom(administrativeExistsValidate),
    validateField
], updateImageProfileAdmin);

router.put('/facultative_units/:id', [
    validateJWT,
    isAdminRoles,
    validate_file,
    check('id').custom(facultUnitsExistsValidate),
    validateField
], updateImageFaculUnits);

router.put('/events/:id', [
    validateJWT,
    isAdminRoles,
    validate_file,
    check('id').custom(eventsExistsValidate),
    validateField
], updateImageEvents);

router.put('/news/:id', [
    validateJWT,
    isAdminRoles,
    validate_file,
    check('id').custom(newsExistsValidate),
    validateField
], updateImageNews);

router.post('/', validate_file, uploadFile);

module.exports = router;