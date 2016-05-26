import ToDo from './modules/todo';
let todos = document.querySelectorAll('.todo');
for (let i = 0; i < todos.length; i++) {
  let todo = new ToDo(todos[i]);
  todo.renderItems();
}

import Modal from './modules/modal';
let modalButtons = document.querySelectorAll('.modal__button');
for (let i = 0; i < modalButtons.length; i++) {
  let modal = new Modal();
  modal.init(modalButtons[i]);
}
