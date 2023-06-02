(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // notesClient.js
  var require_notesClient = __commonJS({
    "notesClient.js"(exports, module) {
      var NotesClient = class {
        getNotes(onSuccess, onError) {
          fetch("http://localhost:3000/notes").then((response) => response.json()).then(onSuccess).catch((error) => {
            console.error("Error in getNotes:", error);
            onError();
          });
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
            if (!response.ok)
              throw new Error("Network response was not ok");
            onSuccess();
          }).catch((error) => {
            console.error("Error in createNote:", error);
            onError();
          });
        }
        reset(onSuccess, onError) {
          console.log("Reset function called");
          fetch("http://localhost:3000/notes", {
            method: "DELETE"
          }).then((response) => {
            if (!response.ok)
              throw new Error("Network response was not ok");
            return response.json();
          }).then(onSuccess).catch((error) => {
            console.log("Error in reset:", error);
            onError();
          });
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
        bindReset() {
          const button = document.getElementById("reset-notes-button");
          if (button) {
            button.addEventListener("click", () => {
              this.client.reset(
                () => {
                  this.model.setNotes([]);
                  this.displayNotes();
                },
                () => {
                  this.displayError();
                }
              );
            });
          } else {
            console.log("Reset button not found!");
          }
        }
        displayNotes() {
          const notesList = document.getElementById("notes-list");
          notesList.innerHTML = "";
          this.model.getNotes().forEach(async (note) => {
            if (!note) {
              console.log("Note is undefined!", note);
              return;
            }
            console.log(note);
            const noteElement = document.createElement("li");
            noteElement.textContent = note;
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
          console.log("displayError has been called");
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
    const view = new NotesView(model, client);
    window.addEventListener("load", async () => {
      view.displayNotesFromApi();
    });
    view.bindSubmit();
    console.log(client);
    view.bindReset();
  });
})();
