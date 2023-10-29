
import Toast from "./Toast.js";

const CreateTodo = () => {
  const buttonCreate = document.querySelector('#buttonCreate');
  const createTodo = document.querySelector('.create-todo');
  const cancelTodoBtn = document.querySelector('#cancelTodo');
  const textArea = document.querySelector('.area');

  const addTodoBtn = document.querySelector('#addTodo');
  const todoWrapper = document.querySelector('.todo-wrapper');

  const openCreateTodo = () => {
    createTodo.classList.add('open-create-todo');
    textArea.focus();
  }

  const cancelTodo = () => {
    createTodo.classList.remove('open-create-todo');
    textArea.value = '';
  }

  buttonCreate.addEventListener('click', openCreateTodo);
  cancelTodoBtn.addEventListener('click', cancelTodo);

  const emptyNotice = document.createElement('h2');

  if(todoWrapper.innerHTML === '') {
    emptyNotice.innerText = 'Todo list is empty';
    todoWrapper.appendChild(emptyNotice)
  }

  const addTodo = () => {
    const messageConfirmation = Toast('Please enter todo', 'error');

    if(!textArea.value) {
      todoWrapper.appendChild(messageConfirmation);
      setTimeout(() => {
        messageConfirmation.remove();
      }, 2000)
    }

    const todo = document.createElement('div');
    todo.classList.add('todo');

    const todoHeader = document.createElement('h1');
    todoHeader.classList.add('title-task');
    todoHeader.innerText = textArea.value;

    const todoDetails = document.createElement('div');
    todoDetails.classList.add('todo-details');

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const currentDate = new Date();
    const currentMinutes = currentDate.getMinutes();
    const currentHour = currentDate.getHours();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const minutes = currentMinutes.toString().padStart(2, '0');

    
    const hourCalculation = () => {
      let hour;
      let amPm = 'AM';
      if(currentHour > 12) {
        hour = currentHour - 12;
        amPm = 'PM';
      } else {
        hour = currentHour;
      }

      return {hour, amPm};
    }

    const { hour, amPm } = hourCalculation();

    todoDetails.innerHTML = `<div class="created-at">Created at: <strong>${hour}:${minutes}${amPm}, ${currentDay}-${months[currentMonth]}-${currentYear}</strong></div>`;

    const todoActions = document.createElement('div');
    todoActions.classList.add('todo-actions');
    todoActions.innerHTML = `
      <button class="button button-icon">
        <img src="./public/icon-tick.svg" alt="tick" />
      </button>

      <button class="button button-icon">
        <img src="./public/icon-edit.svg" alt="edit" />
      </button>

      <button class="button button-icon">
        <img src="./public/icon-delete.svg" alt="delete" />
      </button>
    `
    
    const todoSuccess = Toast('Successfully created new todo');

    if(textArea.value) {
      todo.append(todoHeader, todoDetails, todoActions);
      todoWrapper.append(todo, todoSuccess);
      todo.style.borderLeft = '5px solid #0ec277';
      todo.style.background = 'linear-gradient(90deg, #daf5ea, #fff 15%)';
      setTimeout(() => {
        todoSuccess.remove();
        todo.removeAttribute("style");
      }, 2000);
      textArea.value = '';
      emptyNotice.remove();
    }
    
  }

  addTodoBtn.addEventListener('click', addTodo);
}

export default CreateTodo;

