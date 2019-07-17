'use strict';

(function () {
  // 2. Активация страницы
  // активация страницы и перетаскивание метки

  var map = document.querySelector('.map');
  var addForm = document.querySelector('.ad-form');
  var pageActivated = false;
  var pageActivate = function () {
    map.classList.remove('map--faded');
    addForm.classList.remove('ad-form--disabled');

    pageActivated = true;

    for (var i = 0; i < window.form.formFieldsets.length; i++) {
      window.form.formFieldsets[i].disabled = false;
    }

    for (i = 0; i < window.form.formSelects.length; i++) {
      window.form.formSelects[i].disabled = false;
    }

    window.pin.advertPin(8);
  };

  window.util.pageActive.addEventListener('mousedown', function (mouseDownEvt) {
    mouseDownEvt.preventDefault();

    if (!pageActivated) {
      pageActivate();
    }

    var startPinCoords = {
      x: mouseDownEvt.clientX,
      y: mouseDownEvt.clientY
    };

    var pinMove = function (mouseMoveEvt) {
      mouseMoveEvt.preventDefault();

      var shiftPinCoords = {
        x: startPinCoords.x - mouseMoveEvt.clientX,
        y: startPinCoords.y - mouseMoveEvt.clientY
      };

      startPinCoords = {
        x: mouseMoveEvt.clientX,
        y: mouseMoveEvt.clientY
      };

      var newTop = window.util.pageActive.offsetTop - shiftPinCoords.y;
      var newLeft = window.util.pageActive.offsetLeft - shiftPinCoords.x;

      if (newTop > 130 && newTop < 630 && newLeft > 0 && newLeft < 1138) {
        window.util.pageActive.style.top = newTop + 'px';
        window.util.pageActive.style.left = newLeft + 'px';

        window.form.changeAdress();
      }
    };

    var pinDown = function (mouseUpEvt) {
      mouseUpEvt.preventDefault();
      window.form.changeAdress();

      document.removeEventListener('mousemove', pinMove);
      document.removeEventListener('mouseup', pinDown);
    };

    document.addEventListener('mousemove', pinMove);
    document.addEventListener('mouseup', pinDown);

  });

})();
