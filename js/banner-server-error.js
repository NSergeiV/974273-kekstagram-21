'use strict';

// Вывод ошибок сервера на экран
(function () {
  window.pushErrorHandler = function () {
    window.closePopapImgUpload();
    window.popapTemplate('#error', '.error', '.error__button');
  };

  let node = document.createElement('div');
  let mainBody = document.querySelector('main');
  window.pullErrorHandler = function (errorMessage) {
    node.classList.add('error');
    node.style = 'align-items: center;';
    node.textContent = errorMessage;
    mainBody.insertAdjacentElement('afterbegin', node);
  };
})();
