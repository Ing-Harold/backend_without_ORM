const { Router } = require('express');
const {check} = require('express-validator');

const router = Router();

const {
    validateField,
    validateJWT,
    isAdminRoles
} = require('../middlewares');

const { categoriesExistsValidate } = require('../helpers/db-validator');
const { createCategories, 
    getCategories, 
    updateCategoriesById, 
    getCategoriesById, 
    deleteCategoriesById 
} = require('../controllers/categories.controller');

router.post('/', [
    validateJWT,
    isAdminRoles,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateField
],createCategories);

router.get('/', getCategories);

router.put('/:id', [
    validateJWT,
    isAdminRoles,
    check('id').custom(categoriesExistsValidate),
    validateField
], updateCategoriesById);

router.get('/:id', [
    check('id').custom(categoriesExistsValidate),
    validateField
],getCategoriesById);

router.delete('/:id', [
    validateJWT,
    isAdminRoles,
    check('id').custom(categoriesExistsValidate),
    validateField
],deleteCategoriesById); 

module.exports = router;