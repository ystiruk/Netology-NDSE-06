const express = require('express');
const router = express.Router();

const library = require('../library');

router.get('/', (req, res) => {
    res.render("book/index", {
        title: "Library",
        books: library.books
    });
});

module.exports = router;
