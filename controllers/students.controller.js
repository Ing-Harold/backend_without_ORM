const { Pool } = require('pg');
const { database } = require('../keys');

const pool = new Pool(database);

const createStudents = async (req, res) => {
    const { ci = '', email, name, sexo = null, telephone = null, registro, semestre } = req.body;
    try {
        const response = await pool.query(
            'insert into students (ci,email,name,sexo,telephone,registro,semestre) values($1,$2,$3,$4,$5,$6,$7)',
            [ci, email, name, sexo, telephone, registro, semestre]
        );
        return res.status(201).json({
            message: 'Students created successfully',
            body: {
                user: { ci, email, name, sexo, telephone, registro, semestre }
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al insertar students en la db, ' + error
        });
    }
}

const getStudents = async (req, res) => {
    try {
        const response = await pool.query('Select * from students');
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener students en la db, ' + error
        });
    }
}

const getStudentsByRegistro = async (req, res) => {
    const registro = req.params.registro;
    try {
        const response = await pool.query('Select * from students where registro = $1', [registro]);
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener students ' + registro + 'en la db - ' + error
        });
    }
}

const putStudentsByRegistro = async (req, res) => {
    const registro = req.params.registro;
    const { ci = '', email, name, sexo = null, telephone = null, semestre } = req.body;
    try {
        const response = await pool.query(`update students set ci = $1, 
            email = $2, name = $3, sexo = $4, telephone = $5, semestre = $6
            where registro = $7`,
            [ci, email, name, sexo, telephone, semestre, registro]
        );
        return res.status(200).json({
            message: 'Students update successfully',
            body: {
                ci, email, name, sexo, telephone, semestre, registro
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar students ' + registro + ' en la db - ' + error
        });
    }
}

const deleteStudents = async (req, res) => {
    const registro = req.params.registro;
    try {
        const response = await pool.query('delete from students where registro = $1',
            [registro]
        );
        res.status(200).json({
            message: 'Students delete successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar students ' + registro + ', ' + error
        });
    }
}

const deleteLogStudents = async (req, res) => {
    const registro = req.params.registro;
    try {
        const response = await pool.query(
            'update students set estado = false where registro = $1',
            [registro]);
        res.status(200).json({
            message: 'logically removed student successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar studente ' + registro + ', ' + error
        });
    }
}

const activeStudents = async (req, res) => {
    const registro = req.params.registro;
    try {
        const response = await pool.query(
            'update students set estado = true where registro = $1',
            [registro]);
        res.status(200).json({
            message: 'active student successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al activar user ' + registro + ', ' + error
        });
    }
}

module.exports = {
    createStudents,
    getStudents,
    getStudentsByRegistro,
    putStudentsByRegistro,
    deleteStudents,
    deleteLogStudents,
    activeStudents
}