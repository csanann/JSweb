/**
* @jest-environment jsdom
*/


const fs = require('fs');
const NotesModel = require('./NotesModel');
const NotesView = require('./NotesView');


let notesModel;
let notesView;


describe('NotesView', () => {
 test('displayNotes clears previous notes', () => {
   document.body.innerHTML = fs.readFileSync('./index.html');
   
   //setup
   notesModel = new NotesModel();
   notesView = new NotesView(notesModel);
   notesView.init();

   //Acts:
   notesModel.addNote('First Note');
   notesView.displayNotes();
   notesModel.addNote('Second Note');
   notesView.displayNotes();


   const noteEls = document.querySelectorAll('.note');
  
   expect(noteEls.length).toBe(notesView.notesModel.notes.length);
 });
});
