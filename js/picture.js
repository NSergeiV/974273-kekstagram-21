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

  // Блок вывода на страницу ошибок при обращении к серверу

  let node = document.createElement('div');
  let errorHandler = function (errorMessage) {
    node.classList.add('errorBlock');

    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; width: 50%;';
    node.style.position = 'absolute';
    node.style.left = 25 + '%';
    node.style.top = 40 + '%';
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // Конец блока ошибок

  window.backend.load(creatingCollectionPictures, errorHandler);
})();
