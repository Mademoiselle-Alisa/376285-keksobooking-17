'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
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

      if (filter === 'any') {
        window.pin.advertPin(window.data.loadedAdverts);
        return;
      }
      var filteredAdverts = window.data.loadedAdverts.filter(function (advert) {
        return advert.offer.type === filter;
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
