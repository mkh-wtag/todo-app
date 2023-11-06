import toast from "../components/Toast.js";
import { body, textArea } from "../components/domElements.js";
import { REMOVE_ELEMENT_DELAY } from "./const.js";

const notifyUser = (message, type) => {
  const notifyUserNotice = toast(message, type);

  if (!textArea.value) {
    body.appendChild(notifyUserNotice);
    setTimeout(() => {
      notifyUserNotice.remove();
    }, REMOVE_ELEMENT_DELAY);

    return;
  }
};

export default notifyUser;
