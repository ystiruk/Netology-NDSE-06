const config = require('./config');

const express = require('express');
const bookRouter = require('./routes/book');

const app = express();
app.use(express.json());

app.use('/api/books/', bookRouter);

app.post('/api/user/login', (req, res) => {
    res.status(201).json({ id: 1, mail: "test@mail.ru" });
});

app.listen(config.port);
