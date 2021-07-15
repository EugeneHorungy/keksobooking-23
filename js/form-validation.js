import {userAd} from './form.js';

const userAdTitle = userAd.querySelector('input[name="title"]');
const userAdPrice = userAd.querySelector('input[name="price"]');
const userAdRooms = userAd.querySelector('select[name="rooms"]');
const userAdCapacity = userAd.querySelector('select[name="capacity"]');
const optionsCapacity = Array.from(userAdCapacity.children);
const userAdType = userAd.querySelector('select[name="type"]');
const userAdCheckin = userAd.querySelector('select[name="timein"]');
const userAdCheckout = userAd.querySelector('select[name="timeout"]');

const MinPriceValue = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
};

document.addEventListener('DOMContentLoaded', () => {
  optionsCapacity[0].setAttribute('disabled', 'disabled');
  optionsCapacity[1].setAttribute('disabled', 'disabled');
  optionsCapacity[3].setAttribute('disabled', 'disabled');
});

userAdTitle.addEventListener('input', () => {
  const valueLength = userAdTitle.value.length;
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;

  if (valueLength < MIN_TITLE_LENGTH) {
    userAdTitle.setCustomValidity(`Минимально допустимое количество символов: ${MIN_TITLE_LENGTH}. Длина текста сейчас: ${valueLength}.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    userAdTitle.setCustomValidity(`Превышено максимально допустимое количество символов на: ${valueLength - MAX_TITLE_LENGTH}`);
  } else {
    userAdTitle.setCustomValidity('');
  }

  userAdTitle.reportValidity();
});

userAdPrice.addEventListener('input', () => {
  if (userAdPrice.value > 1000000) {
    userAdPrice.setCustomValidity('Максимальная цена 1 000 000');
  } else {
    userAdPrice.setCustomValidity('');
  }

  userAdPrice.reportValidity();
});

userAdPrice.addEventListener('input', () => {
  const minPrice = +userAdPrice.placeholder;

  if (userAdPrice.value > 1000000 || userAdPrice.value < minPrice) {
    userAdPrice.setCustomValidity(`Минимальная цена ${minPrice}. Максимальная цена 1000000.`);
  } else {
    userAdPrice.setCustomValidity('');
  }

  userAdPrice.reportValidity();
});

const addAttributeDisabled = (array) => {
  optionsCapacity.forEach((element) => element.removeAttribute('disabled'));
  for (let i = 0; i < array.length; i++) {
    optionsCapacity[array[i]].setAttribute('disabled', 'disabled');
  }
};

userAdRooms.addEventListener('change', (evt) => {
  if (evt.target.value === '1') {
    addAttributeDisabled([0, 1, 3]);
  } else if (evt.target.value === '2') {
    addAttributeDisabled([0, 3]);
  } else if (evt.target.value === '3') {
    addAttributeDisabled([3]);
  } else if (evt.target.value === '100') {
    addAttributeDisabled([0, 1, 2]);
    userAdCapacity.setCustomValidity('Выберите допустимое значение для этого поля.');
    userAdCapacity.reportValidity();
  }
});

const changePriceAttribute = (minPrice) => {
  userAdPrice.setAttribute('min', minPrice);
  userAdPrice.setAttribute('placeholder', minPrice);
};

userAdType.addEventListener('change', (evt) => {
  switch (evt.target.value) {
    case 'bungalow':
      changePriceAttribute(`${MinPriceValue.BUNGALOW}`);
      break;
    case 'flat':
      changePriceAttribute(`${MinPriceValue.FLAT}`);
      break;
    case 'hotel':
      changePriceAttribute(`${MinPriceValue.HOTEL}`);
      break;
    case 'house':
      changePriceAttribute(`${MinPriceValue.HOUSE}`);
      break;
    case 'palace':
      changePriceAttribute(`${MinPriceValue.PALACE}`);
  }
});

userAdCheckin.addEventListener('change', () => {
  userAdCheckout.value = userAdCheckin.value;
});

userAdCheckout.addEventListener('change', () => {
  userAdCheckin.value = userAdCheckout.value;
});
