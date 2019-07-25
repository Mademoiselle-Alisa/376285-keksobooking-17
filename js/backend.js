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

    },

    save: function (data, onLoad, onError) {
      var url = 'https://js.dump.academy/keksobooking';
      var xhr = new XMLHttpRequest();

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
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

      xhr.timeout = 10000;

      xhr.open('POST', url);
      xhr.send(data);
    }
  };

})();
