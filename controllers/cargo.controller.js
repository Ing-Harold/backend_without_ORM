const { Pool } = require('pg');
const { database } = require('../keys');
// const bcryptsjs = require('bcryptjs');

const pool = new Pool(database);

const createCargo = async (req, res) => {
    const { name, entity_id, entity_type, roles_id } = req.body;
    try {
        const response = await pool.query(
            `INSERT INTO public.cargo ("name", entity_id, entity_type, roles_id)
            VALUES($1, $2, $3, $4)`,
            [name, entity_id, entity_type, roles_id]
        );
        return res.status(201).json({
            message: 'Cargo created successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al insertar Cargo en la db, ' + error
        });
    }
}

const getCargo = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query(
            `SELECT id, "name", entity_id, entity_type, roles_id
            FROM public.cargo;`);
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener cargos en la db - ' + error
        });
    }
}

const deleteCargo = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('DELETE FROM cargo WHERE id = $1',
            [id]
        );
        res.status(200).json({
            message: 'cargo delete successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar cargo ' + id + ', ' + error
        });
    }
}

module.exports = {
    createCargo,
    getCargo,
    deleteCargo
}