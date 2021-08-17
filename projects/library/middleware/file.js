const crypto = require('crypto');
const multer = require('multer');
const config = require('../config');
const path = require('path');

const _hexStringLength = 16;

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, config.uploadDir);
    },
    filename(req, file, cb) {
        var hexString = crypto.randomBytes(_hexStringLength).toString("hex");
        const extension = path.extname(file.originalname);
        cb(null, `${hexString}${extension}`);
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