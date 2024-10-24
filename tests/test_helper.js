const Book = require('../model/books');

const initialData = [
  {
    name: 'book name is this',
    content: 'alway do this',
    price: 200,
  },
  {
    name: 'Peaky Blinders',
    content: 'alway do this',
    price: 100,
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
