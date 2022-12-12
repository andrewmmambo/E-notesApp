import { fetchData, getCurrentUser } from './main.js'

  // note class
  class Note {
    constructor(noteContent)
        {
        this.noteContent = noteContent;
        }
    }
     
    // grab the form, add event listener
    let NoteForm = document.getElementById("note-Form");
    if(NoteForm) NoteForm.addEventListener('submit', createNote);
    let user = getCurrentUser();
    
    function createNote(e) {
      e.preventDefault();
      let input = document.getElementById("noteContent").value;
      let user_id = user.user_id; 
      let note = {
        noteContent: input,
        user_id: user_id}
      console.log(note);
      let notes = new Note(note);
      console.log(notes);

      fetchData("/notes/createNote", note, "POST")
      .then((data) => {       
        getCurrentUser(data);
        console.log(data);
        window.location.href = "note.html";
//       window.onload = getNote();
      })
      .catch((err) => {
        let p = document.querySelector('.error');
        p.innerHTML = err.message;
      })
    }

    let getNoteBtn = document.getElementById("getNote");
    if(getNoteBtn) getNoteBtn.addEventListener('click', getNote)

    export function getNote(e) {
        e.preventDefault();
        let user = getCurrentUser();

    fetchData("/notes/getNote", user, "POST")
    .then((data) => {
      (()=>{
        const console_log = window.console.log;
        window.console.log = function(...args){
          console_log(...args);
          var textarea = document.getElementById("noteContent");
          if(!textarea) return;
          args.forEach(arg=>textarea.value += `${JSON.stringify(arg)}\n`);
        }
      })();
      console.log(data);
      
    })
    .catch((err) => {
      console.log(err)
    })
  } 