import createButton from "../utilities/createButton.js";
import emptyTodoError from "../utilities/emptyTodoError.js";
import timeCalculation from "../utilities/TimeCalculation.js";
import { createTodoDiv, textArea } from "./domElements.js";
import { todoWrapper } from "./domElements.js";

export const openCreateTodo = () => {
  createTodoDiv.classList.add('open-create-todo');
  textArea.focus();
}

export const cancelTodo = () => {
  createTodoDiv.classList.remove('open-create-todo');
  textArea.value = '';
}

let todos = [];

export const renderTodoList = () => {
  const task = textArea.value;

  const todo = {
    title: task,
    isDone: false,
    isEditing: false,
    createdAt: timeCalculation(),
  }

  todos.push(todo);

  textArea.value = '';
  emptyTodoError('Successfully created new todo');

  return todos;
};

export const createTodoItem = () => {
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  const todoHeader = document.createElement('h1');
  todoHeader.classList.add('title-task');

  const todoDetails = document.createElement('div');
  todoDetails.classList.add('todo-details');

  const todoActions = document.createElement('div');
  todoActions.classList.add('todo-actions');

  const taskCompleted = createButton('button button-icon', 'taskCompleted', 'icon-tick.svg');
  const taskEdit = createButton('button button-icon', 'taskEdit', 'icon-edit.svg' );
  const taskDelete = createButton('button button-icon', 'taskDelete', 'icon-delete.svg' );

  const todos = renderTodoList();
  
  if(todos) {
    todos.map((todo) => {
      const { title, isDone, isEditing, createdAt } = todo;
      const {hour, minutes, amPm, currentDay, months, currentMonth, currentYear} = createdAt;
      
      todoHeader.innerText = title;
      todoDetails.innerHTML = `<div class="created-at">Created at: <strong>${hour}:${minutes} ${amPm}, ${currentDay}-${months[currentMonth]}-${currentYear}</strong></div>`;
    })
  }
  
  todoActions.append(taskCompleted, taskEdit, taskDelete);
  todoDiv.append(todoHeader, todoDetails, todoActions);
  todoWrapper.append(todoDiv);

  todoDiv.style.borderLeft = '5px solid #0ec277';
  todoDiv.style.background = 'linear-gradient(90deg, #daf5ea, #fff 15%)';

  setTimeout(() => {
    todoDiv.removeAttribute("style");
  }, 2000);
};









