const mongoose = require('mongoose');
const { MONGODB_URL } = require('../utils/config');

mongoose.set('strictQuery');

console.log(MONGODB_URL);

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const bookSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    minLength: 3,
  },
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
});

bookSchema.set('toJSON', {
  transform: (document, returnedData) => {
    returnedData.id = returnedData._id.toString();
    delete returnedData._id;
    delete returnedData.__v;
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
