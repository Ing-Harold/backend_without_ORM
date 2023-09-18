
const validate_file = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(404).json({ msg: 'No hay archivos que subir - file' });
        return;
    }

    next();
}

module.exports = {
    validate_file
}