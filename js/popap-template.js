'use strict';

// Модуль создания модального окна при загрузке и выгрузке данных сервера

(function () {
  window.popapTemplate = function (nameId, nameClass, button) {
    let templateBlock = document.querySelector(nameId).content.querySelector(nameClass);
    let mainBody = document.querySelector('main');

    let node = templateBlock.cloneNode(true);
    let templateButton = node.querySelector(button);

    let onPopapEscClose = function (evt) {
      if (evt.keyCode === window.KODE_ESC) {
        closePopap();
      }
    };

    let closePopap = function () {
      node.remove();
      document.body.classList.remove('modal-open');
      templateButton.removeEventListener('click', closePopap);
      document.removeEventListener('keydown', onPopapEscClose);
      document.removeEventListener('click', closePopap);
    };

    document.body.classList.add('modal-open');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; width: 100%';
    mainBody.insertAdjacentElement('afterbegin', node);
    document.body.classList.add('modal-open');
    templateButton.addEventListener('click', closePopap);
    document.addEventListener('keydown', onPopapEscClose);
    document.addEventListener('click', closePopap);
  };
})();
