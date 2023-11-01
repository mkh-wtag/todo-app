import createButton from "../utilities/createButton.js";
import notifyUser from "../utilities/notification.js";
import { createTodoDiv, textArea } from "./domElements.js";
import { todoWrapper } from "./domElements.js";
import { todos } from "../entry.js";

export const openCreateTodo = () => {
  createTodoDiv.classList.add("open-create-todo");
  textArea.focus();
};

export const cancelTodo = () => {
  createTodoDiv.classList.remove("open-create-todo");
  textArea.value = "";
};

export const renderTodoList = () => {
  todoWrapper.innerHTML = "";

  if (todos) {
    todos.forEach((todo) => {
      todoWrapper.append(createTodoDomElement(todo));
    });
  }
};

export const createTodoDomElement = (todo) => {
  const { id, title, isDone, isEditing, createdAt } = todo;
  const { hour, minutes, amPm, currentDay, months, currentMonth, currentYear } =
    createdAt;

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const todoHeader = document.createElement("h1");
  todoHeader.classList.add("title-task");

  const todoDetails = document.createElement("div");
  todoDetails.classList.add("todo-details");

  todoHeader.innerText = title;
  todoDetails.innerHTML = `<div class="created-at">Created at: <strong>${hour}:${minutes} ${amPm}, ${currentDay}-${months[currentMonth]}-${currentYear}</strong></div>`;

  const todoActions = document.createElement("div");
  todoActions.classList.add("todo-actions");

  const taskCompleted = createButton(
    "button button-icon",
    "taskCompleted",
    "icon-tick.svg"
  );
  const taskEdit = createButton(
    "button button-icon",
    "taskEdit",
    "icon-edit.svg"
  );
  const taskDelete = createButton(
    "button button-icon",
    "taskDelete",
    "icon-delete.svg"
  );

  todoActions.append(taskCompleted, taskEdit, taskDelete);
  todoDiv.append(todoHeader, todoDetails, todoActions);

  return todoDiv;
};
