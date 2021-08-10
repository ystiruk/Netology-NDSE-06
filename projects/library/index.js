const config = require('./config');
const {
    Book
} = require('./model');
const express = require('express');
const idGenerator = require('node-unique-id-generator');

const library = {
    books: []
};

const app = express();
app.use(express.json());

app.post('/api/user/login', (req, res) => {
    res.status(201).json({
        id: 1,
        mail: "test@mail.ru"
    });
});

app.get('/api/books/', (req, res) => {
    res.status(200).json(library.books);
});

app.get('/api/books/:id', (req, res) => {
    const {
        id
    } = req.params;
    const bookIndex = library.books.findIndex(x => x.id === id);
    if (bookIndex !== -1) {
        res.status(200).json(library.books[bookIndex]);
    } else {
        res.status(404).json();
    }
});

app.post('/api/books/', (req, res) => {
    res.send(`POST /api/books/`);
});

app.put('/api/books/:id', (req, res) => {
    const {
        id
    } = req.params;
    const bookIndex = library.books.findIndex(x => x.id === id);
    if (bookIndex !== -1) {
        res.status(200).json(library.books[bookIndex]);
    } else {
        res.status(404).json();
    }
    //TODO: parse body, save
    //const { body }  = req;
});

app.delete('/api/books/:id', (req, res) => {
    const {
        id
    } = req.params;
    res.send(`ok`);
});

app.listen(config.port);
