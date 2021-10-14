const PORT = process.env.PORT || 3000;
const USER_DB = process.env.DB_USERNAME || 'root';
const PASSWORD_DB = process.env.DB_PASSWORD || 'password';
const NAME_DB = process.env.DB_NAME || 'library_db';
const HOST_DB = process.env.DB_HOST || 'mongodb://localhost:27017/';
const uploadDir = 'upload/books';

module.exports = {
    PORT,
    USER_DB,
    PASSWORD_DB,
    NAME_DB,
    HOST_DB,
    uploadDir
};
