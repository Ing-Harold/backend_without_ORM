const { Pool } = require('pg');
const { database } = require('../keys');
const bcryptsjs = require('bcryptjs');

const pool = new Pool(database);

const createAdministrative = async (req, res) => {
    const { ci = '', email, name, path_image, description, telephone = '', sexo = null, password = '' } = req.body;
    const salt = bcryptsjs.genSaltSync(10);
    const encryptedPassword = bcryptsjs.hashSync(password, salt);
    try {
        const response = await pool.query(
            `insert into administrative (ci,email,name,path_image,telephone,sexo,password)
             values($1,$2,$3,$4,$5,$6,$7)`,
            [ci, email, name, path_image, telephone, sexo, encryptedPassword]
        );
        return res.status(201).json({
            message: 'Administrative created successfully',
            body: {
                administrative: { name, email, path_image, description, telephone, sexo }
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al insertar administrative en la db, ' + error
        });
    }
}

const getAdministrative = async (req, res) => {
    try {
        const response = await pool.query('Select * from administrative');
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener administrative en la db, ' + error
        });
    }
}

const getAdministrativeById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('Select * from administrative where id = $1', [id]);
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener administrative ' + id + 'en la db - ' + error
        });
    }
}

const putAdministrativeById = async (req, res) => {
    const id = req.params.id;
    const { name = '', email, ci = '', telephone } = req.body;
    try {
        const response = await pool.query(`update administrative set name = $1, 
            email= $3, ci = $4, telephone = $5
            where id = $2`,
            [name, id, email, ci, telephone]
        );
        return res.status(200).json({
            message: 'Administrative update successfully',
            body: {
                name, id, email, ci, telephone
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar administrative ' + id + ' en la db - ' + error
        });
    }
}

const deleteAdministrative = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('delete from administrative where id = $1',
            [id]
        );
        res.status(200).json({
            message: 'Administrative delete successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar administrative ' + id + ', ' + error
        });
    }
}

const deleteLogAdministrative = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query(
        'update administrative set estado = false where id = $1',
        [id]);
    try {
        res.status(200).json({
            message: 'logically removed administrative successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar administrative ' + id + ', ' + error
        });
    }
}

const activeAdministrative = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query(
        'update administrative set estado = true where id = $1',
        [id]);
    try {
        res.status(200).json({
            message: 'active administrative successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar administrative ' + id + ', ' + error
        });
    }
}

const putAdministrativePassword = async (req, res) => {
    const id = req.params.id;
    const { oldPassword, newPassword} = req.body;
    passwordVerify = await pool.query('select * from administrative where id = $1 limit 1', [id]);
    const validPassword = bcryptsjs.compareSync(oldPassword, passwordVerify.rows[0].password);
    if (!validPassword) {
        return res.status(400).json({
            message: 'Contraseña incorrecta',
        });
    }

    const salt = bcryptsjs.genSaltSync(10);
    const encryptedPassword = bcryptsjs.hashSync(newPassword, salt);
    try {
        const response = await pool.query(`update administrative set password = $1
            where id = $2`,
            [encryptedPassword, id]
        );
        return res.status(200).json({
            message: 'Administrative update password successfully',
        });
    } catch (error) { 
        return res.status(500).json({
            message: 'Error al actualizar administrative ' + id + ' en la db - ' + error
        });
    }
}

const getNewsByAdminID = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query(`select n.* 
            from news n
            where n.cargo_id in (select ac.cargo_id 
                                from admin_cargo ac
                                where ac.admin_id in ( select a.id 
                                                from administrative a
                                                where a.id = $1) 
                            )`, [id]);
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener noticiasByAdminID ' + id + 'en la db - ' + error
        });
    }
}

const getEventsByAdminID = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query(`select e.* 
            from events e
            where e.cargo_id in (select ac.cargo_id 
                                from admin_cargo ac
                                where ac.admin_id in ( select a.id 
                                                from administrative a
                                                where a.id = $1) 
                            )`, [id]);
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener noticiasByAdminID ' + id + 'en la db - ' + error
        });
    }
}

const updateEstadoNewsByAdminID = async (req, res) => {
    const id = req.params.id;
    const news_id = req.params.news_id;
    const { state_id} = req.body;
    try {
        const response = await pool.query(`update news set state_id = $1
        where id = $2`, [state_id, news_id]);
        return res.status(200).json({
            message: 'Noticia update state successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar estadoNoticiasByAdminID ' + id + 'en la db - ' + error
        });
    }
}

const updateEstadoEventByAdminID = async (req, res) => {
    const id = req.params.id;
    const event_id = req.params.event_id;
    const { state_id} = req.body;
    try {
        const response = await pool.query(`update events set state_id = $1
        where id = $2`, [state_id, event_id]);
        return res.status(200).json({
            message: 'Evento update state successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar estadoEventosByAdminID ' + id + 'en la db - ' + error
        });
    }
}

module.exports = {
    createAdministrative,
    getAdministrative,
    getAdministrativeById,
    putAdministrativeById,
    deleteAdministrative,
    deleteLogAdministrative,
    activeAdministrative,
    putAdministrativePassword,
    getNewsByAdminID,
    getEventsByAdminID,
    updateEstadoNewsByAdminID,
    updateEstadoEventByAdminID
}