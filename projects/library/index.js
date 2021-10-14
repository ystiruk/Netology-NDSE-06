const mongoose = require('mongoose');
const config = require('./config');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const bookRouter = require('./routes/book');
const bookApiRouter = require('./routes/api/book');
const userApiRouter = require('./routes/api/user');

ensureProjectStructureCreated();

const app = express();
app.set('view engine', 'ejs');

app.use(express.json());
app.use(bodyParser.urlencoded());
app.use('/', indexRouter);
app.use('/books/', bookRouter);
app.use('/api/books/', bookApiRouter);
app.use('/api/user/', userApiRouter);

start();

///

function ensureProjectStructureCreated() {
    if (!fs.existsSync(config.uploadDir)) {
        fs.mkdirSync(config.uploadDir, { recursive: true });
    }
}

async function start() {
    try {
        await mongoose.connect(config.HOST_DB, {
            user: config.USER_DB,
            pass: config.PASSWORD_DB,
            dbName: config.NAME_DB,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }); 
        
        app.listen(config.PORT, () => {
            console.log(`=== start server PORT ${config.PORT} ===`);
        });
    } catch (e) {
        console.log(e);
    }
}
