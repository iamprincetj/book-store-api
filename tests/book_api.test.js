const { test, after, beforeEach, describe, afterEach } = require('node:test');
const { strictEqual, deepStrictEqual } = require('assert');
const assert = require('assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Book = require('../model/books');
const { initialData, dataInDB, getDataWithoutId } = require('./test_helper');

const initialDataLength = initialData.length;

const api = supertest(app);
const rootRoute = '/books';

describe('Book Store API', () => {
  beforeEach(async () => {
    await Book.insertMany(initialData);
  });

  test('books are returned as expected', async () => {
    // Make a GET request to the api
    const req = await api
      .get(rootRoute)
      .expect(200) // checks if the status code is corect
      .expect('Content-Type', /application\/json/); // checks if the returned data is in json format

    const dataWithoutId = getDataWithoutId(req.body);

    deepStrictEqual(initialData, dataWithoutId); // checks with deepStrictEqual if the returned data is equal to the data we added to the data base in the beforeEach function
  });

  test('returned books has same length as in DB', async () => {
    const req = await api.get(rootRoute).expect(200);
    strictEqual(req.body.length, initialDataLength);
  });

  test('can successfully add a book', async () => {
    const dataToSend = {
      author: 'Eleven Doery',
      title: 'Eleven is the strongest in Stranger things',
      genre: 'action',
    };
    // Get the data from the DB (Database) before making req
    const booksBeforeReq = await dataInDB();
    const req = await api.post(rootRoute).send(dataToSend).expect(201);
    // Get the data from the DB (Database) after making req
    const booksAfterReq = await dataInDB();

    const bookAuthors = booksAfterReq.map((item) => item.author);
    strictEqual(req.body.author, dataToSend.author);
    strictEqual(booksAfterReq.length, initialDataLength + 1);
    strictEqual(bookAuthors.includes(dataToSend.author), true);
  });

  test('can successfully update a specific book', async () => {
    const booksBeforeReq = await dataInDB();
    const dataToUpdate = booksBeforeReq[0];
    const dataToUpdateWith = {
      author: 'Light Yagami',
      title: 'Anime is the best',
      genre: 'anime',
    };

    const req = await api
      .put(`${rootRoute}/${dataToUpdate.id}`)
      .send(dataToUpdateWith)
      .expect(200);

    const booksAfterReq = await dataInDB();
    strictEqual(dataToUpdateWith.author, req.body.author);
    deepStrictEqual(getDataWithoutId(booksAfterReq)[0], dataToUpdateWith);
  });

  test('can successfully delete a specific book', async () => {
    const booksBeforeReq = await dataInDB();
    const dataToDelete = booksBeforeReq[0];

    const req = await api.delete(`${rootRoute}/${dataToDelete.id}`).expect(204);
    const booksAfterReq = await dataInDB();

    const bookAuthors = booksAfterReq.map((item) => item.author);

    strictEqual(booksAfterReq.length, initialDataLength - 1);
    strictEqual(bookAuthors.includes(dataToDelete.author), false);
  });

  afterEach(async () => {
    await Book.deleteMany();
  });
});

after(async () => {
  await mongoose.connection.close();
});
