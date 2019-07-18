'use strict';

(function () {
  var types = ['palace', 'flat', 'house', 'bungalo'];

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  window.data = {
    advertGen: function (advertCount) {
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
  };
})();
