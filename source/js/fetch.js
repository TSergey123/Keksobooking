import { showAlert } from './util.js';

const getData = (onSuccss, onError) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      showAlert('Не удалось загрузить данные')
    })
    .then(onSuccss)
    .catch(onError);
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(onError);
};

export { getData, sendData };
