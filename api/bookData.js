import client from '../utils/client';
// API CALLS FOR BOOKS

const endpoint = client.databaseURL;

// TODO: GET BOOKS
const getBooks = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// TODO: DELETE BOOK
const deleteBook = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: GET SINGLE BOOK
const getSingleBook = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: CREATE BOOK
const createBook = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: UPDATE BOOK
const updateBook = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// TODO: FILTER BOOKS ON SALE
const booksOnSale = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books.json?orderBy="sale"&equalTo=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// TODO: STRETCH...SEARCH BOOKS

const searchBooks = (e) => new Promise((resolve, reject) => {
  const userInput = e.target.value.toLowerCase();

  fetch(`${endpoint}/books.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((bookData) => {
      if (!bookData) {
        resolve([]); // Resolve with empty array if no data
        return;
      }

      // Convert Firebase Object into an array
      const booksArray = Object.keys(bookData).map((key) => ({
        firebaseKey: key,
        ...bookData[key],
      }));

      // Filter books based on title or description
      const searchResult = booksArray.filter((book) => book.title.toLowerCase().includes(userInput) || book.description.toLowerCase().includes(userInput));

      resolve(searchResult); // Resolve with filtered results
    })
    .catch(reject);
});

export {
  getBooks,
  createBook,
  booksOnSale,
  deleteBook,
  getSingleBook,
  updateBook,
  searchBooks
};
