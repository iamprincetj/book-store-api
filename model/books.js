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
  name: {
    type: String,
    required: true,
    minLength: 5,
  },
  content: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
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
