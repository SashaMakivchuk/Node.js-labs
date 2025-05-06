const authorService = require("../services/authorService");
const { successResponse, errorResponse } = require("../helpers/responseHelper");

exports.getAllAuthors = (req, res) => {
    const authors = authorService.getAllAuthors();
    return successResponse(res, authors);
};

exports.getAuthorById = (req, res) => {
    const id = parseInt(req.params.id);
    const author = authorService.getAuthorById(id);

    if (!author) return errorResponse(res, "Author not found", 404);
    return successResponse(res, author);
};

exports.createAuthor = (req, res) => {
    const { name, address, topic } = req.body;
    if (!name || !address || !topic) return errorResponse(res, "All fields are required");

    const newAuthor = authorService.createAuthor(name, address, topic);
    return successResponse(res, newAuthor, "Author created successfully");
};

exports.updateAuthor = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedAuthor = authorService.updateAuthor(id, req.body);

    if (!updatedAuthor) return errorResponse(res, "Author not found", 404);
    return successResponse(res, updatedAuthor, "Author updated successfully");
};

exports.deleteAuthor = (req, res) => {
    const id = parseInt(req.params.id);
    const deleted = authorService.deleteAuthor(id);

    if (!deleted) return errorResponse(res, "Author not found", 404);
    return successResponse(res, null, "Author deleted successfully");
};
