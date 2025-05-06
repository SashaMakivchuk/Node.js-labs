const Author = require("../models/authorModel");

exports.getAllAuthors = async () => {
    return await Author.find();
};

exports.getAuthorById = async (id) => {
    return await Author.findById(id);
};

exports.createAuthor = async (name, address, topic) => {
    const newAuthor = new Author({ name, address, topic });
    return await newAuthor.save();
};

exports.updateAuthor = async (id, updatedData) => {
    return await Author.findByIdAndUpdate(id, updatedData, { new: true });
};

exports.deleteAuthor = async (id) => {
    return await Author.findByIdAndDelete(id);
};

