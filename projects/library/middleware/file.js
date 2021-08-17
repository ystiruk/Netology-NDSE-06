const multer = require('multer');
const config = require('../config');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, config.uploadDir);
    }
});

const allowedTypes = ['text/plain', 'application/pdf'];
const fileFilter = (_, file, cb) => {
    if (allowedTypes.includes(file.mimetype) && file.originalname.match(/\.(txt|pdf)$/)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

module.exports = multer({
    storage,
    fileFilter
});