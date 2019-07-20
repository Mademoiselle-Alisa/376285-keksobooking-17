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

  window.pin = {
    advertPin: function (adverts) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < adverts.length; i++) {
        var renderedPin = renderPin(adverts[i]);
        fragment.appendChild(renderedPin);
      }
      mapPins.appendChild(fragment);
    }
  };
})();
