const Book = require('../models/book');
const { randomUUID } = require('crypto');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const books = await Book.find();

    res.render("book/index", {
        title: "Library",
        books: books
    });
});

router.get('/create', (req, res) => {
    res.render("book/create", {
        title: "Add book",
        book: {}
    });
});
router.post('/create', async (req, res) => {
    const { title, description, authors } = req.body;
    const id = randomUUID();
    const newBook = new Book({
        id, title, description, authors,
    });

    try {
        await newBook.save();
        res.redirect('/books');
    } catch (e) {
        console.error(e);
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    let book;
 
    try {
        book = await Book.findById(id);
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }   

    res.render("book/view", {
        title: "View book",
        book: book,
    });
});

router.get('/update/:id', async (req, res) => {
    const {id} = req.params;
    let book;

    try {
        book = await Book.findById(id);
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.render("book/update", {
        title: "Update book",
        book: book,
    });
});
router.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, authors } = req.body;
    
    try {
        await Book.findByIdAndUpdate(id, { title, description, authors });
    } catch(e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.redirect(`/books`);
});

router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        await Book.deleteOne({ _id: id });
    } catch(e) {
        console.error(e);
        res.status(404).redirect('/404');
    }

    res.redirect('/books');
});

module.exports = router;
