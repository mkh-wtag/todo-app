import {
  ADD_ANIMATION_DELAY,
  REMOVE_ANIMATION_DELAY,
} from "../utilities/const.js";

const toast = (message, type) => {
  const toastWrapper = document.createElement("div");
  toastWrapper.className = "toast-wrapper";

  setTimeout(() => {
    toastWrapper.classList.add("animation");
  }, ADD_ANIMATION_DELAY);

  toastWrapper.innerText = message;
  toastWrapper.style.background = "#0ec277";
  if (type === "error") {
    toastWrapper.style.background = "#db072a";
  }

  setTimeout(() => {
    toastWrapper.classList.remove("animation");
  }, REMOVE_ANIMATION_DELAY);

  return toastWrapper;
};

export default toast;
