'use strict';

(function () {
  var ARROW_HEIGHT = 22;
  var inputAdress = document.querySelector('#address');
  var formReset = document.querySelector('.ad-form__reset');

  window.form = {
    formFieldsets: document.querySelectorAll('fieldset'),
    formSelects: document.querySelectorAll('select'),


    changeAdress: function () {
      inputAdress.value = (parseInt(window.util.pageActive.style.left, 10) + parseInt(window.util.pageActive.offsetWidth / 2, 10)) + ', ' + (parseInt(window.util.pageActive.style.top, 10) + parseInt(window.util.pageActive.offsetHeight, 10) + ARROW_HEIGHT);
    }
  };

  // 1. сделать элементы форм неактивными

  for (var i = 0; i < window.form.formFieldsets.length; i++) {
    window.form.formFieldsets[i].disabled = true;
  }

  for (i = 0; i < window.form.formSelects.length; i++) {
    window.form.formSelects[i].disabled = true;
  }
  // 3. Заполнение адреса

  inputAdress.value = (parseInt(window.util.pageActive.style.left, 10) + parseInt(window.util.pageActive.offsetWidth / 2, 10)) + ', ' + (parseInt(window.util.pageActive.style.top, 10) + parseInt(window.util.pageActive.offsetHeight / 2, 10));

  var flatType = document.querySelector('#type');
  var flatCost = document.querySelector('#price');
  var flatTimeIn = document.querySelector('#timein');
  var flatTimeOut = document.querySelector('#timeout');

  var roomNumber = document.querySelector('#room_number');
  var guestCapacity = document.querySelector('#capacity');

  var advertForm = document.querySelector('form.ad-form');

  var changeFlatCost = function (evt) {
    switch (evt.currentTarget.value) {
      case 'bungalo':
        flatCost.min = 0;
        flatCost.placeholder = 0;
        break;
      case 'flat':
        flatCost.min = 1000;
        flatCost.placeholder = 1000;
        break;
      case 'house':
        flatCost.min = 5000;
        flatCost.placeholder = 5000;
        break;
      case 'palace':
        flatCost.min = 10000;
        flatCost.placeholder = 10000;
        break;
    }
  };

  var changeTime = function (evt) {
    if (evt.currentTarget === flatTimeIn) {
      flatTimeOut.selectedIndex = flatTimeIn.selectedIndex;
    } else {
      flatTimeIn.selectedIndex = flatTimeOut.selectedIndex;
    }
  };

  var checkRoomGuestsValidity = function () {
    var capacity = parseInt(guestCapacity.value, 10);
    var roomCount = parseInt(roomNumber.value, 10);
    guestCapacity.setCustomValidity('');
    if ((roomCount / capacity < 1) || (roomCount === 100 && capacity !== 0) || (roomCount !== 100 && capacity === 0)) {
      guestCapacity.setCustomValidity('Неверное количество гостей!');
    }
  };
  checkRoomGuestsValidity();

  var closeSuccessWindowOnEsc = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeSuccessWindow();
    }
  };

  var closeErrorWindowOnEsc = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeErrorWindow();
    }
  };

  var closeSuccessWindow = function () {
    var successWindow = document.querySelector('.success');
    document.removeEventListener('keydown', closeSuccessWindowOnEsc);
    document.removeEventListener('click', closeSuccessWindow);
    successWindow.remove();
  };

  var closeErrorWindow = function () {
    var errorWindow = document.querySelector('.error');
    document.removeEventListener('keydown', closeErrorWindowOnEsc);
    document.removeEventListener('click', closeErrorWindow);
    var errorBtn = errorWindow.querySelector('.error__button');
    errorBtn.removeEventListener('click', closeErrorWindow);
    errorWindow.remove();
  };

  var onLoad = function () {
    window.map.pageDeactivate();
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successWindow = successTemplate.cloneNode(true);
    var body = document.querySelector('body');
    body.appendChild(successWindow);
    document.addEventListener('keydown', closeSuccessWindowOnEsc);
    document.addEventListener('click', closeSuccessWindow);
  };

  var onError = function (message) {
    var main = document.querySelector('main');
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorWindow = errorTemplate.cloneNode(true);
    errorWindow.querySelector('.error__message').textContent += '. ' + message;
    main.appendChild(errorWindow);
    document.addEventListener('keydown', closeErrorWindowOnEsc);
    document.addEventListener('click', closeErrorWindow);
    var errorBtn = errorWindow.querySelector('.error__button');
    errorBtn.addEventListener('click', closeErrorWindow);
  };

  var submitFormData = function (evt) {
    evt.preventDefault();
    var formData = new FormData(advertForm);
    window.backend.save(formData, onLoad, onError);
  };

  flatType.addEventListener('change', changeFlatCost);
  flatTimeIn.addEventListener('change', changeTime);
  flatTimeOut.addEventListener('change', changeTime);
  roomNumber.addEventListener('change', checkRoomGuestsValidity);
  guestCapacity.addEventListener('change', checkRoomGuestsValidity);
  advertForm.addEventListener('submit', submitFormData);
  formReset.addEventListener('click', window.map.pageDeactivate);

})();
