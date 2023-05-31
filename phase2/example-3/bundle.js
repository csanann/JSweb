(() => {
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // NotesView.js
  var require_NotesView = __commonJS({
    "NotesView.js"(exports, module) {
      var NotesView = class {
        constructor(notesModel) {
          this.notesModel = notesModel;
          this.noteInputEl = document.querySelector("#note-input");
          this.addNoteButtonEl = document.querySelector("#add-note-button");
        }
        init() {
          if (this.addNoteButtonEl) {
            this.addNoteButtonEl.addEventListener("click", () => {
              this.addNote();
            });
          }
        }
        addNote() {
          const noteText = this.noteInputEl.value;
          this.notesModel.addNote(noteText);
          this.displayNotes();
          this.noteInputEl.value = "";
        }
        displayNotes() {
          const noteEls = document.querySelectorAll(".note");
          noteEls.forEach((el) => el.remove());
          this.notesModel.notes.forEach((note) => {
            const noteEl = document.createElement("div");
            noteEl.textContent = note.text;
            noteEl.className = "note";
            document.querySelector("#main-container").appendChild(noteEl);
          });
        }
      };
      module.exports = NotesView;
    }
  });

  // messageView.js
  var require_messageView = __commonJS({
    "messageView.js"(exports, module) {
      var NotesView = require_NotesView();
      var MessageView2 = class {
        constructor(notesModel) {
          this.notesModel = notesModel;
          this.messageInputEl = document.querySelector("#message-input");
          this.showMessageButtonEl = document.querySelector("#show-message-button");
          this.hideMessageButtonEl = document.querySelector("#hide-message-button");
          this.noteInputEl = document.querySelector("#note-input");
          this.addNoteButtonEl = document.querySelector("#add-note-button");
          this.showMessageButtonEl.addEventListener("click", () => {
            this.displayMessage();
          });
          this.hideMessageButtonEl.addEventListener("click", () => {
            this.hideMessage();
          });
          this.addNoteButtonEl.addEventListener("click", () => {
            this.addNote();
          });
        }
        displayMessage() {
          const newDiv = document.createElement("div");
          newDiv.id = "message";
          newDiv.textContent = this.messageInputEl.value;
          document.querySelector("#main-container").appendChild(newDiv);
        }
        hideMessage() {
          const messageDiv = document.querySelector("#message");
          if (messageDiv) {
            messageDiv.parentNode.removeChild(messageDiv);
          }
        }
        addNote() {
          const noteText = this.noteInputEl.value;
          this.notesView.addNote(noteText);
          this.notesView.displayNotes();
          this.noteInputEl.value = "";
        }
        displayNotes() {
        }
      };
      module.exports = MessageView2;
    }
  });

  // index.js
  var MessageView = require_messageView();
  var view = new MessageView();
})();
