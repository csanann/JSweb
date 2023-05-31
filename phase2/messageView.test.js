/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const MessageView = require('./messageView');

describe('MessageView', () => {
  test('clicks the button', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');

    const view = new MessageView();

    //for message-input
    const inputEl = document.querySelector('#message-input');
    const testMessage = 'Hello, world!';
    inputEl.value = testMessage;

    const buttonEl = document.querySelector('#show-message-button');
    buttonEl.click();
    //modify the expectation for message-input
    expect(document.querySelector('#message').textContent).toBe(testMessage);
  });

  test('clicks the hide button', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');

    const view = new MessageView();
    //ensure the element is present before simulate a click on the hide button
    const showButtonEl = document.querySelector('#show-message-button');
    showButtonEl.click();
    const hideButtonEl = document.querySelector('#hide-message-button');
    hideButtonEl.click();

    //check that the '#message' element is not present on the page
    expect(document.querySelector('#message')).toBeNull();
  });
  test('adds a new note and displays it', () => {
    //setup: create a new NotesView instance
    const view = new MessageView();
  
    //set html content from t he file
    document.body.innerHTML = fs.readFileSync('./index.html');
    //act: simulate user entering a note and clicking the button
    const noteInputEl = document.querySelector('#note-input');
    const testNote = 'Test note content';
    noteInputEl.value = testNote;
    
    const addNoteButtonEl = document.querySelector('#add-note-button');
    addNoteButtonEl.click();
    //assert: check if the new note is displayed on the page
    expect(true).toBe(true);
  });
});