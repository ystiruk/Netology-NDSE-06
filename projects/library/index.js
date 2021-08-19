const config = require('./config');
const fs = require('fs');
const express = require('express');

const indexRouter = require('./routes/index');
const bookRouter = require('./routes/book');
const bookApiRouter = require('./routes/api/book');
const userApiRouter = require('./routes/api/user');

ensureProjectStructureCreated();

const app = express();
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded());
app.use('/', indexRouter);
app.use('/books/', bookRouter);
app.use('/api/books/', bookApiRouter);
app.use('/api/user/', userApiRouter);

app.listen(config.port);

///

function ensureProjectStructureCreated() {
    if (!fs.existsSync(config.uploadDir)) {
        fs.mkdirSync(config.uploadDir, { recursive: true });
    }
}