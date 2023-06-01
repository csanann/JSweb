// file: notesView.js

class NotesView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
  }

  bindSubmit = () => {
    const form = document.getElementById('note-form');
    if (form) {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const noteContent = document.getElementById('note-input').value; // get note content from the form input
        await this.client.createNote(
          noteContent,
          () => {
            this.displayNotes(); //on success
          },
          () => {
            this.displayError(); //on Error
          }
        );
      });
    } else {
      console.log("Form not found!"); // Error log, remove in production
    }
  }

  displayNotes() {
    const notesList = document.getElementById('note-list');
    notesList.innerHTML = ''; // clear the list before displaying the notes
    this.model.getNotes().forEach(note => { // display each note
      const noteElement = document.createElement('li');
      noteElement.textContent = note.content;
      notesList.appendChild(noteElement);
    });
  }

  displayNotesFromApi() {
    this.client.getNotes((notes) => {
      this.model.setNotes(notes);
      this.displayNotes();
    },
    () => {
      this.displayError();
    });
  }

  //create a method displayError
  displayError() {
    //this method creates a new 'div' element
    const errorDiv = document.createElement('div');
    // and sets its text content to 'error msg'
    errorDiv.textContent = "Oops, something went wrong!";
    //it appends 'div' to the body of the document
    document.body.appendChild(errorDiv);
  }
}

module.exports = NotesView;
