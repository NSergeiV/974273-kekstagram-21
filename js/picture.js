'use strict';

// Создание DOM элемента и наполнение блока DOM элементами.

(function () {
  const MAX_PHOTOS_COUNT = 25;
  let similarWizardTemplate = document.querySelector('#picture').content.querySelector('.picture');
  let setupPictureList = document.querySelector('.pictures');

  let creatingPhotoBlock = function (photo) {
    let photoElement = similarWizardTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return photoElement;
  };

  let creatingCollectionPictures = function (collections) {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < MAX_PHOTOS_COUNT; i++) {
      fragment.appendChild(creatingPhotoBlock(collections[i]));
    }
    setupPictureList.appendChild(fragment);
  };

  // Блок вывода на страницу ошибок при загрузке с сервера

  let node = document.createElement('div');
  let mainBody = document.querySelector('main');
  let errorHandler = function (errorMessage) {
    node.classList.add('error');
    node.style = 'align-items: center;';
    node.textContent = errorMessage;
    mainBody.insertAdjacentElement('afterbegin', node);
  };

  // Конец блока ошибок

  // Запрос данных с сервера
  window.backend.load(creatingCollectionPictures, errorHandler);
})();
