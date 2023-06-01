
// file: notesClient.test.js
//import the module
const NotesClient = require('./notesClient');
//const NotesModel = require('./notesModel');
//const NotesView = require('./notesView');
//jest.mock('./notesClient'); //mock the NotesClient class

require('jest-fetch-mock').enableFetchMocks()

//
describe('NotesClient class', () => {
    //test individual case
    it('getNotes method fetches the list of notes', (done) => {
        //instantiate the class
        const notesClient = new NotesClient();

        fetch.mockResponseOnce(JSON.stringify([
            { title: "Note1", content: "Content1" },
            { title: "Note2", content: "Content2" },
        ]));
        //call teh method with a callback function
        notesClient.getNotes((returnedDataFromApi) => {
            //assert teh data from the server contain what it should.
            expect(returnedDataFromApi).toEqual([
                { title: "Note1", content: "Content1" },
                { title: "Note2", content: "Content2" },
            ]);
            //tell jest our test can now end
            done();
        });
    });
});