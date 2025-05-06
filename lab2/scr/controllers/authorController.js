const authorService = require("../services/authorService");
const { successResponse, errorResponse } = require("../helpers/responseHelper");

exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await authorService.getAllAuthors();
        return successResponse(res, authors);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

exports.getAuthorById = async (req, res) => {
    try {
        const author = await authorService.getAuthorById(req.params.id);
        if (!author) return errorResponse(res, "Author not found", 404);
        return successResponse(res, author);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

exports.createAuthor = async (req, res) => {
    try {
        const { name, address, topic } = req.body;
        if (!name || !address || !topic) return errorResponse(res, "All fields are required");

        const newAuthor = await authorService.createAuthor(name, address, topic);
        return successResponse(res, newAuthor, "Author created successfully");
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

exports.updateAuthor = async (req, res) => {
    try {
        const updatedAuthor = await authorService.updateAuthor(req.params.id, req.body);
        if (!updatedAuthor) return errorResponse(res, "Author not found", 404);
        return successResponse(res, updatedAuthor, "Author updated successfully");
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};

exports.deleteAuthor = async (req, res) => {
    try {
        const deletedAuthor = await authorService.deleteAuthor(req.params.id);
        if (!deletedAuthor) return errorResponse(res, "Author not found", 404);
        return successResponse(res, null, "Author deleted successfully");
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
};
