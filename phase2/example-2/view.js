class View {

  constructor() {
    this.mainContainerEl = document.querySelector('#main-container');

    console.log(this.mainContainerEl);
  }
// adds addParagraph method and the specific content
  addParagraph() {
    const newParagraph =  document.createElement('p');
    newParagraph.innerText = 'I was created dynamically by JS';
    this.mainContainerEl.append(newParagraph);
  }

  clearParagraphs() {
    // get a list of all paragraph elements
    let paragraphs = document.querySelectorAll('p');

    //loop through each paragraph and remove it
    paragraphs.forEach((paragraph) => {
      paragraph.remove();
    });
  }
}

module.exports = View;