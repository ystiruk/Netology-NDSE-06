const Book = require('../models/Book');
const { randomUUID } = require('crypto');
const express = require('express');
const router = express.Router();

const library = require('../library');

router.get('/', (req, res) => {
    res.render("book/index", {
        title: "Library",
        books: library.books
    });
});

router.get('/create', (req, res) => {
    res.render("book/create", {
        title: "Add book",
        book: {}
    });
});
router.post('/create', (req, res) => {
    const { title, description, authors } = req.body;
    const id = randomUUID();
    const newBook = new Book(id, title, description, authors, '', '', '');
    library.books.push(newBook);

    res.redirect('/books');
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    const bookIndex = library.books.findIndex(x => x.id === id);

    if (bookIndex !== -1) {
        res.render("book/view", {
            title: "View book",
            book: library.books[bookIndex],
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.get('/update/:id', (req, res) => {
    const {id} = req.params;
    const bookIndex = library.books.findIndex(x => x.id === id);

    if (bookIndex !== -1) {
        res.render("book/update", {
            title: "Update book",
            book: library.books[bookIndex],
        });
    } else {
        res.status(404).redirect('/404');
    }
});
router.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, authors } = req.body;
    
    const bookIndex = library.books.findIndex(x => x.id === id);
    if (bookIndex !== -1) {
        library.books[bookIndex] = {
            ...library.books[bookIndex],
            title,
            description,
            authors
        };
        res.redirect(`/books`);
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = library.books.findIndex(x => x.id === id);
    if (bookIndex !== -1) {
        library.books.splice(bookIndex, 1);
        res.redirect('/books');
    } else {
        res.status(404).redirect('/404');
    }
});

module.exports = router;
