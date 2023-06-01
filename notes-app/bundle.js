(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // notesClient.js
  var require_notesClient = __commonJS({
    "notesClient.js"(exports, module) {
      var NotesClient = class {
        //
        //getNotes(callback) {
        getNotes(onSuccess, onError) {
          fetch("http://localhost:3000/notes").then((response) => response.json()).then(onSuccess).then(onError);
        }
        createNote(noteContent, onSuccess, onError) {
          console.log("createNote called with content: ", noteContent);
          fetch("http://localhost:3000/notes", {
            method: "POST",
            //use post method
            headers: {
              "Content-Type": "application/json"
            },
            //json body with the content of the new note
            body: JSON.stringify({
              content: noteContent
            })
          }).then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          }).then(onSuccess).catch(onError);
        }
      };
      module.exports = NotesClient;
    }
  });

  // notesView.js
  var require_notesView = __commonJS({
    "notesView.js"(exports, module) {
      var NotesView = class {
        constructor(model, client) {
          this.model = model;
          this.client = client;
        }
        bindSubmit = () => {
          const form = document.getElementById("note-form");
          if (form) {
            form.addEventListener("submit", async (event) => {
              event.preventDefault();
              const noteContent = document.getElementById("note-input").value;
              await this.client.createNote(
                noteContent,
                () => {
                  this.displayNotes();
                },
                () => {
                  this.displayError();
                }
              );
            });
          } else {
            console.log("Form not found!");
          }
        };
        displayNotes() {
          const notesList = document.getElementById("note-list");
          notesList.innerHTML = "";
          this.model.getNotes().forEach((note) => {
            const noteElement = document.createElement("li");
            noteElement.textContent = note.content;
            notesList.appendChild(noteElement);
          });
        }
        displayNotesFromApi() {
          this.client.getNotes(
            (notes) => {
              this.model.setNotes(notes);
              this.displayNotes();
            },
            () => {
              this.displayError();
            }
          );
        }
        //create a method displayError
        displayError() {
          const errorDiv = document.createElement("div");
          errorDiv.textContent = "Oops, something went wrong!";
          document.body.appendChild(errorDiv);
        }
      };
      module.exports = NotesView;
    }
  });

  // notesModel.js
  var require_notesModel = __commonJS({
    "notesModel.js"(exports, module) {
      var NotesModel = class {
        constructor() {
          this.notes = [];
        }
        setNotes(notes) {
          this.notes = notes;
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
      module.exports = NotesModel;
    }
  });

  // index.js
  document.addEventListener("DOMContentLoaded", (event) => {
    const NotesClient = require_notesClient();
    const NotesView = require_notesView();
    const NotesModel = require_notesModel();
    const model = new NotesModel();
    const client = new NotesClient();
    const view = new NotesView(client, model);
    window.addEventListener("load", async () => {
      view.displayNotesFromApi();
    });
    view.bindSubmit();
    console.log(client);
  });
})();
