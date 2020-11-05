'use strict';

// Модуль создания модального окна при загрузке и выгрузке данных сервера

(function () {
  window.popupTemplate = function (nameId, nameClass, button) {
    let templateBlock = document.querySelector(nameId).content.querySelector(nameClass);
    let mainBody = document.querySelector('main');

    let node = templateBlock.cloneNode(true);
    let templateButton = node.querySelector(button);

    let onPopupEscClose = function (evt) {
      if (evt.keyCode === window.KODE_ESC) {
        closePopup();
      }
    };

    let closePopup = function () {
      node.remove();
      document.body.classList.remove('modal-open');
      templateButton.removeEventListener('click', closePopup);
      document.removeEventListener('keydown', onPopupEscClose);
      document.removeEventListener('click', closePopup);
    };

    document.body.classList.add('modal-open');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; width: 100%';
    mainBody.insertAdjacentElement('afterbegin', node);
    document.body.classList.add('modal-open');
    templateButton.addEventListener('click', closePopup);
    document.addEventListener('keydown', onPopupEscClose);
    document.addEventListener('click', closePopup);
  };
})();
