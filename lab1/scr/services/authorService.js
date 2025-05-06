const authors = require("../helpers/mockData");

exports.getAllAuthors = () => authors;

exports.getAuthorById = (id) => authors.find(author => author.id === id);

exports.createAuthor = (name, address, topic) => {
    const newAuthor = {
        id: authors.length ? authors[authors.length - 1].id + 1 : 1,
        name,
        address,
        topic
    };
    authors.push(newAuthor);
    return newAuthor;
};

exports.updateAuthor = (id, updatedData) => {
    const author = authors.find(a => a.id === id);
    if (!author) return null;

    Object.assign(author, updatedData);
    return author;
};

exports.deleteAuthor = (id) => {
    const index = authors.findIndex(a => a.id === id);
    if (index === -1) return false;

    authors.splice(index, 1);
    return true;
};
