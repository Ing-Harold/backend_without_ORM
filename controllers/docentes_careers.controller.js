const { Pool } = require('pg');
const { database } = require('../keys');
// const bcryptsjs = require('bcryptjs');

const pool = new Pool(database);

const registerDocentesCareers = async (req, res) => {
    const { careers_id } = req.body;
    const docente_id = req.params.id;
    try {
        const response = await pool.query(
            'insert into docentes_careers (docentes_id, careers_id) values($1, $2)',
            [docente_id, careers_id]
        );
        return res.status(201).json({
            message: 'DocentesCareers created successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al insertar DocentesCareers en la db, ' + error
        });
    }
}

const getDocenteCareers = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query(
            `select c.id ,c."name" 
            from careers c 
            where c.id  in (
                select dc.careers_id
                from docentes_careers dc 
                where dc.docentes_id = $1
                )`, [id]);
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener docentesCarreras ' + id + 'en la db - ' + error
        });
    }
}

const deleteRegisterDocentesCareers = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('DELETE FROM docentes_careers WHERE docentes_id = $1',
            [id]
        );
        res.status(200).json({
            message: 'docentes_careers delete successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar docentes_careers ' + id + ', ' + error
        });
    }
}

module.exports = {
    getDocenteCareers,
    registerDocentesCareers,
    deleteRegisterDocentesCareers
}