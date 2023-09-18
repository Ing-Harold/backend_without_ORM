const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const {
    validateField,
    validateJWT,
    isAdminRoles,
    validate_file
} = require('../middlewares');
const { createNews, getNews, getNewsById, putNewsById, deleteNews, deleteLogNews, activeNews, getNewsActive, putNewsByCargo } = require('../controllers/news.controller');
const { categoriesExistsValidate, stateExistsValidate, newsExistsValidate } = require('../helpers/db-validator');

router.post('/', [
    validateJWT,
    isAdminRoles,
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('categories_id').custom(categoriesExistsValidate),
    check('state_id').custom(stateExistsValidate),
    validate_file,
    validateField
], createNews);

router.get('/', [
    validateJWT,
    isAdminRoles,
    validateField   
],getNews); 

router.get('/portal',getNewsActive);

router.get('/:id', [
    check('id').custom(newsExistsValidate),
    validateField    
],getNewsById);

router.get('/:id', [
    check('id').custom(newsExistsValidate),
    validateField    
],getNewsById);

router.put('/:id', [
    validateJWT,
    isAdminRoles,
    check('id').custom(newsExistsValidate),
    check('title', 'El title es obligatorio').not().isEmpty(),
    check('categories_id').custom(categoriesExistsValidate),
    check('state_id').custom(stateExistsValidate),
    validateField
], putNewsById);

router.put('/:id/encargado', [
    validateJWT,
    check('id').custom(newsExistsValidate),
    check('title', 'El title es obligatorio').not().isEmpty(),
    check('categories_id').custom(categoriesExistsValidate),
    check('state_id').custom(stateExistsValidate),
    validateField
], putNewsByCargo);

router.put('/:id/delete-log', [
    validateJWT,
    isAdminRoles,
    check('id').custom(newsExistsValidate),
    validateField
], deleteLogNews);

router.put('/:id/active', [
    validateJWT,
    isAdminRoles,
    check('id').custom(newsExistsValidate),
    validateField
], activeNews);

router.delete('/:id', [
    validateJWT,
    isAdminRoles,
    check('id').custom(newsExistsValidate),
    validateField
], deleteNews);


module.exports = router;