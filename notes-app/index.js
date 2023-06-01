//file: index.js
document.addEventListener('DOMContentLoaded', (event) => {

const NotesClient = require('./notesClient.js');
const NotesView = require('./notesView.js');
const NotesModel = require('./notesModel.js');

const model = new NotesModel();

// Create a new instance of NotesClient.
const client = new NotesClient();

// Create a new instance of NotesView, passing in the client, model.
const view = new NotesView(client,model);

// When the page loads, display the existing notes.
window.addEventListener('load', async () => {
  view.displayNotesFromApi();
});

// Bind the form submit event to create a new note.
view.bindSubmit();
console.log(client);
view.bindReset();
});
