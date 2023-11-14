import createButton from "../utilities/createButton.js";
import deleteConfirmation from "../components/deleteConfirmation.js";
import timeCalculation from "../utilities/TimeCalculation.js";
import notifyUser from "../utilities/notification.js";
import editTask from "../utilities/editTask.js";
import {
  createTodoDiv,
  todoWrapper,
  emptyNotice,
  textArea,
  searchTodoInput,
} from "./domElements.js";
import { todos, setTodos, currentFilterState } from "../entry.js";
import { ADD_ANIMATION_DELAY } from "../utilities/const.js";

export const openCreateTodo = () => {
  createTodoDiv.classList.add("open-create-todo");
  textArea.focus();
};

export const cancelTodo = () => {
  createTodoDiv.classList.remove("open-create-todo");
  textArea.value = "";
};

export function emptyListMessage() {
  if (todos.length === 0) {
    emptyNotice.innerText = "Todo list is empty";
    todoWrapper.appendChild(emptyNotice);
  }
}

export const renderTodoList = () => {
  todoWrapper.innerHTML = "";
  let filteredTodos = [];

  const searchedText = searchTodoInput.value.toLowerCase();

  if (searchedText !== "") {
    filteredTodos = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchedText)
    );
  } else {
    switch (currentFilterState) {
      case "complete":
        filteredTodos = todos.filter((todo) => todo.isDone === true);
        break;

      case "incomplete":
        filteredTodos = todos.filter((todo) => todo.isDone === false);
        break;

      default:
        filteredTodos = [...todos];
    }
  }

  filteredTodos.forEach((todo) => {
    todoWrapper.append(createTodoDomElement(todo));
  });

  emptyListMessage();
};

let editedTitle;

export const createTodoDomElement = (todo) => {
  const { id, title, isDone, isEditing, createdAt, completedAt } = todo;
  const { hour, minutes, amPm, currentDay, months, currentMonth, currentYear } =
    createdAt;

  const todoDiv = document.createElement("div");

  const todoHeader = document.createElement("h1");
  todoHeader.classList.add("title-task");

  const todoDetails = document.createElement("div");
  todoDetails.classList.add("todo-details");

  todoHeader.innerText = title;
  todoDetails.innerHTML = `<div class="created-at">Created at: <strong>${hour}:${minutes} ${amPm}, ${currentDay}-${months[currentMonth]}-${currentYear}</strong></div>`;

  const todoActions = document.createElement("div");
  todoActions.classList.add("todo-actions");

  let taskDelete;
  let taskCompleted;
  let taskEdit;

  if (isDone) {
    todoDiv.className = "todo todo-completed";

    taskDelete = createButton(
      "button button-icon",
      "taskDelete",
      "icon-delete.svg",
      () => deleteHandler(id)
    );

    todoActions.append(taskDelete);
    const {
      months,
      currentDay,
      currentMonth,
      currentYear,
      minutes,
      hour,
      amPm,
    } = completedAt;

    todoDetails.innerHTML += `<div class="created-at">Completed at: <strong>${hour}:${minutes} ${amPm}, ${currentDay}-${months[currentMonth]}-${currentYear}</strong></div>`;
  } else {
    todoDiv.className = "todo";

    taskCompleted = createButton(
      "button button-icon",
      "taskCompleted",
      "icon-tick.svg",
      () => completeTask(id)
    );

    taskEdit = createButton(
      "button button-icon",
      "taskEdit",
      "icon-edit.svg",
      () => editTask(id)
    );

    taskDelete = createButton(
      "button button-icon",
      "taskDelete",
      "icon-delete.svg",
      () => deleteHandler(id)
    );

    todoActions.append(taskCompleted, taskEdit, taskDelete);
  }

  if (isEditing) {
    const textArea = document.createElement("textarea");
    textArea.className = "input-field area";
    textArea.value = title;
    editedTitle = title;

    textArea.addEventListener("input", function () {
      editedTitle = textArea.value;
    });

    setTimeout(() => {
      textArea.focus();
    }, ADD_ANIMATION_DELAY);

    todoHeader.innerText = "";
    todoHeader.append(textArea);

    const updateTaskButton = createButton(
      "button button-icon",
      "updateTask",
      "icon-update.svg",
      () => updateTask(id)
    );

    const undoEditButton = createButton(
      "button button-icon",
      "taskDelete",
      "icon-cancel.svg",
      () => undoEdit(id)
    );

    todoActions.innerHTML = "";
    todoActions.append(updateTaskButton, undoEditButton);

    todoDiv.append(todoHeader, todoDetails, todoActions);

    return todoDiv;
  }

  todoDiv.append(todoHeader, todoDetails, todoActions);

  return todoDiv;
};

function deleteHandler(id) {
  deleteConfirmation("Are you sure?", id);
}

function updateTask(id) {
  const editTodo = todos.find((todo) => todo.id === id);

  if (editTodo === undefined) {
    return;
  }

  editTodo.isEditing = false;

  if (editedTitle.trim() === "") {
    notifyUser("Todo can not be empty", "error");
    return;
  }

  editTodo.title = editedTitle.trim();

  setTodos(todos);
  renderTodoList();
  notifyUser("Successfully updated todo");
  localStorage.setItem("todos", JSON.stringify(todos));
}

function undoEdit(id) {
  const editTodo = todos.find((todo) => todo.id === id);

  if (editTodo === undefined) {
    return;
  }

  editTodo.isEditing = false;
  setTodos(todos);
  renderTodoList();
}

function completeTask(id) {
  const completedTodo = todos.find((todo) => todo.id === id);

  if (completedTodo === undefined) {
    return;
  }

  completedTodo.isDone = true;
  completedTodo.completedAt = timeCalculation();

  setTodos(todos);
  renderTodoList();
  localStorage.setItem("todos", JSON.stringify(todos));
}
