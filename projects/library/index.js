const config = require('./config');
const express = require('express');

const app = express();

app.get('/api', (req, res) => {
    const body = {
        version: 'api version 0.0.1',
    };

    res.send(body);
});

app.post('/api/user/login', (req, res) => {
    res.status(201).json({
        id: 1,
        mail: "test@mail.ru"
    });
});

app.get('/api/books/', (req, res) => {
    res.send(`POST /api/books/`);
});
app.get('/api/books/:id', (req, res) => {
    const {
        id
    } = req.params;
    res.send(`GET /api/books/${id}`);
});

app.post('/api/books/', (req, res) => {
    res.send(`POST /api/books/`);
});
app.put('/api/books/:id', (req, res) => {
    const {
        id
    } = req.params;
    res.send(`PUT /api/books/${id}`);
});
app.delete('/api/books/:id', (req, res) => {
    const {
        id
    } = req.params;
    res.send(`ok`);
});

app.listen(config.port);
