/**
 * @jest-environment jsdom
 */
// line 2 tells jest to run the tests as if they're in a web browser.we simulates a browser envir
const fs = require('fs'); //imports node.js's built-in 'fs' module, lets us r+w files
const View = require('./view'); //imports tests that we're going to test
//create a group of tests, about page view
describe('Page view', () => {
  //a single test here, checks if webpage display two paragraphs
  it('displays 3 paragraphs', () => {
    // read content of 'xx' file and set it as the content of a simulated webpage
    document.body.innerHTML = fs.readFileSync('./index.html');
//creates a new instance of view class that we'll test
    const view = new View();
//set expecting result, checks if there are 3 'p' elements on the webpage, if not then fail
    expect(document.querySelectorAll('p').length).toBe(3);
  });

  it('clears all paragraphs', () => {
    const view = new View();
    view.addParagraph('Test');// first adds a paragraph
    view.clearParagraphs(); // clear all paragraphs

    //checks that there are now zero paragraphs in the document
    expect(document.querySelectorAll('p').length).toBe(0);
  })
});