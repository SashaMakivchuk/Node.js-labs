const createError = require('http-errors');
const ObjectId = require('mongoose').Types.ObjectId;
const bookService = require('../services/books.service');
const { BookCreateSchema, BookUpdateSchema } = require('../joi_validation_schemas/books.schemas');

async function bookByIdValidation(req, res, next) {
    try {
        const { bookId } = req.params;

        if (!ObjectId.isValid(bookId)) {
            throw createError.BadRequest("Book ID is not valid");
        }

        const book = await bookService.findById(bookId);
        if (!book) {
            throw createError.NotFound("Book not found");
        }

        next();
    } catch (err) {
        next(err);
    }
}

async function bookCreationDataValidation(req, res, next) {
    try {
        const { error } = BookCreateSchema.validate(req.body);
        if (error) {
            throw createError.BadRequest(error.details[0].message);
        }
        
        next();
    } catch (err) {
        next(err);
    }
}

async function bookUpdateDataValidation(req, res, next) {
    try {
        const { error } = BookUpdateSchema.validate(req.body);
        if (error) {
            throw createError.BadRequest(error.details[0].message);
        }

        next();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    bookByIdValidation,
    bookCreationDataValidation,
    bookUpdateDataValidation,
};

