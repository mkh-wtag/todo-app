import { renderTodoList } from "./domActions.js";

function searchTodo() {
  renderTodoList();
}

export function debounceSearch(fn, delay = 500) {
  let timer;

  return function () {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn();
    }, delay);
  };
}

export default searchTodo;
