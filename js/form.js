'use strict';

(function () {
  var ARROW_HEIGHT = 22;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var FORM_MIN_PRICES = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var inputAdress = document.querySelector('#address');
  var formReset = document.querySelector('.ad-form__reset');
  var formLoadAvatar = document.querySelector('.ad-form__field input[type=file]');
  var userAvatar = document.querySelector('.ad-form-header__preview img');
  var formPhotoLoad = document.querySelector('.ad-form__upload input[type=file]');
  var formLoadedPhotos = document.querySelector('.ad-form__photo');

  var userAvatarDropZone = document.querySelector('.ad-form-header__drop-zone');
  var userPhotosDropZone = document.querySelector('.ad-form__drop-zone');
  var pageActiveLeft = parseInt(window.util.pageActive.style.left, 10);
  var pageActiveOffsetW = parseInt(window.util.pageActive.offsetWidth / 2, 10);
  var pageActiveTop = parseInt(window.util.pageActive.style.top, 10);
  var pageActiveOffsetH = parseInt(window.util.pageActive.offsetHeight, 10);

  var loaderFunction = '';

  window.form = {
    formFieldsets: document.querySelectorAll('fieldset'),
    formSelects: document.querySelectorAll('select'),

    changeAdress: function () {
      pageActiveLeft = parseInt(window.util.pageActive.style.left, 10);
      pageActiveOffsetW = parseInt(window.util.pageActive.offsetWidth / 2, 10);
      pageActiveTop = parseInt(window.util.pageActive.style.top, 10);
      pageActiveOffsetH = parseInt(window.util.pageActive.offsetHeight, 10);
      inputAdress.value = (pageActiveLeft + pageActiveOffsetW) + ', ' + (pageActiveTop + pageActiveOffsetH + ARROW_HEIGHT);
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
  window.form.changeAdress();
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
        flatCost.min = FORM_MIN_PRICES['bungalo'];
        flatCost.placeholder = FORM_MIN_PRICES['bungalo'];
        break;
      case 'flat':
        flatCost.min = FORM_MIN_PRICES['flat'];
        flatCost.placeholder = FORM_MIN_PRICES['flat'];
        break;
      case 'house':
        flatCost.min = FORM_MIN_PRICES['house'];
        flatCost.placeholder = FORM_MIN_PRICES['house'];
        break;
      case 'palace':
        flatCost.min = FORM_MIN_PRICES['palace'];
        flatCost.placeholder = FORM_MIN_PRICES['palace'];
        break;
      default:
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
    var roomCapacityCoeff = (roomCount / capacity < 1);
    var bigRoomNoGuests = (roomCount === 100 && capacity !== 0);
    var notBigRoom = (roomCount !== 100 && capacity === 0);
    if (roomCapacityCoeff || bigRoomNoGuests || notBigRoom) {
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

  var selectUploadType = function (evt) {
    switch (evt.currentTarget) {
      case userAvatarDropZone:
      case formLoadAvatar:
        loaderFunction = function (fileContent) {
          userAvatar.src = fileContent;
        };
        return 'avatar';
      case userPhotosDropZone:
      case formPhotoLoad:
        loaderFunction = function (fileContent) {
          formLoadedPhotos.insertAdjacentHTML('afterbegin', '<img src=' + fileContent + ' width=70 height=70>');
        };
        return 'images';
    }
    return null;
  };

  var handleDrop = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    var dt = evt.dataTransfer;
    var files = dt.files;
    selectUploadType(evt);
    loadUserdata(files[0]);
  };

  var loadFromClick = function (evt) {
    var dataType = selectUploadType(evt);
    var file = '';
    switch (dataType) {
      case 'avatar':
        file = formLoadAvatar.files[0];
        break;
      case 'images':
        file = formPhotoLoad.files[0];
        break;
    }
    loadUserdata(file);
  };

  var loadUserdata = function (file) {
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (elem) {
      return fileName.endsWith(elem);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        loaderFunction(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  var dragFunction = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
  };

  flatType.addEventListener('change', changeFlatCost);
  flatTimeIn.addEventListener('change', changeTime);
  flatTimeOut.addEventListener('change', changeTime);
  roomNumber.addEventListener('change', checkRoomGuestsValidity);
  guestCapacity.addEventListener('change', checkRoomGuestsValidity);
  advertForm.addEventListener('submit', submitFormData);
  formReset.addEventListener('click', window.map.pageDeactivate);

  formLoadAvatar.addEventListener('change', loadFromClick);
  formPhotoLoad.addEventListener('change', loadFromClick);

  userAvatarDropZone.addEventListener('dragenter', dragFunction, false);
  userAvatarDropZone.addEventListener('dragleave', dragFunction, false);
  userAvatarDropZone.addEventListener('dragover', dragFunction, false);
  userAvatarDropZone.addEventListener('drop', handleDrop, false);

  userPhotosDropZone.addEventListener('dragenter', dragFunction, false);
  userPhotosDropZone.addEventListener('dragleave', dragFunction, false);
  userPhotosDropZone.addEventListener('dragover', dragFunction, false);
  userPhotosDropZone.addEventListener('drop', handleDrop, false);

})();
