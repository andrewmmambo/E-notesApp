import { getCurrentUser, fetchData, removeCurrentUser } from "./main.js";

let user = getCurrentUser(); 
if(!user) window.location.href = "login.html";

console.log(user);

let user_id = user.user_id; 
console.log(user_id);

let deleteBtn = document.getElementById("delete-account");
if(deleteBtn) deleteBtn.addEventListener('click', deleteAccount);

function deleteAccount() {

  if(confirm("Are you sure you want to delete your account???")) {
    fetchData("/users/deleteUser", user, "DELETE")
    .then((data) => {
      console.log(data);
      removeCurrentUser();
    })
    .catch((err) => {
      console.log(err)
    })
  } 
}

let editForm = document.getElementById("edit-form");
if(editForm) editForm.addEventListener('submit', editUser);

function editUser(e) {
  e.preventDefault();

  let username = document.getElementById('username').value;
  user.userName = username;

  fetchData("/users/editUser", user, "PUT")
  .then((data) => {
    console.log(data);
  })
  .catch((err)=>{
    console.log(err)
  })
}