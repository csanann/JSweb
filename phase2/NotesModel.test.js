// file: NotesModel.test.js

/**
* @jest-environment jsdom
*/

const fs = require('fs');
const NotesModel = require('./NotesModel');
const NotesView = require('./NotesView');

let notesModel = new NotesModel();
let notesView = new NotesView(notesModel);

describe('NotesView', () => {
  test('displayNotes clears previous notes', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    const notesModel = new NotesModel();
    const view = new NotesView(notesModel);

    notesModel.addNote('First Note');
    view.displayNotes();
    notesModel.addNote('Second Note');
    view.displayNotes();

    const noteEls = document.querySelectorAll('.note');
    expect(noteEls.length).toBe(notesModel.notes.length);
  });
});
