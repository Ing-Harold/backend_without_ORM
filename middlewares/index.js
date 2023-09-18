const validateField = require('../middlewares/validate_fields');
const validateJWT = require('../middlewares/validate_jwt');
const isAdminRoles = require('../middlewares/validate_roles');
const validateFile = require('../middlewares/validate_file');

module.exports = {
    ...validateField,
    ...validateJWT,
    ...isAdminRoles,
    ...validateFile
}