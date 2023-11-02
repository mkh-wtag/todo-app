const createButton = (className, idName, icon, handler, buttonText = "") => {
  const button = document.createElement("button");
  button.className = className;
  button.id = idName;
  if (icon) {
    button.innerHTML = `<img src=./public/${icon} alt="icon" />`;
  }
  button.innerHTML += buttonText;
  button.addEventListener("click", handler);

  return button;
};

export default createButton;
