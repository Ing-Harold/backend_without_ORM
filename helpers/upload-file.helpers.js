const path = require('path');

const uploadFilesHelpers = ( files , extensionsList = ['png', 'jpg', 'jpeg', 'gif'], tableFile = '') => {
    return new Promise((resolve, reject) => {
        const { file } = files;
        const descNameFile = file.name.split('.');
        const extension = descNameFile[descNameFile.length - 1];

        if (!extensionsList.includes(extension)) {
            return reject(`Format ${extension} no permitted, please just format ${extensionsList}`);
        }

        const uploadPath = path.join(__dirname, '../uploads/' + tableFile , file.name);

        file.mv(uploadPath, (err) => {
            if (err) return reject( err );
            resolve( file.name);
        });
    });
}

module.exports = {
    uploadFilesHelpers
}