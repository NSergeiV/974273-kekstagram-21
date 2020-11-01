'use strict';

// Выводим 1 фото из галлереии на экран в большом формате

(function () {
  const KODE_ESC = 27;
  window.KODE_ESC = KODE_ESC;

  let bigPicture = document.querySelector('.big-picture');
  let bigPictureImg = bigPicture.querySelector('.big-picture__img');
  let socialComments = bigPicture.querySelector('.social__comments');
  let socialCommentCount = bigPicture.querySelector('.social__comment-count');
  let buttonCommentsLoader = bigPicture.querySelector('.social__comments-loader');
  let picturesBlock = document.querySelector('.pictures');
  window.picturesBlock = picturesBlock;

  // Копируем блок с коментариями для фото
  let socialCommentItem = socialComments.querySelector('.social__comment').cloneNode(true);

  // Удаляем старые коминты к фото
  const clearСomments = function () {
    let children = socialComments.children;
    for (let i = children.length - 1; i >= 0; i--) {
      var child = children[i];
      child.parentElement.removeChild(child);
    }
  };
  clearСomments();

  // Множим блоки с комминтами в зависимости от их количества
  let sourceСomments = [];
  let modul = 0;
  const photoСomments = function () {
    // Переносит элементы одного массива в другой
    let bankComments = sourceСomments.splice(-5);

    // Данная переменная выводит на страницу количество показанных комментариев
    modul = modul + bankComments.length;
    socialCommentCount.querySelector('.comments-count-here').textContent = modul;
    if (sourceСomments.length === 0) {
      buttonCommentsLoader.classList.add('hidden');
    }

    for (let i = 0; i < bankComments.length; i++) {
      let socialCommentItemDubl = socialCommentItem.cloneNode(true);
      socialCommentItemDubl.querySelector('img').src = bankComments[i].avatar;
      socialCommentItemDubl.querySelector('img').alt = bankComments[i].name;
      socialCommentItemDubl.querySelector('p').textContent = bankComments[i].message;

      socialComments.appendChild(socialCommentItemDubl);
    }
  };

  // Открытие попап выбранной фотографии для просмотра в увеличенном формате
  let openPopapBigPicture = function () {
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    buttonBigPictureCancel.addEventListener('click', closePopapBigPicture);
    document.addEventListener('keydown', onPopapCloseESC);
    buttonCommentsLoader.addEventListener('click', photoСomments);
  };

  // Поиск совпадения элемента в общей коллекции
  const searchElement = function (selectDom) {
    let choice = null;
    choice = selectDom.src.match(/photos\/[0-9]+.jpg/g);
    window.endCollections.filter(function (element) {
      if (element.url === choice[0]) {
        socialCommentCount.querySelector('.comments-count').textContent = element.comments.length;
        sourceСomments = element.comments;
        photoСomments();
      }
    });
  };

  // Делегирование фото при всплытии на большой формат
  let onImageChangeClic = function (evt) {
    if (evt.target && evt.target.matches('img[class="picture__img"]')) {
      openPopapBigPicture();
      bigPictureImg.querySelector('img').src = evt.target.src;
      searchElement(evt.target);
    }
  };

  // Добавляем фото на большой формат с помощью клавы Enter
  let onImageChangeEnt = function (evt) {
    if (evt.keyCode === 13) {
      for (let i = 0; i < window.pictures.length; i++) {
        let picture = window.pictures[i];
        if (picture === document.activeElement) {
          openPopapBigPicture();
          bigPictureImg.querySelector('img').src = picture.querySelector('img').src;
          searchElement(picture.querySelector('img'));
          break;
        }
      }
    }
  };

  picturesBlock.addEventListener('keydown', onImageChangeEnt);
  picturesBlock.addEventListener('click', onImageChangeClic);

  // Закрытие попап увеличенного просмотра изображения
  let buttonBigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

  let onPopapCloseESC = function (evt) {
    if (evt.keyCode === KODE_ESC) {
      closePopapBigPicture();
    }
  };

  let closePopapBigPicture = function () {
    bigPicture.classList.add('hidden');
    clearСomments();
    modul = 0;
    buttonCommentsLoader.classList.remove('hidden');
    document.body.classList.remove('modal-open');
    buttonBigPictureCancel.removeEventListener('click', closePopapBigPicture);
    document.removeEventListener('keydown', onPopapCloseESC);
  };

})();
