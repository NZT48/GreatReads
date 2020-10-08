var express = require('express');
var api = express.Router();
var BookController = require('../controllers/book');

// Get books or book
api.get('/books', BookController.getBooks);
api.get('/book/:name', BookController.getBookByName);

// Adding new book
api.post('/add_book', BookController.addBook);
api.get('/unapproved_books', BookController.unapprovedBooks);
api.get('/accept_book/:name', BookController.acceptBook);
api.get('/reject_book/:name', BookController.rejectBook);

// Updating book
api.post('/update_book', BookController.updateBook);
api.post('/update_book_pdf', BookController.updateBookPDF);

// Interact with genres
api.get('/genres', BookController.getGenres);
api.get('/remove_genre/:name', BookController.removeGenre);
api.get('/add_genre/:name', BookController.addGenre);

// Interact with comments
api.get('/book_comment/:book', BookController.getCommentsForBook);
api.get('/author_comment/:author', BookController.getCommentsForAuthor);
api.post('/add_comment', BookController.addComment);




module.exports = api;