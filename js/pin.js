'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var filtersDict = {
    'housing-type': 'type',
    'housing-price': 'price',
    'housing-rooms': 'rooms',
    'housing-guests': 'guests',
    'features': 'features'
  };

  function renderPin(advertElem) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = advertElem.author.avatar;
    pinElement.querySelector('img').alt = advertElem.offer.type;
    pinElement.style.left = (advertElem.location.x - 25) + 'px';
    pinElement.style.top = (advertElem.location.y - 70) + 'px';
    return pinElement;
  }

  var removePins = function () {
    var showedPins = document.querySelectorAll('.map__pin');
    Array.from(showedPins).filter(function (pin) {
      return !pin.classList.contains('map__pin--main');
    }).forEach(function (pin) {
      pin.remove();
    });
  };

  window.pin = {

    filterPins: function (filter) {
      removePins();
      window.card.removeCard();
      var filteredAdverts = window.data.loadedAdverts;
      Array.from(filter.elements).forEach(function (elem) {
        if (typeof (elem.value) !== 'undefined') {
          if (elem.tagName.toLowerCase() === 'input' && elem.checked) {
            filteredAdverts = filteredAdverts.filter(function (advert) {
              return advert.offer.features.includes(elem.value);
            });
          }
          if (elem.tagName.toLowerCase() === 'select') {
            if (elem.value !== 'any') {
              var currentFilter = filtersDict[elem.name];
              if (elem.name === 'housing-price') {
                filteredAdverts = filteredAdverts.filter(function (advert) {
                  if (elem.value === 'middle' && advert.offer[currentFilter] >= 10000 && advert.offer[currentFilter] <= 50000) {
                    return advert;
                  }
                  if (elem.value === 'low' && advert.offer[currentFilter] < 10000) {
                    return advert;
                  }
                  if (elem.value === 'high' && advert.offer[currentFilter] > 50000) {
                    return advert;
                  }
                  return null;
                });
              } else {
                filteredAdverts = filteredAdverts.filter(function (advert) {
                  return advert.offer[currentFilter].toString() === elem.value.toString();
                });
              }
            }
          }
        }
      });
      window.pin.advertPin(filteredAdverts);
    },

    advertPin: function (adverts) {
      var advertsCount = (adverts.length < 5) ? adverts.length : 5;
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < advertsCount; i++) {
        var renderedPin = renderPin(adverts[i]);
        fragment.appendChild(renderedPin);
        renderedPin.addEventListener('click', window.card.createCard.bind(null, adverts[i]));
      }
      mapPins.appendChild(fragment);
    },

    removeAllPins: function () {
      removePins();
    }
  };
})();
