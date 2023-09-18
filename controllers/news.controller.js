const { Pool } = require('pg');
const { database } = require('../keys');

const pool = new Pool(database);

const { uploadFilesHelpers } = require("../helpers/upload-file.helpers");
const sendEmail = require('../helpers/sendEmail');

const createNews = async (req, res) => {
    const { title, description = '', state_id = null, categories_id = null, cargo_id = null } = req.body;
    try {
        const path_image = await uploadFilesHelpers(req.files, undefined, 'news');
        const response = await pool.query(
            `INSERT INTO public.news
                (title, description, path_image, state_id, categories_id, cargo_id) 
                values($1,$2,$3,$4,$5,$6)`,
            [title, description, path_image, state_id, categories_id, cargo_id]
        );
        const emails = await pool.query(`SELECT a.email
            FROM administrative a
            WHERE a.id IN (SELECT ac.admin_id
                        FROM admin_cargo ac
                        WHERE ac.cargo_id in (select c.id
                                            from cargo c
                                            where c.id = $1
                                            )
            )`, [cargo_id]);
        console.log(emails.rows);
        if (emails.length > 0) sendEmail(emails.rows, 'ASIGNADO UNA NUEVA NOTICIA', title, description);
        return res.status(201).json({
            message: 'news created successfully',
            body: {
                news: { title, description, path_image, state_id, categories_id, cargo_id }
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al insertar news en la db - ' + error
        });
    }
}

const getNews = async (req, res) => {
    try {
        const response = await pool.query('Select * from news');
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener news en la db - ' + error
        });
    }
}

const getNewsActive = async (req, res) => {
    try {
        const response = await pool.query('Select * from news where news.estado = true and news.state_id = 2');
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener news en la db - ' + error
        });
    }
}

const getNewsById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('Select * from news where id = $1', [id]);
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener news ' + id + 'en la db - ' + error
        });
    }
}

const putNewsById = async (req, res) => {
    const id = req.params.id;
    const { title, description = '', state_id = null, categories_id = null, cargo_id = null } = req.body;
    try {
        const response = await pool.query(
            `update news set title = $1, description = $2,
            state_id = $3, categories_id = $4, cargo_id = $6
            where id = $5`,
            [title, description, state_id, categories_id, id, cargo_id]
        );
        const emails = await pool.query(`SELECT a.email
        FROM administrative a
        WHERE a.id IN (SELECT ac.admin_id
                    FROM admin_cargo ac
                    WHERE ac.cargo_id in (select c.id
                                        from cargo c
                                        where c.id = $1
                                        )
        )`, [cargo_id]);
        console.log(emails.rows);
        if (emails.length > 0) sendEmail(emails.rows, 'ASIGNADO UNA NUEVA NOTICIA', title, description);
        return res.status(200).json({
            message: 'news update successfully',
            body: {
                id, title, description, state_id, categories_id, cargo_id
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar news ' + id + ' en la db - ' + error
        });
    }
}

const putNewsByCargo = async (req, res) => {
    const id = req.params.id;
    const { title, description = '', state_id = null, categories_id = null, cargo_id = null } = req.body;
    try {
        const response = await pool.query(
            `update news set title = $1, description = $2,
            state_id = $3, categories_id = $4, cargo_id = $6
            where id = $5`,
            [title, description, state_id, categories_id, id, cargo_id]
        );
        return res.status(200).json({
            message: 'news update successfully',
            body: {
                id, title, description, state_id, categories_id, cargo_id
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar news ' + id + ' en la db - ' + error
        });
    }
}

const deleteLogNews = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query(
            'update news set estado = false where id = $1',
            [id]);

        res.status(200).json({
            message: 'logically removed news successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar news ' + id + ', ' + error
        });
    }
}

const activeNews = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query(
            'update news set estado = true where id = $1',
            [id]);

        res.status(200).json({
            message: 'active news successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al activar news ' + id + ', ' + error
        });
    }
}

const deleteNews = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query(
        'delete from news where id = $1',
        [id]);
    try {
        res.status(200).json({
            message: 'news delete successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar news ' + id + ', ' + error
        });
    }
}

module.exports = {
    createNews,
    getNews,
    getNewsById,
    putNewsById,
    deleteLogNews,
    activeNews,
    deleteNews,
    getNewsActive,
    putNewsByCargo
}