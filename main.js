const regForm = document.getElementById("reg-Form");
const loginForm = document.getElementById("login-Form");
const noteForm = document.getElementById("note-Form");

if(regForm) regForm.addEventListener("submit", registerUser);
function registerUser(e) {
    e.preventDefault();

    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let pwd = document.getElementById("pwd").value;

    console.log(`fname = ${fname}`)
    console.log(`lname = ${lname}`)
    console.log(`email = ${email}`)
    console.log(`pwd = ${pwd}`)
}

if(loginForm) loginForm.addEventListener("submit", loginUser);
function loginUser(e) {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let pwd = document.getElementById("pwd").value;

    console.log(`email = ${email}`)
    console.log(`pwd = ${pwd}`)
}

if(noteForm) noteForm.addEventListener("submit", addNotes);
function addNotes(e) {
    e.preventDefault();

    let note = document.getElementById("note").value;
    console.log(`note = ${note}`)
}