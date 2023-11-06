import createButton from "../utilities/createButton.js";
import notifyUser from "../utilities/notification.js";
import { body } from "./domElements.js";
import { todos, setTodos } from "../entry.js";
import { renderTodoList } from "./domActions.js";
import { ADD_ANIMATION_DELAY } from "../utilities/const.js";

const deleteConfirmation = (message, id) => {
  const popupWrapper = document.createElement("div");
  popupWrapper.className = "popup-wrapper";

  const popupLogo = document.createElement("div");
  popupLogo.className = "popup-logo";
  popupLogo.innerHTML = "<img src='./public/icon-delete.svg' alt='icon' />";

  const popup = document.createElement("div");
  popup.className = "popup";

  const popupText = document.createElement("div");
  popupText.innerText = message;

  setTimeout(() => {
    popup.classList.add("animation");
    popupWrapper.classList.add("animation");
  }, ADD_ANIMATION_DELAY);

  const popupFooter = document.createElement("div");
  popupFooter.className = "popup-footer";

  const buttonOk = createButton(
    "button button-success",
    "buttonOk",
    "",
    okHandler,
    "Ok"
  );
  const buttonCancel = createButton(
    "button button-success",
    "buttonCancel",
    "",
    cancelHandler,
    "Cancel"
  );

  popupFooter.append(buttonOk, buttonCancel);
  popup.append(popupLogo, popupText, popupFooter);
  popupWrapper.append(popup);

  body.append(popupWrapper);

  function okHandler() {
    popupWrapper.remove();

    const newTodos = todos.filter((todo) => todo.id !== id);

    setTodos(newTodos);
    renderTodoList();
    notifyUser("Successfully deleted todo item");
    localStorage.setItem("todos", JSON.stringify(newTodos));
  }

  function cancelHandler() {
    popupWrapper.remove();
  }
};

export default deleteConfirmation;
