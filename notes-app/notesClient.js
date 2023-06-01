// const { response } = require("express");
//above line attempts to require the 'express' module and destructure 'response' from it
//in this context is unnecessary so we commented out
//'response' is used as parameter in a route handler function in an Express.js app
//but not something we can destructure from the express module itself

//create fetchNotes function
//it will send a request to the server to get the notes data
function fetchNotes() {
    //using fetch function to send a GET request to notes endpoint of the server
    //fetch returns a Promise that resolves to teh Response object representing the response to the request
    fetch('http://localhost:3000/notes')
    //.then function called when the promise returned by fetch is resolved
    //(when the server has responded to our request), the function takes response from the server and parse it as json
    .then(response => response.json())
    //another .then function in a chain of previous one,
    //this one called when the promise returned by 'response.json()' is resolved
    //(when the json parsing is finished), it logs the parsed data to the console
    .then(data => console.log(data))
    //then .catch function is called if any of hte promises in the chain were Rejected
    //(if an error occurred at any point during the request or the parsing of the response)
    //it then log the error to the console
    .catch(error => console.error('Error:', error));
}
//closes the 'fetchNotes' function definition
fetchNotes();