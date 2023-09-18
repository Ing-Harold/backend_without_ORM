const { Pool } = require('pg');
const { database } = require('../keys');

const pool = new Pool(database);

const createRoles = async (req, res) => {
    const { name } = req.body;
    try {
        const response = await pool.query(
            'insert into roles (name) values($1)',
            [name]
        );

        return res.status(201).json({
            message: 'Rule created successfully',
            body: {
                user: { name }
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al crear rol en la db' + error
        });
    }
}

const getRoles = async (req, res) => {
    try {
        const response = await pool.query('Select * from roles');
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener rol en la db' + error
        });
    }
}

const getRolesById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('select * from roles where id = $1', [id]);
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener rol ' + id + ' en la db - ' + error
        });
    }
}

const updateRolesById = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    try {
        const response = await pool.query(
            'update roles set name = $1 where id = $2',
            [name, id]);
        res.status(200).json({
            message: 'Role updated successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar rol ' + id + ' en la db - ' + error
        });
    }
}

const deleteRolesById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query(
            'delete from roles where id = $1',
            [id]);
        res.status(200).json({
            message: 'Role delete successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar rol ' + id + ' en la db - ' + error
        });
    }
}

module.exports = {
    createRoles,
    getRoles,
    getRolesById,
    updateRolesById,
    deleteRolesById
}