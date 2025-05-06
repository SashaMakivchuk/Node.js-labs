const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    topic: { type: String, required: true }
}, { timestamps: true });

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
