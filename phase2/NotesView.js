//file: Notesview.js

class NotesView {

    constructor(notesModel) {
      this.notesModel = notesModel;
      this.noteInputEl = document.querySelector('#note-input');
      this.addNoteButtonEl = document.querySelector('#add-note-button');
  
      this.addNoteButtonEl.addEventListener('click', () => {
        this.addNote();
      });
    }
  
    addNote() {
      const noteText = this.noteInputEl.value;
      this.notesModel.addNote(noteText);
      this.displayNotes();
      this.noteInputEl.value = ''; // clear the input field after a note is added
    }
  
    displayNotes() {
      // display the notes on the page
    }
  }
  
  module.exports = NotesView;
  