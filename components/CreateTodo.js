
import toast from "./Toast.js";
import timeCalculation from "../utilities/TimeCalculation.js";

const createTodo = () => {
  // const buttonCreate = document.querySelector('#buttonCreate');
  // const createTodo = document.querySelector('#createTodo');
  // const cancelTodoButton = document.querySelector('#cancelTodo');
  // const textArea = document.querySelector('#enterTodo');

  // const addTodoBtn = document.querySelector('#addTodo');
  // const todoWrapper = document.querySelector('#todoWrapper');

  // const openCreateTodo = () => {
  //   createTodo.classList.add('open-create-todo');
  //   textArea.focus();
  // }

  // const cancelTodo = () => {
  //   createTodo.classList.remove('open-create-todo');
  //   textArea.value = '';
  // }

  // buttonCreate.addEventListener('click', openCreateTodo);
  // cancelTodoButton.addEventListener('click', cancelTodo);

  // const emptyNotice = document.createElement('h2');

  // if(todoWrapper.innerHTML === '') {
  //   emptyNotice.innerText = 'Todo list is empty';
  //   todoWrapper.appendChild(emptyNotice)
  // }

  let todos = [];

  const addTodo = () => {
    // const emptyTodoErrorNotice = toast('Please enter todo', 'error');

    // if(!textArea.value) {
    //   todoWrapper.appendChild(emptyTodoErrorNotice);
    //   setTimeout(() => {
    //     emptyTodoErrorNotice.remove();
    //   }, 2000);

    //   return;
    // }

    // const todoDiv = document.createElement('div');
    // todoDiv.classList.add('todo');

    // const todoHeader = document.createElement('h1');
    // todoHeader.classList.add('title-task');

    // const todoDetails = document.createElement('div');
    // todoDetails.classList.add('todo-details');

    // const todo = {
    //   title: textArea.value,
    //   isDone: false,
    //   isEditing: false,
    //   createdAt: timeCalculation(),
    // }
    // todos.push(todo);

    todos.map((todo) => {
      const { title, isDone, isEditing, createdAt } = todo;
      const {hour, minutes, amPm, currentDay, months, currentMonth, currentYear} = createdAt;
      
      todoHeader.innerText = title;
      todoDetails.innerHTML = `<div class="created-at">Created at: <strong>${hour}:${minutes} ${amPm}, ${currentDay}-${months[currentMonth]}-${currentYear}</strong></div>`;
    })

    // const todoActions = document.createElement('div');
    // todoActions.classList.add('todo-actions');
    // todoActions.innerHTML = `
    //   <button class="button button-icon">
    //     <img src="./public/icon-tick.svg" alt="tick" />
    //   </button>

    //   <button class="button button-icon">
    //     <img src="./public/icon-edit.svg" alt="edit" />
    //   </button>

    //   <button class="button button-icon">
    //     <img src="./public/icon-delete.svg" alt="delete" />
    //   </button>
    // `
    
    // const todoSuccess = toast('Successfully created new todo');

    if(textArea.value) {
      todoDiv.append(todoHeader, todoDetails, todoActions);
      todoWrapper.append(todoDiv, todoSuccess);
      
      todoDiv.style.borderLeft = '5px solid #0ec277';
      todoDiv.style.background = 'linear-gradient(90deg, #daf5ea, #fff 15%)';

      textArea.value = '';
      emptyNotice.remove();
      setTimeout(() => {
        todoSuccess.remove();
        todoDiv.removeAttribute("style");
      }, 2000);
    }
  }

  addTodoBtn.addEventListener('click', addTodo);
}

export default createTodo;

