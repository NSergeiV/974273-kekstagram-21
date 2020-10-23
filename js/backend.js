'use strict';

// Модуль загрузки коллекции фотографий с сервера

(function () {
  const TIMEOUT_IN_MS = 10000;

  const StatusCode = {
    OK: 200
  };
  window.backend = {
    load: function (onLoad, onError) {
      let xhr = new XMLHttpRequest();
      let URL = 'https://21.javascript.pages.academy/kekstagram/data';
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения с сервером');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open('GET', URL);
      xhr.send();
    }
  };
})();
