const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp'),
    storage: multer.diskStorage({
        destination: (req, file, cbk) => {
            cbk(null, path.resolve(__dirname, '..', '..', 'tmp'));
        },
        filename: (req, file, cbk) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) cbk(err);
                file.key = `${hash.toString('hex')}-${file.originalname}`;

                cbk(null, file.key);
            })
        }
    })
}