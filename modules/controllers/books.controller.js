const bookService = require('../services/books.service');

async function createBook(req, res) {
    try {
        const newBook = await bookService.create(req.body);
        res.status(201).json({ status: 201, data: newBook });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, error: err.message });
    }
};

async function getBooks(req, res) {
    try {
        const books = await bookService.find(req.query);
        res.status(200).json({ status: 200, data: books });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, error: err.message });
    }
};

async function getBook(req, res) {
    try {
        const { bookId } = req.params;
        const book = await bookService.findById(bookId);

        if (!book) {
            return res.status(404).json({ status: 404, message: 'Book not found.' });
        }

        res.status(200).json({ status: 200, data: book });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, error: err.message });
    }
};

async function updateBook(req, res) {
    try {
        const { bookId } = req.params;
        const bookData = req.body;
        const updatedBook = await bookService.findByIdAndUpdate(bookId, bookData);

        res.status(200).json({ status: 200, data: updatedBook });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, error: err.message });
    }
};

async function deleteBook(req, res) {
    try {
        const { bookId } = req.params;
        await bookService.findByIdAndDelete(bookId);
        res.status(200).json({ status: 200, message: 'Book deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 500, error: err.message });
    }
};

module.exports = {
    createBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook,
};
