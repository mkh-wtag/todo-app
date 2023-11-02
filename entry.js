import {
  buttonCreate,
  cancelTodoButton,
  textArea,
  addTodoButton,
  todoWrapper,
  emptyNotice,
} from "./components/domElements.js";

import { renderTodoList, emptyListMessage } from "./components/domActions.js";

import { openCreateTodo, cancelTodo } from "./components/domActions.js";
import notifyUser from "./utilities/notification.js";
import timeCalculation from "./utilities/TimeCalculation.js";

let todos = [];

const initializeTodoApp = () => {
  buttonCreate.addEventListener("click", openCreateTodo);
  cancelTodoButton.addEventListener("click", cancelTodo);

  emptyListMessage();

  const handleTodoSubmit = () => {
    const task = textArea.value;

    if (task === "") {
      notifyUser("Please enter valid todo", "error");
      return;
    }

    const todo = {
      id: new Date().getTime(),
      title: task,
      isDone: false,
      isEditing: false,
      createdAt: timeCalculation(),
    };
    todos.push(todo);

    renderTodoList();
    textArea.value = "";
    textArea.focus();
    notifyUser("Successfully created new todo");
    emptyNotice.remove();
  };

  addTodoButton.addEventListener("click", handleTodoSubmit);
};

export function setTodos(newTodos) {
  todos = [...newTodos];
}

export default initializeTodoApp;

export { todos };
