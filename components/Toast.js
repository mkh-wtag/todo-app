const Toast = (message, type) => {
  const toastWrapper = document.createElement('div');
  toastWrapper.classList.add('toast-wrapper');
  toastWrapper.innerText = message;
  toastWrapper.style.background = '#0ec277';
  if(type === 'error') {
    toastWrapper.style.background = '#db072a';
  }
  return toastWrapper;
}

export default Toast;


