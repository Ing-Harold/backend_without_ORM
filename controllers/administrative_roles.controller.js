const { Pool } = require('pg');
const { database } = require('../keys');

const pool = new Pool(database);

const assignRoleToAdministrative = async (req, res) => {
    const { roles_id } = req.body;
    const administrative_id = req.params.id;
    try {
        const response = await pool.query(
            'insert into administrative_roles (administrative_id, roles_id) values($1, $2)',
            [administrative_id, roles_id]
        );

        return res.status(201).json({
            message: 'Asign Role to Administrative successfully',
            body: {
                administrative_id,
                roles_id
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: err,
            body: {
                administrative_id,
                roles_id
            }
        });
    }
}

const getAdministrativeRolesByAdministrative_Id = async (req, res) => {
    const administrative_id = req.params.id;
    try {
        const response = await pool.query(
            'select roles.* '+
            'from roles ' + 
            'where roles.id in (select roles.id ' + 
                                'from roles, administrative_roles ' +
                                'where administrative_roles.administrative_id = $1 and '+
                                    'roles.id = administrative_roles.roles_id' +
                                ')',
            [administrative_id]
        );

        return res.status(200).json(
            response.rows
        );
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err,
        });
    }
}

const deleteRoleToAdministrative = async (req, res) => {
    const { roles_id } = req.body;
    const administrative_id = req.params.id;
    try {
        const response = await pool.query(
            'delete from administrative_roles ' +
            'where administrative_roles.roles_id = $2 and ' +
                'administrative_roles.administrative_id = $1',
            [administrative_id, roles_id]
        );
        return res.status(201).json({
            message: 'Remove Role to Administrative successfully',
            body: {
                administrative_id,
                roles_id
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: err,
        });
    }
}

const _getAdministrativeRolesByAdministrative_Id = async ( administrative_id) => {
    try {
        const response = await pool.query(
            'select roles.* '+
            'from roles ' + 
            'where roles.id in (select administrative_roles.roles_id ' + 
                                'from administrative_roles ' +
                                'where administrative_roles.administrative_id = $1' + 
                                ')',
            [administrative_id]
        );
        return response.rows;
    } catch (err) {
        return res.status(500).json({
            message: err,
        });
    }
}

module.exports = {
    assignRoleToAdministrative,
    getAdministrativeRolesByAdministrative_Id,
    deleteRoleToAdministrative,
    _getAdministrativeRolesByAdministrative_Id
} 