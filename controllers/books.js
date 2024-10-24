const Book = require('../model/books');

const bookRouter = require('express').Router();

bookRouter.get('/', async (req, res) => {
  const books = await Book.find({});
  res.json(books);
});

bookRouter.post('/', async (req, res) => {
  const body = req.body;
  const book = new Book(body);

  const newBook = await book.save();

  res.status(201).json(newBook);
});

bookRouter.put('/:id', async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const book = await Book.findByIdAndUpdate(id, body, { new: true }).then(
    (updatedBook) => {
      res.json(updatedBook);
    }
  );
});

bookRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await Book.findByIdAndDelete(id);

  res.status(204).end();
});

module.exports = bookRouter;
