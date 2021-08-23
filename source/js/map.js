import { createSimilarPopup } from './popup.js';
import { address, disableForm, activateForm } from './form.js';

const TOKYO_LAT = 35.712977129360546;
const TOKYO_LNG = 139.7540842153831;
const TOKYO_FIXED = TOKYO_LAT.toFixed(5) + ', ' + TOKYO_LNG.toFixed(5);
const MAIN_ZOOM = 10;
const resetForm = document.querySelector('.ad-form__reset');
const map = window.L.map('map-canvas');

const createMarker = (lat, lng, draggable, icon) => {
  return window.L.marker({
    lat,
    lng,
  },
  {
    draggable,
    icon,
  })
}

const createPin = (lat, lng) => {
  return createMarker(lat, lng, false, window.L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  }));
}

const createMainPin = (lat, lng) => {
  return createMarker(lat, lng, true, window.L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [46, 46],
    iconAnchor: [23, 46],
  }));
}

const initMap = () => {
  disableForm();

  map.on('load', () => {
    address.value = TOKYO_FIXED;
  })
    .setView({
      lat: TOKYO_LAT,
      lng: TOKYO_LNG,
    }, MAIN_ZOOM);
  window.L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPin.on('moveend', (evt) => {
    activateForm();
    address.value = evt.target.getLatLng().lat.toFixed(5) + ', ' + evt.target.getLatLng().lng.toFixed(5);
  });

  mainPin.addTo(map);
}

const resetMainMarker = () => {
  mainPin.setLatLng([TOKYO_LAT, TOKYO_LNG])
  map.setView(new window.L.LatLng(TOKYO_LAT, TOKYO_LNG), MAIN_ZOOM);
};

const setAddress = () => {
  address.value = TOKYO_FIXED;
};

const mainPin = createMainPin(TOKYO_LAT, TOKYO_LNG);

resetForm.addEventListener('click', () => {
  resetMainMarker();
});

const pinList = [];

const removeMarkers = () => {
  pinList.forEach((marker) => {
    marker.remove();
  });
}

const renderMap = (offers) => {

  offers.slice(0, 10).forEach((offer) => {
    const pin = createPin(offer.location.lat, offer.location.lng).addTo(map).bindPopup(() => createSimilarPopup(offer));
    pinList.push(pin);
  });
}

const reRenderMarkers = (offer) => {
  removeMarkers();
  renderMap(offer);
}

export { initMap, resetMainMarker, setAddress, reRenderMarkers, renderMap };
