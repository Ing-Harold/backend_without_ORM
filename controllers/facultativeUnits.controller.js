const { Pool } = require('pg');
const { database } = require('../keys');

const pool = new Pool(database);

const createFacultativeUnits = async (req, res) => {
    const { name, description = null, url_video = null } = req.body;
    try {
        const response = await pool.query(
            `insert into facultative_units ("name", description, url_video) 
                VALUES($1,$2,$3)`,
            [name, description, url_video]
        );
        return res.status(201).json({
            message: 'Facultative Units created successfully',
            body: {
                name, description, url_video
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al crear Facultative Units en la db' + error
        });
    }
}

const getFacultativeUnits = async (req, res) => {
    try {
        const response = await pool.query('Select * from facultative_units');
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener careera en la db' + error
        });
    }
}

const getFacultativeUnitsById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('select * from facultative_units where id = $1', [id]);
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener la unidad facutlativa ' + id + ' en la db -' + error
        });
    }
}

const updateFacultativeUnits = async (req, res) => {
    const id = req.params.id;
    const { name, description = null, url_video = null } = req.body;
    try {
        const response = await pool.query(
            'update facultative_units set name = $1,description = $2, url_video = $3 where id = $4',
            [ name, description, url_video, id]);
        res.status(200).json({
            message: 'Unidad Facultativa updated successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar unidad facultativa ' + id + ' en la db - ' + error
        });
    }
}

const deleteLogFacultUnits = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query(
            'update facultative_units set estado = false where id = $1',
            [id]);

        res.status(200).json({
            message: 'logically removed Facultative Units successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar Facultative Units ' + id + ', ' + error
        });
    }
}

const activeFaculUnits = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query(
            'update facultative_units set estado = true where id = $1',
            [id]);
        res.status(200).json({
            message: 'active Facultative Units successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al activar Facultative Units ' + id + ', ' + error
        });
    }
}

const assignDirector = async (req, res) => {
    const id = req.params.id;
    const { docente_id } = req.body;
    try {
        const response = await pool.query(
            'update Facultative Units set director_id = $2 where id = $1',
            [id, docente_id]);

        res.status(200).json({
            message: 'assign director ' + docente_id+ ' successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error update Facultative Units ' + id + ', ' + error
        });
    }
}

module.exports = {
    createFacultativeUnits,
    getFacultativeUnits,
    getFacultativeUnitsById,
    updateFacultativeUnits,
    deleteLogFacultUnits,
    activeFaculUnits
}