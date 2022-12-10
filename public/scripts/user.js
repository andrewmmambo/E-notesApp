import { fetchData, setCurrentUser } from './main.js'

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
      setCurrentUser(data);
      window.location.href = "note.html";
    })
    .catch((err) => {
        let p = document.querySelector('.error');
        p.innerHTML = err.message;
    }); 
  }
    
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
      setCurrentUser(data);
      window.location.href = "login.html";
    })
    .catch((err) => {
        let p = document.querySelector('.error');
        p.innerHTML = err.message;
    });  
  }