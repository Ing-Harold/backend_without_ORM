const { Pool } = require('pg');
const { database } = require('../keys');

const pool = new Pool(database);

const createCareers = async (req, res) => {
    const { code, name, path_image = '', path_malla_curricular = '' } = req.body;
    try {
        const response = await pool.query(
            `insert into careers (code,name,path_image, path_malla_curricular) 
            values($1,$2,$3,$4)`,
            [code, name, path_image, path_malla_curricular]
        );

        return res.status(201).json({
            message: 'Careers created successfully',
            body: {
                categories: { name }
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al crear Careers en la db' + error
        });
    }
}

const getCareers = async (req, res) => {
    try {
        const response = await pool.query('Select * from careers');
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener careera en la db' + error
        });
    }
}

const getCareersById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('select * from careers where id = $1', [id]);
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener carrera ' + id + ' en la db -' + error
        });
    }
}

const updateCareers = async (req, res) => {
    const id = req.params.id;
    const { code, name } = req.body;
    try {
        const response = await pool.query(
            'update careers set code = $1, name = $2 where id = $3',
            [code, name, id]);
        res.status(200).json({
            message: 'Career updated successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar carrera ' + id + ' en la db - ' + error
        });
    }
}

const deleteLogCareers = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query(
            'update careers set estado = false where id = $1',
            [id]);

        res.status(200).json({
            message: 'logically removed careers successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar careers ' + id + ', ' + error
        });
    }
}

const activeCareers = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query(
            'update careers set estado = true where id = $1',
            [id]);

        res.status(200).json({
            message: 'active careers successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al activar careers ' + id + ', ' + error
        });
    }
}

const assignDirector = async (req, res) => {
    const id = req.params.id;
    const { docente_id } = req.body;
    try {
        const response = await pool.query(
            'update careers set director_id = $2 where id = $1',
            [id, docente_id]);

        res.status(200).json({
            message: 'assign director ' + docente_id+ ' successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error update careers ' + id + ', ' + error
        });
    }
}

module.exports = {
    createCareers,
    getCareers,
    getCareersById,
    updateCareers,
    deleteLogCareers,
    activeCareers,
    assignDirector
}