'use strict';

(function () {
  var ARROW_HEIGHT = 22;
  var inputAdress = document.querySelector('#address');

  var filterFlatType = document.querySelector('#housing-type');

  window.form = {
    formFieldsets: document.querySelectorAll('fieldset'),
    formSelects: document.querySelectorAll('select'),

    changeAdress: function () {
      inputAdress.value = (parseInt(window.util.pageActive.style.left, 10) + parseInt(window.util.pageActive.offsetWidth / 2, 10)) + ', ' + (parseInt(window.util.pageActive.style.top, 10) + parseInt(window.util.pageActive.offsetHeight, 10) + ARROW_HEIGHT);
    }
  };

  // 1. сделать элементы форм неактивными

  for (var i = 0; i < window.form.formFieldsets.length; i++) {
    window.form.formFieldsets[i].disabled = true;
  }

  for (i = 0; i < window.form.formSelects.length; i++) {
    window.form.formSelects[i].disabled = true;
  }
  // 3. Заполнение адреса

  inputAdress.value = (parseInt(window.util.pageActive.style.left, 10) + parseInt(window.util.pageActive.offsetWidth / 2, 10)) + ', ' + (parseInt(window.util.pageActive.style.top, 10) + parseInt(window.util.pageActive.offsetHeight / 2, 10));

  var flatType = document.querySelector('#type');
  var flatCost = document.querySelector('#price');
  var flatTimeIn = document.querySelector('#timein');
  var flatTimeOut = document.querySelector('#timeout');

  var changeFlatCost = function (evt) {
    switch (evt.currentTarget.value) {
      case 'bungalo':
        flatCost.min = 0;
        flatCost.placeholder = 0;
        break;
      case 'flat':
        flatCost.min = 1000;
        flatCost.placeholder = 1000;
        break;
      case 'house':
        flatCost.min = 5000;
        flatCost.placeholder = 5000;
        break;
      case 'palace':
        flatCost.min = 10000;
        flatCost.placeholder = 10000;
        break;
    }
  };

  var changeTime = function (evt) {
    if (evt.currentTarget === flatTimeIn) {
      flatTimeOut.selectedIndex = flatTimeIn.selectedIndex;
    } else {
      flatTimeIn.selectedIndex = flatTimeOut.selectedIndex;
    }
  };

  flatType.addEventListener('change', changeFlatCost);
  flatTimeIn.addEventListener('change', changeTime);
  flatTimeOut.addEventListener('change', changeTime);

  var filterMapPins = function () {
    var optionValue = filterFlatType.value;
    window.pin.filterPins(optionValue);
  };

  filterFlatType.addEventListener('change', filterMapPins);


})();
