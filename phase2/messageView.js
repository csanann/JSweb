//file: MessageView.js

class MessageView {

  constructor(notesModel) {
    this.notesModel = notesModel;
    
    // Elements for handling the message
    this.messageInputEl = document.querySelector('#message-input');
    this.showMessageButtonEl = document.querySelector('#show-message-button');
    this.hideMessageButtonEl = document.querySelector('#hide-message-button');

    // Elements for handling the notes
    this.noteInputEl = document.querySelector('#note-input');
    this.addNoteButtonEl = document.querySelector('#add-note-button');

    // Add event listeners for buttons
    this.showMessageButtonEl.addEventListener('click', () => {
      this.displayMessage();
    });
    this.hideMessageButtonEl.addEventListener('click', () => {
      this.hideMessage();
    });
    this.addNoteButtonEl.addEventListener('click', () => {
      this.addNote();
    });
  }

  displayMessage() {
    const newDiv = document.createElement('div');
    newDiv.id = 'message';
    newDiv.textContent = this.messageInputEl.value;
    document.querySelector('#main-container').appendChild(newDiv);
  }

  hideMessage() {
    const messageDiv = document.querySelector('#message');
    if (messageDiv) {
      messageDiv.parentNode.removeChild(messageDiv);
    }
  }

  addNote() {
    const noteText = this.noteInputEl.value;
    this.notesModel.addNote(noteText);
    this.displayNotes();
    this.noteInputEl.value = ''; // clear the input field after a note is added
  }

  displayNotes() {
    // Here should be your implementation of how to display notes on the page.
    // This will depend on your HTML structure and how you want to show notes.
  }
}

module.exports = MessageView;
