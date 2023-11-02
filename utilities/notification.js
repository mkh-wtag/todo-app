import toast from "../components/Toast.js";
import { todoWrapper, textArea } from "../components/domElements.js";

const notifyUser = (message, type) => {
  const notifyUserNotice = toast(message, type);

  if (!textArea.value) {
    todoWrapper.appendChild(notifyUserNotice);
    setTimeout(() => {
      notifyUserNotice.remove();
    }, 2000);

    return;
  }
};

export default notifyUser;
