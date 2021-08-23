function getRandomInteger(min, max) {
  if (max < min) {
    [min, max] = [max, min];
  }
  if (min === max) {
    throw new Error('Значения должны отличаться');
  }
  let randInt = min + Math.random() * (max + 1 - min);
  return Math.floor(randInt);
}


function getRandomFloat(min, max, commas) {
  if (max < min) {
    [min, max] = [max, min];
  }
  if (min === max) {
    throw new Error('Значения должны отличаться');
  }
  let randFloat = (Math.random() * (max - min) + min).toFixed(commas);
  return randFloat;
}


function getRandomArrayElement(elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}

const getRandomArraySlice = (array) => {
  getRandomArrayElement(array);
  return array.slice(getRandomInteger(0, array.length - 1));
};

const showAlert = (message) => {
  const map = window.L.map('map-canvas');
  const ALERT_SHOW_TIME = 5000
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.right = 0;
  alertContainer.style.top = '50%';
  alertContainer.style.marginLeft = 'auto';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.textContent = message;
  map.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

export { isEscEvent, showAlert, getRandomArraySlice, getRandomArrayElement, getRandomFloat, getRandomInteger }
