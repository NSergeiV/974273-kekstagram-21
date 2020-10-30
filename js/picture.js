'use strict';

// Создание DOM элемента и наполнение блока DOM элементами.

(function () {
  // const MAX_PHOTOS_COUNT = 25;
  let similarWizardTemplate = document.querySelector('#picture').content.querySelector('.picture');
  window.setupPictureList = document.querySelector('.pictures');

  let creatingPhotoBlock = function (photo) {
    let photoElement = similarWizardTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return photoElement;
  };

  window.creatingCollectionPictures = function (collections, photosCount) {

    let fragment = document.createDocumentFragment();
    for (let i = 0; i < photosCount; i++) {
      fragment.appendChild(creatingPhotoBlock(collections[i]));
    }
    window.setupPictureList.appendChild(fragment);
  };
})();
