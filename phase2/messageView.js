class MessageView {

  constructor() {
    this.buttonEl = document.querySelector('#show-message-button');
    this.buttonEl.addEventListener('click', () => {
       this.displayMessage();
    });

    this.hideButtonEl = document.querySelector('#hide-message-button');
    this.hideButtonEl.addEventListener('click', () => {
      this.hideMessage();
    });
    }

  displayMessage() {
    //create a new div element
    const newDiv = document.createElement('div');
    //give this div element an id of 'message'
    newDiv.id = 'message';
    const inputEl = document.querySelector('#message-input');
    //set its content
    newDiv.textContent = inputEl.value;
    //append the div to the main container
    document.querySelector('#main-container').appendChild(newDiv);
  }

  hideMessage() {
    //select the '#message' element
    const messageDiv = document.querySelector('#message');
    //removes the '#message' element from the page
    if (messageDiv) {
      messageDiv.parentNode.removeChild(messageDiv);
    }
  }
}

module.exports = MessageView;
