//file: notesView.test.js

const NotesModel = require('./notesModel');
const NotesView = require('./notesView');

test('should display notes from the model', () => {
    //create a mock model
    const model = new NotesModel();
    model.addNote('This is an example note');

    //create the NotesView with the mock model
    const view = new NotesView(model);
    //display the notes
    view.displayNotes();

    //checks if the note is displayed
    const notes = document.querySelectorAll('.note');
    expect(notes.length).toBe(1);
    expect(notes[0].textContent).toBe('This is an example note');
    });