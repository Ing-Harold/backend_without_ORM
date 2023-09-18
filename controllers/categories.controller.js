const { Pool } = require('pg');
const { database } = require('../keys');

const pool = new Pool(database);

const createCategories = async (req, res) => {
    const { name } = req.body;
    try {
        const response = await pool.query(
            'insert into categories (name) values($1)',
            [name]
        );

        return res.status(201).json({
            message: 'Categories created successfully',
            body: {
                categories: { name }
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al crear Categories en la db' + error
        });
    }
}

const getCategories = async (req, res) => {
    try {
        const response = await pool.query('Select * from categories');
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener Categories en la db' + error
        });
    }
}

const getCategoriesById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('select * from categories where id = $1', [id]);
        res.status(200).json(response.rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener Categories ' + id + ' en la db - ' + error
        });
    }
}

const updateCategoriesById = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    try {
        const response = await pool.query(
            'update categories set name = $1 where id = $2',
            [name, id]);
        res.status(200).json({
            message: 'Categorie updated successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar Categories ' + id + ' en la db - ' + error
        });
    }
}

const deleteCategoriesById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query(
            'delete from categories where id = $1',
            [id]);
        res.status(200).json({
            message: 'Categorie delete successfully',
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar Categories ' + id + ' en la db - ' + error
        });
    }
}

module.exports = {
    createCategories,
    deleteCategoriesById,
    getCategories,
    getCategoriesById,
    updateCategoriesById
}