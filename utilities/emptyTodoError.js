import toast from "../components/Toast.js";
import { todoWrapper, textArea } from "../components/domElements.js";

const emptyTodoError = (message, type) => {
  const emptyTodoErrorNotice = toast(message, type);

  if(!textArea.value) {
    todoWrapper.appendChild(emptyTodoErrorNotice);
    setTimeout(() => {
      emptyTodoErrorNotice.remove();
    }, 2000);

    return;
  }  
}

export default emptyTodoError;

