const { Pool } = require('pg');
const { database } = require('../keys');

const pool = new Pool(database);

const createState = async (req, res) => {
    const { name } = req.body;
    try {
        const response = await pool.query(
            'insert into state (name) values($1)',
            [name]
        );

        return res.status(201).json({
            message: 'State created successfully',
            body: {
                state: { name }
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al crear State en la db' + error
        });
    }
}

const getState = async (req, res) => {
    try {
        const response = await pool.query('Select * from state');
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener State en la db' + error
        });
    }
}

const getStateById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('select * from state where id = $1', [id]);
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener State ' + id + ' en la db - ' + error
        });
    }
}

const updateStateById = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    try {
        const response = await pool.query(
            'update state set name = $1 where id = $2',
            [name, id]);
        res.status(200).json({
            message: 'State updated successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar State ' + id + ' en la db - ' + error
        });
    }
}

const deleteStateById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query(
            'delete from state where id = $1',
            [id]);
        res.status(200).json({
            message: 'State delete successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar State ' + id + ' en la db - ' + error
        });
    }
}

module.exports = {
    createState,
    deleteStateById,
    getState,
    getStateById,
    updateStateById
}