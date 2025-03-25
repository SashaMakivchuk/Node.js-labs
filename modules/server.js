const mongoose = require('mongoose');
const express = require('express');
const { port, mongodb_uri } = require('./config');
const booksRouter = require('./routes/books.route');

mongoose.connect(mongodb_uri)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();

app.use(express.json());

app.use('/books', booksRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
