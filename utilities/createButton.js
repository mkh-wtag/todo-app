const createButton = (className, idName, icon, handler) => {
  const button = document.createElement('button');
  button.className = className;
  button.id = idName;
  button.innerHTML = `<img src=./public/${icon} alt="icon" />`;
  button.addEventListener('click', handler);
  return button;
}

export default createButton;

