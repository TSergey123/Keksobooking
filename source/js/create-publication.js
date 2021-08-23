import { getRandomArrayElement, getRandomInteger, getRandomFloat } from './util.js';
import { TITLES, TYPES, CHECKS, FEATURES, DESCRIPTIONS, PHOTOS, PUBLICATION_LENGTH } from './data.js';

const createPublication = () => {
  const xRandomLocation = getRandomFloat(35.65000, 35.70000, 5);
  const yRandomLocation = getRandomFloat(139.70000, 139.80000, 5);
  return {
    location: {
      x: getRandomFloat(35.65000, 35.70000, 5),
      y: getRandomFloat(139.70000, 139.80000, 5),
    },

    author: {
      avatar: 'img/avatars/user0' + getRandomInteger(1, 8) + '.png',
    },

    offer: {
      title: getRandomArrayElement(TITLES),
      address: xRandomLocation + ', ' + yRandomLocation,
      price: getRandomInteger(1, 10000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(1, 10),
      guests: getRandomInteger(1, 10),
      checkin: getRandomArrayElement(CHECKS),
      checkout: getRandomArrayElement(CHECKS),
      features: FEATURES,
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: PHOTOS,
    },
  }
};

const similarOffer = new Array(PUBLICATION_LENGTH).fill(null).map(() => createPublication());

export { similarOffer, createPublication };
