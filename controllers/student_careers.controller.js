const { Pool } = require('pg');
const { database } = require('../keys');
// const bcryptsjs = require('bcryptjs');

const pool = new Pool(database);

const registerStudentCareers = async (req, res) => {
    const { careers_id } = req.body;
    const student_id = req.params.id;
    try {
        const response = await pool.query(
            'insert into students_careers (students_id, careers_id) values($1, $2)',
            [student_id, careers_id]
        );
        return res.status(201).json({
            message: 'StudentCareers created successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al insertar StudentCareers en la db, ' + error
        });
    }
}

const getStudentCareers = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query(
            `select c.id ,c."name" 
            from careers c 
            where c.id  in (
                select sc.careers_id
                from students_careers sc 
                where sc.students_id = $1
                )`, [id]);
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener studentCarreras ' + id + 'en la db - ' + error
        });
    }
}

const deleteRegisterStudentCareers = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('DELETE FROM students_careers WHERE students_id = $1',
            [id]
        );
        res.status(200).json({
            message: 'students_careers delete successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar students_careers ' + id + ', ' + error
        });
    }
}

module.exports = {
    getStudentCareers,
    registerStudentCareers,
    deleteRegisterStudentCareers
}