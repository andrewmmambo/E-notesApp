async function fetchData(route = '', data = {}, methodType) {
    const response = await fetch(`http://localhost:3000${route}`, {
      method: methodType, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    if(response.ok) {
      return await response.json(); // parses JSON response into native JavaScript objects
    } else {
      throw await response.json();
    }
  }
  
  // user class
  class User {
    constructor(email, password, fname) {
      this.email = email;
      this.password = password;
      this.fname = fname;
    }
  
    getEmail() {
      return this.email;
    }
  }
  
  // grab the form, add event listener
  let loginForm = document.getElementById("login-Form");
  if(loginForm) loginForm.addEventListener('submit', login);
  
  function login(e) {
    e.preventDefault();
  
    let email = document.getElementById("email").value;
    let password = document.getElementById("pwd").value;
    let user = new User(email, password);
  
    fetchData("/users/login", user, "POST")
    .then((data) => {
      console.log(data);
      window.location.href = "note.html";
    })
    .catch((err) => {
      console.log(`Error!!! ${err.message}`)
    })
    
  let RegisterForm = document.getElementById("reg-Form");
  if(RegisterForm) RegisterForm.addEventListener('submit', registerUser);
  
  function registerUser(e) {
    e.preventDefault();
  
    let fname = document.getElementById("fname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("pwd").value;
    let user = new User(fname, email, password);
  
    fetchData("/users/registerUser", user, "POST")
    .then((data) => {
      console.log(data);
      window.location.href = "login.html";
    })
    .catch((err) => {
      console.log(`Error!!! ${err.message}`)
    })  
  }

  // note class
  class Note {
    constructor(noteContent) {
      this.noteContent = noteContent;
    }
  }
     
    // grab the form, add event listener
    let NoteForm = document.getElementById("note-Form");
    if(NoteForm) NoteForm.addEventListener('submit', note);
    
    function note(e) {
      e.preventDefault();
    
      let noteContent = document.getElementById("noteContent").value;
      let note = new Note(noteContent);
    
      fetchData("/users/note", note, "POST")
      .then((data) => {
        console.log(data);
        window.location.href = "note.html";
      })
      .catch((err) => {
        console.log(`Error!!! ${err.message}`)
      })
    }
  }