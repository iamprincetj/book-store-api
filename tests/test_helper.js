const Book = require('../model/books');

const initialData = [
  {
    author: 'John Smith',
    title: 'alway do this',
    genre: 'motivational',
  },
  {
    author: 'Peaky Blinders',
    title: 'do not do this and that',
    genre: 'crime',
  },
];

const dataInDB = async () => {
  const books = await Book.find({});
  return books.map((item) => item.toJSON());
};

const getDataWithoutId = (data) => {
  const dataWithoutId = data.map((item) => {
    const { id, ...itemWithoutId } = item;
    return itemWithoutId;
  });
  return dataWithoutId;
};

module.exports = {
  initialData,
  getDataWithoutId,
  dataInDB,
};
