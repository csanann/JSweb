// const { response } = require("express");
//above line attempts to require the 'express' module and destructure 'response' from it
//in this context is unnecessary so we commented out
//'response' is used as parameter in a route handler function in an Express.js app
//but not something we can destructure from the express module itself
//===================
//const fetch = require('./node-fetch');
//create and define class NotesClient

class NotesClient {
    getNotes(onSuccess, onError) {    
        //using fetch function to send a GET request to notes endpoint of the server
        //fetch returns a Promise that resolves to teh Response object representing the response to the request
        fetch('http://localhost:3000/notes')
        
        //.then function called when the promise returned by fetch is resolved
        //(when the server has responded to our request), the function takes response from the server and parse it as json
        .then(response => response.json())
        .then(onSuccess)
        .catch(error => {
            console.error('Error in getNotes:', error);
            onError();
        });   
    }
    
    createNote(noteContent, onSuccess, onError) {
        console.log("createNote called with content: ", noteContent);
        fetch('http://localhost:3000/notes', {
            method: 'POST', //use post method
            headers: {
                'Content-Type': 'application/json',
            },
            //json body with the content of the new note
            body: JSON.stringify({
                content: noteContent
            }),
        })
        .then(response => { //console.log(response)
            if (!response.ok) throw new Error('Network response was not ok');
                onSuccess(); // return response.json(); only use it when response object to the code
        })
        .catch(error => {
            console.error('Error in createNote:', error);
            onError();
        });
    }
    reset(onSuccess, onError) {
        console.log('Reset function called');
        fetch('http://localhost:3000/notes', {
            method: 'DELETE'
        })
        .then(response => {
            if(!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(onSuccess)
        .catch(error => {
            console.log('Error in reset:', error);
            onError();
        });
    }
}
//closes the 'fetchNotes' function definition
//fetchNotes();
module.exports = NotesClient;