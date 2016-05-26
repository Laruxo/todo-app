import ToDo from './modules/todo';

let todos = document.querySelectorAll('.todo');
for (let i = 0; i < todos.length; i++) {
  let todo = new ToDo(todos[i]);
  todo.renderItems();
}
