const config = require('./config');
const fs = require('fs');
const express = require('express');

const indexRouter = require('./routes/index');
const bookRouter = require('./routes/api/book');
const userRouter = require('./routes/api/user');

ensureProjectStructureCreated();

const app = express();
app.set('view engine', 'ejs');

app.use(express.json());
app.use('/', indexRouter);
app.use('/api/books/', bookRouter);
app.use('/api/user/', userRouter);

app.listen(config.port);

///

function ensureProjectStructureCreated() {
    if (!fs.existsSync(config.uploadDir)) {
        fs.mkdirSync(config.uploadDir, { recursive: true });
    }
}