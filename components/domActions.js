import createButton from "../utilities/createButton.js";
import deleteConfirmation from "../components/deleteConfirmation.js";
import timeCalculation from "../utilities/TimeCalculation.js";
import { createTodoDiv, textArea } from "./domElements.js";
import { todoWrapper, emptyNotice } from "./domElements.js";
import { todos, setTodos } from "../entry.js";

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

  todos.forEach((todo) => {
    todoWrapper.append(createTodoDomElement(todo));
  });

  emptyListMessage();
};

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

    taskEdit = createButton("button button-icon", "taskEdit", "icon-edit.svg");

    taskDelete = createButton(
      "button button-icon",
      "taskDelete",
      "icon-delete.svg",
      () => deleteHandler(id)
    );

    todoActions.append(taskCompleted, taskEdit, taskDelete);
  }

  todoDiv.append(todoHeader, todoDetails, todoActions);

  return todoDiv;
};

function deleteHandler(id) {
  deleteConfirmation("Are you sure you want to delete this?", id);
}

function completeTask(id) {
  const completedTodo = todos.filter((todo) => todo.id === id);
  completedTodo[0].isDone = true;
  completedTodo[0].completedAt = timeCalculation();

  setTodos(todos);
  renderTodoList();
}
