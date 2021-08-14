const Book = require('../models/Book');
const idGenerator = require('node-unique-id-generator');

const express = require('express');
const router = express.Router();

const library = {
    books: []
};

router.get('/', (req, res) => {
    res.status(200).json(library.books);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = library.books.findIndex(x => x.id === id);
    if (bookIndex !== -1) {
        res.status(200).json(library.books[bookIndex]);
    } else {
        res.status(404).json();
    }
});

router.post('/', (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const id = idGenerator.generateGUID();
    const newBook = new Book(id, title, description, authors, favorite, fileCover, fileName);
    library.books.push(newBook);

    res.status(201).json(newBook);
});

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = library.books.findIndex(x => x.id === id);
    if (bookIndex !== -1) {
        library.books.splice(bookIndex, 1);
        res.status(204).send(`ok`);
    } else {
        res.status(404).json();
    }
});

module.exports = router;
