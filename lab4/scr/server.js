const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const { port, mongodb_uri } = require('./config');
const booksRouter = require('./routes/books.route');
const { authenticationCheck } = require('./middlewares/auth.middleware');

mongoose.connect(mongodb_uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toUTCString()}] ${req.method}: ${req.path}`);
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    data: { message: 'Node.js ExApp' }
  });
});

app.use(authenticationCheck);

app.use('/books', booksRouter);

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  console.error(`[${new Date().toUTCString()}] ${req.method} ${req.path} - Error ${status}: ${err.message}`);
  res.status(status).json({
    status,
    error: { message: err.message }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
