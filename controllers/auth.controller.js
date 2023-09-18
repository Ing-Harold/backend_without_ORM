const { Pool } = require('pg');
const { database } = require('../keys');
const bcryptsjs = require('bcryptjs');

const { generateJWT } = require('../helpers/generate-jwt');

const pool = new Pool(database);

const login = async (req, res) => {
    const { email, password } = req.body;
    var passwordVerify;
    try {
        passwordVerify = await pool.query('select * from administrative where email = $1 limit 1', [email]);
        const validPassword = bcryptsjs.compareSync(password, passwordVerify.rows[0].password);
        if (!validPassword) {
            return res.status(400).json({
                message: 'Contraseña incorrecta',
            });
        }
        const token = await generateJWT(passwordVerify.rows[0].id);
        const { id, ci, name, sexo, telephone, estado, description, path_image, created_at, updated_at } = passwordVerify.rows[0];
        return res.status(200).json({
            message: 'Login successfully',
            body: {
                id, ci, name, sexo, telephone, estado, description, path_image, created_at, updated_at
            },
            token
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al login en la db' + error
        });
    }
}

const tokenVerify = async (req, res) => {
    try {
        return res.status(200).json({
            message: 'Token valido',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Token error' + error
        });
    }
}

module.exports = {
    login,
    tokenVerify
};
