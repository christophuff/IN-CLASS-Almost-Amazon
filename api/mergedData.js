// for merged promises

import { getSingleBook } from './bookData';
import { getSingleAuthor, getAuthorBooks } from './authorData';

// TODO: Get data for viewBook
const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
  // GET Single Book
  getSingleBook(firebaseKey).then((bookObject) => {
    getSingleAuthor(bookObject.author_id).then((authorObject) => resolve({ ...bookObject, authorObject }));
  }).catch(reject);
});

const getAuthorDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleAuthor(firebaseKey).then((authorObject) => {
    getAuthorBooks(firebaseKey).then((booksArray) => {
      resolve({ ...authorObject, books: booksArray });
    }).catch(reject);
  });
});

export {
  getBookDetails,
  getAuthorDetails
};
