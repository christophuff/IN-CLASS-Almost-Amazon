import firebase from 'firebase/app';
import 'firebase/auth';
import { signOut } from '../utils/auth';
import { getBooks, booksOnSale, searchBooks } from '../api/bookData';
import { getAuthors, getFavoriteAuthors } from '../api/authorData';
import { showBooks } from '../pages/books';
import { showAuthors, emptyAuthors } from '../pages/authors';
// import {
//   getBooks, createBook, booksOnSale, deleteBook, getSingleBook, updateBook
// } from '../api/bookData';
// import { showBooks, emptyBooks } from '../pages/books';

// navigation events
const navigationEvents = () => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // TODO: BOOKS ON SALE
  document.querySelector('#sale-books').addEventListener('click', () => {
    firebase.auth().onAuthStateChanged((user) => {
      booksOnSale(user.uid).then(showBooks);
    });
  });

  // TODO: ALL BOOKS
  document.querySelector('#all-books').addEventListener('click', () => {
    firebase.auth().onAuthStateChanged((user) => {
      getBooks(user.uid).then(showBooks);
    });
  });

  // FIXME: STUDENTS Create an event listener for the Authors
  // 1. When a user clicks the authors link, make a call to firebase to get all authors
  // 2. Convert the response to an array because that is what the makeAuthors function is expecting
  // 3. If the array is empty because there are no authors, make sure to use the emptyAuthor function
  document.querySelector('#authors').addEventListener('click', () => {
    firebase.auth().onAuthStateChanged((user) => {
      getAuthors(user.uid).then((response) => {
        const authors = response ? Object.values(response) : []; // Convert response to an array
        if (authors.length === 0) {
          emptyAuthors(); // Show "No Authors" message if list is empty
        } else {
          showAuthors(authors); // Display authors
        }
      }).catch((error) => console.error('Error fetching authors:', error));
    });
  });

  // favorite authors
  document.querySelector('#fav-authors').addEventListener('click', () => {
    firebase.auth().onAuthStateChanged((user) => {
      getFavoriteAuthors(user.uid).then(showAuthors);
    });
  });

  // STRETCH: SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    firebase.auth().onAuthStateChanged((user) => {
      searchBooks(e, user.uid).then(showBooks);
    });
  });
};

export default navigationEvents;
