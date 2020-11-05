'use strict';

// Модуль загрузки коллекции фотографий с сервера
(function () {
  const TIMEOUT_IN_MS = 10000;

  const StatusCode = {
    OK: 200
  };

  window.backend = {
    requestServer: function (onLoad, onError, data) {
      let xhr = new XMLHttpRequest();
      let URL;
      URL = (data) ? 'https://21.javascript.pages.academy/kekstagram' : 'https://21.javascript.pages.academy/kekstagram/data';
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
        } else {
          if (data) {
            onError();
          } else {
            onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
          }
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения с сервером');
      });
      xhr.addEventListener('timeout', function () {
        if (data) {
          onError('Отправка данных не выполнена, долгое ожидание более ' + xhr.timeout + 'мс');
        } else {
          onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
        }
      });
      xhr.timeout = TIMEOUT_IN_MS;
      if (data) {
        xhr.open('POST', URL);
        xhr.send(data);
      } else {
        xhr.open('GET', URL);
        xhr.send();
      }
    },
    load: function (onLoad, onError) {
      this.requestServer(onLoad, onError);
    },
    save: function (onLoad, onError, data) {
      this.requestServer(onLoad, onError, data);
    }
  };
})();
