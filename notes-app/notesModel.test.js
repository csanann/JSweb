//file: notesModel.test.js

const NotesModel = require('./notesModel');

test('getNotes should return an empty array', () => {
  const model = new NotesModel();
  expect(model.getNotes()).toEqual([]);
});

test('addNote should add a note to the list', () => {
  const model = new NotesModel();
  model.addNote('Buy milk');
  model.addNote('Go to the gym');
  expect(model.getNotes()).toEqual(['Buy milk', 'Go to the gym']);
});

test('reset should clear the list of notes', () => {
  const model = new NotesModel();
  model.addNote('Buy milk');
  model.addNote('Go to the gym');
  model.reset();
  expect(model.getNotes()).toEqual([]);
});
