'use strict';

(function () {
  window.backend = {
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      var url = 'https://js.dump.academy/keksobooking/data';

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Ошибка ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Ошибка ' + xhr.status + ' ' + xhr.statusText);
      });

      xhr.addEventListener('timeout', function () {
        onError('Ошибка ' + xhr.status + ' ' + xhr.statusText);
      });

      xhr.timeout = 10000;

      xhr.open('GET', url);
      xhr.send();

    }
  };

})();
