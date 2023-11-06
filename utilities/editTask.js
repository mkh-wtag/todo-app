import { todos, setTodos } from "../entry.js";
import { renderTodoList } from "../components/domActions.js";

const editTask = (id) => {
  const editTodo = todos.find((todo) => todo.id === id);
  editTodo.isEditing = true;
  setTodos(todos);
  renderTodoList();
};

export default editTask;
