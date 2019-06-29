'use strict';

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var types = ['palace', 'flat', 'house', 'bungalo'];

var map = document.querySelector('.map');
map.classList.remove('map--faded');

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

advertPin();
