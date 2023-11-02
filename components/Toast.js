const toast = (message, type) => {
  const toastWrapper = document.createElement("div");
  toastWrapper.className = "toast-wrapper";

  setTimeout(() => {
    toastWrapper.className += " animation";
  }, 1);

  toastWrapper.innerText = message;
  toastWrapper.style.background = "#0ec277";
  if (type === "error") {
    toastWrapper.style.background = "#db072a";
  }

  setTimeout(() => {
    toastWrapper.classList.remove("animation");
  }, 1800);

  return toastWrapper;
};

export default toast;
