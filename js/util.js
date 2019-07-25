'use strict';

(function () {
  var DEBOUNCER_INTERVAL = 500;
  window.util = {
    debounce: function (cb) {
      var lastTimeout = null;

      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, DEBOUNCER_INTERVAL);
      };
    },

    ESC_KEYCODE: 27,
    pageActive: document.querySelector('.map__pin--main')
  };
})();

