// file: notesView.js

class NotesView {
    constructor(model) {
        this.model = model;
    }
    displayNotes() {
        const notes = this.model.getNotes();
        notes.forEach(note => {
            const div = document.createElement('div');
            div.className = 'note';
            div.textContent = note;
            document.body.append(div);
        });
    }
}

module.exports = NotesView;