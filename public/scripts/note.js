import { fetchData, setCurrentUser } from './main.js'

  // note class
  class Note {
    constructor(noteContent) {
      this.noteContent = noteContent;
    }
    }
     
    // grab the form, add event listener
    let NoteForm = document.getElementById("note-Form");
    if(NoteForm) NoteForm.addEventListener('submit', createNote);
    
    function createNote(e) {
      e.preventDefault();
      let notes = {
        noteContent: document.getElementById("noteContent").value,
        user_id: user_id}
 
      let note = new Note(notes);
      fetchData("/notes/createNote", note, "POST")
      .then((data) => {
        console.log(data);
        setCurrentUser(data);
        window.location.href = "note.html";
      })
      .catch((err) => {
        let p = document.querySelector('.error');
        p.innerHTML = err.message;
      })
} 