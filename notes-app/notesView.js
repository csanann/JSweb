
//file: notesView.js

class NotesView {
    constructor(model, client) {
        this.model = model;
        this.client = client;
    }

    displayNotesFromApi() {
        this.client.loadNotes(notes => {
            this.model.setNotes(notes);
            this.displayNotes();
        });
    }
}

module.exports =  NotesView;