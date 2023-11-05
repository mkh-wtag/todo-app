import { todos, setTodos } from "../entry.js";
import { renderTodoList } from "../components/domActions.js";

const editTask = (id) => {
  const editTodo = todos.filter((todo) => todo.id === id);
  editTodo[0].isEditing = true;
  setTodos(todos);
  renderTodoList();
};

export default editTask;
