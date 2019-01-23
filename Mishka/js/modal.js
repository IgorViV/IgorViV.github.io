"use strict";

var pageModal = document.querySelector('.page-modal');
var modalSubmit = pageModal.querySelector('.page-modal__submit');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

function onModalOpen () {
  pageModal.classList.remove('page-modal--hidden');
};

function onModalClose () {
  pageModal.classList.add('page-modal--hidden');
};

function isEscEvent (evt, action) {
  if (evt.keyCode === ESC_KEYCODE) {
    action();
  }
};

function isEnterEvent (evt, action) {
  if (evt.keyCode === ENTER_KEYCODE) {
    action();
  }
};

if (document.querySelector('.promo__button-order')) {
  var buttonOrder = document.querySelector('.promo__button-order');
  buttonOrder.addEventListener('click', function () {
    pageModal.classList.remove('page-modal--hidden');
  });
}

if (document.querySelector('.catalog')) {
  var catalog = document.querySelector('.catalog');
  var catalogList = catalog.querySelector('.catalog__list');
  var arrCatalogItems = catalogList.querySelectorAll('.catalog__list');

  catalogList.addEventListener('click', function (evt) {
    if (evt.target.tagName === 'BUTTON') {
      if (evt.target.classList.contains('catalog__item-cart')) {
        onModalOpen();
      }
    }
  });
}

modalSubmit.addEventListener('click', function (evt) {
  evt.preventDefault();

  onModalClose();
});

modalSubmit.addEventListener('keydown', function (evt) {

  isEnterEvent (evt, onModalClose);
});

document.addEventListener('keydown', function (evt) {

  isEscEvent (evt, onModalClose);
});
