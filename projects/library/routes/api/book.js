const path = require('path');
const config = require('../../config');
const { randomUUID } = require('crypto');
const Book = require('../../models/book');

const express = require('express');
const router = express.Router();

const fileMiddleware = require('../../middleware/file');

router.get('/', async (_, res) => {
    const books = await Book.find().select('-__v');
    res.status(200).json(books);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const book = await Book.findById(id).select('-__v');
        if (book === null) {
            res.status(404).json();
        } else {
            res.status(200).json(book);
        }
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }
});

router.post('/', async (req, res) => {
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const newBook = new Book({
        title, 
        description, 
        authors, 
        favorite, 
        fileCover, 
        fileName
    });
    
    try {
        await newBook.save();
        res.status(201).json(newBook);
    } catch (e) {
        console.error(e);
        res.status(500).json();
    }

});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, authors, favorite, fileCover, fileName } = req.body;

    try {
        await Book.findByIdAndUpdate(id, {
            title, description, authors, favorite, fileCover, fileName
        });
        res.redirect(`/api/books/${id}`);
    } catch(e) {
        console.error(e);
        res.status(500).json();
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        await Book.deleteOne({ '_id': id });
        res.send('ok');
    } catch(e) {
        console.error(e);
        res.status(500).json();
    }
});

module.exports = router;
