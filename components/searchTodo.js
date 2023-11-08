import { searchTodoInput } from "./domElements.js";
import { globalTodos, setTodos } from "../entry.js";
import { renderTodoList } from "./domActions.js";

function searchTodo() {
  const searchedText = searchTodoInput.value.toLowerCase();

  const searchedTodos = globalTodos.filter((todo) =>
    todo.title.toLowerCase().includes(searchedText)
  );

  setTodos(searchedTodos);
  renderTodoList();
}

export function debounceSearch(fn, delay) {
  let timer;

  return function () {
    timer && clearTimeout(timer);

    timer = setTimeout(() => {
      fn();
    }, delay);
  };
}

export default searchTodo;
