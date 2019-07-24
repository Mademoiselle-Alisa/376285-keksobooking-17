'use strict';

(function () {

  var mapLayout = document.querySelector('.map');
  var mapFilters = document.querySelector('#map__filters-container');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var flatTypeDict = {
    'bungalo': 'Бунгало',
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом'
  };

  var featuresDict = {
    'wifi': '.popup__feature--wifi',
    'dishwasher': '.popup__feature--dishwasher',
    'parking': '.popup__feature--parking',
    'washer': '.popup__feature--washer',
    'elevator': '.popup__feature--elevator',
    'conditioner': '.popup__feature--conditioner'
  };

  var renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    var popupTitle = cardElement.querySelector('.popup__title');
    var popupAddress = cardElement.querySelector('.popup__text--address');
    var popupPrice = cardElement.querySelector('.popup__text--price');
    var popupType = cardElement.querySelector('.popup__type');
    var popupCapacity = cardElement.querySelector('.popup__text--capacity');
    var popupTime = cardElement.querySelector('.popup__text--time');
    var popupFeatures = cardElement.querySelector('.popup__features');
    var popupDescription = cardElement.querySelector('.popup__description');
    var popupPhotos = cardElement.querySelector('.popup__photos');
    var popupAvatar = cardElement.querySelector('.popup__avatar');

    popupTitle.textContent = card.offer.title;
    popupAddress.textContent = card.offer.address;
    popupPrice.textContent = card.offer.price + '₽/ночь';
    popupType.textContent = flatTypeDict[card.offer.type];
    popupCapacity.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей.';
    popupTime.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    popupDescription.textContent = card.offer.description;
    popupAvatar.src = card.author.avatar;
    // === Обработка фотографий
    var photoImg = popupPhotos.querySelector('.popup__photo');
    card.offer.photos.forEach(function (element) {
      var newPhoto = photoImg.cloneNode();
      newPhoto.src = element;
      popupPhotos.appendChild(newPhoto);
    });
    popupPhotos.removeChild(photoImg);
    // === Закончили обработку фотографий
    // ===  Обрабатываем Features
    var popupUlFeatures = popupFeatures.querySelectorAll('.popup__feature');
    card.offer.features.forEach(function (element) {
      var thisFeature = featuresDict[element];
      var newFeature = popupFeatures.querySelector(thisFeature).cloneNode();
      popupFeatures.appendChild(newFeature);
    });

    popupUlFeatures.forEach(function (element) {
      element.remove();
    });
    // ==Закончили с Features

    return cardElement;
  };

  window.card = {
    createCard: function () {
      var fragment = document.createDocumentFragment();
      var renderedCard = renderCard(window.data.advertsArray[2]);
      fragment.appendChild(renderedCard);
      mapLayout.insertBefore(fragment, mapFilters);
    }
  };

})();
