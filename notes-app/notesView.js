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

  bindReset() {
    const button = document.getElementById('reset-notes-button');
    if(button) {
      button.addEventListener('click', () => {
        this.client.reset(
          () => {
            this.model.setNotes([]);
            this.displayNotes(); //on Success
          },
          () => {
            this.displayError(); //on Error
          }
        );
      });
    } else {
      console.log("Reset button not found!"); // Error log, remove in production
    }
  }

  displayNotes() { // note is just a string, not object
    // const notesList = document.querySelector('#notes-list'); is more flexible,
    //gets first element in the doc that matches the specified any valid css selector(s)
    //getElemnetById get the first ele in doc with teh specified ID,unique ID identifier,should be only one ele with a given id in a doc
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = ''; // clear the list before displaying the notes
    this.model.getNotes().forEach(async note => { // display each note
      if(!note) { // if note variable is just a string
      // if (!note.content) { //if 'note' as an object and trying to access a 'content' property
        console.log('Note is undefined!', note); //for debugging purpose
        return; // skip this note
      }
        console.log(note);
        const noteElement = document.createElement('li');
        // const response = await fetch(`https://emojicdn.elk.sh/${encodeURIComponent(note)}`);
        // const response = await fetch(`https://emojicdn.elk.sh/${encodeURIComponent(note.content)}`);
        // const emoji = await response.text();
        noteElement.textContent = note;
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
    console.log('displayError has been called');
    //this method creates a new 'div' element
    const errorDiv = document.createElement('div');
    // and sets its text content to 'error msg'
    errorDiv.textContent = "Oops, something went wrong!";
    //it appends 'div' to the body of the document
    document.body.appendChild(errorDiv);
  }
}

module.exports = NotesView;
