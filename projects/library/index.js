const config = require('./config');

const express = require('express');
const bookRouter = require('./routes/book');
const userRouter = require('./routes/user');

const app = express();
app.use(express.json());

app.use('/api/books/', bookRouter);
app.use('/api/user/', userRouter);

app.listen(config.port);
