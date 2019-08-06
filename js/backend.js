'use strict';

(function () {
  var HTTP_OK_RESPONSE = 200;
  var XHR_TIMEOUT = 10000;
  window.backend = {
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      var url = 'https://js.dump.academy/keksobooking/data';

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === HTTP_OK_RESPONSE) {
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

      xhr.timeout = XHR_TIMEOUT;

      xhr.open('GET', url);
      xhr.send();

    },

    save: function (data, onLoad, onError) {
      var url = 'https://js.dump.academy/keksobooking';
      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function () {
        if (xhr.status === HTTP_OK_RESPONSE) {
          onLoad();
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = XHR_TIMEOUT;

      xhr.open('POST', url);
      xhr.send(data);
    }
  };

})();
