import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewAuthor = (obj) => {
  clearDom();
  const domString = `
      <div class="container text-center mt-5">
        <div class="d-flex flex-column align-items-center">
          <h2 class="text-white"><i id="toggle-favorite--${obj.firebaseKey}" class="fa-star ${obj.favorite ? 'fa-solid' : 'fa-regular'}"></i> ${obj.first_name} ${obj.last_name}</h2>
          <p class="text-white">Email: <a href="mailto:${obj.email}">${obj.email}</a></p>
        </div>
        <div>
          <button class="btn btn-info"><i class="fas fa-edit" id="update-author--${obj.firebaseKey}"></i></button>
          <button class="btn btn-danger"><i class="fas fa-trash-alt" id="delete-author-btn--${obj.firebaseKey}"></i></button>
        </div>
      
      <hr>
  
      <h3 class="mt-4 text-center text-white">Books by ${obj.first_name}:</h3>
      <div id="author-books">
        ${obj.books.length > 0 ? obj.books.map((book) => `
          <div class="card">
            <img class="card-img-top" src=${book.image} alt=${book.title} style="height: 400px;">
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <p class="card-text">${book.description || 'No description available.'}</p>
              <a id="view-book-btn--${book.firebaseKey}" class="btn btn-primary">View Book</a>
            </div>
          </div>
        `).join('') : '<p>No books found for this author.</p>'}
      </div>
      </div>
    `;

  renderToDOM('#view', domString);
};

export default viewAuthor;
