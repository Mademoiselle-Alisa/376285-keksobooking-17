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
    var showPinsArr = Array.from(showedPins);
    showPinsArr.filter(function (pin) {
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
      var filteredAdvertsArray = Array.from(filter.elements);
      filteredAdvertsArray.forEach(function (elem) {
        if (typeof (elem.value) === 'undefined') {
          return;
        }
        if (elem.tagName.toLowerCase() === 'input' && elem.checked) {
          filteredAdverts = filteredAdverts.filter(function (advert) {
            return advert.offer.features.includes(elem.value);
          });
        }
        if (elem.tagName.toLowerCase() === 'select') {
          if (elem.value === 'any') {
            return;
          }
          var currentFilter = filtersDict[elem.name];
          var isElemHousingPrice = (elem.name === 'housing-price');
          if (isElemHousingPrice) {
            filteredAdverts = filteredAdverts.filter(function (advert) {
              var currentPrice = advert.offer[currentFilter];
              switch (elem.value) {
                case 'middle':
                  if (currentPrice >= 10000 && currentPrice <= 50000) {
                    return advert;
                  }
                  break;
                case 'low':
                  if (currentPrice < 10000) {
                    return advert;
                  }
                  break;
                case 'high':
                  if (currentPrice > 50000) {
                    return advert;
                  }
                  break;
                default:
                  break;
              }
              return null;
            });
            return;
          }
          filteredAdverts = filteredAdverts.filter(function (advert) {
            return advert.offer[currentFilter].toString() === elem.value.toString();
          });
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
