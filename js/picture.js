'use strict';

// Создание DOM элемента и наполнение блока DOM элементами.

(function () {
  let similarWizardTemplate = document.querySelector('#picture').content.querySelector('.picture');
  let setupPictureList = document.querySelector('.pictures');

  let creatingPhotoBlock = function (photo) {
    let photoElement = similarWizardTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments;

    return photoElement;
  };

  let creatingGroupPictures = function (collection) {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < collection.length; i++) {
      fragment.appendChild(creatingPhotoBlock(collection[i]));
    }
    return fragment;
  };

  setupPictureList.appendChild(creatingGroupPictures(window.photos));
})();
