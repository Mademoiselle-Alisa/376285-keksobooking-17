'use strict';

(function () {
  // var types = ['palace', 'flat', 'house', 'bungalo'];

  /* function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  */
  var Advert = function (data) {
    this.author = data.author;
    this.offer = data.offer;
    this.location = data.location;
  };

  window.data = {
    loadedAdverts: [],

    loadData: function (data) {
      window.data.loadedAdverts.splice(0, window.data.loadedAdverts.length);
      data.forEach(function (elem) {
        var newAd = new Advert(elem);
        window.data.loadedAdverts.push(newAd);
      });
      window.pin.advertPin(window.data.loadedAdverts);
    }
  };
})();
