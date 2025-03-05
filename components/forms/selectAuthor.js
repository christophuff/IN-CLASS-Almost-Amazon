import firebase from 'firebase';
import 'firebase/auth';
import { getAuthors } from '../../api/authorData';
import renderToDOM from '../../utils/renderToDom';

const selectAuthor = (authorId) => {
  let domString = `<label for="author">Select an Author</label>
    <select class="form-control" id="author_id" required>
    <option value="">Select an Author</option>`;

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      getAuthors(user.uid).then((authorsArray) => {
        authorsArray.forEach((author) => {
          domString += `
              <option 
                value="${author.firebaseKey}" 
                ${authorId === author.firebaseKey ? 'selected' : ''}>
                  ${author.first_name} ${author.last_name}
              </option>`;
        });

        domString += '</select>'; // Move this line here after authors are added

        renderToDOM('#select-author', domString); // Render the populated select element
      }).catch((error) => {
        console.error('Error fetching authors:', error);
      });
    }
  });
};

export default selectAuthor;
