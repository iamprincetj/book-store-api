require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');
const bookRouter = require('./controllers/books');
const { ErrorHandler } = require('./utils/middleware');

app.use(cors());
app.use(express.json());

app.use('/books', bookRouter);

app.use(ErrorHandler);

module.exports = app;
