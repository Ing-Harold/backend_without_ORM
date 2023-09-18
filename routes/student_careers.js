const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const {
} = require('../middlewares');

const { getStudentCareers, registerStudentCareers, deleteRegisterStudentCareers } = require('../controllers/student_careers.controller');

router.get('/:id', getStudentCareers);

router.post('/:id', registerStudentCareers);

router.delete('/:id', deleteRegisterStudentCareers);

module.exports = router;