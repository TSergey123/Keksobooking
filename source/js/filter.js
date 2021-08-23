import { reRenderMarkers } from './map.js'

const MAX_NUMBER_OF_PINS = 10;
const DEBOUNCE_TIME = 500;

const PriceRange = {
  LOW: {
    MAX: 10000,
  },
  MIDDLE: {
    MIN: 10000,
    MAX: 50000,
  },
  HIGH: {
    MIN: 50000,
  },
};
const mapFilters = document.querySelector('.map__filters');
const selects = mapFilters.querySelectorAll('select');

const debounce = (fn, ms) => {
  let timeout;
  return function () {
    const fnCall = () => {
      fn.apply(this, arguments);
    }
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
}

const checkPrice = (value, range) => {

  switch (value) {
    case 'low':
      return range <= PriceRange.LOW.MAX;
    case 'middle':
      return range >= PriceRange.MIDDLE.MIN && range <= PriceRange.MIDDLE.MAX;
    case 'high':
      return range >= PriceRange.HIGH.MIN;
    default:
      return false;
  }
}

const matchSelect = (offer, selectType, selectValue) => {

  if (selectValue === 'any') {
    return true;
  }

  if (selectType === 'price') {
    return checkPrice(selectValue, offer[selectType]);
  }

  return selectValue === offer[selectType].toString();
}

const matchSelectsForOffer = (offer) => {
  const array = Array.from(selects);

  return array.every((select) => {
    const selectPropType = select.name.split('-')[1];
    return matchSelect(offer, selectPropType, select.value);
  });
}

const matchFeaturesForOffer = (offer) => {
  const features = mapFilters.querySelectorAll('input:checked');
  const filterFeatureList = Array.from(features);

  if (offer.features.length < filterFeatureList.length) {
    return false;
  }

  if (filterFeatureList.length === 0 || offer.features.length === 0) {
    return true;
  }

  return filterFeatureList.every((feature) => {
    return offer.features.includes(feature.value);
  });
}

const orderFilter = (items) => {
  let filteredOffers = [];

  items.some((offerItem) => {
    if (filteredOffers.length >= MAX_NUMBER_OF_PINS) {
      return true;
    }

    if (matchSelectsForOffer(offerItem.offer) && matchFeaturesForOffer(offerItem.offer)) {
      filteredOffers.push(offerItem);
    }
  });

  reRenderMarkers(filteredOffers);
}

const addFilterListener = (offers) => {
  const onFilterChange = debounce(() => orderFilter(offers), DEBOUNCE_TIME);

  mapFilters.addEventListener('change', onFilterChange);
}

export { addFilterListener };
