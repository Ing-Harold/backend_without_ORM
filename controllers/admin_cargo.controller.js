const { Pool } = require('pg');
const { database } = require('../keys');

const pool = new Pool(database);

const assignCargoToAdministrative = async (req, res) => {
    const { cargo_id } = req.body;
    const admin_id = req.params.id;
    try {
        const response = await pool.query(
            'insert into admin_cargo (admin_id, cargo_id) values($1, $2)',
            [admin_id, cargo_id]
        );
        
        return res.status(201).json({
            message: 'Asign Cargo to Administrative successfully',
            body: {
                admin_id,
                cargo_id
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: err,
            body: {
                admin_id,
                cargo_id
            }
        });
    }
}

const getCargoByAdministrative_Id = async (req, res) => {
    const admin_id = req.params.id;
    try {
        const response = await pool.query(
            'select cargo.* '+
            'from cargo ' + 
            'where cargo.id in (select cargo.id ' + 
                                'from cargo, admin_cargo ' +
                                'where admin_cargo.admin_id = $1 and '+
                                    'cargo.id = admin_cargo.cargo_id' +
                                ')',
            [admin_id]
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

const deleteCargoToAdmin = async (req, res) => {
    const { cargo_id } = req.body;
    const admin_id = req.params.id;
    try {
        const response = await pool.query(
            'delete from admin_cargo ' +
            'where admin_cargo.cargo_id = $2 and ' +
                'admin_cargo.admin_id = $1',
            [admin_id, cargo_id]
        );
        return res.status(201).json({
            message: 'Remove Cargo to Administrative successfully',
            body: {
                admin_id,
                cargo_id
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: err,
        });
    }
}

module.exports = {
    assignCargoToAdministrative,
    getCargoByAdministrative_Id,
    deleteCargoToAdmin
} 