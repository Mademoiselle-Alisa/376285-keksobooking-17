'use strict';

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var types = ['palace', 'flat', 'house', 'bungalo'];

var map = document.querySelector('.map');

var mapPins = document.querySelector('.map__pins');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function advertGen(advertCount) {
  var advertsGenArr = [];
  for (var i = 1; i <= advertCount; i++) {
    var advertDesc = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        type: types[getRandomInt(0, types.length)]
      },
      location: {
        x: getRandomInt(25, 1176),
        y: getRandomInt(130, 631)
      }
    };

    advertsGenArr.push(advertDesc);
  }

  return advertsGenArr;
}

function renderPin(advertElem) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.querySelector('img').src = advertElem.author.avatar;
  pinElement.querySelector('img').alt = advertElem.offer.type;
  pinElement.style.left = (advertElem.location.x - 25) + 'px';
  pinElement.style.top = (advertElem.location.y - 70) + 'px';

  return pinElement;
}

function advertPin() {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < adverts.length; i++) {
    var renderedPin = renderPin(adverts[i]);
    fragment.appendChild(renderedPin);
  }

  mapPins.appendChild(fragment);
}

var adverts = advertGen(8);


var formFieldsets = document.querySelectorAll('fieldset');
var formSelects = document.querySelectorAll('select');
var addForm = document.querySelector('.ad-form');
var inputAdress = document.querySelector('#address');
var pageActive = document.querySelector('.map__pin--main');
var ARROW_HEIGHT = 22;

// 1. сделать элементы форм неактивными

for (var i = 0; i < formFieldsets.length; i++) {
  formFieldsets[i].disabled = true;
}

for (i = 0; i < formSelects.length; i++) {
  formSelects[i].disabled = true;
}

// 3. Заполнение адреса

inputAdress.value = (parseInt(pageActive.style.left, 10) + parseInt(pageActive.offsetWidth / 2, 10)) + ', ' + (parseInt(pageActive.style.top, 10) + parseInt(pageActive.offsetHeight / 2, 10));

// 2. Активация страницы

var pageActivated = false;

var pageActivate = function () {
  map.classList.remove('map--faded');
  addForm.classList.remove('ad-form--disabled');

  pageActivated = true;

  for (i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].disabled = false;
  }

  for (i = 0; i < formSelects.length; i++) {
    formSelects[i].disabled = false;
  }

  advertPin();
};

var changeAdress = function () {
  inputAdress.value = (parseInt(pageActive.style.left, 10) + parseInt(pageActive.offsetWidth / 2, 10)) + ', ' + (parseInt(pageActive.style.top, 10) + parseInt(pageActive.offsetHeight, 10) + ARROW_HEIGHT);
};

// валидация формы

var flatType = document.querySelector('#type');
var flatCost = document.querySelector('#price');
var flatTimeIn = document.querySelector('#timein');
var flatTimeOut = document.querySelector('#timeout');

var changeFlatCost = function (evt) {
  if (evt.currentTarget.value === 'bungalo') {
    flatCost.min = 0;
    flatCost.placeholder = 0;
  }

  if (evt.currentTarget.value === 'flat') {
    flatCost.min = 1000;
    flatCost.placeholder = 1000;
  }

  if (evt.currentTarget.value === 'house') {
    flatCost.min = 5000;
    flatCost.placeholder = 5000;
  }

  if (evt.currentTarget.value === 'palace') {
    flatCost.min = 10000;
    flatCost.placeholder = 10000;
  }
};

var changeTime = function (evt) {
  if (evt.currentTarget === flatTimeIn) {
    flatTimeOut.selectedIndex = flatTimeIn.selectedIndex;
  } else {
    flatTimeIn.selectedIndex = flatTimeOut.selectedIndex;
  }
};

flatType.addEventListener('change', changeFlatCost);
flatTimeIn.addEventListener('change', changeTime);
flatTimeOut.addEventListener('change', changeTime);

// активация страницы и перетаскивание метки

pageActive.addEventListener('mousedown', function (mouseDownEvt) {
  mouseDownEvt.preventDefault();

  if (!pageActivated) {
    pageActivate();
  }

  var startPinCoords = {
    x: mouseDownEvt.clientX,
    y: mouseDownEvt.clientY
  };

  var pinMove = function (mouseMoveEvt) {
    mouseMoveEvt.preventDefault();

    var shiftPinCoords = {
      x: startPinCoords.x - mouseMoveEvt.clientX,
      y: startPinCoords.y - mouseMoveEvt.clientY
    };

    startPinCoords = {
      x: mouseMoveEvt.clientX,
      y: mouseMoveEvt.clientY
    };

    var newTop = pageActive.offsetTop - shiftPinCoords.y;
    var newLeft = pageActive.offsetLeft - shiftPinCoords.x;

    if (newTop > 130 && newTop < 630 && newLeft > 0 && newLeft < 1138) {
      pageActive.style.top = newTop + 'px';
      pageActive.style.left = newLeft + 'px';

      changeAdress();
    }
  };

  var pinDown = function (mouseUpEvt) {
    mouseUpEvt.preventDefault();
    changeAdress();

    document.removeEventListener('mousemove', pinMove);
    document.removeEventListener('mouseup', pinDown);
  };

  document.addEventListener('mousemove', pinMove);
  document.addEventListener('mouseup', pinDown);

});

