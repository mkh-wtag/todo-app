import {
  buttonCreate,
  cancelTodoButton,
  textArea,
  addTodoButton,
  emptyNotice,
  searchTodoInput,
} from "./components/domElements.js";

import { renderTodoList, emptyListMessage } from "./components/domActions.js";

import { openCreateTodo, cancelTodo } from "./components/domActions.js";
import notifyUser from "./utilities/notification.js";
import timeCalculation from "./utilities/TimeCalculation.js";
import searchTodo, { debounceSearch } from "./components/searchTodo.js";

let todos = [];
let globalTodos;

const initializeTodoApp = () => {
  buttonCreate.addEventListener("click", openCreateTodo);
  cancelTodoButton.addEventListener("click", cancelTodo);

  emptyListMessage();

  loadTodoList();

  function loadTodoList() {
    if (localStorage.getItem("todos") !== null) {
      todos = JSON.parse(localStorage.getItem("todos"));
      renderTodoList();
    }
  }

  globalTodos = todos;

  const handleTodoSubmit = () => {
    const task = textArea.value;

    if (task.trim() === "") {
      textArea.value = "";
      notifyUser("Please enter valid todo", "error");
      return;
    }

    const todo = {
      id: new Date().getTime(),
      title: task.trim(),
      isDone: false,
      isEditing: false,
      createdAt: timeCalculation(),
      completedAt: null,
    };

    todos.push(todo);
    globalTodos = todos;

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

searchTodoInput.addEventListener("input", debounceSearch(searchTodo, 500));

export default initializeTodoApp;

export { globalTodos, todos };
