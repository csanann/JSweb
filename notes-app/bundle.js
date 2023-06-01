(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // notesClient.js
  var require_notesClient = __commonJS({
    "notesClient.js"(exports, module) {
      var NotesClient2 = class {
        //
        getNotes(callback) {
          fetch("http://localhost:3000/notes").then((response) => response.json()).then((data) => callback(data));
        }
        //create async
        async createNote(content) {
          const response = await fetch("http://localhost:3000/notes", {
            method: "POST",
            //use post method
            //set headers to indicate we're sending json data
            headers: { "Content-Type": "application/json" },
            //json body with the content of the new note
            body: JSON.stringify({ content })
          });
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          }
          return response.json();
        }
      };
      module.exports = NotesClient2;
    }
  });

  // notesView.js
  var require_notesView = __commonJS({
    "notesView.js"(exports, module) {
      var NotesView2 = class {
        constructor(model2, client2) {
          this.model = model2;
          this.client = client2;
        }
        bindSubmit() {
          const form = document.getElementById("note-form");
          form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const noteContent = document.getElementById("note-input").value;
            await this.client.createNote(noteContent);
            this.displayNotes();
          });
        }
        displayNotes() {
          const notesList = document.getElementById("note-list");
          notesList.innerHTML = "";
          notes.forEach((note) => {
            const noteElement = document.createElement("li");
            noteElement.textContent = note.content;
            notesList.appendChild(noteElement);
          });
        }
        displayNotesFromApi() {
          this.client.getNotes((notes2) => {
            this.model.setNotes(notes2);
            this.displayNotes();
          });
        }
      };
      module.exports = NotesView2;
    }
  });

  // notesModel.js
  var require_notesModel = __commonJS({
    "notesModel.js"(exports, module) {
      var NotesModel2 = class {
        constructor() {
          this.notes = [];
        }
        setNotes(notes2) {
          this.notes = notes2;
        }
        getNotes() {
          return this.notes;
        }
        addNote(note) {
          this.notes.push(note);
        }
        reset() {
          this.notes = [];
        }
      };
      module.exports = NotesModel2;
    }
  });

  // index.js
  var NotesClient = require_notesClient();
  var NotesView = require_notesView();
  var NotesModel = require_notesModel();
  var model = new NotesModel();
  var client = new NotesClient();
  var view = new NotesView(client, model);
  window.addEventListener("load", async () => {
    view.displayNotesFromApi();
  });
  view.bindSubmit();
})();
