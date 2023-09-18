const { Pool } = require('pg');
const { database } = require('../keys');
const path = require('path');
const fs = require('fs');

const pool = new Pool(database);

const { uploadFilesHelpers } = require("../helpers/upload-file.helpers");

const uploadFile = async (req, res) => {
    try {
        const nameFile = await uploadFilesHelpers(req.files, undefined, 'imgs');
        res.status(200).json({ nameFile });
    }
    catch (err) {
        res.status(400).json({
            msg : err
        });
    }
}

const updateImageProfile = async (req, res) => {
    const id = req.params.id;
    try{
        const userImage = await pool.query(
            'select docentes.path_image from docentes where id = $1 limit 1',
            [id]
        );
        if (userImage.rows[0].path_image){
            const pathImageFS = path.join( __dirname, '../uploads/docentes', userImage.rows[0].path_image); 
            if (fs.existsSync(pathImageFS)){
                fs.unlinkSync(pathImageFS);
            }
        }
        const nameFile = await uploadFilesHelpers(req.files, undefined, 'docentes');
        const response = await pool.query(
                'update docentes set path_image = $2 where id = $1',
                [id, nameFile]
            );
        res.status(200).json({
            msg: "Update Image Docentes successfully"
        });
    }catch(err){
        res.status(500).json({
            msg : 'Error al update docentes path_image controller - ' + err
        });
    }
}

const getImageProfile = async (req, res) => {
    const id = req.params.id;
    try{
        const userImage = await pool.query(
            'select docentes.path_image from docentes where id = $1 limit 1',
            [id]
        );
        if (userImage.rows[0].path_image){
            const pathImageFS = path.join( __dirname, '../uploads/docentes', userImage.rows[0].path_image); 
            if (fs.existsSync(pathImageFS)){
                return res.status(200).sendFile(pathImageFS);
            }
        }
        const pathImageFS = path.join( __dirname, '../assets/no-image.jpg'); 
        return res.status(200).sendFile(pathImageFS);
        
    }catch(err){
        res.status(500).json({
            msg : 'Error al update docentes path_image controller - ' + err
        });
    }
}

const updateImageCareers = async (req, res) => {
    const id = req.params.id;
    try{
        const careerImage = await pool.query(
            'select careers.path_image from careers where id = $1 limit 1',
            [id]
        );
        if (careerImage.rows[0].path_image){
            const pathImageFS = path.join( __dirname, '../uploads/careers', careerImage.rows[0].path_image); 
            if (fs.existsSync(pathImageFS)){
                fs.unlinkSync(pathImageFS);
            }
        }
        const nameFile = await uploadFilesHelpers(req.files, undefined, 'careers');
        const response = await pool.query(
                'update careers set path_image = $2 where id = $1',
                [id, nameFile]
            );
        res.status(200).json({
            msg: "Update Image Career"
        });
    }catch(err){
        res.status(500).json({
            msg : 'Error al update careers path_image controller - ' + err
        });
    }
}

const updateMallaCareers = async (req, res) => {
    const id = req.params.id;
    try{
        const careerImage = await pool.query(
            'select careers.path_malla_curricular from careers where id = $1 limit 1',
            [id]
        );
        if (careerImage.rows[0].path_malla_curricular){
            const pathImageFS = path.join( __dirname, '../uploads/careers', careerImage.rows[0].path_malla_curricular); 
            if (fs.existsSync(pathImageFS)){
                fs.unlinkSync(pathImageFS);
            }
        }
        const nameFile = await uploadFilesHelpers(req.files, undefined, 'careers');
        const response = await pool.query(
                'update careers set path_malla_curricular = $2 where id = $1',
                [id, nameFile]
            );
        res.status(200).json({
            msg: "Update malla curricular Career"
        });
    }catch(err){
        res.status(500).json({
            msg : 'Error al update careers path_malla_curricular controller - ' + err
        });
    }
}

const updateImageProfileAdmin = async (req, res) => {
    const id = req.params.id;
    try{
        const userImage = await pool.query(
            'select administrative.path_image from administrative where id = $1 limit 1',
            [id]
        );
        if (userImage.rows[0].path_image){
            const pathImageFS = path.join( __dirname, '../uploads/administrative', userImage.rows[0].path_image); 
            if (fs.existsSync(pathImageFS)){
                fs.unlinkSync(pathImageFS);
            }
        }
        const nameFile = await uploadFilesHelpers(req.files, undefined, 'administrative');
        const response = await pool.query(
                'update administrative set path_image = $2 where id = $1',
                [id, nameFile]
            );
        res.status(200).json({
            msg: "Update Image Administrative successfully"
        });
    }catch(err){
        res.status(500).json({
            msg : 'Error al update administrative path_image controller - ' + err
        });
    }
}

const updateImageFaculUnits = async (req, res) => {
    const id = req.params.id;
    try{
        const userImage = await pool.query(
            'select facultative_units.path_image from facultative_units where id = $1 limit 1',
            [id]
        );
        if (userImage.rows[0].path_image){
            const pathImageFS = path.join( __dirname, '../uploads/facultative_units', userImage.rows[0].path_image); 
            if (fs.existsSync(pathImageFS)){
                fs.unlinkSync(pathImageFS);
            }
        }
        const nameFile = await uploadFilesHelpers(req.files, undefined, 'facultative_units');
        const response = await pool.query(
                'update facultative_units set path_image = $2 where id = $1',
                [id, nameFile]
            );
        res.status(200).json({
            msg: "Update Image facultative_units successfully"
        });
    }catch(err){
        res.status(500).json({
            msg : 'Error al update facultative_units path_image controller db- ' + err
        });
    }
}

const updateImageEvents = async (req, res) => {
    const id = req.params.id;
    try{
        const userImage = await pool.query(
            'select events.path_image from events where id = $1 limit 1',
            [id]
        );
        if (userImage.rows[0].path_image){
            const pathImageFS = path.join( __dirname, '../uploads/events', userImage.rows[0].path_image); 
            if (fs.existsSync(pathImageFS)){
                fs.unlinkSync(pathImageFS);
            }
        }
        const nameFile = await uploadFilesHelpers(req.files, undefined, 'events');
        const response = await pool.query(
                'update events set path_image = $2 where id = $1',
                [id, nameFile]
            );
        res.status(200).json({
            msg: "Update Image events successfully"
        });
    }catch(err){
        res.status(500).json({
            msg : 'Error al update events path_image controller db- ' + err
        });
    }
}

const updateImageNews = async (req, res) => {
    const id = req.params.id;
    try{
        const userImage = await pool.query(
            'select news.path_image from news where id = $1 limit 1',
            [id]
        );
        if (userImage.rows[0].path_image){
            const pathImageFS = path.join( __dirname, '../uploads/news', userImage.rows[0].path_image); 
            if (fs.existsSync(pathImageFS)){
                fs.unlinkSync(pathImageFS);
            }
        }
        const nameFile = await uploadFilesHelpers(req.files, undefined, 'news');
        const response = await pool.query(
                'update news set path_image = $2 where id = $1',
                [id, nameFile]
            );
        res.status(200).json({
            msg: "Update Image news successfully"
        });
    }catch(err){
        res.status(500).json({
            msg : 'Error al update news path_image controller db- ' + err
        });
    }
}

module.exports = {
    uploadFile,
    updateImageProfile,
    getImageProfile,
    updateImageCareers,
    updateMallaCareers,
    updateImageProfileAdmin,
    updateImageFaculUnits,
    updateImageEvents,
    updateImageNews
}