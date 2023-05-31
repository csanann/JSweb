class NotesView {
  
  constructor(notesModel) {
    this.notesModel = notesModel;
    this.noteInputEl = document.querySelector('#note-input');
    this.addNoteButtonEl = document.querySelector('#add-note-button');
  }

  init() {
    if (this.addNoteButtonEl) {
      this.addNoteButtonEl.addEventListener('click', () => {
        this.addNote();
      });
    }
  }

  addNote() {
    const noteText = this.noteInputEl.value;
    this.notesModel.addNote(noteText);
    this.displayNotes();
    this.noteInputEl.value = ''; // clear the input field after a note is added or reset the input
  }

  displayNotes() {
    //to clear the existing notes before appending new ones
    //by selecting all elements with the .note class and removing them from the DOM then modify addNote()
    const noteEls = document.querySelectorAll('.note');
    noteEls.forEach(el => el.remove());


    //add notes from the model
    this.notesModel.notes.forEach(note => {
      const noteEl = document.createElement('div');
      noteEl.textContent = note.text;
      noteEl.className = 'note';
      document.querySelector('#main-container').appendChild(noteEl);
    });
  }
}
module.exports = NotesView;
