import { 
  buttonCreate, 
  createTodoDiv, 
  cancelTodoButton, 
  textArea, 
  addTodoButton, 
  todoWrapper,
  emptyNotice,
} from "./components/domElements.js";

import { 
  createTodoItem,
  renderTodoList,
 } from "./components/domActions.js";

import { openCreateTodo, cancelTodo } from "./components/domActions.js";
import emptyTodoError from "./utilities/emptyTodoError.js";

const initializeTodoApp = () => {
  buttonCreate.addEventListener('click', openCreateTodo);
  cancelTodoButton.addEventListener('click', cancelTodo);

  if(todoWrapper.innerHTML === '') {
    emptyNotice.innerText = 'Todo list is empty';
    todoWrapper.appendChild(emptyNotice);
  }

  const handleTodoSubmit = () => {
    const task = textArea.value;
    if(task === '') {
      emptyTodoError('Please enter valid todo', 'error');
      return;
    }

    createTodoItem();
    emptyNotice.remove();
  }

  addTodoButton.addEventListener('click', handleTodoSubmit);
}

export default initializeTodoApp;







