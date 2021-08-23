import { sendData } from './fetch.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { resetMainMarker, setAddress } from './map.js';

const form = document.querySelector('.ad-form')
const type = form.querySelector('#type');
const address = form.querySelector('#address');
const title = form.querySelector('#title');
const price = form.querySelector('#price');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const roomNumber = form.querySelector('#room_number');
const roomCapacity = form.querySelector('#capacity');
const formFieldset = form.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelect = mapFilters.querySelectorAll('select');
const mapFiltersFieldset = mapFilters.querySelectorAll('fieldset');
const mainForm = document.querySelector('.ad-form');

const disableForm = () => {
  form.classList.add('ad-form--disabled');
  formFieldset.forEach(function (item) {
    item.setAttribute('disabled', true);
  });
}

const activateForm = () => {
  form.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('ad-form--disabled');

  mapFiltersFieldset.forEach(function (item) {
    item.removeAttribute('disabled', true);
  });

  mapFiltersSelect.forEach(function (item) {
    item.removeAttribute('disabled', true);
  });

  formFieldset.forEach(function (item) {
    item.removeAttribute('disabled', true);
  });
}

const checkAmount = () => {
  const MAX_ROOMS_NUMBER = 100;
  const rooms = Number(roomNumber.value);
  const capacityAmount = roomCapacity.value;

  if (rooms === MAX_ROOMS_NUMBER && capacityAmount !== '0') {
    roomCapacity.setCustomValidity('Выберите вариант "Не для гостей"');
  } else if (rooms < capacityAmount) {
    roomCapacity.setCustomValidity('Выберите меньшее число гостей');
  } else {
    roomCapacity.setCustomValidity('');
  }
}
checkAmount();

roomCapacity.addEventListener('change', () => {
  checkAmount();
})

roomNumber.addEventListener('change', () => {
  checkAmount();
})

const chooseTime = (evt) => {
  timeIn.value = evt.target.value
  timeOut.value = evt.target.value
}
timeOut.addEventListener('click', chooseTime);
timeIn.addEventListener('click', chooseTime);

const typePrice = {
  bungalow: '0',
  flat: '1000',
  house: '5000',
  palace: '10000',
}

const typeChange = () => {
  price.placeholder = typePrice[type.value];
  price.min = typePrice[type.value];
}
type.addEventListener('click', typeChange);

title.addEventListener('input', () => {
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const valueLength = title.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    title.setCustomValidity('Еще ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  }

  else if (valueLength > MAX_TITLE_LENGTH) {
    title.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  }
  else {
    title.setCustomValidity('');
  }
  title.reportValidity();
});


const typePriceVal = () => {
  const MAX_PRICE_VALUE = 1000000;
  const priceValue = price.value;
  if (priceValue > MAX_PRICE_VALUE) {
    price.setCustomValidity('Выберите дешевле на ' + (priceValue - MAX_PRICE_VALUE));
  }

  if (!/^[0-9]+$/.test(priceValue)) {
    price.setCustomValidity('Для ввода доступны только цифры');
  }
  if (priceValue < price.min) {
    price.setCustomValidity('Минимальная цена для данного типа жилья - ' + typePrice[type.value]);
  }

  else {
    price.setCustomValidity('');
  }

  price.reportValidity();
}


price.addEventListener('input', () => {
  typePriceVal();
});



type.addEventListener('blur', () => {
  typePriceVal();
});

const resetForm = () => {
  mainForm.reset();
  mapFilters.reset();
  resetMainMarker();
  setAddress();
}

const setUserFormSubmit = () => {
  mainForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {

        showSuccessMessage();
        resetForm();
      },
      () => showErrorMessage(),
      new FormData(evt.target),
    );
  });
}

export { setUserFormSubmit, activateForm, disableForm, address };
