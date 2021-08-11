const config = require('./config');
const Book = require('./models/Book');
const express = require('express');
const idGenerator = require('node-unique-id-generator');

const library = {
    books: []
};

const app = express();
app.use(express.json());

app.post('/api/user/login', (req, res) => {
    res.status(201).json({ id: 1, mail: "test@mail.ru" });
});

app.get('/api/books/', (req, res) => {
    res.status(200).json(library.books);
});

app.get('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = library.books.findIndex(x => x.id === id);
    if (bookIndex !== -1) {
        res.status(200).json(library.books[bookIndex]);
    } else {
        res.status(404).json();
    }
});

app.post('/api/books/', (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const id = idGenerator.generateGUID();
    const newBook = new Book(id, title, description, authors, favorite, fileCover, fileName);
    library.books.push(newBook);

    res.status(201).json(newBook);
});

app.put('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = library.books.findIndex(x => x.id === id);
    if (bookIndex !== -1) {
        const { title, description, authors, favorite, fileCover, fileName } = req.body;
        library.books[bookIndex] = {
            ...library.books[bookIndex],
            title, description, authors, favorite, fileCover, fileName
        };
        res.status(200).json(library.books[bookIndex]);
    } else {
        res.status(404).json();
    }
});

app.delete('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = library.books.findIndex(x => x.id === id);
    if (bookIndex !== -1) {
        library.books.splice(bookIndex, 1);
        res.status(204).send(`ok`);
    } else {
        res.status(404).json();
    }
});

app.listen(config.port);
