// file: notesView.js

class NotesView {
    constructor(model, client) {
      this.model = model;
      this.client = client;
    }
  
    bindSubmit() {
      const form = document.getElementById('note-form');
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const noteContent = document.getElementById('note-input').value; // get note content from the form input
        await this.client.createNote(noteContent); // create the new note in the backend
        this.displayNotes(); // refresh the view to show the newly created note
      });
    }
  
    displayNotes() {
      const notesList = document.getElementById('note-list');
      //const notes = await this.client.loadNotes(); // get notes from the backend using client
      notesList.innerHTML = ''; // clear the list before displaying the notes
      notes.forEach(note => { // display each note
        const noteElement = document.createElement('li');
        noteElement.textContent = note.content;
        notesList.appendChild(noteElement);
      });
    }
  
    displayNotesFromApi() {
      //const notes = await this.client.getNotes();
      this.client.getNotes((notes) => {
        this.model.setNotes(notes);
        this.displayNotes();
      }); 
    }
  }
  
  module.exports = NotesView;
  