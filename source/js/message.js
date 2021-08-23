import { isEscEvent } from './util.js';

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

const onClick = (evt) => {
  evt.preventDefault();
  closeMessage();
};

const showMessage = (message) => {
  document.body.appendChild(message);
  message.style.zIndex = '9999';
  document.addEventListener('click', onClick);
  document.addEventListener('keydown', onPopupEscKeydown);
}

const showSuccessMessage = () => {
  const success = successMessage.cloneNode(true);
  showMessage(success);
}

const showErrorMessage = () => {
  const error = errorMessage.cloneNode(true);
  showMessage(error);
}

const closeMessage = () => {
  document.querySelectorAll('.success, .error').forEach((message) => message.remove());
  document.removeEventListener('click', onClick);
  document.removeEventListener('keydown', onPopupEscKeydown);
};

export { showSuccessMessage, showErrorMessage }
