const { Pool } = require('pg');
const { database } = require('../keys');
// const bcryptsjs = require('bcryptjs');

const pool = new Pool(database);

const createDocentes = async (req, res) => {
    const { ci = '', email, name, path_image, description, telephone = '' } = req.body;
    // const salt = bcryptsjs.genSaltSync(10);
    // const encryptedPassword = bcryptsjs.hashSync(password, salt);
    try {
        const response = await pool.query(
            'insert into docentes (ci,email,name,path_image,description,telephone) values($1,$2,$3,$4,$5,$6)',
            [ci, email, name, path_image, description, telephone]
        );
        return res.status(201).json({
            message: 'Docentes created successfully',
            body: {
                user: { name, email, path_image, description, telephone }
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al insertar docentes en la db, ' + error
        });
    }
}

const getDocentes = async (req, res) => {
    try {
        const response = await pool.query('Select * from docentes');
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener docentes en la db, ' + error
        });
    }
}

const getDocentesById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('Select * from docentes where id = $1', [id]);
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener docentes ' + id + 'en la db - ' + error
        });
    }
}

const putDocentesById = async (req, res) => {
    const id = req.params.id;
    const { name = '', description = '', email, ci = '', telephone } = req.body;
    try {
        const response = await pool.query(`update docentes set name = $1, 
            description = $3, email= $4, ci = $5, telephone = $6
            where id = $2`,
            [name, id, description, email, ci, telephone]
        );
        return res.status(200).json({
            message: 'Docentes update successfully',
            body: {
                name, id, description, email, ci, telephone
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar docentes ' + id + ' en la db - ' + error
        });
    }
}

const deleteDocentes = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('delete from docentes where id = $1',
            [id]
        );
        res.status(200).json({
            message: 'Docentes delete successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar docentes ' + id + ', ' + error
        });
    }
}

const deleteLogDocentes = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query(
            'update docentes set estado = false where id = $1',
            [id]);

        res.status(200).json({
            message: 'logically removed docente successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar docente ' + id + ', ' + error
        });
    }
}

const activeDocentes = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query(
            'update docentes set estado = true where id = $1',
            [id]);

        res.status(200).json({
            message: 'active docente successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al activar docente ' + id + ', ' + error
        });
    }
}

const getDocentesFilter = async (req, res) => {
    try {
        const response = await pool.query(
            'select docentes.name, docentes.path_image, docentes.description ' +
            'from docentes where docentes.estado = true'
        );
        return res.status(200).json(
            response.rows
        );
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener docentes en la db - ' + error
        });
    }
}

module.exports = {
    createDocentes,
    getDocentes,
    getDocentesById,
    putDocentesById,
    deleteDocentes,
    deleteLogDocentes,
    activeDocentes,
    getDocentesFilter
}