const path = require('path');
const config = require('../../config');
const { randomUUID } = require('crypto');
const Book = require('../../models/Book');

const express = require('express');
const router = express.Router();

const fileMiddleware = require('../../middleware/file');

const library = require('../../library');

router.get('/', (_, res) => {
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

router.get('/:id/download', (req, res) => {
    const { id } = req.params;
    const bookIndex = library.books.findIndex(x => x.id === id);
    if (bookIndex !== -1) {

        const pseudoName = randomUUID();
        const rootDirectory = path.join(__dirname, '../../');
        const fullName = path.join(rootDirectory, config.uploadDir, library.books[bookIndex].fileBook);
        const extenstion = path.extname(fullName);

        res.status(200).download(fullName, `${pseudoName}${extenstion}`, err => {
            res.status(404).json();
        });
    } else {
        res.status(404).json();
    }
});

router.post('/', (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const id = randomUUID();
    const newBook = new Book(id, title, description, authors, favorite, fileCover, fileName);
    library.books.push(newBook);

    res.status(201).json(newBook);
});

router.post('/:id/upload', fileMiddleware.single('bookFile'), (req, res) =>
{
    const { id } = req.params;
    const bookIndex = library.books.findIndex(x => x.id === id);
    if (bookIndex !== -1) {
        if (!req.file) {
            //TODO: move error description to middleware
            return res.status(422).send('Please select a .txt or .pdf to upload');
        }

        //TODO: consider deletion of an old file when rewrite OR throwing an error
        library.books[bookIndex].fileBook = req.file.filename;
        res.status(201).json();
    }
    else {
        res.status(404).json();
    }
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
