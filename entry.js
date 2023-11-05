import {
  buttonCreate,
  cancelTodoButton,
  textArea,
  addTodoButton,
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

  loadTodoList();

  function loadTodoList() {
    if (localStorage.getItem("todos") != null) {
      todos = JSON.parse(localStorage.getItem("todos"));
      renderTodoList();
    }
  }

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
      completedAt: null,
    };
    todos.push(todo);

    renderTodoList();
    textArea.value = "";
    textArea.focus();
    notifyUser("Successfully created new todo");
    emptyNotice.remove();

    localStorage.setItem("todos", JSON.stringify(todos));
  };

  addTodoButton.addEventListener("click", handleTodoSubmit);
};

export function setTodos(newTodos) {
  todos = newTodos;
}

export default initializeTodoApp;

export { todos };
