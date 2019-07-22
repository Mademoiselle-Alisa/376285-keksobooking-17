'use strict';

(function () {
  var types = ['palace', 'flat', 'house', 'bungalo'];

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  window.data = {
    advertsArray: [],
    advertGen: function (advertCount) {
      var advertsGenArr = [];
      for (var i = 1; i <= advertCount; i++) {
        var advertDesc = {
          author: {
            avatar: 'img/avatars/user0' + i + '.png'
          },
          offer: {
            title: 'Красивая кватира',
            address: 'Токио',
            price: 5000,
            type: types[getRandomInt(0, types.length)],
            rooms: 3,
            guests: 2,
            checkin: '12:00',
            checkout: '13:00',
            features: ['wifi', 'dishwasher', 'conditioner', 'parking'],
            description: 'Красивая квартира да еще и дешево',
            photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
          },
          location: {
            x: getRandomInt(25, 1176),
            y: getRandomInt(130, 631)
          }
        };

        advertsGenArr.push(advertDesc);
      }
      window.data.advertsArray = advertsGenArr;
      return advertsGenArr;
    }
  };
})();
