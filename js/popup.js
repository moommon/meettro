var modalTeam = document.querySelector(".modal-team");
var triggerTeam = document.querySelector(".trigger-team");
var closeButtonTeam = document.querySelector(".close-button-team");

//console.log(modal);

function toggleModalTeam() {
  modalTeam.classList.toggle("show-modal-team");
}

function windowOnClickTeam(event) {
  if (event.target === modalTeam) {
    toggleModalTeam();
  }
}

triggerTeam.addEventListener("click", toggleModalTeam);
closeButtonTeam.addEventListener("click", toggleModalTeam);
window.addEventListener("click", windowOnClickTeam);

// todo
// todo
var modalTodo = document.querySelector(".modal-todo");
var triggerTodo = document.querySelector(".trigger-todo");
var closeButtonTodo = document.querySelector(".close-button-todo");
// var cancelButton = document.querySelector("#cancel");

//console.log(modal);

function toggleModalTodo() {
  modalTodo.classList.toggle("show-modal-todo");
}

function windowOnClickTodo(event) {
  if (event.target === modalTodo) {
    toggleModalTodo();
  }
}

triggerTodo.addEventListener("click", toggleModalTodo);
closeButtonTodo.addEventListener("click", toggleModalTodo);
window.addEventListener("click", windowOnClickTodo);
