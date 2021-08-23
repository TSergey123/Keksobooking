const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const cardElement = cardTemplate.cloneNode(true);

const getRuType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
}

const createFeatures = function (createOffer) {
  const feature = document.createDocumentFragment();
  for (let i = 0; i < createOffer.offer.features.length; i++) {
    const featureItem = document.createElement('li');
    featureItem.className = 'popup__feature popup__feature--' + createOffer.offer.features[i];
    feature.appendChild(featureItem);
  }
  return feature;
}

const createPhotos = function (createOffer) {
  const photo = document.createDocumentFragment();
  for (let i = 0; i < createOffer.offer.photos.length; i++) {
    const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
    const popupPhoto = balloonTemplate.querySelector('.popup__photo');
    const popupPhotoItem = popupPhoto.cloneNode(true);
    popupPhotoItem.src = createOffer.offer.photos[i];
    photo.appendChild(popupPhotoItem);
  }
  return photo;
}

const createSimilarPopup = (createOffer) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = createOffer.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = createOffer.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = createOffer.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getRuType[createOffer.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = createOffer.offer.rooms + ' комнаты для ' + createOffer.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + createOffer.offer.checkin + ' выезд до ' + createOffer.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = createOffer.offer.description;
  cardElement.querySelector('.popup__avatar').src = createOffer.author.avatar;
  cardElement.querySelector('.popup__photos').removeChild(cardElement.querySelector('.popup__photo'));
  cardElement.querySelector('.popup__photos').appendChild(createPhotos(createOffer));
  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__features').appendChild(createFeatures(createOffer));
  return cardElement;
}

export { createSimilarPopup, cardElement };
