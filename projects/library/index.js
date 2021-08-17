const config = require('./config');
const fs = require('fs');
const express = require('express');
const bookRouter = require('./routes/book');
const userRouter = require('./routes/user');

ensureProjectStructureCreated();

const app = express();
app.use(express.json());

app.use('/api/books/', bookRouter);
app.use('/api/user/', userRouter);

app.listen(config.port);

///

function ensureProjectStructureCreated() {
    if (!fs.existsSync(config.uploadDir)) {
        fs.mkdirSync(config.uploadDir, { recursive: true });
    }
}