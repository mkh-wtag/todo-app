import { renderTodoList } from "./domActions.js";

function searchTodo() {
  renderTodoList();
}

export function debounceSearch(fn, delay = 500) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

export default searchTodo;
