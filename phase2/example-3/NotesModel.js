// file: NotesModel.js

class NotesModel {
    constructor() {
        this.notes = [];
    }

    addNote(text) {
        this.notes.push({ text: text });
    }
}

module.exports = NotesModel;