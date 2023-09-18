const { Pool } = require('pg');
const { database } = require('../keys');

const pool = new Pool(database);

const { uploadFilesHelpers } = require("../helpers/upload-file.helpers");
const sendEmail = require('../helpers/sendEmail');

const createEvents = async (req, res) => {
    const {title, description = '',start_date, end_date, state_id = null, cargo_id = null} = req.body;
    try {
        const path_image = await uploadFilesHelpers(req.files, undefined, 'events');
        const response = await pool.query(
            `INSERT INTO public.events
                (title, description, path_image, start_date, end_date, state_id, cargo_id) 
                values($1,$2,$3,$4,$5,$6,$7)`,
            [title, description, path_image, start_date, end_date, state_id, cargo_id]
        );
        const emails = await pool.query(`SELECT a.email
            FROM administrative a
            WHERE a.id IN (SELECT ac.admin_id
                        FROM admin_cargo ac
                        WHERE ac.cargo_id in (select c.id
                                            from cargo c
                                            where c.id = $1
                                            )
            )`,[cargo_id]);
            console.log(emails.rows);
        if (emails.length > 0) sendEmail(emails.rows, 'ASIGNADO UN NUEVO EVENTO', title, description);
        return res.status(201).json({
            message: 'events created successfully',
            body: {
                events: { title, description, path_image, end_date, state_id, state_id, cargo_id}
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al insertar events en la db - ' + error
        });
    }
}

const getEvents = async (req, res) => {
    try {
        const response = await pool.query('Select * from events');
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener events en la db - ' + error
        });
    }
    
}

const getEventsActive = async (req, res) => {
    try {
        const response = await pool.query('Select * from events where events.estado = true and events.state_id = 2');
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener events en la db - ' + error
        });
    }
}

const getEventsById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('Select * from events where id = $1', [id]);
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener events ' + id + 'en la db - ' + error
        });
    }
}

const putEventsById = async (req, res) => {
    const id = req.params.id;
    const {  title, description = '', start_date, end_date, state_id = null, cargo_id = null} = req.body;
    try {
        const response = await pool.query(
            `update events set title = $1, description = $2,
            start_date = $3, end_date = $4, state_id = $5, cargo_id = $6
            where id = $7`,
            [title, description, start_date, end_date, state_id, cargo_id, id]
        );
        const emails = await pool.query(`SELECT a.email
            FROM administrative a
            WHERE a.id IN (SELECT ac.admin_id
                        FROM admin_cargo ac
                        WHERE ac.cargo_id in (select c.id
                                            from cargo c
                                            where c.id = $1
                                            )
            )`,[cargo_id]);
            console.log(emails.rows);
        if (emails.length > 0) sendEmail(emails.rows, 'ASIGNADO UN NUEVO EVENTO', title, description);
        return res.status(200).json({
            message: 'events update successfully',
            body: {
                id,title, description, start_date, end_date, state_id, cargo_id
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar events '+ id +' en la db - ' + error
        });
    }
}

const putEventsByCargo = async (req, res) => {
    const id = req.params.id;
    const {  title, description = '', start_date, end_date, state_id = null, cargo_id = null} = req.body;
    try {
        const response = await pool.query(
            `update events set title = $1, description = $2,
            start_date = $3, end_date = $4, state_id = $5, cargo_id = $6
            where id = $7`,
            [title, description, start_date, end_date, state_id, cargo_id, id]
        );
        return res.status(200).json({
            message: 'events update successfully',
            body: {
                id,title, description, start_date, end_date, state_id, cargo_id
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar events '+ id +' en la db - ' + error
        });
    }
}

const deleteLogEvents = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query(
        'update events set estado = false where id = $1',
    [id]);
    try {
        res.status(200).json({
            message: 'logically removed event successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar events '+ id + ', ' + error
        });
    }
}

const activeEvents = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query(
        'update events set estado = true where id = $1',
    [id]);
    try {
        res.status(200).json({
            message: 'active event successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al activar events '+ id + ', ' + error
        });
    }
}

const deleteEvents = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query(
        'delete from events where id = $1',
    [id]);
    try {
        res.status(200).json({
            message: 'events delete successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar events '+ id + ', ' + error
        });
    }
}

module.exports = {
    createEvents,
    getEvents,
    getEventsById,
    putEventsById,
    deleteLogEvents,
    activeEvents,
    deleteEvents,
    getEventsActive,
    putEventsByCargo
}