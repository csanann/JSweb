
jest.mock('./notesClient');
//notesClient is a dependency of NotesView, we need to mock NotesClient  here
const NotesView = require('./notesView');
const NotesModel = require('./notesModel');
const NotesClient = require('./notesClient');

describe('NotesView', () => {
    it('should display notes from API', () => {
        const mockNotes = [{title: "Note1", content: "Content1"}];
        const mockClient = new NotesClient();
        const mockModel = new NotesModel();
        const view = new NotesView(mockModel, mockClient);
//overwriting the loadNotes method of the mocked NotesCLient with a  mocked function
        //loadNote method of the mockClient object
        //which is an instance of the mocked NotesClient class
        //we're preparing to replace this method with a jest mock function
        mockClient.loadNotes = jest.fn(callback => callback(mockNotes));
        mockModel.setNotes = jest.fn();
        view.displayNotes = jest.fn();

        view.displayNotesFromApi();

        expect(mockClient.loadNotes).toHaveBeenCalled();
        expect(mockModel.setNotes).toHaveBeenCalledWith(mockNotes);
        expect(view.displayNotes).toHaveBeenCalled();
    });
});